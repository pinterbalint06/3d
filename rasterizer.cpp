#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include "perlin.h"
#include <cmath>
#include <cstdlib>
#include <cstdint>
#include <algorithm>
#include <stdexcept>
#define INV_PI 0.318309886f
#define FIX_BITS 10
#define FIX_ONE (1 << FIX_BITS)
#define FIX64 (1 << (FIX_BITS * 2))

int t, b, r, l;
int meret;
int cameraLocation;
int antialias;
int imageWidth;
int imageHeight;
int zBufferMeret;
int perlinMeret = 0;
int indexekMeret = 0;
int pontokMeret = 0;
int bemenetMeret;
int projectedTrianglesMeret;
int clippedMeret;
int imageAntiBufferLength;
int imageBufferLength;
float yforgas;
float xforgas;
// perlin noise height multiplier
float heightMultiplier;
// kamera magassága a talajtól
float kameraMagassag;
// light intensity
float lightIntensity;
// pre calculated light used to multiply the object albedo * light color. INV_PI * lightIntensity
float lightCoefficient;
// color of the ground
float rGround, bGround, gGround;

// Perspective Projection Matrix
float *P;
// Camera Matrix
float *MCamera;
float *pontok = NULL;
int32_t *indexek = NULL;
float *perlin = NULL;
float *zBuffer;
float *p0;
float *p1;
float *p2;
float *bemenet;
float *clipped;
float *projectedTriangles;
int *sikok;
float *imageAntiBuffer;
uint8_t *imageBuffer;
float *lightDir;

int32_t Float2Fix(float num)
{
    return (int32_t)((num)*FIX_ONE);
}

int32_t Int2Fix(int num)
{
    return (int32_t)((num)*FIX_ONE);
}

void matrixSzorzas4x4(float *m1, float *m2, float *eredmeny)
{
    for (int i = 0; i < 4; i++)
    {
        for (int j = 0; j < 4; j++)
        {
            eredmeny[i * 4 + j] = m1[i * 4] * m2[j] + m1[i * 4 + 1] * m2[4 + j] + m1[i * 4 + 2] * m2[8 + j] + m1[i * 4 + 3] * m2[12 + j];
        }
    }
}

void calcNewLocationCamera(int index)
{
    MCamera[12] = -pontok[index * 3];
    MCamera[13] = -pontok[index * 3 + 1] - kameraMagassag;
    MCamera[14] = -pontok[index * 3 + 2];
}

void ujHely()
{
    cameraLocation = rand() % (pontokMeret / 3);
    calcNewLocationCamera(cameraLocation);
}

float linearis_interpolacio(float a1, float a2, float d)
{
    return a1 + (a2 - a1) * d;
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
                    clipped[clippedMeret++] = linearis_interpolacio(bemenet[elozoPontIndex], bemenet[i], dTav);
                    clipped[clippedMeret++] = linearis_interpolacio(bemenet[elozoPontIndex + 1], bemenet[i + 1], dTav);
                    clipped[clippedMeret++] = linearis_interpolacio(bemenet[elozoPontIndex + 2], bemenet[i + 2], dTav);
                    clipped[clippedMeret++] = linearis_interpolacio(bemenet[elozoPontIndex + 3], bemenet[i + 3], dTav);
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
                    clipped[clippedMeret++] = linearis_interpolacio(bemenet[elozoPontIndex], bemenet[i], dTav);
                    clipped[clippedMeret++] = linearis_interpolacio(bemenet[elozoPontIndex + 1], bemenet[i + 1], dTav);
                    clipped[clippedMeret++] = linearis_interpolacio(bemenet[elozoPontIndex + 2], bemenet[i + 2], dTav);
                    clipped[clippedMeret++] = linearis_interpolacio(bemenet[elozoPontIndex + 3], bemenet[i + 3], dTav);
                }
            }
            elozoPontIndex = i;
        }
        k++;
    }
}

void pontCameraMatrixMultiplication(const int &ind, float *pont)
{
    for (int i = 0; i < 4; i++)
    {
        pont[i] = pontok[ind * 3] * MCamera[i] + pontok[ind * 3 + 1] * MCamera[4 + i] + pontok[ind * 3 + 2] * MCamera[8 + i] + MCamera[12 + i];
    }
}

void pontPerspectiveMultiplication(float *pont)
{
    float tempPont[4];
    for (int i = 0; i < 4; i++)
    {
        tempPont[i] = pont[0] * P[i] + pont[1] * P[4 + i] + pont[2] * P[8 + i] + P[12 + i];
    }
    for (int i = 0; i < 4; i++)
    {
        pont[i] = tempPont[i];
    }
}
void vectorMatrixMultiplication(float *vec, float *matrix)
{
    float tempVec[3];
    for (int i = 0; i < 3; i++)
    {
        tempVec[i] = vec[0] * matrix[i] + vec[1] * matrix[4 + i] + vec[2] * matrix[8 + i];
    }
    for (int i = 0; i < 3; i++)
    {
        vec[i] = tempVec[i];
    }
}

void normalizeVector(float *vector)
{
    float vectorLengthInv = 1 / std::sqrt(vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2]);
    vector[0] *= vectorLengthInv;
    vector[1] *= vectorLengthInv;
    vector[2] *= vectorLengthInv;
}

void calculateNormal(float *p0, float *p1, float *p2, float *normalVector)
{
    float vec1[3];
    float vec2[3];

    vec1[0] = p1[0] - p0[0];
    vec1[1] = p1[1] - p0[1];
    vec1[2] = p1[2] - p0[2];

    vec2[0] = p2[0] - p0[0];
    vec2[1] = p2[1] - p0[1];
    vec2[2] = p2[2] - p0[2];
    normalVector[0] = vec1[1] * vec2[2] - vec1[2] * vec2[1];
    normalVector[1] = vec1[2] * vec2[0] - vec1[0] * vec2[2];
    normalVector[2] = vec1[0] * vec2[1] - vec1[1] * vec2[0];
}

float dotProduct3D(float *vec0, float *vec1)
{
    return vec0[0] * vec1[0] + vec0[1] * vec1[1] + vec0[2] * vec1[2];
}

void pontokVetitese(const int &i0, const int &i1, const int &i2, float *normal)
{
    pontCameraMatrixMultiplication(i0, p0);
    pontCameraMatrixMultiplication(i1, p1);
    pontCameraMatrixMultiplication(i2, p2);
    calculateNormal(p0, p1, p2, normal);
    // backface culling
    if (dotProduct3D(p0, normal) < 0.0f)
    {
        pontPerspectiveMultiplication(p0);
        pontPerspectiveMultiplication(p1);
        pontPerspectiveMultiplication(p2);
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
            normalizeVector(normal);
        }
    }
}

int64_t edgeFunction(int32_t X, int32_t Y, int32_t dX, int32_t dY, int32_t x, int32_t y)
{
    return ((int64_t)(x - X) * dY - (int64_t)(y - Y) * dX);
}

void calcCameraMatrix()
{
    /*
    Y forgás mátrix:
        [cos, 0,  -sin, 0]
        [0,   1,  0,    0]
        [sin, 0,  cos,  0]
        [0,   0,  0,    1]
    */
    float *yForgasMatrix = (float *)calloc(16, sizeof(float));
    float sine = sinf(yforgas);
    float cosine = cosf(yforgas);
    yForgasMatrix[0] = cosine;
    yForgasMatrix[2] = -sine;
    yForgasMatrix[5] = 1;
    yForgasMatrix[8] = sine;
    yForgasMatrix[10] = cosine;
    yForgasMatrix[15] = 1;
    /*
    X forgás mátrix:
        [1, 0,    0,   0]
        [0, cos,  sin, 0]
        [0, -sin, cos, 0]
        [0, 0,    0,   1]
    */
    float *xForgasMatrix = (float *)calloc(16, sizeof(float));
    sine = sinf(xforgas);
    cosine = cosf(xforgas);
    xForgasMatrix[0] = 1;
    xForgasMatrix[5] = cosine;
    xForgasMatrix[6] = sine;
    xForgasMatrix[9] = -sine;
    xForgasMatrix[10] = cosine;
    xForgasMatrix[15] = 1;
    float *forgasMatrix = (float *)calloc(16, sizeof(float));
    // Z Y X sorrendben
    matrixSzorzas4x4(yForgasMatrix, xForgasMatrix, forgasMatrix);
    free(yForgasMatrix);
    free(xForgasMatrix);

    float *temp = (float *)calloc(16, sizeof(float));
    // egységmátrix
    temp[0] = 1;
    temp[5] = 1;
    temp[10] = 1;
    temp[15] = 1;

    // kamera helye
    temp[12] = -pontok[cameraLocation * 3];
    temp[13] = -pontok[cameraLocation * 3 + 1] - kameraMagassag;
    temp[14] = -pontok[cameraLocation * 3 + 2];
    matrixSzorzas4x4(temp, forgasMatrix, MCamera);
    free(forgasMatrix);
    free(temp);
}

bool isSquareNumber(int n)
{
    return n >= 0 && std::sqrt(n) == (int)std::sqrt(n);
}

int render()
{
    if (!(isSquareNumber(antialias) && (1 <= antialias && antialias <= 16)))
    {
        throw "Wrong antialias. Must be square number and between 1 and 16!";
    }
    std::fill(zBuffer, zBuffer + zBufferMeret, 1.0f);
    std::fill(imageAntiBuffer, imageAntiBuffer + imageAntiBufferLength, 0.0f);
    std::fill(imageBuffer, imageBuffer + imageBufferLength, 0);
    std::fill(projectedTriangles, projectedTriangles + 100, 0);
    // subpixels width and height
    int sqrAntialias = (int)sqrt(antialias);
    // one subpixel's width and height
    int32_t sqrAntialiasRec = Float2Fix(1.0f / sqrAntialias);
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
    float *normal = (float *)malloc(3 * sizeof(float));
    // light vector
    float *lightVec = (float *)malloc(3 * sizeof(float));
    lightVec[0] = -lightDir[0];
    lightVec[1] = -lightDir[1];
    lightVec[2] = -lightDir[2];
    calcCameraMatrix();
    vectorMatrixMultiplication(lightVec, MCamera);
    for (int i = 0; i < indexekMeret; i += 3)
    {
        pontokVetitese(indexek[i], indexek[i + 1], indexek[i + 2], normal);
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
            int32_t v0x = Float2Fix(projectedTriangles[j]);
            int32_t v0y = Float2Fix(projectedTriangles[j + 1]);
            int32_t v0z = Float2Fix(projectedTriangles[j + 2]);
            int32_t v1x = Float2Fix(projectedTriangles[j + 3]);
            int32_t v1y = Float2Fix(projectedTriangles[j + 4]);
            int32_t v1z = Float2Fix(projectedTriangles[j + 5]);
            int32_t v2x = Float2Fix(projectedTriangles[j + 6]);
            int32_t v2y = Float2Fix(projectedTriangles[j + 7]);
            int32_t v2z = Float2Fix(projectedTriangles[j + 8]);

            // precalculate the reciprocal
            z0Rec = 1.0f / projectedTriangles[j + 2];
            z1Rec = 1.0f / projectedTriangles[j + 5];
            z2Rec = 1.0f / projectedTriangles[j + 8];

            // precalculate the lighting
            float dotProd = std::max(0.0f, dotProduct3D(normal, lightVec));
            float lightCoefficentTriangle = lightCoefficient * dotProd;
            float r = rGround * lightCoefficentTriangle;
            float g = gGround * lightCoefficentTriangle;
            float b = bGround * lightCoefficentTriangle;

            // calculate parameters of edge function
            dX0 = v2x - v1x;
            dY0 = v2y - v1y;

            dX1 = v0x - v2x;
            dY1 = v0y - v2y;

            dX2 = v1x - v0x;
            dY2 = v1y - v0y;

            // first pixel's center
            int32_t startX = Int2Fix(bbminx) + inc;
            int32_t startY = Int2Fix(bbminy) + inc;

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

                                        imageAntiBuffer[imageIndex] = r;
                                        imageAntiBuffer[imageIndex + 1] = g;
                                        imageAntiBuffer[imageIndex + 2] = b;
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
    free(lightVec);
    free(normal);
    float r, g, b;
    int altalanosIndex, imageAntiIndex, subImageIndex, imageBufferIndex;
    float antiRec = 1.0f / antialias;
    for (int y = 0; y < imageHeight; y++)
    {
        for (int x = 0; x < imageWidth; x++)
        {
            altalanosIndex = (y * imageWidth + x);
            imageAntiIndex = altalanosIndex * antialias;
            imageBufferIndex = altalanosIndex * 4;
            r = 0.0f;
            g = 0.0f;
            b = 0.0f;
            for (int k = 0; k < antialias; k++)
            {
                subImageIndex = (imageAntiIndex + k) * 3;
                r += imageAntiBuffer[subImageIndex];
                g += imageAntiBuffer[subImageIndex + 1];
                b += imageAntiBuffer[subImageIndex + 2];
            }
            imageBuffer[imageBufferIndex] = static_cast<uint8_t>(
                std::round(
                    std::clamp(r * antiRec, 0.0f, 255.0f)));
            imageBuffer[imageBufferIndex + 1] = static_cast<uint8_t>(
                std::round(
                    std::clamp(g * antiRec, 0.0f, 255.0f)));
            imageBuffer[imageBufferIndex + 2] = static_cast<uint8_t>(
                std::round(
                    std::clamp(b * antiRec, 0.0f, 255.0f)));
            imageBuffer[imageBufferIndex + 3] = 255;
        }
    }
    return (int)imageBuffer;
}

int imageBufferSize()
{
    return imageBufferLength;
}

void setFrustum(float focal, float filmW, float filmH, int imageW, int imageH, float n, float f)
{
    float xKitoltes = 1.0f;
    float yKitoltes = 1.0f;
    imageWidth = imageW;
    imageHeight = imageH;
    if (imageBuffer)
    {
        free(imageBuffer);
    }
    imageBufferLength = imageWidth * imageHeight * 4;
    imageBuffer = (uint8_t *)malloc(imageBufferLength * sizeof(uint8_t *));

    if (imageAntiBuffer)
    {
        free(imageAntiBuffer);
    }
    imageAntiBufferLength = imageWidth * imageHeight * antialias * 3;
    imageAntiBuffer = (float *)malloc(imageAntiBufferLength * sizeof(float));
    if (zBuffer)
    {
        free(zBuffer);
    }
    zBufferMeret = imageWidth * imageHeight * antialias;
    zBuffer = (float *)malloc(zBufferMeret * sizeof(float));
    // Ha a film képaránya más mint a kép képaránya
    if (filmW / filmH > imageW / imageH)
    {
        xKitoltes = (imageW / imageH) / (filmW / filmH);
    }
    else
    {
        yKitoltes = (filmW / filmH) / (imageW / imageH);
    }
    t = ((filmH / 2.0f) / focal * n) * yKitoltes;
    r = t * (filmW / filmH) * xKitoltes;
    b = -t;
    l = -r;
    P[0] = 2.0f * n / (r - l);
    P[5] = 2.0f * n / (t - b);
    P[8] = (r + l) / (r - l);
    P[9] = (t + b) / (t - b);
    P[10] = f / (n - f);
    P[11] = -1.0f;
    P[14] = n * f / (n - f);
}

void meretBeallit(int meretKert)
{
    meret = meretKert;
}

int allocatePontok(int szamokSzama)
{
    // ha létezik felszabadítjuk
    if (pontok)
    {
        free(pontok);
    }

    // Memória lefoglalása a listának
    pontok = (float *)malloc(szamokSzama * sizeof(float));
    if (pontok)
    {
        pontokMeret = szamokSzama;
        return (int)pontok;
    }
    return 0;
}

void setAntialias(int anti)
{
    antialias = anti;
    if (imageAntiBuffer)
    {
        free(imageAntiBuffer);
    }
    imageAntiBufferLength = imageWidth * imageHeight * antialias * 3;
    imageAntiBuffer = (float *)malloc(imageAntiBufferLength * sizeof(float));
    if (zBuffer)
    {
        free(zBuffer);
    }
    zBufferMeret = imageWidth * imageHeight * antialias;
    zBuffer = (float *)malloc(zBufferMeret * sizeof(float));
}

int allocateIndexek(int indexekSzam)
{
    // ha létezik felszabadítjuk
    if (indexek)
    {
        free(indexek);
    }

    // Memória lefoglalása a listának
    indexek = (int32_t *)malloc(indexekSzam * sizeof(int32_t));
    if (indexek)
    {
        indexekMeret = 0;
        return (int)indexek;
    }
    return 0;
}

int allocatePerlin(int perlinek)
{
    // ha létezik felszabadítjuk
    if (perlin)
    {
        free(perlin);
    }

    // Memória lefoglalása a listának
    perlin = (float *)calloc(perlinek, sizeof(float));
    if (perlin)
    {
        perlinMeret = perlinek;
        return (int)perlin;
    }
    return 0;
}

void pontokKiszamolasa()
{
    int i;
    for (int y = 0; y < meret; y++)
    {
        for (int x = 0; x < meret; x++)
        {
            i = (y * meret + x);
            pontok[i * 3] = x;
            pontok[i * 3 + 1] = perlin[i] * heightMultiplier;
            pontok[i * 3 + 2] = -y;
        }
    }
}

void osszekotesekKiszamolasa()
{
    int i;
    for (int y = 0; y < meret - 1; y++)
    {
        for (int x = 0; x < meret - 1; x++)
        {
            i = y * meret + x;
            // A három indexnek a pontjait (pontok[index] pontot ad meg) összekötjük háromszögekre
            // A négyzet
            indexek[indexekMeret++] = i + 1;     // jobb felső pontja
            indexek[indexekMeret++] = i + meret; // bal alsó pontja
            indexek[indexekMeret++] = i;         // bal felső pontja

            indexek[indexekMeret++] = i + 1;         // jobb felső pontja
            indexek[indexekMeret++] = i + meret + 1; // jobb alsó pontja
            indexek[indexekMeret++] = i + meret;     // bal alsó pontja
            // a négyzetet felosztottuk két háromszögre
        }
    }
}

EM_JS(void, renderJs, (int elsimitas), {
    render("canvas", elsimitas);
});

void newMap(int seed, float lacunarity, float persistence, int octaves)
{
    allocatePerlin(meret * meret);
    generatePerlinNoise(perlin, 1, meret, seed, 2, octaves, lacunarity, persistence);
    allocatePontok(meret * meret * 3);
    pontokKiszamolasa();
    allocateIndexek((meret - 1) * (meret - 1) * 6);
    osszekotesekKiszamolasa();
    ujHely();
    renderJs(antialias);
}

void newPerlinSameMap(int seed, float lacunarity, float persistence, int octaves)
{
    allocatePerlin(meret * meret);
    generatePerlinNoise(perlin, 1, meret, seed, 2, octaves, lacunarity, persistence);
    allocatePontok(meret * meret * 3);
    pontokKiszamolasa();
    allocateIndexek((meret - 1) * (meret - 1) * 6);
    osszekotesekKiszamolasa();
    renderJs(antialias);
}

void newHeightMult(float mult)
{
    heightMultiplier = mult;
    allocatePontok(meret * meret * 3);
    pontokKiszamolasa();
    allocateIndexek((meret - 1) * (meret - 1) * 6);
    osszekotesekKiszamolasa();
    calcNewLocationCamera(cameraLocation);
    renderJs(antialias);
}

void newLightIntensity(float intensity)
{
    lightIntensity = intensity;
    lightCoefficient = INV_PI * lightIntensity;
    renderJs(antialias);
}

void newCameraHeight(float height)
{
    kameraMagassag = height;
    calcNewLocationCamera(cameraLocation);
    renderJs(antialias);
}

void newLightDirection(float x, float y)
{
    lightDir[0] = x;
    lightDir[1] = y;
    renderJs(antialias);
}

void newGroundType(int type)
{

    // grass color
    // 65 -> (65/255)^2.2=0.04943 albedo
    // 152 -> (152/255)^2.2=0.32038 albedo
    // 10 -> (10/255)^2.2=0.000804 albedo
    // sun color
    // 255.0 normalize -> 255.0f/255.0 = 1.0
    // 223.0 normalize -> 223.0f/255.0 = 0.8745
    // 34.0 normalize -> 34.0f/255.0 = 0.13333
    // final product
    // 0.04943 * 1.0 = 0.04943
    // 0.32038 * 0.8745 = 0.28017
    // 0.000804 * 0.13333 = 0.00053332

    // dirt color
    // 155 -> (155/255)^2.2=0.33445
    // 118 -> (118/255)^2.2=0.1835489
    // 83  -> (83/255)^2.2=0.08464
    // precalculated with sun color
    // final product
    // 0.33445 * 1.0 = 0.33445
    // 0.1835489 * 0.8745 = 0.160513
    // 0.08464 * 0.13333 = 0.011285

    switch (type)
    {
    case 0:
        rGround = 0.04943f;
        gGround = 0.28017f;
        bGround = 0.00053332f;
        break;
    case 1:
        rGround = 0.33445f;
        gGround = 0.160513f;
        bGround = 0.011285f;
        break;
    default:
        rGround = 0.04943f;
        gGround = 0.28017f;
        bGround = 0.00053332f;
        break;
    }
    renderJs(antialias);
}

void move(int z, int x)
{
    int newLocation = cameraLocation + z * meret + x;
    if (!((x == -1 && newLocation % meret == 255) || (x == 1 && newLocation % meret == 0) || (newLocation < 0) || (newLocation >= meret * meret)))
    {
        cameraLocation += z * meret + x;
        renderJs(antialias);
    }
}

int allocate4x4Matrix()
{
    float *matrix = (float *)calloc(16, sizeof(float));
    if (matrix)
    {
        return (int)matrix;
    }
    return 0;
}

void yForog(float rad)
{
    yforgas += rad;
}

void xForog(float rad)
{
    xforgas += rad;
}

void setYForog(float rad)
{
    yforgas = rad;
}

void setXForog(float rad)
{
    xforgas = rad;
}

float getYForog()
{
    return yforgas;
}

float getXForog()
{
    return xforgas;
}

void init()
{
    P = (float *)calloc(16, sizeof(float));
    MCamera = (float *)calloc(16, sizeof(float));
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
    MCamera[0] = 1;
    MCamera[5] = 1;
    MCamera[10] = 1;
    MCamera[15] = 1;
    cameraLocation = 0;
    antialias = 1;
    yforgas = 0.0f;
    kameraMagassag = 3.8;
    heightMultiplier = 150.0f;
    lightDir = (float *)malloc(3 * sizeof(float));
    lightDir[0] = 0;
    lightDir[1] = -1;
    lightDir[2] = 0;
    lightIntensity = 1800.0f;
    lightCoefficient = INV_PI * lightIntensity;
    projectedTriangles = (float *)calloc(100, sizeof(float));
    rGround = 0.04943f;
    gGround = 0.28017f;
    bGround = 0.00053332f;
}

EMSCRIPTEN_BINDINGS(raw_pointers)
{
    emscripten::function("matrixSzorzas4x4", &matrixSzorzas4x4, emscripten::allow_raw_pointers());
}

EMSCRIPTEN_BINDINGS(my_module)
{
    emscripten::function("init", &init);
    emscripten::function("allocatePerlin", &allocatePerlin);
    emscripten::function("osszekotesekKiszamolasa", &osszekotesekKiszamolasa);
    emscripten::function("allocatePontok", &allocatePontok);
    emscripten::function("allocateIndexek", &allocateIndexek);
    emscripten::function("pontokKiszamolasa", &pontokKiszamolasa);
    emscripten::function("render", &render);
    emscripten::function("imageBufferSize", &imageBufferSize);
    emscripten::function("ujHely", &ujHely);
    emscripten::function("meretBeallit", &meretBeallit);
    emscripten::function("setFrustum", &setFrustum);
    emscripten::function("xForog", &xForog);
    emscripten::function("yForog", &yForog);
    emscripten::function("setXForog", &setXForog);
    emscripten::function("setYForog", &setYForog);
    emscripten::function("getXForog", &getXForog);
    emscripten::function("getYForog", &getYForog);
    emscripten::function("setAntialias", &setAntialias);
    emscripten::function("newMap", &newMap);
    emscripten::function("newHeightMult", &newHeightMult);
    emscripten::function("newCameraHeight", &newCameraHeight);
    emscripten::function("newPerlinSameMap", &newPerlinSameMap);
    emscripten::function("newLightIntensity", &newLightIntensity);
    emscripten::function("newLightDirection", &newLightDirection);
    emscripten::function("mozgas", &move);
    emscripten::function("newGroundType", &newGroundType);
}