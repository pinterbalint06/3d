#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include "core/camera.h"
#include "core/mesh.h"
#include "core/terrain.h"
#include "core/distantLight.h"
#include "utils/mathUtils.h"
#include "core/shader.h"
#include "utils/frameBuffer.h"
#include "utils/fixedPoint.h"
#include <cmath>
#include <cstdlib>
#include <cstdint>
#include <algorithm>
#include <stdexcept>

int cameraLocation;
int antialias;
int imageWidth;
int imageHeight;
int bemenetMeret;
int projectedTrianglesMeret;
int clippedMeret;
// camera
Camera mainCamera;
// terrain mesh
distantLight *sun = nullptr;
// kamera magassága a talajtól
float kameraMagassag;
// color of the ground
float rGround, bGround, gGround;
// grass color
// 65 -> (65/255)^2.2=0.04943 albedo
float rGrass = 0.04943;
// 152 -> (152/255)^2.2=0.32038 albedo
float gGrass = 0.32038f;
// 10 -> (10/255)^2.2=0.000804 albedo
float bGrass = 0.000804f;
// dirt color
// 155 -> (155/255)^2.2=0.33445
float rDirt = 0.33445;
// 118 -> (118/255)^2.2=0.1835489
float gDirt = 0.1835489f;
// 83  -> (83/255)^2.2=0.08464
float bDirt = 0.08464f;
enum SHADINGMODE
{
    PHONG = 0,
    GOURAUD = 1,
    FLAT = 2
};
enum SHADINGMODE currShadingMode = SHADINGMODE::PHONG;

float *p0;
float *p1;
float *p2;
float *bemenet;
float *clipped;
float *projectedTriangles;
int *sikok;
// terrain class
Terrain *worldTerrain = nullptr;
// frame buffers
FrameBuffer *FrameBuff = nullptr;

void calcNewLocationCamera(int index)
{
    float *vertices = worldTerrain->getMesh()->getVertices();
    mainCamera.setPosition(vertices[index * 3], vertices[index * 3 + 1] + kameraMagassag, vertices[index * 3 + 2]);
}

void ujHely()
{
    cameraLocation = rand() % (worldTerrain->getMesh()->getVertexCount() / 3);
}

void SutherlandHodgman(float *pont0, float *pont1, float *pont2)
{
    for (int i = 0; i < 4; i++)
    {
        clipped[i] = pont0[i];
        clipped[i + 4] = pont1[i];
        clipped[i + 8] = pont2[i];
    }
    clippedMeret = 12;
    int elozoPontIndex = 8;
    float tavolsag, elozoTavolsag, dTav;
    int k = 0;
    float *temp;
    while (k < 6 && clippedMeret != 0)
    {
        bemenetMeret = clippedMeret;
        temp = bemenet;
        bemenet = clipped;
        clipped = temp;
        clippedMeret = 0;
        for (int i = 0; i < bemenetMeret; i += 4)
        {
            tavolsag = bemenet[i + sikok[k * 3]] + bemenet[i + sikok[k * 3 + 1]] * sikok[k * 3 + 2];
            elozoTavolsag = bemenet[elozoPontIndex + sikok[k * 3]] + bemenet[elozoPontIndex + sikok[k * 3 + 1]] * sikok[k * 3 + 2];
            if (tavolsag >= 0)
            {
                if (elozoTavolsag < 0)
                {
                    dTav = elozoTavolsag / (elozoTavolsag - tavolsag);
                    clipped[clippedMeret++] = MathUtils::interpolation(bemenet[elozoPontIndex], bemenet[i], dTav);
                    clipped[clippedMeret++] = MathUtils::interpolation(bemenet[elozoPontIndex + 1], bemenet[i + 1], dTav);
                    clipped[clippedMeret++] = MathUtils::interpolation(bemenet[elozoPontIndex + 2], bemenet[i + 2], dTav);
                    clipped[clippedMeret++] = MathUtils::interpolation(bemenet[elozoPontIndex + 3], bemenet[i + 3], dTav);
                }
                clipped[clippedMeret++] = bemenet[i];
                clipped[clippedMeret++] = bemenet[i + 1];
                clipped[clippedMeret++] = bemenet[i + 2];
                clipped[clippedMeret++] = bemenet[i + 3];
            }
            else
            {
                if (elozoTavolsag >= 0)
                {
                    dTav = elozoTavolsag / (elozoTavolsag - tavolsag);
                    clipped[clippedMeret++] = MathUtils::interpolation(bemenet[elozoPontIndex], bemenet[i], dTav);
                    clipped[clippedMeret++] = MathUtils::interpolation(bemenet[elozoPontIndex + 1], bemenet[i + 1], dTav);
                    clipped[clippedMeret++] = MathUtils::interpolation(bemenet[elozoPontIndex + 2], bemenet[i + 2], dTav);
                    clipped[clippedMeret++] = MathUtils::interpolation(bemenet[elozoPontIndex + 3], bemenet[i + 3], dTav);
                }
            }
            elozoPontIndex = i;
        }
        k++;
    }
}

void pontokVetitese(const int &i0, const int &i1, const int &i2, float *normal, float *vertices)
{

    const float *MV = mainCamera.getViewMatrix();
    MathUtils::vert3MatrixMult(&vertices[i0 * 3], MV, p0);
    MathUtils::vert3MatrixMult(&vertices[i1 * 3], MV, p1);
    MathUtils::vert3MatrixMult(&vertices[i2 * 3], MV, p2);
    MathUtils::calculateNormal(p0, p1, p2, normal);
    // backface culling
    if (MathUtils::dotProduct3D(p0, normal) < 0.0f)
    {
        const float *MP = mainCamera.getProjMatrix();
        MathUtils::vert3MatrixMult(p0, MP);
        MathUtils::vert3MatrixMult(p1, MP);
        MathUtils::vert3MatrixMult(p2, MP);
        // clip space
        SutherlandHodgman(p0, p1, p2);
        float wRec;
        projectedTrianglesMeret = 0;
        // triangle fan
        for (int i = 0; i < clippedMeret / 4 - 2; i++)
        {
            wRec = 1.0f / clipped[3];
            projectedTriangles[projectedTrianglesMeret++] = (clipped[0] * wRec + 1) * 0.5f * (float)imageWidth;
            projectedTriangles[projectedTrianglesMeret++] = (1 - clipped[1] * wRec) * 0.5f * (float)imageHeight;
            projectedTriangles[projectedTrianglesMeret++] = clipped[2] * wRec;

            // (i + 1) * 4 = i * 4 + 4
            int index = i * 4 + 4;
            wRec = 1.0f / clipped[index + 3];
            projectedTriangles[projectedTrianglesMeret++] = (clipped[index] * wRec + 1) * 0.5 * imageWidth;
            projectedTriangles[projectedTrianglesMeret++] = (1 - clipped[index + 1] * wRec) * 0.5 * imageHeight;
            projectedTriangles[projectedTrianglesMeret++] = clipped[index + 2] * wRec;

            // (i + 2) * 4 = i * 4 + 8
            index = i * 4 + 8;
            wRec = 1.0f / clipped[index + 3];
            projectedTriangles[projectedTrianglesMeret++] = (clipped[index] * wRec + 1) * 0.5 * imageWidth;
            projectedTriangles[projectedTrianglesMeret++] = (1 - clipped[index + 1] * wRec) * 0.5 * imageHeight;
            projectedTriangles[projectedTrianglesMeret++] = clipped[index + 2] * wRec;
        }
        if (projectedTrianglesMeret > 0)
        {
            MathUtils::normalizeVector(normal);
        }
    }
}

inline int64_t edgeFunction(int32_t X, int32_t Y, int32_t dX, int32_t dY, int32_t x, int32_t y)
{
    return ((int64_t)(x - X) * dY - (int64_t)(y - Y) * dX);
}

template <typename StructShader>
int renderTemplate()
{
    if (!(MathUtils::isSquareNumber(antialias) && (1 <= antialias && antialias <= 16)))
    {
        throw "Wrong antialias. Must be square number and between 1 and 16!";
    }
    FrameBuff->clear();
    std::fill(projectedTriangles, projectedTriangles + 100, 0);
    // subpixels width and height
    int sqrAntialias = (int)sqrt(antialias);
    // one subpixel's width and height
    int32_t sqrAntialiasRec = FixedPoint::Float2Fix(1.0f / sqrAntialias);
    // half of one subpixel's width and height
    // >> 1 = / 2
    int32_t inc = sqrAntialiasRec >> 1;
    // bounding box
    float htminx, htmaxx, htminy, htmaxy;
    // used for the edge function
    int32_t dX0, dY0, dX1, dY1, dX2, dY2;
    // edge function results
    int64_t w0, w1, w2;
    // reciprocal of the z values
    float z0Rec, z1Rec, z2Rec;
    // triangle's area
    int64_t triArea;
    // triangle's area's reciprocal
    float invTriArea;
    // used for the z-buffer
    float zDepth;
    // indexes
    int bufferIndex, imageIndex;
    // normal of the current triangle
    float *normal = new float[3];
    float *normalInterpolated = new float[3];
    // light vector
    float lightVec[3];
    float rPix, gPix, bPix;
    const float *lightDir = sun->getDirection();
    lightVec[0] = -lightDir[0];
    lightVec[1] = -lightDir[1];
    lightVec[2] = -lightDir[2];
    // up vector
    float upVec[3];
    upVec[0] = 0.0f;
    upVec[1] = 1.0f;
    upVec[2] = 0.0f;
    mainCamera.updateViewMatrix();
    StructShader shader;
    float *zBuffer = FrameBuff->getZBuffer();
    float *imageAntiBuffer = FrameBuff->getAntialiasImageBuffer();
    Mesh *mesh = worldTerrain->getMesh();
    int32_t *currIndices = mesh->getIndices();
    float *currVertices = mesh->getVertices();
    float *currNormals = mesh->getNormals();
    int indicesCount = mesh->getIndexCount();
    for (int i = 0; i < indicesCount; i += 3)
    {
        pontokVetitese(currIndices[i], currIndices[i + 1], currIndices[i + 2], normal, currVertices);
        for (int j = 0; j < projectedTrianglesMeret; j += 9)
        {
            // Calculate bounding box
            htminx = imageWidth;
            htmaxx = -imageWidth;
            htminy = imageHeight;
            htmaxy = -imageHeight;
            for (int k = 0; k < 9; k += 3)
            {
                if (projectedTriangles[j + k] < htminx)
                {
                    htminx = projectedTriangles[j + k];
                }
                if (projectedTriangles[j + k] > htmaxx)
                {
                    htmaxx = projectedTriangles[j + k];
                }
                if (projectedTriangles[j + k + 1] < htminy)
                {
                    htminy = projectedTriangles[j + k + 1];
                }
                if (projectedTriangles[j + k + 1] > htmaxy)
                {
                    htmaxy = projectedTriangles[j + k + 1];
                }
            }
            int bbminx = std::max(0, std::min(imageWidth - 1, (int)std::floor(htminx)));
            int bbminy = std::max(0, std::min(imageHeight - 1, (int)std::floor(htminy)));
            int bbmaxx = std::max(0, std::min(imageWidth - 1, (int)std::ceil(htmaxx)));
            int bbmaxy = std::max(0, std::min(imageHeight - 1, (int)std::ceil(htmaxy)));

            // Convert triangle vertices to fixed point integer
            int32_t v0x = FixedPoint::Float2Fix(projectedTriangles[j]);
            int32_t v0y = FixedPoint::Float2Fix(projectedTriangles[j + 1]);
            int32_t v0z = FixedPoint::Float2Fix(projectedTriangles[j + 2]);
            int32_t v1x = FixedPoint::Float2Fix(projectedTriangles[j + 3]);
            int32_t v1y = FixedPoint::Float2Fix(projectedTriangles[j + 4]);
            int32_t v1z = FixedPoint::Float2Fix(projectedTriangles[j + 5]);
            int32_t v2x = FixedPoint::Float2Fix(projectedTriangles[j + 6]);
            int32_t v2y = FixedPoint::Float2Fix(projectedTriangles[j + 7]);
            int32_t v2z = FixedPoint::Float2Fix(projectedTriangles[j + 8]);

            // precalculate the reciprocal
            z0Rec = 1.0f / projectedTriangles[j + 2];
            z1Rec = 1.0f / projectedTriangles[j + 5];
            z2Rec = 1.0f / projectedTriangles[j + 8];

            // calculate parameters of edge function
            dX0 = v2x - v1x;
            dY0 = v2y - v1y;

            dX1 = v0x - v2x;
            dY1 = v0y - v2y;

            dX2 = v1x - v0x;
            dY2 = v1y - v0y;

            // first pixel's center
            int32_t startX = FixedPoint::Int2Fix(bbminx) + inc;
            int32_t startY = FixedPoint::Int2Fix(bbminy) + inc;

            // Edge functions
            w0 = edgeFunction(v1x, v1y, dX0, dY0, startX, startY);
            w1 = edgeFunction(v2x, v2y, dX1, dY1, startX, startY);
            w2 = edgeFunction(v0x, v0y, dX2, dY2, startX, startY);

            // gives back area * 2 but w0, w1, w2 is also * 2 so it will cancel out
            triArea = edgeFunction(
                v0x, v0y,
                dX2,
                dY2,
                v2x, v2y);

            // if triangle's are is 0 or smaller it is not a real triangle
            if (triArea > 0)
            {
                // initialize shader for triangle
                shader.setupTriangle(normal, currNormals, currIndices,
                                     i, lightVec, rGround, gGround, bGround, sun,
                                     z0Rec, z1Rec, z2Rec);

                // precalculate inverse of triangle's area
                invTriArea = 1.0f / (float)triArea;

                // E(x+ 1,y) = E(x,y) + dY
                // dY Q21.10 so * FIX_ONE dY becomes Q42.20
                int64_t stepRightOnePixel0 = (int64_t)dY0 * FIX_ONE;
                int64_t stepRightOnePixel1 = (int64_t)dY1 * FIX_ONE;
                int64_t stepRightOnePixel2 = (int64_t)dY2 * FIX_ONE;

                // E(x,y+ 1) = E(x,y) −dX
                // dX Q21.10 so * FIX_ONE dX becomes Q42.20
                int64_t stepDownOnePixel0 = (int64_t)(-dX0) * FIX_ONE;
                int64_t stepDownOnePixel1 = (int64_t)(-dX1) * FIX_ONE;
                int64_t stepDownOnePixel2 = (int64_t)(-dX2) * FIX_ONE;

                // step right by the subpixel's width
                // step one pixel * small pixel width
                // Q42.20 * Q21.10 would be Q32.30 so we have to >> FIX_BITS
                int64_t stepRightOneSubPixel0 = (stepRightOnePixel0 * sqrAntialiasRec) >> FIX_BITS;
                int64_t stepRightOneSubPixel1 = (stepRightOnePixel1 * sqrAntialiasRec) >> FIX_BITS;
                int64_t stepRightOneSubPixel2 = (stepRightOnePixel2 * sqrAntialiasRec) >> FIX_BITS;

                // step down by the subpixel's height
                // step one pixel * small pixel height
                // Q42.20 * Q21.10 would be Q32.30 so we have to >> FIX_BITS
                int64_t stepDownOneSubPixel0 = (stepDownOnePixel0 * sqrAntialiasRec) >> FIX_BITS;
                int64_t stepDownOneSubPixel1 = (stepDownOnePixel1 * sqrAntialiasRec) >> FIX_BITS;
                int64_t stepDownOneSubPixel2 = (stepDownOnePixel2 * sqrAntialiasRec) >> FIX_BITS;

                int64_t w0Row = w0;
                int64_t w1Row = w1;
                int64_t w2Row = w2;
                for (int y = bbminy; y <= bbmaxy; y++)
                {
                    int64_t w0Col = w0Row;
                    int64_t w1Col = w1Row;
                    int64_t w2Col = w2Row;

                    for (int x = bbminx; x <= bbmaxx; x++)
                    {
                        int64_t w0SubRow = w0Col;
                        int64_t w1SubRow = w1Col;
                        int64_t w2SubRow = w2Col;

                        for (int ya = 0; ya < sqrAntialias; ya++)
                        {
                            int64_t w0Sub = w0SubRow;
                            int64_t w1Sub = w1SubRow;
                            int64_t w2Sub = w2SubRow;
                            for (int xa = 0; xa < sqrAntialias; xa++)
                            {
                                // the sign bit is one if the number is negative
                                // if all three number is positive all of their sign bit is zero so in an OR operator the result's sign bit is also 0 and positive
                                // if any of  the number is negative (their sign bit is 1) then the result's sign bit will also be 1 and will be negative
                                if ((w0Sub | w1Sub | w2Sub) >= 0)
                                {
                                    // barycentric coordinates
                                    float lambda0 = (float)w0Sub * invTriArea;
                                    float lambda1 = (float)w1Sub * invTriArea;
                                    float lambda2 = (float)w2Sub * invTriArea;
                                    // hyperbolic interpolation for z-coordinate
                                    zDepth = 1.0f / (lambda0 * z0Rec + lambda1 * z1Rec + lambda2 * z2Rec);
                                    bufferIndex = (y * imageWidth + x) * antialias + ya * sqrAntialias + xa;
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
                                w0Sub += stepRightOneSubPixel0;
                                w1Sub += stepRightOneSubPixel1;
                                w2Sub += stepRightOneSubPixel2;
                            }
                            // step down one subpixel
                            w0SubRow += stepDownOneSubPixel0;
                            w1SubRow += stepDownOneSubPixel1;
                            w2SubRow += stepDownOneSubPixel2;
                        }
                        // step one pixel to the right
                        w0Col += stepRightOnePixel0;
                        w1Col += stepRightOnePixel1;
                        w2Col += stepRightOnePixel2;
                    }
                    // step down one pixel
                    w0Row += stepDownOnePixel0;
                    w1Row += stepDownOnePixel1;
                    w2Row += stepDownOnePixel2;
                }
            }
        }
    }
    delete[] normal;
    delete[] normalInterpolated;
    FrameBuff->calculateAntialias();
    return (int)FrameBuff->getImageBuffer();
}

int render()
{
    calcNewLocationCamera(cameraLocation);
    switch (currShadingMode)
    {
    case (SHADINGMODE::PHONG):
        return renderTemplate<Shaders::PhongShader>();
        break;
    case (SHADINGMODE::GOURAUD):
        return renderTemplate<Shaders::GouraudShader>();
        break;
    case (SHADINGMODE::FLAT):
        return renderTemplate<Shaders::FlatShader>();
        break;
    default:
        return renderTemplate<Shaders::PhongShader>();
        break;
    }
}

int imageBufferSize()
{
    return imageHeight * imageWidth * 4;
}

void setFrustum(float focal, float filmW, float filmH, int imageW, int imageH, float n, float f)
{
    imageWidth = imageW;
    imageHeight = imageH;
    FrameBuff = new FrameBuffer(imageWidth, imageHeight, antialias);
    mainCamera.setPerspective(focal, filmW, filmH, imageW, imageH, n, f);
}

void meretBeallit(int meretKert)
{
    worldTerrain = new Terrain(meretKert);
}

void setAntialias(int anti)
{
    antialias = anti;
    FrameBuff->setAntialias(antialias);
}

EM_JS(void, renderJs, (int elsimitas), {
    render("canvas", elsimitas);
});

void newPerlinMap(int seed, float frequency, float lacunarity, float persistence, int octaves, float heightMultiplier)
{
    worldTerrain->setFrequency(frequency);
    worldTerrain->setSeed(seed);
    worldTerrain->setLacunarity(lacunarity);
    worldTerrain->setPersistence(persistence);
    worldTerrain->setOctaves(octaves);
    worldTerrain->setHeightMultiplier(heightMultiplier);
    worldTerrain->regenerate();
    renderJs(antialias);
}

void newLightIntensity(float intensity)
{
    sun->setIntensity(intensity);
    renderJs(antialias);
}

void newCameraHeight(float height)
{
    kameraMagassag = height;
    renderJs(antialias);
}

void newLightDirection(float x, float y)
{
    sun->setDirection(x, y, 0.0f);
    renderJs(antialias);
}

void newGroundType(int type)
{

    // grass color
    // 65 -> (65/255)^2.2=0.04943 albedo
    // 152 -> (152/255)^2.2=0.32038 albedo
    // 10 -> (10/255)^2.2=0.000804 albedo

    // dirt color
    // 155 -> (155/255)^2.2=0.33445
    // 118 -> (118/255)^2.2=0.1835489
    // 83  -> (83/255)^2.2=0.08464

    switch (type)
    {
    case 0:
        rGround = 0.04943f;
        gGround = 0.32038f;
        bGround = 0.000804f;
        break;
    case 1:
        rGround = 0.33445f;
        gGround = 0.1835489f;
        bGround = 0.08464f;
        break;
    default:
        rGround = 0.04943f;
        gGround = 0.32038f;
        bGround = 0.000804f;
        break;
    }
    renderJs(antialias);
}

void setShadingTechnique(int shading)
{
    currShadingMode = static_cast<SHADINGMODE>(shading);
    renderJs(antialias);
}

void move(int z, int x)
{
    int size = worldTerrain->getSize();
    int newLocation = cameraLocation + z * size + x;
    if (!((x == -1 && newLocation % size == 255) || (x == 1 && newLocation % size == 0) || (newLocation < 0) || (newLocation >= size * size)))
    {
        cameraLocation += z * size + x;
        renderJs(antialias);
    }
}

void xyForog(float dPitch, float dYaw)
{
    mainCamera.rotate(dPitch, dYaw);
}

void setRotate(float pitch, float yaw)
{
    mainCamera.setRotation(pitch, yaw);
}

float getXForog()
{
    return mainCamera.getPitch();
}

float getYForog()
{
    return mainCamera.getYaw();
}

void init()
{
    p0 = (float *)calloc(4, sizeof(float));
    p1 = (float *)calloc(4, sizeof(float));
    p2 = (float *)calloc(4, sizeof(float));
    clipped = (float *)calloc(36, sizeof(float));
    bemenet = (float *)calloc(36, sizeof(float));
    sikok = (int *)calloc(18, sizeof(int));
    sikok[0] = 3;
    // sikok[1] = 0;
    sikok[2] = -1;
    // w + x * (-1) = w - x
    // right clipping plane

    sikok[3] = 3;
    // sikok[4] = 0;
    sikok[5] = 1;
    // w + x * (1) = w + x
    // left clipping plane

    sikok[6] = 3;
    sikok[7] = 1;
    sikok[8] = -1;
    // w + y * (-1) = w - y
    // top clipping plane

    sikok[9] = 3;
    sikok[10] = 1;
    sikok[11] = 1;
    // w + y * (1) = w + y
    // bottom clipping plane

    sikok[12] = 3;
    sikok[13] = 2;
    sikok[14] = -1;
    // w + z * (-1) = w - z
    // far clipping plane
    sikok[15] = 2;
    // sikok[16] = 0;
    // sikok[17] = 0;
    // z + x * (0) = z
    // near clipping plane
    cameraLocation = 0;
    antialias = 1;
    kameraMagassag = 3.8;
    // sun color
    // red: 255.0 normalize -> 255.0f/255.0 = 1.0
    // green: 223.0 normalize -> 223.0f/255.0 = 0.8745
    // blue: 34.0 normalize -> 34.0f/255.0 = 0.13333
    sun = new distantLight(1.0f, 0.8745f, 0.13333f, 1800.0f, 0, -1, 0);
    projectedTriangles = (float *)calloc(100, sizeof(float));
    rGround = 0.04943f;
    gGround = 0.28017f;
    bGround = 0.00053332f;
}

EMSCRIPTEN_BINDINGS(my_module)
{
    emscripten::function("init", &init);
    emscripten::function("render", &render);
    emscripten::function("imageBufferSize", &imageBufferSize);
    emscripten::function("ujHely", &ujHely);
    emscripten::function("meretBeallit", &meretBeallit);
    emscripten::function("setFrustum", &setFrustum);
    emscripten::function("xyForog", &xyForog);
    emscripten::function("setRotate", &setRotate);
    emscripten::function("getXForog", &getXForog);
    emscripten::function("getYForog", &getYForog);
    emscripten::function("setAntialias", &setAntialias);
    emscripten::function("newCameraHeight", &newCameraHeight);
    emscripten::function("newPerlinMap", &newPerlinMap);
    emscripten::function("newLightIntensity", &newLightIntensity);
    emscripten::function("newLightDirection", &newLightDirection);
    emscripten::function("mozgas", &move);
    emscripten::function("newGroundType", &newGroundType);
    emscripten::function("setShadingTechnique", &setShadingTechnique);
}