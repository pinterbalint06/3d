#ifndef TERRAIN_ENGINE_H
#define TERRAIN_ENGINE_H

#include "core/scene.h"
#include "terrain/terrain.h"
#include "core/material.h"
#include <core/engine.h>
#include "utils/perlin.h"
#include <string>

class Mesh;

class TerrainEngine : public Engine
{
private:
    Terrain *terrain_;
    float cameraHeight_;
    int cameraLocation_;

    void calcNewCamLoc();

public:
    TerrainEngine(const std::string &canvID, int size);
    ~TerrainEngine();

    PerlinNoise::PerlinParameters getNoiseParameters() const { return terrain_->getNoiseParameters(); };
    PerlinNoise::PerlinParameters getWarpParameters() const { return terrain_->getWarpParameters(); };

    void setCameraHeight(float cameraHeight);
    void setTerrainParams(int size, PerlinNoise::PerlinParameters &params);
    void setWarpParams(int size, PerlinNoise::PerlinParameters &params);
    void setTextureSpacing(float textureSpacing);
    void setDomainWarp(bool domainWarp);
    void setGroundMaterial(Materials::Material material);

    void randomizeLocation();
    void moveCamera(int x, int z);
};

#endif