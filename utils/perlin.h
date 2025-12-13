#ifndef PERLIN_NOISE_H
#define PERLIN_NOISE_H

#include "pcgRand.h"
#include <emscripten/emscripten.h>
#include <cmath>
#include <algorithm>
#include "mathUtils.h"

namespace PerlinNoise
{
    void generatePerlinNoise(float *values, float *normals, float frequency, int size, uint32_t seed, float amplitude, int octaveCount, float lacunarity = 2, float persistence = 0.5, float noiseOffset = 0, float noiseSize = 1)
    {
        std::fill(normals, normals + size * size * 3, 0.0f);
        float currAmplitude = amplitude;
        float currFrequency = frequency;
        float gridSize = size / currFrequency;
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
                    MathUtils::randVector(&rnd, &vectors[baseIndex], &vectors[baseIndex + 1]);
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

                    // calculate dot products
                    float a = MathUtils::dotProduct(leftToPointComp, topToPointComp, vectors[TopLeftVectorInd], vectors[TopLeftVectorInd + 1]);
                    float b = MathUtils::dotProduct(rightToPointComp, topToPointComp, vectors[TopRightVectorInd], vectors[TopRightVectorInd + 1]);
                    float c = MathUtils::dotProduct(leftToPointComp, bottomToPointComp, vectors[BottomLeftVectorInd], vectors[BottomLeftVectorInd + 1]);
                    float d = MathUtils::dotProduct(rightToPointComp, bottomToPointComp, vectors[BottomRightVectorInd], vectors[BottomRightVectorInd + 1]);

                    float u = MathUtils::smoothingFunction(leftToPointComp);
                    float v = MathUtils::smoothingFunction(topToPointComp);
                    // horizontal interpolations
                    // a1 + (a2 - a1) * smoothingFunction(d)
                    float inter1 = MathUtils::interpolation(a, b, u);
                    float inter2 = MathUtils::interpolation(c, d, u);

                    // vertical interpolations
                    // a1 + (a2 - a1) * smoothingFunction(d)
                    float inter3 = MathUtils::interpolation(inter1, inter2, v);
                    values[y * size + x] += inter3 *
                                            currAmplitude;
                }
            }
            sumAmplitude += currAmplitude;
            currAmplitude *= persistence;
            currFrequency *= lacunarity;
            gridSize = std::max(size / currFrequency, 0.2f);

            free(vectors);
        }
        // normalize noise
        float sumAmpRev = 1.0f / sumAmplitude;
        float normalizeNoiseCoeff = noiseSize * sumAmpRev;
        float steepnesCoeff = 1.0f;
        for (int y = 0; y < size; y++)
        {
            for (int x = 0; x < size; x++)
            {
                int index = y * size + x;
                values[index] = (values[index] * normalizeNoiseCoeff) + noiseOffset;
            }
        }
        for (int y = 0; y < size; y++)
        {
            for (int x = 0; x < size; x++)
            {
                int index = y * size + x;
                int prevIndexX = y * size + std::max(0, (x - 1));
                int nxtIndexX = y * size + (x + 1) % size;
                float centralDifferenceX = (values[nxtIndexX] - values[prevIndexX]) / 2.0f;
                int prevIndexY = std::max(0, (y - 1)) * size + x;
                int nxtIndexY = std::min(size - 1, (y + 1)) * size + x;
                float centralDifferenceY = (values[nxtIndexY] - values[prevIndexY]) / 2.0f;

                normals[index * 3] = -centralDifferenceX;
                normals[index * 3 + 1] = steepnesCoeff;
                normals[index * 3 + 2] = centralDifferenceY;

                float normLen = std::sqrt(normals[index * 3] * normals[index * 3] + normals[index * 3 + 1] * normals[index * 3 + 1] + normals[index * 3 + 2] * normals[index * 3 + 2]);
                normals[index * 3] /= normLen;
                normals[index * 3 + 1] /= normLen;
                normals[index * 3 + 2] /= normLen;
            }
        }
    }
}

#endif
