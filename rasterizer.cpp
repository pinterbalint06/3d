#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <cstdint>
#include <stdlib.h>
#include <stddef.h>
#include <cstdlib>
#include <cmath>
#include <algorithm>
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <string>

static float *P;
// Camera Matrix
static float *MCamera;
// Model View Projection Matrix
static float *MVP;
static float *pontok = NULL;
static int pontokMeret = 0;
static int32_t *indexek = NULL;
static int indexekMeret = 0;
static float *perlin = NULL;
static int perlinMeret = 0;
float *zBuffer;
int t, b, r, l;
int meret;
int rndSzm;
int antialias;
int imageWidth;
int imageHeight;
int zBufferMeret;
float *p0;
float *p1;
float *p2;
float *bemenet;
int bemenetMeret;
float *clipped;
float *projectedTriangles;
int projectedTrianglesMeret;
int clippedMeret;
int *sikok;
float *imageAntiBuffer;
int imageAntiBufferLength;
float *imageBuffer;
int imageBufferLength;
float yforgas;

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

void ujHely()
{
    rndSzm = rand() % (pontokMeret / 3);
    MCamera[12] = -pontok[rndSzm * 3];
    MCamera[13] = -pontok[rndSzm * 3 + 1] - 20;
    MCamera[14] = -pontok[rndSzm * 3 + 2];
    matrixSzorzas4x4(MCamera, P, MVP);
}

int getRandomHely()
{
    return (int)MVP;
}

int getMVP()
{
    return (int)MVP;
}

void copy(float *masol, int meret, float *ide)
{
    for (int i = 0; i < meret; i++)
    {
        ide[i] = masol[i];
    }
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
    int elozoPontIndex, dTav;
    float tavolsag, elozoTavolsag;
    for (int k = 0; k < 6; k++)
    {
        bemenetMeret = 12;
        copy(clipped, clippedMeret, bemenet);
        clippedMeret = 0;
        elozoPontIndex = bemenetMeret - 4;
        for (int i = 0; i < bemenetMeret; i += 4)
        {
            tavolsag = bemenet[i + sikok[k * 3]] + bemenet[i + sikok[k * 3 + 1]] * sikok[k * 3 + 2];
            elozoTavolsag = bemenet[elozoPontIndex + sikok[k * 3]] + bemenet[elozoPontIndex + sikok[k * 3 + 1]] * sikok[k * 3 + 2];
            if (tavolsag >= 0)
            {
                if (elozoTavolsag < 0)
                {
                    dTav = elozoTavolsag / (elozoTavolsag - tavolsag);
                    clipped[clippedMeret] = linearis_interpolacio(bemenet[elozoPontIndex], bemenet[i], dTav);
                    clipped[clippedMeret + 1] = linearis_interpolacio(bemenet[elozoPontIndex + 1], bemenet[i + 1], dTav);
                    clipped[clippedMeret + 2] = linearis_interpolacio(bemenet[elozoPontIndex + 2], bemenet[i + 2], dTav);
                    clipped[clippedMeret + 3] = linearis_interpolacio(bemenet[elozoPontIndex + 3], bemenet[i + 3], dTav);
                    clippedMeret += 4;
                }
                clipped[clippedMeret] = bemenet[i];
                clipped[clippedMeret + 1] = bemenet[i + 1];
                clipped[clippedMeret + 2] = bemenet[i + 2];
                clipped[clippedMeret + 3] = bemenet[i + 3];
                clippedMeret += 4;
            }
            else
            {
                if (elozoTavolsag >= 0)
                {
                    clipped[clippedMeret] = linearis_interpolacio(bemenet[elozoPontIndex], bemenet[i], dTav);
                    clipped[clippedMeret + 1] = linearis_interpolacio(bemenet[elozoPontIndex + 1], bemenet[i + 1], dTav);
                    clipped[clippedMeret + 2] = linearis_interpolacio(bemenet[elozoPontIndex + 2], bemenet[i + 2], dTav);
                    clipped[clippedMeret + 3] = linearis_interpolacio(bemenet[elozoPontIndex + 3], bemenet[i + 3], dTav);
                    clippedMeret += 4;
                }
            }
            elozoPontIndex = i;
        }
    }
}

void pontMVPSzorzas(int ind, float *pont)
{
    for (int i = 0; i < 4; i++)
    {
        pont[i] = pontok[ind * 3] * MVP[i] + pontok[ind * 3 + 1] * MVP[4 + i] + pontok[ind * 3 + 2] * MVP[8 + i] + MVP[12 + i];
    }
}

void pontokVetitese(int i0, int i1, int i2)
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
        projectedTriangles[projectedTrianglesMeret++] = (clipped[0] * wRec) * 0.5 * imageWidth;
        projectedTriangles[projectedTrianglesMeret++] = (1 - clipped[1] * wRec) * 0.5 * imageHeight;
        projectedTriangles[projectedTrianglesMeret++] = clipped[2] * wRec;
        for (int j = 1; j <= 2; j++)
        {
            wRec = 1.0f / clipped[(i + j) * 4 + 3];
            projectedTriangles[projectedTrianglesMeret++] = (clipped[(i + j) * 4] * wRec) * 0.5 * imageWidth;
            projectedTriangles[projectedTrianglesMeret++] = (1 - clipped[(i + j) * 4 + 1] * wRec) * 0.5 * imageHeight;
            projectedTriangles[projectedTrianglesMeret++] = clipped[(i + j) * 4 + 2] * wRec;
        }
    }
}

float edgeFunction(float X, float Y, float dX, float dY, float x, float y)
{
    return (x - X) * dY - (y - Y) * dX;
}

int render()
{
    zBuffer = (float *)calloc(zBufferMeret, sizeof(float));
    imageAntiBufferLength = imageWidth * imageHeight * antialias * 3;
    imageAntiBuffer = (float *)calloc(imageAntiBufferLength, sizeof(float));
    imageBufferLength = imageWidth * imageHeight * 3;
    imageBuffer = (float *)calloc(imageBufferLength, sizeof(float));
    for (int i = 0; i < zBufferMeret; i++)
    {
        zBuffer[i] = 1;
    }
    float sqrAntialias = sqrt(antialias);
    float sqrAntialiasRec = 1.0f / sqrt(antialias);
    float inc = sqrAntialiasRec * 0.5;
    float htminx, htmaxx, htminy, htmaxy;
    projectedTriangles = (float *)calloc(indexekMeret * 7, sizeof(float));
    float dX0, dY0, dX1, dY1, dX2, dY2, w0, w1, w2, z0Rec, z1Rec, z2Rec, jobbraKicsiPixel0, jobbraKicsiPixel1, jobbraKicsiPixel2;
    float balraFel0, balraFel1, balraFel2;
    float lambda0, lambda1, lambda2;
    float sorEleje0, sorEleje1, sorEleje2;
    float haromszogTerulet, haromszogTeruletRec;
    float zMelyseg;
    int bufferIndex, kepIndex;
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
                                          projectedTriangles[j + 3] - projectedTriangles[j],
                                          projectedTriangles[j + 4] - projectedTriangles[j + 1],
                                          projectedTriangles[j + 6], projectedTriangles[j + 7]);

            if (haromszogTerulet <= 0)
                continue; // backface or degenerate

            haromszogTeruletRec = 1.0f / haromszogTerulet;

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
                                lambda0 = w0 * haromszogTeruletRec;
                                lambda1 = w1 * haromszogTeruletRec;
                                lambda2 = w2 * haromszogTeruletRec;
                                zMelyseg = 1.0f / (z0Rec * lambda0 + z1Rec * lambda1 + z2Rec * lambda2);
                                bufferIndex = (y * imageWidth + x) * antialias + ya * sqrAntialias + xa;
                                if (zMelyseg < zBuffer[bufferIndex])
                                {
                                    zBuffer[bufferIndex] = zMelyseg;
                                    kepIndex = bufferIndex * 3;
                                    imageAntiBuffer[kepIndex] = 0;
                                    imageAntiBuffer[kepIndex + 1] = 255;
                                    imageAntiBuffer[kepIndex + 2] = 0;
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
    float r, g, b;
    int altalanosIndex, imageAntiIndex, subImageIndex, imageBufferIndex;
    float antiRec = 1.0f / antialias;
    if (antialias == 0)
    {
        throw "rt";
    }

    for (int y = 0; y < imageHeight; y++)
    {
        for (int x = 0; x < imageWidth; x++)
        {
            altalanosIndex = (y * imageWidth + x);
            imageAntiIndex = altalanosIndex * antialias;
            imageBufferIndex = altalanosIndex * 3;
            r = 0;
            g = 0;
            b = 0;
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
    return (int)imageBuffer;
}

int imageBufferSize()
{
    return imageBufferLength;
}

void setFrustum(float focal, float filmW, float filmH, int imageW, int imageH, int n, int f)
{
    float xKitoltes = 1;
    float yKitoltes = 1;
    imageWidth = imageW;
    imageHeight = imageH;
    zBufferMeret = imageWidth * imageH * antialias;
    // Ha a film képaránya más mint a kép képaránya
    if (filmW / filmH > imageW / imageH)
    {
        xKitoltes = (imageW / imageH) / (filmW / filmH);
    }
    else
    {
        yKitoltes = (filmW / filmH) / (imageW / imageH);
    }
    t = ((filmH / 2) / focal * n) * yKitoltes;
    r = t * (filmW / filmH) * xKitoltes;
    b = -t;
    l = -r;
    P[0] = 2 * n / (r - l);
    P[5] = 2 * n / (t - b);
    P[8] = (r + l) / (r - l);
    P[9] = (t + b) / (t - b);
    P[10] = f / (n - f);
    P[11] = -1;
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
        indexekMeret = indexekSzam;
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
    perlin = (float *)malloc(perlinek * sizeof(float));
    if (perlin)
    {
        perlinMeret = perlinek;
        return (int)perlin;
    }
    return 0;
}

void pontokKiszamolasa(int szorzo)
{
    int i;
    for (int y = 0; y < meret; y++)
    {
        for (int x = 0; x < meret; x++)
        {
            i = (y * meret + x);
            pontok[i * 3] = x;
            pontok[i * 3 + 1] = perlin[i] * szorzo;
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
            indexek[i * 6] = i + 1;         // jobb felső pontja
            indexek[i * 6 + 1] = i + meret; // bal alsó pontja
            indexek[i * 6 + 2] = i;         // bal felső pontja

            indexek[i * 6 + 3] = i + 1;         // jobb felső pontja
            indexek[i * 6 + 4] = i + meret + 1; // jobb alsó pontja
            indexek[i * 6 + 5] = i + meret;     // bal alsó pontja
            // a négyzetet felosztottuk két háromszögre
        }
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

void forgas()
{
    yforgas += 0.1;
    float *forgasMatrix = (float *)calloc(16, sizeof(float));   
    float sine = sinf(yforgas);
    float cosine = cosf(yforgas);
    forgasMatrix[0] = cosine;
    forgasMatrix[2] = -sine;
    forgasMatrix[5] = 1;
    forgasMatrix[8] = sine;
    forgasMatrix[10] = cosine;
    forgasMatrix[15] = 1;
    float temp[16];
    matrixSzorzas4x4(MCamera, forgasMatrix, temp);
    memcpy(MCamera, temp, 16 * sizeof(float));
    matrixSzorzas4x4(MCamera, P, MVP);
    free(forgasMatrix);
}

void init()
{
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
    sikok[2] = -1;
    sikok[3] = 3;
    sikok[5] = 1;
    sikok[6] = 3;
    sikok[8] = -1;
    sikok[9] = 3;
    sikok[11] = 1;
    sikok[12] = 3;
    sikok[14] = -1;
    sikok[15] = 3;
    sikok[17] = 1;
    MCamera[0] = 1;
    MCamera[5] = 1;
    MCamera[10] = 1;
    MCamera[15] = 1;
    MVP[0] = 1;
    MVP[5] = 1;
    MVP[10] = 1;
    MVP[15] = 1;
    rndSzm = 0;
    antialias = 1;
    yforgas = 0;
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
    emscripten::function("forgas", &forgas);
}