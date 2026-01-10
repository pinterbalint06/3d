#ifndef ENGINE_H
#define ENGINE_H

#include "core/scene.h"
#include "core/camera.h"
#include "core/shader.h"
#include "core/renderer.h"
#include "core/material.h"

class Terrain;
class Mesh;

class Engine
{
private:
    Scene *scene_;
    Terrain *terrain_;
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
    void setTerrainParams(int size, int seed, float frequency, float lacunarity, float persistence, int octaves, float heightMultiplier, int contrast);
    void setLightIntensity(float intensity);
    void setShadingMode(Shaders::SHADINGMODE shadingmode);
    void setFrustum(float focal, float filmW, float filmH, int imageW, int imageH, float n, float f);
    void setLightColor(float r, float g, float b);
    void setAmbientLight(float ambientLightIntensity);
    void setFocalLength(float focal);
    void setTextureSpacing(float textureSpacing);
    void setSteepness(float steepness);

    void moveCamera(int x, int z);
    void rotateCamera(float dPitch, float dYaw);
    void setCameraRotation(float pitch, float yaw);
    void randomizeLocation();
    void render() { renderer_->render(scene_); };
    uint8_t *initTexture(int width, int height);
    void uploadTextureToGPU();
    void deleteTexture();

    float getPitch() { return scene_->getCamera()->getPitch(); }
    float getYaw() { return scene_->getCamera()->getYaw(); }

    void addMesh(Mesh *mesh) { scene_->addMesh(mesh); }
};

#endif