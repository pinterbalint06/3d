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
        int seed;          // 0
        int octaveCount;   // 4
        float frequency;   // 8
        float amplitude;   // 12
        float persistence; // 16
        float lacunarity;  // 20
        float noiseSize;   // 24
        float scaling;     // 28
        float steepness;   // 32
        float contrast;    // 36
        float padding[2];  // 40-48
    };

    class Perlin
    {
    private:
        uint8_t *permuTable_;
        Vec2 *gradients_;
        GLuint permuTableTex_;
        GLuint gradientsTex_;
        GLuint *parametersUBO_;
        PerlinParameters params_;
        bool isGPUSet_;

        static float dotProduct(const Vec2 &grad, const float x, const float y);
        uint8_t hash(const int x, const int y);

    public:
        Perlin(PerlinParameters params);

        ~Perlin();

        // getter
        PerlinParameters getParameters() const { return params_; }
        GLuint getPermutationGPULoc() const { return permuTableTex_; }
        GLuint getGradientsGPULoc() const { return gradientsTex_; }
        GLuint *getUBOloc() { return parametersUBO_; };

        // setters
        void setLacunarity(float lacunarity);
        void setPersistence(float persistence);
        void setFrequency(float frequency);
        void setNoiseSize(float noiseSize);
        void setOctaves(int octaves);
        void setSteepness(float steepness);
        void setContrast(int contrast);

        // one octave noise
        float noise(float x, float y);

        // Fractal Brownian Motion
        float fbm(const float x, const float y);

        void uploadParametersToGPU();
        void uploadToGPU();
        void setUpGPU(GLuint *uboLoc);
    };
}

#endif
