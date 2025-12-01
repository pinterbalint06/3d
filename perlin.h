#include "randomNumber.h"
#include <emscripten/emscripten.h>
#include <cmath>
#include <algorithm>

float dotProduct(float x0, float y0, float x1, float y1)
{
    return x0 * x1 + y0 * y1;
}

void randVector(pcgRand *random, float *vecX, float *vecY)
{
    float angle = random->randomFloat() * 2 * M_PI;
    *vecX = cosf(angle);
    *vecY = sinf(angle);
}

float smoothingFunction(float d)
{
    //  6 * t^5 - 15 * t^4 + 10 * t^3 = t * t * t * (t * (t * 6 - 15) + 10);
    // Horner's method
    return d * d * d * (d * (d * 6 - 15) + 10);
}

float linearInterpolation(float a1, float a2, float d)
{
    return a1 + (a2 - a1) * smoothingFunction(d);
}

void generatePerlinNoise(float *values, int frequency, int size, uint32_t seed, float amplitude, int octaveCount, float lacunarity = 2, float persistence = 0.5, float noiseOffset = 0, float noiseSize = 1)
{
    float currAmplitude = amplitude;
    float currFrequency = frequency;
    int gridSize = size / currFrequency;
    float sumAmplitude = 0;
    float vecX, vecY;
    for (int i = 0; i < octaveCount; i++)
    {
        pcgRand rnd(seed + i);
        int gridCount = size / gridSize + 1;
        float *vectors = (float *)malloc(gridCount * gridCount * 2 * sizeof(float));
        int baseIndex;
        for (int y = 0; y < gridCount; y++)
        {
            for (int x = 0; x < gridCount; x++)
            {
                baseIndex = (y * gridCount + x) * 2;
                randVector(&rnd, &vectors[baseIndex], &vectors[baseIndex + 1]);
            }
        }
        for (int y = 0; y < size; y++)
        {
            for (int x = 0; x < size; x++)
            {
                // x1, y1 current point on the grid
                float x1 = (float)x / gridSize;
                float y1 = (float)y / gridSize;

                // coordinates of the grid around the current point
                int leftGrid = (int)std::floor(x1);
                int rightGrid = leftGrid + 1;
                int topGrid = (int)std::floor(y1);
                int bottomGrid = topGrid + 1;

                // (dir)grid->currPoint
                // left grid to point
                float leftToPointComp = x1 - leftGrid;
                // right grid to point
                float rightToPointComp = x1 - rightGrid;
                // bottom grid to point
                float bottomToPointComp = y1 - bottomGrid;
                // top grid to point
                float topToPointComp = y1 - topGrid;

                // baseTopIndex is the index for the row in vectors array
                int baseTopIndex = topGrid * gridCount;
                // +the column location
                // times two because there are two datas stored x and y
                int TopLeftVectorInd = (baseTopIndex + leftGrid) * 2;
                int TopRightVectorInd = (baseTopIndex + rightGrid) * 2;

                // same as above just with bottom
                int baseBottomIndex = bottomGrid * gridCount;
                int BottomLeftVectorInd = (baseBottomIndex + leftGrid) * 2;
                int BottomRightVectorInd = (baseBottomIndex + rightGrid) * 2;
                // linear interpolate the dot product of the upper left to point and vector array uperr left and the dot product of the upper right to point and vector array upper right values according to the left to point
                // linear interpolate the bottom like the top values
                // interpolate the horizontal interpolations according to the top to point
                values[y * size + x] += linearInterpolation(
                                            linearInterpolation(
                                                dotProduct(leftToPointComp, topToPointComp, vectors[TopLeftVectorInd], vectors[TopLeftVectorInd + 1]),
                                                dotProduct(rightToPointComp, topToPointComp, vectors[TopRightVectorInd], vectors[TopRightVectorInd + 1]),
                                                leftToPointComp),
                                            linearInterpolation(
                                                dotProduct(leftToPointComp, bottomToPointComp, vectors[BottomLeftVectorInd], vectors[BottomLeftVectorInd + 1]),
                                                dotProduct(rightToPointComp, bottomToPointComp, vectors[BottomRightVectorInd], vectors[BottomRightVectorInd + 1]),
                                                leftToPointComp),
                                            topToPointComp) *
                                        currAmplitude;
            }
        }
        sumAmplitude += currAmplitude;
        currAmplitude *= persistence;
        currFrequency *= lacunarity;
        gridSize = std::max(size / currFrequency, 1.0f);

        free(vectors);
    }
    for (int y = 0; y < size; y++)
    {
        for (int x = 0; x < size; x++)
        {
            int index = y * size + x;
            values[index] = ((values[index] / sumAmplitude) * noiseSize) + noiseOffset;
        }
    }
}
