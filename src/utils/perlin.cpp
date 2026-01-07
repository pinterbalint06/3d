#include "utils/perlin.h"
#include <emscripten/emscripten.h>
#include <cmath>
#include <cstdint>
#include "utils/mathUtils.h"
#include "core/vector.h"
#include <GLES3/gl3.h>

namespace PerlinNoise
{
    float Perlin::dotProduct(const Vec2 &grad, const float x, const float y)
    {
        return grad.x * x + grad.y * y;
    }

    uint8_t Perlin::hash(const int x, const int y)
    {
        return permuTable_[permuTable_[x] + y];
    }

    Perlin::Perlin(PerlinParameters params, bool uploadGPU)
    {
        uplToGPU_ = uploadGPU;
        params_ = params;
        params_.steepness = 4.0f;
        permuTable_ = (uint8_t *)malloc(512 * sizeof(uint8_t));
        gradients_ = (Vec2 *)malloc(256 * sizeof(Vec2));
        pcgRand pcgRandGen(params_.seed);

        // setup permutation table
        for (int i = 0; i < 256; i++)
        {
            permuTable_[i] = i;
        }

        // shuffle the permutation table
        for (int i = 255; i > 0; i--)
        {
            uint8_t j = pcgRandGen.random() % (i + 1);
            uint8_t temp = permuTable_[i];
            permuTable_[i] = permuTable_[j];
            permuTable_[j] = temp;
        }

        for (int i = 0; i < 256; i++)
        {
            permuTable_[i + 256] = permuTable_[i];
        }

        // generate gradients
        for (int i = 0; i < 256; i++)
        {
            gradients_[i] = Vec2::randVector(pcgRandGen);
        }

        permuTableTex_ = 0;
        gradientsTex_ = 0;
        parametersUBO_ = 0;
        if (uplToGPU_)
        {
            uploadToGPU();
        }
    }

    Perlin::~Perlin()
    {
        if (permuTable_)
        {
            free(permuTable_);
        }
        if (gradients_)
        {
            free(gradients_);
        }
        if (permuTableTex_ != 0)
        {
            glDeleteTextures(1, &permuTableTex_);
            permuTableTex_ = 0;
        }
        if (gradientsTex_ != 0)
        {
            glDeleteTextures(1, &gradientsTex_);
            gradientsTex_ = 0;
        }
    }

    void Perlin::setLacunarity(float lacunarity)
    {
        params_.lacunarity = lacunarity;
        if (uplToGPU_)
        {
            uploadParametersToGPU();
        }
    }
    void Perlin::setPersistence(float persistence)
    {
        params_.persistence = persistence;
        if (uplToGPU_)
        {
            uploadParametersToGPU();
        }
    }
    void Perlin::setFrequency(float frequency)
    {
        params_.frequency = frequency;
        if (uplToGPU_)
        {
            uploadParametersToGPU();
        }
    }
    void Perlin::setNoiseSize(float noiseSize)
    {
        params_.noiseSize = noiseSize;
        if (uplToGPU_)
        {
            uploadParametersToGPU();
        }
    }
    void Perlin::setOctaves(int octaves)
    {
        params_.octaveCount = octaves;
        if (uplToGPU_)
        {
            uploadParametersToGPU();
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
        // permuTable_[index] is a value between 0-255
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

    float Perlin::fbm(const float x, const float y)
    {
        float total = 0;
        float maxValue = 0;
        float amp = params_.amplitude;
        float freq = params_.frequency;

        for (int i = 0; i < params_.octaveCount; i++)
        {
            total += noise(x * freq, y * freq) * amp;
            maxValue += amp;
            amp *= params_.persistence;
            freq *= params_.lacunarity;
        }

        return (total / maxValue) * params_.noiseSize;
    }

    void Perlin::uploadParametersToGPU()
    {
        if (parametersUBO_ == 0)
        {
            glGenBuffers(1, &parametersUBO_);
            glBindBuffer(GL_UNIFORM_BUFFER, parametersUBO_);
            glBufferData(GL_UNIFORM_BUFFER, sizeof(PerlinParameters), NULL, GL_STATIC_DRAW);
            glBindBuffer(GL_UNIFORM_BUFFER, 0);
            glBindBufferRange(GL_UNIFORM_BUFFER, 2, parametersUBO_, 0, sizeof(PerlinParameters));
        }
        glBindBuffer(GL_UNIFORM_BUFFER, parametersUBO_);
        glBufferSubData(GL_UNIFORM_BUFFER, 0, sizeof(PerlinParameters), &params_);
        glBindBuffer(GL_UNIFORM_BUFFER, 0);
    }

    void Perlin::uploadToGPU()
    {
        if (permuTableTex_ == 0)
        {
            glGenTextures(1, &permuTableTex_);
        }
        glBindTexture(GL_TEXTURE_2D, permuTableTex_);
        // the overwrap doesn't have to be uploaded opengl wraps textures by default
        glTexImage2D(GL_TEXTURE_2D, 0, GL_R8UI, 512, 1, 0, GL_RED_INTEGER, GL_UNSIGNED_BYTE, permuTable_);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);

        if (gradientsTex_ == 0)
        {
            glGenTextures(1, &gradientsTex_);
        }
        glBindTexture(GL_TEXTURE_2D, gradientsTex_);
        glTexImage2D(GL_TEXTURE_2D, 0, GL_RG32F, 256, 1, 0, GL_RG, GL_FLOAT, gradients_);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
        glBindTexture(GL_TEXTURE_2D, 0);

        uploadParametersToGPU();
    }
}