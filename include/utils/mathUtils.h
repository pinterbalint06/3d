#ifndef MATH_UTILS_H
#define MATH_UTILS_H

#include <cmath>
#include <algorithm>
#include "utils/pcgRand.h"

namespace MathUtils
{
    constexpr float INV_PI = 0.318309886f;

    inline float dotProduct(const float x0, const float y0, const float x1, const float y1)
    {
        return x0 * x1 + y0 * y1;
    }

    inline bool isSquareNumber(int n)
    {
        return n >= 0 && std::sqrt(n) == (int)std::sqrt(n);
    }

    inline float dotProduct3D(const float *vec0, const float *vec1)
    {
        return vec0[0] * vec1[0] + vec0[1] * vec1[1] + vec0[2] * vec1[2];
    }

    inline float smoothingFunction(const float d)
    {
        //  6 * t^5 - 15 * t^4 + 10 * t^3 = t * t * t * (t * (t * 6 - 15) + 10);
        // Horner's method
        return d * d * d * (d * (d * 6.0f - 15.0f) + 10.0f);
    }

    inline float interpolation(const float a1, const float a2, const float d)
    {
        return a1 + (a2 - a1) * d;
    }

    /*
        4x4 matrix multiplication
    */
    inline void multiplyMatrix(const float *m1, const float *m2, float *result)
    {
        for (int i = 0; i < 4; i++)
        {
            for (int j = 0; j < 4; j++)
            {
                result[i * 4 + j] =
                    m1[i * 4] * m2[j] +
                    m1[i * 4 + 1] * m2[4 + j] +
                    m1[i * 4 + 2] * m2[8 + j] +
                    m1[i * 4 + 3] * m2[12 + j];
            }
        }
    }

    inline void setIdentity(float *m)
    {
        memset(m, 0, 16 * sizeof(float));
        m[0] = 1.0f;
        m[5] = 1.0f;
        m[10] = 1.0f;
        m[15] = 1.0f;
    }

    inline void calculateNormal(const float *p0, const float *p1, const float *p2, float *normalVector)
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

    inline void normalizeVector(float *vector)
    {
        float vectorLengthInv = 1 / std::sqrt(vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2]);
        vector[0] *= vectorLengthInv;
        vector[1] *= vectorLengthInv;
        vector[2] *= vectorLengthInv;
    }

    inline void randVector(pcgRand *random, float *vecX, float *vecY)
    {
        float angle = random->randomFloat() * 2 * M_PI;
        *vecX = cosf(angle);
        *vecY = sinf(angle);
    }

    inline void vert3MatrixMult(const float *vec, const float *matrix, float *result)
    {
        for (int i = 0; i < 4; i++)
        {
            result[i] = vec[0] * matrix[i] + vec[1] * matrix[4 + i] + vec[2] * matrix[8 + i] + matrix[12 + i];
        }
    }

    inline void vert3MatrixMult(float *vec, const float *matrix)
    {
        float tempVertex[4];
        for (int i = 0; i < 4; i++)
        {
            tempVertex[i] = vec[0] * matrix[i] + vec[1] * matrix[4 + i] + vec[2] * matrix[8 + i] + matrix[12 + i];
        }
        for (int i = 0; i < 4; i++)
        {
            vec[i] = tempVertex[i];
        }
    }
}

#endif