#ifndef PERLIN_NOISE_H
#define PERLIN_NOISE_H

#include <cstdint>
class pcgRand;
struct Vec2;
typedef unsigned int GLuint;

namespace PerlinNoise
{
    struct PerlinParameters
    {
        int seed;
        int octaveCount;
        float frequency;
        float amplitude;
        float persistence;
        float lacunarity;
        float noiseSize;
    };

    class Perlin
    {
    private:
        uint8_t *permuTable_;
        Vec2 *gradients_;
        GLuint permuTableTex_;
        GLuint gradientsTex_;
        GLuint parametersUBO_;
        PerlinParameters params_;
        bool uplToGPU_;

        static float dotProduct(const Vec2 &grad, const float x, const float y);
        uint8_t hash(const int x, const int y);

    public:
        Perlin(PerlinParameters params, bool uploadGPU = false);

        ~Perlin();

        // getter
        PerlinParameters getParameters() const { return params_; }

        // setters
        void setLacunarity(float lacunarity);
        void setPersistence(float persistence);
        void setFrequency(float frequency);
        void setNoiseSize(float noiseSize);
        void setOctaves(int octaves);

        // one octave noise
        float noise(float x, float y);

        // Fractal Brownian Motion
        float fbm(const float x, const float y);

        void uploadParametersToGPU();
        void uploadToGPU();
    };
}

#endif
