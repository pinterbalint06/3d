#include "utils/perlin.h"
#include <emscripten/emscripten.h>
#include <cmath>
#include <cstdint>
#include "utils/mathUtils.h"
#include "core/vector.h"

namespace PerlinNoise
{
    float Perlin::dotProduct(const Vec2 &grad, const float x, const float y)
    {
        return grad.x * x + grad.y * y;
    }

    int Perlin::hash(const int x, const int y)
    {
        return p_[p_[x] + y];
    }

    Perlin::Perlin(uint32_t seed)
    {
        p_ = (int *)malloc(512 * sizeof(int));
        gradients_ = (Vec2 *)malloc(256 * sizeof(Vec2));
        pcgRand pcgRandGen(seed);

        // setup permutation table
        for (int i = 0; i < 256; i++)
        {
            p_[i] = i;
        }

        // shuffle the permutation table
        for (int i = 255; i > 0; i--)
        {
            int j = pcgRandGen.random() % (i + 1);
            int temp = p_[i];
            p_[i] = p_[j];
            p_[j] = temp;
        }

        for (int i = 0; i < 256; i++)
        {
            p_[i + 256] = p_[i];
        }

        // generate gradients
        for (int i = 0; i < 256; i++)
        {
            gradients_[i] = Vec2::randVector(pcgRandGen);
        }
    }

    Perlin::~Perlin()
    {
        if (p_)
        {
            free(p_);
        }
        if (gradients_)
        {
            free(gradients_);
        }
    }

    float Perlin::noise(float x, float y)
    {
        // wrap to 0-255
        int x0 = ((int)std::floor(x)) & 255;
        int y0 = ((int)std::floor(y)) & 255;

        int x1 = (x0 + 1) & 255;
        int y1 = (y0 + 1) & 255;

        // drop the integer part this is the location in the grid
        float px = x - std::floor(x);
        float py = y - std::floor(y);

        // fade
        float u = MathUtils::smoothingFunction(px);
        float v = MathUtils::smoothingFunction(py);

        // find gradients_ based on hashed value
        // p_[index] is a value between 0-255
        Vec2 g00 = gradients_[hash(x0, y0)];
        Vec2 g10 = gradients_[hash(x1, y0)];
        Vec2 g01 = gradients_[hash(x0, y1)];
        Vec2 g11 = gradients_[hash(x1, y1)];

        // calculate components from grid corners to point
        float leftToPoint = px;
        float rightToPoint = px - 1.0f;
        float bottomToPoint = py;
        float topToPoint = py - 1.0f;
        Vec2 p00 = Vec2(leftToPoint, bottomToPoint);
        Vec2 p10 = Vec2(rightToPoint, bottomToPoint);
        Vec2 p01 = Vec2(leftToPoint, topToPoint);
        Vec2 p11 = Vec2(rightToPoint, topToPoint);

        float a = MathUtils::interpolation(Vec2::dotProduct(g00, p00), Vec2::dotProduct(g10, p10), u);
        float b = MathUtils::interpolation(Vec2::dotProduct(g01, p01), Vec2::dotProduct(g11, p11), u);

        return MathUtils::interpolation(a, b, v);
    }

    float Perlin::fbm(const float x, const float y, int octaveCount, float frequency, float amplitude, float persistence, float lacunarity)
    {
        float total = 0;
        float maxValue = 0;

        for (int i = 0; i < octaveCount; i++)
        {
            total += noise(x * frequency, y * frequency) * amplitude;
            maxValue += amplitude;
            amplitude *= persistence;
            frequency *= lacunarity;
        }

        return total / maxValue;
    }
}