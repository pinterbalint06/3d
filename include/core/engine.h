#ifndef ENGINE_H
#define ENGINE_H

#include "core/scene.h"
#include "core/camera.h"
#include "core/shader.h"
#include "core/renderer.h"
#include "core/material.h"

class Engine
{
private:
    Scene *scene_;
    Renderer *renderer_;
    float cameraHeight_;
    int cameraLocation_;

    void calcNewCamLoc();

public:
    Engine(int size);
    ~Engine();

    void setGroundMaterial(Materials::Material material);
    void setCameraHeight(float cameraHeight);
    void setLightDirection(float x, float y, float z);
    void setAntialias(int antialias);
    void setTerrainParams(int seed, float frequency, float lacunarity, float persistence, int octaves, float heightMultiplier);
    void setLightIntensity(float intensity);
    void setShadingMode(Shaders::SHADINGMODE shadingmode);
    void setFrustum(float focal, float filmW, float filmH, int imageW, int imageH, float n, float f);
    void setLightColor(float r, float g, float b);
    void setAmbientLight(float ambientLightIntensity);

    void moveCamera(int x, int z);
    void rotateCamera(float dPitch, float dYaw);
    void setCameraRotation(float pitch, float yaw);
    void randomizeLocation();

    float getPitch() { return scene_->getCamera()->getPitch(); }
    float getYaw() { return scene_->getCamera()->getYaw(); }
    uint8_t *getImageBufferLocation() { return renderer_->getImageBuffer(); }
};

#endif