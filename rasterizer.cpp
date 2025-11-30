#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include "perlin.h"
#include <cmath>
#include <cstdlib>
#include <cstring>
#include <cstdint>
#include <algorithm>
#include <stdexcept>

int t, b, r, l;
int meret;
int rndSzm;
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

// Perspective Projection Matrix
float *P;
// Camera Matrix
float *MCamera;
// Model View Projection Matrix
float *MVP;
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
float *imageBuffer;
float *lightDir;

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
    rndSzm = rand() % (pontokMeret / 3);
    calcNewLocationCamera(rndSzm);
}

int getMVP()
{
    return (int)MVP;
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

void pontMVPSzorzas(const int &ind, float *pont)
{
    for (int i = 0; i < 4; i++)
    {
        pont[i] = pontok[ind * 3] * MVP[i] + pontok[ind * 3 + 1] * MVP[4 + i] + pontok[ind * 3 + 2] * MVP[8 + i] + MVP[12 + i];
    }
}

void pontokVetitese(const int &i0, const int &i1, const int &i2)
{
    pontMVPSzorzas(i0, p0);
    pontMVPSzorzas(i1, p1);
    pontMVPSzorzas(i2, p2);
    // clip space
    SutherlandHodgman(p0, p1, p2);
    float wRec;
    projectedTrianglesMeret = 0;
    for (int i = 0; i < clippedMeret / 4 - 2; i++)
    {
        wRec = 1.0f / clipped[3];
        projectedTriangles[projectedTrianglesMeret++] = (clipped[0] * wRec + 1) * 0.5f * (float)imageWidth;
        projectedTriangles[projectedTrianglesMeret++] = (1 - clipped[1] * wRec) * 0.5f * (float)imageHeight;
        projectedTriangles[projectedTrianglesMeret++] = clipped[2] * wRec;
        for (int j = 1; j <= 2; j++)
        {
            wRec = 1.0f / clipped[(i + j) * 4 + 3];
            projectedTriangles[projectedTrianglesMeret++] = (clipped[(i + j) * 4] * wRec + 1) * 0.5 * imageWidth;
            projectedTriangles[projectedTrianglesMeret++] = (1 - clipped[(i + j) * 4 + 1] * wRec) * 0.5 * imageHeight;
            projectedTriangles[projectedTrianglesMeret++] = clipped[(i + j) * 4 + 2] * wRec;
        }
    }
}

float edgeFunction(float X, float Y, float dX, float dY, float x, float y)
{
    return (x - X) * dY - (y - Y) * dX;
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
    temp[12] = -pontok[rndSzm * 3];
    temp[13] = -pontok[rndSzm * 3 + 1] - kameraMagassag;
    temp[14] = -pontok[rndSzm * 3 + 2];
    matrixSzorzas4x4(temp, forgasMatrix, MCamera);
    free(temp);
}

bool isSquareNumber(int n)
{
    return n >= 0 && std::sqrt(n) == (int)std::sqrt(n);
}

void normalizeVector(float *vector)
{
    float vectorLengthInv = 1 / std::sqrt(vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2]);
    vector[0] *= vectorLengthInv;
    vector[1] *= vectorLengthInv;
    vector[2] *= vectorLengthInv;
}

void calculateNormal(int ind0, int ind1, int ind2, float *normalVector)
{
    float vec1[3];
    float vec2[3];

    vec1[0] = pontok[ind1 * 3] - pontok[ind0 * 3];
    vec1[1] = pontok[ind1 * 3 + 1] - pontok[ind0 * 3 + 1];
    vec1[2] = pontok[ind1 * 3 + 2] - pontok[ind0 * 3 + 2];

    vec2[0] = pontok[ind2 * 3] - pontok[ind0 * 3];
    vec2[1] = pontok[ind2 * 3 + 1] - pontok[ind0 * 3 + 1];
    vec2[2] = pontok[ind2 * 3 + 2] - pontok[ind0 * 3 + 2];
    normalVector[0] = vec1[1] * vec2[2] - vec1[2] * vec2[1];
    normalVector[1] = vec1[2] * vec2[0] - vec1[0] * vec2[2];
    normalVector[2] = vec1[0] * vec2[1] - vec1[1] * vec2[0];
}

float dotProduct3D(float *vec0, float *vec1)
{
    return vec0[0] * vec1[0] + vec0[1] * vec1[1] + vec0[2] * vec1[2];
}

int render()
{
    if (!(isSquareNumber(antialias) && (1 <= antialias && antialias <= 16)))
    {
        throw "Wrong antialias. Must be square number and between 1 and 16!";
    }
    float temp = zBufferMeret;
    zBufferMeret = imageWidth * imageHeight * antialias;
    if (zBufferMeret > temp)
    {
        free(zBuffer);
        zBuffer = (float *)malloc(zBufferMeret * sizeof(float));
    }
    for (int i = 0; i < zBufferMeret; i++)
    {
        zBuffer[i] = 1;
    }
    imageAntiBufferLength = imageWidth * imageHeight * antialias * 3;
    imageAntiBuffer = (float *)calloc(imageAntiBufferLength, sizeof(float));
    float sqrAntialias = sqrt(antialias);
    float sqrAntialiasRec = 1.0f / sqrt(antialias);
    float inc = sqrAntialiasRec * 0.5f;
    float htminx, htmaxx, htminy, htmaxy;
    projectedTriangles = (float *)calloc(100, sizeof(float));
    float dX0, dY0, dX1, dY1, dX2, dY2, w0, w1, w2, z0Rec, z1Rec, z2Rec, jobbraKicsiPixel0, jobbraKicsiPixel1, jobbraKicsiPixel2;
    float balraFel0, balraFel1, balraFel2;
    float lambda0, lambda1, lambda2;
    float sorEleje0, sorEleje1, sorEleje2;
    float haromszogTerulet, haromszogTeruletRec;
    float zMelyseg;
    int bufferIndex, kepIndex;
    float *normal = (float *)malloc(3 * sizeof(float));
    float *lightVec = (float *)malloc(3 * sizeof(float));
    lightVec[0] = -lightDir[0];
    lightVec[1] = -lightDir[1];
    lightVec[2] = -lightDir[2];
    calcCameraMatrix();
    matrixSzorzas4x4(MCamera, P, MVP);
    for (int i = 0; i < indexekMeret; i += 3)
    {
        pontokVetitese(indexek[i], indexek[i + 1], indexek[i + 2]);
        for (int j = 0; j < projectedTrianglesMeret; j += 9)
        {
            // A háromszöget határolókeret pontjainak kiszámolása
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
            htminx = std::max(0, std::min(imageWidth - 1, (int)std::floor(htminx)));
            htminy = std::max(0, std::min(imageHeight - 1, (int)std::floor(htminy)));
            htmaxx = std::max(0, std::min(imageWidth - 1, (int)std::ceil(htmaxx)));
            htmaxy = std::max(0, std::min(imageHeight - 1, (int)std::ceil(htmaxy)));
            dX0 = projectedTriangles[j + 6] - projectedTriangles[j + 3];
            dY0 = projectedTriangles[j + 7] - projectedTriangles[j + 4];
            dX1 = projectedTriangles[j] - projectedTriangles[j + 6];
            dY1 = projectedTriangles[j + 1] - projectedTriangles[j + 7];
            dX2 = projectedTriangles[j + 3] - projectedTriangles[j];
            dY2 = projectedTriangles[j + 4] - projectedTriangles[j + 1];
            w0 = edgeFunction(projectedTriangles[j + 3], projectedTriangles[j + 4], dX0, dY0, htminx - 1 + inc, htminy - 1 + inc);
            w1 = edgeFunction(projectedTriangles[j + 6], projectedTriangles[j + 7], dX1, dY1, htminx - 1 + inc, htminy - 1 + inc);
            w2 = edgeFunction(projectedTriangles[j], projectedTriangles[j + 1], dX2, dY2, htminx - 1 + inc, htminy - 1 + inc);
            z0Rec = 1.0f / projectedTriangles[j + 2];
            z1Rec = 1.0f / projectedTriangles[j + 5];
            z2Rec = 1.0f / projectedTriangles[j + 8];
            jobbraKicsiPixel0 = dY0 * sqrAntialiasRec;
            jobbraKicsiPixel1 = dY1 * sqrAntialiasRec;
            jobbraKicsiPixel2 = dY2 * sqrAntialiasRec;
            balraFel0 = sqrAntialiasRec * (dY0 * sqrAntialias + dX0);
            balraFel1 = sqrAntialiasRec * (dY1 * sqrAntialias + dX1);
            balraFel2 = sqrAntialiasRec * (dY2 * sqrAntialias + dX2);
            sorEleje0 = dY0 * (htmaxx - htminx + 1);
            sorEleje1 = dY1 * (htmaxx - htminx + 1);
            sorEleje2 = dY2 * (htmaxx - htminx + 1);
            haromszogTerulet = 1.0f / edgeFunction(
                                          projectedTriangles[j], projectedTriangles[j + 1],
                                          dX2,
                                          dY2,
                                          projectedTriangles[j + 6], projectedTriangles[j + 7]);

            for (int y = htminy; y <= htmaxy; y++)
            {
                w0 -= dX0;
                w1 -= dX1;
                w2 -= dX2;
                for (int x = htminx; x <= htmaxx; x++)
                {
                    w0 += dY0;
                    w1 += dY1;
                    w2 += dY2;
                    for (int ya = 0; ya < sqrAntialias; ya++)
                    {
                        for (int xa = 0; xa < sqrAntialias; xa++)
                        {
                            if (w0 >= 0 && w1 >= 0 && w2 >= 0)
                            {
                                lambda0 = w0 * haromszogTerulet;
                                lambda1 = w1 * haromszogTerulet;
                                lambda2 = w2 * haromszogTerulet;
                                zMelyseg = 1.0f / (z0Rec * lambda0 + z1Rec * lambda1 + z2Rec * lambda2);
                                bufferIndex = (y * imageWidth + x) * antialias + ya * sqrAntialias + xa;
                                if (zMelyseg < zBuffer[bufferIndex])
                                {
                                    calculateNormal(indexek[i], indexek[i + 1], indexek[i + 2], normal);

                                    normalizeVector(normal);

                                    zBuffer[bufferIndex] = zMelyseg;
                                    kepIndex = bufferIndex * 3;
                                    float dotProd = std::max(0.0f, dotProduct3D(normal, lightVec));
                                    float lightCoefficent = 1 / M_PI * lightIntensity * dotProd;
                                    // grass color
                                    // 19.0 albedo -> (19/255)^2.2=0.0033
                                    // 109.0 albedo -> (109/255)^2.2=0.154
                                    // 21.0 albedo -> (21/255)^2.2=0.154
                                    // sun color
                                    // 255.0 normalize -> 255.0f/255.0 = 1.0
                                    // 223.0 normalize -> 223.0f/255.0 = 0.8745f
                                    // 34.0 normalize -> 34.0f/255.0 = 0.13333f
                                    // final product
                                    // 0.0033 * 1.0 = 0.0033
                                    // 0.154 * 0.8745 = 0.134673
                                    // 0.004 * 0.13333 = 0.00053332
                                    imageAntiBuffer[kepIndex] = 0.0033f * lightCoefficent;
                                    imageAntiBuffer[kepIndex + 1] = 0.134673f * lightCoefficent;
                                    imageAntiBuffer[kepIndex + 2] = 0.00053332f * lightCoefficent;
                                }
                            }
                            w0 += jobbraKicsiPixel0;
                            w1 += jobbraKicsiPixel1;
                            w2 += jobbraKicsiPixel2;
                        }
                        w0 -= balraFel0;
                        w1 -= balraFel1;
                        w2 -= balraFel2;
                    }
                    w0 += dX0 * sqrAntialias * sqrAntialiasRec;
                    w1 += dX1 * sqrAntialias * sqrAntialiasRec;
                    w2 += dX2 * sqrAntialias * sqrAntialiasRec;
                }
                w0 -= sorEleje0;
                w1 -= sorEleje1;
                w2 -= sorEleje2;
            }
        }
    }
    free(lightVec);
    free(normal);
    free(projectedTriangles);
    imageBufferLength = imageWidth * imageHeight * 3;
    imageBuffer = (float *)calloc(imageBufferLength, sizeof(float));
    float r, g, b;
    int altalanosIndex, imageAntiIndex, subImageIndex, imageBufferIndex;
    float antiRec = 1.0f / antialias;
    for (int y = 0; y < imageHeight; y++)
    {
        for (int x = 0; x < imageWidth; x++)
        {
            altalanosIndex = (y * imageWidth + x);
            imageAntiIndex = altalanosIndex * antialias;
            imageBufferIndex = altalanosIndex * 3;
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
            imageBuffer[imageBufferIndex] = r * antiRec;
            imageBuffer[imageBufferIndex + 1] = g * antiRec;
            imageBuffer[imageBufferIndex + 2] = b * antiRec;
        }
    }
    free(imageAntiBuffer);
    return (int)imageBuffer;
}

void freeImageBuffer()
{
    free(imageBuffer);
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
    calcNewLocationCamera(rndSzm);
    renderJs(antialias);
}

void newLightIntensity(float intensity)
{
    lightIntensity = intensity;
    renderJs(antialias);
}

void newCameraHeight(float height)
{
    kameraMagassag = height;
    calcNewLocationCamera(rndSzm);
    renderJs(antialias);
}

void newLightDirection(float x, float y)
{
    lightDir[0] = x;
    lightDir[1] = y;
    renderJs(antialias);
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
    srand(time(0));
    P = (float *)calloc(16, sizeof(float));
    MVP = (float *)calloc(16, sizeof(float));
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
    MVP[0] = 1;
    MVP[5] = 1;
    MVP[10] = 1;
    MVP[15] = 1;
    rndSzm = 0;
    antialias = 4;
    yforgas = 0.0f;
    kameraMagassag = 3.8;
    heightMultiplier = 150.0f;
    lightDir = (float *)malloc(3 * sizeof(float));
    lightDir[0] = 0;
    lightDir[1] = -1;
    lightDir[2] = 0;
    lightIntensity = 5000.0f;
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
    emscripten::function("freeImageBuffer", &freeImageBuffer);
    emscripten::function("setAntialias", &setAntialias);
    emscripten::function("newMap", &newMap);
    emscripten::function("newHeightMult", &newHeightMult);
    emscripten::function("newCameraHeight", &newCameraHeight);
    emscripten::function("newPerlinSameMap", &newPerlinSameMap);
    emscripten::function("newLightIntensity", &newLightIntensity);
    emscripten::function("newLightDirection", &newLightDirection);
}