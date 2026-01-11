#ifndef TERRAIN_H
#define TERRAIN_H

#include "utils/perlin.h"
#include "core/mesh.h"

typedef unsigned int GLuint;

class Terrain : public Mesh
{
private:
    float *perlinHeightMap_;
    int size_;
    float textureSpacing_;
    // Perlin parameters
    float heightMultiplier_;
    int domainWarp_;

    PerlinNoise::Perlin *perlinNoise_;
    PerlinNoise::Perlin *warpNoise_;

    void buildTerrain();
    float calculateHeight(float x, float y);

public:
    Terrain(int size);
    ~Terrain();

    void regenerate();

    // getters
    int getSize() { return size_; }
    GLuint getNoisePermGPULoc() { return perlinNoise_->getPermutationGPULoc(); }
    GLuint getNoiseGradGPULoc() { return perlinNoise_->getGradientsGPULoc(); }
    GLuint getWarpPermGPULoc() { return warpNoise_->getPermutationGPULoc(); }
    GLuint getWarpGradGPULoc() { return warpNoise_->getGradientsGPULoc(); }
    int getIsDomainWarp() { return domainWarp_; }

    // setters
    void setLacunarity(float lacunarity) { perlinNoise_->setLacunarity(lacunarity); }
    void setPersistence(float persistence) { perlinNoise_->setPersistence(persistence); }
    void setFrequency(float frequency) { perlinNoise_->setFrequency(frequency); }
    void setHeightMultiplier(float heightMultiplier) { perlinNoise_->setNoiseSize(heightMultiplier); }
    void setOctaves(int octaves) { perlinNoise_->setOctaves(octaves); }
    void setParams(int size, PerlinNoise::PerlinParameters &params);
    void setSeed(int seed);
    void setSize(int size);
    void setSteepness(float steepness) { perlinNoise_->setSteepness(steepness); }
    void setContrast(int contrast) { perlinNoise_->setContrast(contrast); }
    void setTextureSpacing(float textureSpacing);
    void setUpNoiseForGPU(GLuint *perlinLoc, GLuint *warpLoc);
    void setDomainWarp(bool domainWarp);
};

#endif