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
#include <cstring>

Renderer::Renderer()
{
    imageWidth_ = 0;
    imageHeight_ = 0;
    antialias_ = 1;
    sqrAntialias_ = (int)sqrt(antialias_);
    sqrAntialiasRec_ = FixedPoint::Float2Fix(1.0f / sqrAntialias_);
    inc_ = sqrAntialiasRec_ >> 1;
    projectedTriangles_ = (float *)malloc(100 * sizeof(float));
    projectedTrianglesSize_ = 0;
    currShadingMode_ = Shaders::SHADINGMODE::PHONG;
    p0_ = (float *)malloc(3 * sizeof(float));
    p1_ = (float *)malloc(3 * sizeof(float));
    p2_ = (float *)malloc(3 * sizeof(float));
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
    if (p0_)
    {
        free(p0_);
    }
    if (p1_)
    {
        free(p1_);
    }
    if (p2_)
    {
        free(p2_);
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

void Renderer::projectAndClipTriangle(const int &i0, const int &i1, const int &i2, float *normal, float *vertices, Camera *mainCamera)
{
    const float *MV = mainCamera->getViewMatrix();
    MathUtils::vert3MatrixMult(&vertices[i0 * 3], MV, p0_);
    MathUtils::vert3MatrixMult(&vertices[i1 * 3], MV, p1_);
    MathUtils::vert3MatrixMult(&vertices[i2 * 3], MV, p2_);
    MathUtils::calculateNormal(p0_, p1_, p2_, normal);
    const float *MP = mainCamera->getProjMatrix();
    MathUtils::vert3MatrixMult(p0_, MP);
    MathUtils::vert3MatrixMult(p1_, MP);
    MathUtils::vert3MatrixMult(p2_, MP);
    // clip space
    clipper_->clip(p0_, p1_, p2_);
    float *clipped = clipper_->getClipped();
    int clippedSize = clipper_->getClippedSize();
    float wRec;
    projectedTrianglesSize_ = 0;
    // triangle fan
    for (int i = 0; i < clippedSize / 4 - 2; i++)
    {
        wRec = 1.0f / clipped[3];
        projectedTriangles_[projectedTrianglesSize_++] = (clipped[0] * wRec + 1) * 0.5f * (float)imageWidth_;
        projectedTriangles_[projectedTrianglesSize_++] = (1 - clipped[1] * wRec) * 0.5f * (float)imageHeight_;
        projectedTriangles_[projectedTrianglesSize_++] = clipped[2] * wRec;

        // (i + 1) * 4 = i * 4 + 4
        int index = i * 4 + 4;
        wRec = 1.0f / clipped[index + 3];
        projectedTriangles_[projectedTrianglesSize_++] = (clipped[index] * wRec + 1) * 0.5 * imageWidth_;
        projectedTriangles_[projectedTrianglesSize_++] = (1 - clipped[index + 1] * wRec) * 0.5 * imageHeight_;
        projectedTriangles_[projectedTrianglesSize_++] = clipped[index + 2] * wRec;

        // (i + 2) * 4 = i * 4 + 8
        index = i * 4 + 8;
        wRec = 1.0f / clipped[index + 3];
        projectedTriangles_[projectedTrianglesSize_++] = (clipped[index] * wRec + 1) * 0.5 * imageWidth_;
        projectedTriangles_[projectedTrianglesSize_++] = (1 - clipped[index + 1] * wRec) * 0.5 * imageHeight_;
        projectedTriangles_[projectedTrianglesSize_++] = clipped[index + 2] * wRec;
    }
    if (projectedTrianglesSize_ > 0)
    {
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
    // light vector
    Camera *mainCamera = scene->getCamera();
    // light
    distantLight *sun = scene->getLight();
    float lightVec[3];
    float rPix, gPix, bPix;
    const float *lightDir = sun->getDirection();
    lightVec[0] = -lightDir[0];
    lightVec[1] = -lightDir[1];
    lightVec[2] = -lightDir[2];
    mainCamera->updateViewMatrix();
    StructShader shader;
    float *zBuffer = frameBuffer_->getZBuffer();
    float *imageAntiBuffer = frameBuffer_->getAntialiasImageBuffer();
    Mesh *mesh = scene->getTerrain()->getMesh();
    Materials::Color meshCol = mesh->getMaterial().albedo_;
    float rGround = meshCol.r_;
    float gGround = meshCol.g_;
    float bGround = meshCol.b_;
    int32_t *currIndices = mesh->getIndices();
    float *currVertices = mesh->getVertices();
    float *currNormals = mesh->getNormals();
    int indicesCount = mesh->getIndexCount();
    for (int i = 0; i < indicesCount; i += 3)
    {
        projectAndClipTriangle(currIndices[i], currIndices[i + 1], currIndices[i + 2], normal_, currVertices, mainCamera);
        for (int j = 0; j < projectedTrianglesSize_; j += 9)
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
                for (int k = 0; k < 9; k += 3)
                {
                    if (projectedTriangles_[j + k] < htminx)
                    {
                        htminx = projectedTriangles_[j + k];
                    }
                    if (projectedTriangles_[j + k] > htmaxx)
                    {
                        htmaxx = projectedTriangles_[j + k];
                    }
                    if (projectedTriangles_[j + k + 1] < htminy)
                    {
                        htminy = projectedTriangles_[j + k + 1];
                    }
                    if (projectedTriangles_[j + k + 1] > htmaxy)
                    {
                        htmaxy = projectedTriangles_[j + k + 1];
                    }
                }
                int bbminx = std::max(0, std::min(imageWidth_ - 1, (int)std::floor(htminx)));
                int bbminy = std::max(0, std::min(imageHeight_ - 1, (int)std::floor(htminy)));
                int bbmaxx = std::max(0, std::min(imageWidth_ - 1, (int)std::ceil(htmaxx)));
                int bbmaxy = std::max(0, std::min(imageHeight_ - 1, (int)std::ceil(htmaxy)));

                // precalculate the reciprocal
                z0Rec = 1.0f / projectedTriangles_[j + 2];
                z1Rec = 1.0f / projectedTriangles_[j + 5];
                z2Rec = 1.0f / projectedTriangles_[j + 8];

                // initialize shader for triangle
                shader.setupTriangle(normal_, currNormals, currIndices,
                                     i, lightVec, rGround, gGround, bGround, sun,
                                     z0Rec, z1Rec, z2Rec);

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
