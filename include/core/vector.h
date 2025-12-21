#ifndef VECTOR_H
#define VECTOR_H
#include "utils/mathUtils.h"
#include <cmath>

/**
 * @brief It's a vector in 2D space.
 */
struct Vec2
{
    // Position
    float x, y;

    Vec2()
    {
        x = 0.0f;
        y = 0.0f;
    }

    Vec2(float x, float y)
    {
        this->x = x;
        this->y = y;
    }

    inline float length()
    {
        return std::sqrt(x * x + y * y);
    }

    void normalize()
    {
        float lengthInv = 1.0f / length();
        x *= lengthInv;
        y *= lengthInv;
    }

    static inline Vec2 randVector(pcgRand &random)
    {
        float angle = random.randomFloat() * 2 * M_PI;
        return Vec2(cosf(angle), sinf(angle));
    }

    static inline float dotProduct(Vec2 &vec1, Vec2 &vec2)
    {
        return vec1.x * vec2.x + vec1.y * vec2.y;
    }
};

#endif