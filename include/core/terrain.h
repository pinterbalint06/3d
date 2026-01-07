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
    float spacing_;
    float textureSpacing_;
    // Perlin parameters
    float heightMultiplier_;

    PerlinNoise::Perlin *perlinNoise_ = nullptr;

    void buildTerrain();

public:
    Terrain(int size);
    ~Terrain();

    void regenerate();

    // getters
    int getSize() { return size_; }
    GLuint getPermGPULoc() { return perlinNoise_->getPermutationGPULoc(); }
    GLuint getGradGPULoc() { return perlinNoise_->getGradientsGPULoc(); }

    // setters
    void setLacunarity(float lacunarity) { perlinNoise_->setLacunarity(lacunarity); }
    void setPersistence(float persistence) { perlinNoise_->setPersistence(persistence); }
    void setFrequency(float frequency) { perlinNoise_->setFrequency(frequency); }
    void setHeightMultiplier(float heightMultiplier) { perlinNoise_->setNoiseSize(heightMultiplier); }
    void setOctaves(int octaves) { perlinNoise_->setOctaves(octaves); }
    void setSeed(int seed);
    void setSize(int size);
    void setSpacing(float spacing);
    void setTextureSpacing(float textureSpacing);
};

#endif