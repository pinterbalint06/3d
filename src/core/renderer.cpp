#include <emscripten/emscripten.h>
#include "core/renderer.h"
#include "core/shader.h"
#include "core/scene.h"
#include "core/material.h"
#include "core/camera.h"
#include "core/distantLight.h"
#include "core/mesh.h"
#include "core/terrain.h"
#include "utils/clipping.h"
#include "utils/frameBuffer.h"
#include "utils/mathUtils.h"
#include "utils/edgeFunction.h"
#include "core/vertex.h"
#include <cstring>

Renderer::Renderer()
{
    imageWidth_ = 0;
    imageHeight_ = 0;
    antialias_ = 1;
    sqrAntialias_ = (int)sqrt(antialias_);
    sqrAntialiasRec_ = FixedPoint::Float2Fix(1.0f / sqrAntialias_);
    inc_ = sqrAntialiasRec_ >> 1;
    projectedTriangles_ = (Vertex *)malloc(20 * sizeof(Vertex));
    projectedTrianglesSize_ = 0;
    currShadingMode_ = Shaders::SHADINGMODE::PHONG;
    normal_ = (float *)malloc(3 * sizeof(float));
    clipper_ = new Clipper();
    frameBuffer_ = new FrameBuffer(imageWidth_, imageHeight_, antialias_);
}

Renderer::~Renderer()
{
    if (projectedTriangles_)
    {
        free(projectedTriangles_);
    }
    if (normal_)
    {
        free(normal_);
    }
    if (clipper_)
    {
        delete clipper_;
    }
    if (frameBuffer_)
    {
        delete frameBuffer_;
    }
}

void Renderer::setAntialias(int antialias)
{
    if (MathUtils::isSquareNumber(antialias) && (1 <= antialias && antialias <= 16))
    {
        antialias_ = antialias;
        sqrAntialias_ = (int)sqrt(antialias_);
        sqrAntialiasRec_ = FixedPoint::Float2Fix(1.0f / sqrAntialias_);
        inc_ = sqrAntialiasRec_ >> 1;
        frameBuffer_->setAntialias(antialias_);
    }
}

void Renderer::setShadingMode(Shaders::SHADINGMODE shadingMode)
{
    currShadingMode_ = shadingMode;
}

void Renderer::setImageDimensions(int imageW, int imageH)
{
    imageWidth_ = imageW;
    imageHeight_ = imageH;
    frameBuffer_->setNewOptions(imageWidth_, imageHeight_, antialias_);
}

void Renderer::projectAndClipTriangle(const int &i0, const int &i1, const int &i2, float *normal, Vertex *vertices, Camera *mainCamera)
{
    p0_ = vertices[i0];
    p1_ = vertices[i1];
    p2_ = vertices[i2];
    const float *MV = mainCamera->getViewMatrix();
    p0_.multWithMatrix(MV);
    p1_.multWithMatrix(MV);
    p2_.multWithMatrix(MV);
    Vertex::calculateFaceNormal(p0_, p1_, p2_, normal);
    const float *MP = mainCamera->getProjMatrix();
    p0_.multWithMatrix(MP);
    p1_.multWithMatrix(MP);
    p2_.multWithMatrix(MP);
    // clip space
    clipper_->clip(p0_, p1_, p2_);
    Vertex *clipped = clipper_->getClipped();
    int clippedSize = clipper_->getClippedSize();
    float wRec;
    projectedTrianglesSize_ = 0;
    // triangle fan
    if (clippedSize > 2)
    {
        // starting projected vertex
        const Vertex &v0 = clipped[0];
        wRec = 1.0f / v0.w;
        Vertex startProj;
        startProj.x = (v0.x * wRec + 1) * 0.5f * (float)imageWidth_;
        startProj.y = (1 - v0.y * wRec) * 0.5f * (float)imageHeight_;
        startProj.z = v0.z * wRec;
        startProj.nx = v0.nx;
        startProj.ny = v0.ny;
        startProj.nz = v0.nz;
        for (int i = 0; i < clippedSize - 2; i++)
        {
            projectedTriangles_[projectedTrianglesSize_++] = startProj;

            const Vertex &v1 = clipped[i + 1];
            wRec = 1.0f / v1.w;
            Vertex &projected1 = projectedTriangles_[projectedTrianglesSize_++];
            projected1.x = (v1.x * wRec + 1) * 0.5f * (float)imageWidth_;
            projected1.y = (1 - v1.y * wRec) * 0.5f * (float)imageHeight_;
            projected1.z = v1.z * wRec;
            projected1.nx = v1.nx;
            projected1.ny = v1.ny;
            projected1.nz = v1.nz;

            const Vertex &v2 = clipped[i + 2];
            wRec = 1.0f / v2.w;
            Vertex &projected2 = projectedTriangles_[projectedTrianglesSize_++];
            projected2.x = (v2.x * wRec + 1) * 0.5f * (float)imageWidth_;
            projected2.y = (1 - v2.y * wRec) * 0.5f * (float)imageHeight_;
            projected2.z = v2.z * wRec;
            projected2.nx = v2.nx;
            projected2.ny = v2.ny;
            projected2.nz = v2.nz;
        }
        MathUtils::normalizeVector(normal);
    }
}

template <typename StructShader>
void Renderer::renderTemplate(const Scene *scene)
{
    frameBuffer_->clear();
    // bounding box
    float htminx, htmaxx, htminy, htmaxy;
    // reciprocal of the z values
    float z0Rec, z1Rec, z2Rec;
    // used for the z-buffer
    float zDepth;
    // indexes
    int bufferIndex, imageIndex;
    // camera
    Camera *mainCamera = scene->getCamera();
    float camX = mainCamera->getXPosition();
    float camY = mainCamera->getYPosition();
    float camZ = mainCamera->getZPosition();
    // light
    distantLight *sun = scene->getLight();
    float ambientLight = scene->getAmbientLight();
    float lightVec[3];
    const float *lightDir = sun->getDirection();
    lightVec[0] = -lightDir[0];
    lightVec[1] = -lightDir[1];
    lightVec[2] = -lightDir[2];
    mainCamera->updateViewMatrix();
    StructShader shader;
    float *zBuffer = frameBuffer_->getZBuffer();
    float *imageAntiBuffer = frameBuffer_->getAntialiasImageBuffer();
    Mesh *mesh = scene->getTerrain()->getMesh();
    Materials::Material meshMat = mesh->getMaterial();
    Materials::Color meshCol = meshMat.albedo_;
    float rGround = meshCol.r_;
    float gGround = meshCol.g_;
    float bGround = meshCol.b_;
    int32_t *currIndices = mesh->getIndices();
    Vertex *currVertices = mesh->getVertices();
    int indicesCount = mesh->getIndexCount();
    for (int i = 0; i < indicesCount; i += 3)
    {
        projectAndClipTriangle(currIndices[i], currIndices[i + 1], currIndices[i + 2], normal_, currVertices, mainCamera);
        for (int j = 0; j < projectedTrianglesSize_; j += 3)
        {
            EdgeFunction::EdgeFunction ef;
            ef.setupEdgeFunctionTriArea(&projectedTriangles_[j]);
            // if triangle's are is 0 or smaller it is not a real triangle or backface
            if (ef.triArea_ > 0)
            {
                // Calculate bounding box
                htminx = imageWidth_;
                htmaxx = -imageWidth_;
                htminy = imageHeight_;
                htmaxy = -imageHeight_;
                for (int k = 0; k < 3; k++)
                {
                    if (projectedTriangles_[j + k].x < htminx)
                    {
                        htminx = projectedTriangles_[j + k].x;
                    }
                    if (projectedTriangles_[j + k].x > htmaxx)
                    {
                        htmaxx = projectedTriangles_[j + k].x;
                    }
                    if (projectedTriangles_[j + k].y < htminy)
                    {
                        htminy = projectedTriangles_[j + k].y;
                    }
                    if (projectedTriangles_[j + k].y > htmaxy)
                    {
                        htmaxy = projectedTriangles_[j + k].y;
                    }
                }
                int bbminx = std::max(0, std::min(imageWidth_ - 1, (int)std::floor(htminx)));
                int bbminy = std::max(0, std::min(imageHeight_ - 1, (int)std::floor(htminy)));
                int bbmaxx = std::max(0, std::min(imageWidth_ - 1, (int)std::ceil(htmaxx)));
                int bbmaxy = std::max(0, std::min(imageHeight_ - 1, (int)std::ceil(htmaxy)));

                // precalculate the reciprocal
                z0Rec = 1.0f / projectedTriangles_[j].z;
                z1Rec = 1.0f / projectedTriangles_[j + 1].z;
                z2Rec = 1.0f / projectedTriangles_[j + 2].z;

                // initialize shader for triangle
                shader.setupTriangle(normal_, &projectedTriangles_[j],
                                     i, lightVec, meshMat, sun,
                                     z0Rec, z1Rec, z2Rec,
                                     camX, camY, camZ, ambientLight);

                // setup step values for inside test
                ef.setupStepValues(bbminx, bbminy, inc_, sqrAntialiasRec_);

                // precalculate inverse of triangle's area
                float invTriArea = 1.0f / (float)ef.triArea_;
                for (int y = bbminy; y <= bbmaxy; y++)
                {
                    ef.backToRowStart();
                    for (int x = bbminx; x <= bbmaxx; x++)
                    {
                        ef.backToColStart();
                        for (int ya = 0; ya < sqrAntialias_; ya++)
                        {
                            ef.backToSubRowStart();
                            for (int xa = 0; xa < sqrAntialias_; xa++)
                            {
                                // the sign bit is one if the number is negative
                                // if all three number is positive all of their sign bit is zero so in an OR operator the result's sign bit is also 0 and positive
                                // if any of  the number is negative (their sign bit is 1) then the result's sign bit will also be 1 and will be negative
                                if (ef.isInside())
                                {
                                    // barycentric coordinates
                                    float lambda0 = (float)ef.w0Sub_ * invTriArea;
                                    float lambda1 = (float)ef.w1Sub_ * invTriArea;
                                    float lambda2 = (float)ef.w2Sub_ * invTriArea;
                                    // hyperbolic interpolation for z-coordinate
                                    zDepth = 1.0f / (lambda0 * z0Rec + lambda1 * z1Rec + lambda2 * z2Rec);
                                    bufferIndex = (y * imageWidth_ + x) * antialias_ + ya * sqrAntialias_ + xa;
                                    if (zDepth < zBuffer[bufferIndex])
                                    {
                                        zBuffer[bufferIndex] = zDepth;
                                        imageIndex = bufferIndex * 3;
                                        // shade current pixel
                                        shader.shadePixel(lambda0, lambda1, lambda2,
                                                          zDepth, imageAntiBuffer, imageIndex);
                                    }
                                }
                                // step one subpixel to the right
                                ef.oneSubColRight();
                            }
                            // step down one subpixel
                            ef.oneSubRowDown();
                        }
                        // step one pixel to the right
                        ef.oneColRight();
                    }
                    // step down one pixel
                    ef.oneRowDown();
                }
            }
        }
    }
    frameBuffer_->calculateAntialias();
}

void Renderer::render(const Scene *scene)
{
    switch (currShadingMode_)
    {
    case (Shaders::SHADINGMODE::PHONG):
        renderTemplate<Shaders::PhongShader>(scene);
        break;
    case (Shaders::SHADINGMODE::GOURAUD):
        renderTemplate<Shaders::GouraudShader>(scene);
        break;
    case (Shaders::SHADINGMODE::FLAT):
        renderTemplate<Shaders::FlatShader>(scene);
        break;
    default:
        renderTemplate<Shaders::PhongShader>(scene);
        break;
    }
}
