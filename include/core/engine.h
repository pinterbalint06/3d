#ifndef ENGINE_H
#define ENGINE_H

#include <cstdint>
#include "core/scene.h"
#include "core/camera.h"
#include "core/shader.h"
#include "core/renderer.h"

class Mesh;

class Engine
{
protected:
    Scene *scene_;
    Renderer *renderer_;
    std::string canvas_;

public:
    Engine(std::string canvID);
    virtual ~Engine();

    void setLightDirection(float x, float y, float z);

    void setLightIntensity(float intensity);
    void setShadingMode(Shaders::SHADINGMODE shadingmode);
    void setFrustum(float focal, float filmW, float filmH, int imageW, int imageH, float n, float f);
    void setLightColor(float r, float g, float b);
    void setAmbientLight(float ambientLightIntensity);
    void setFocalLength(float focal);
    void setCanvasSize(int width, int height);

    void rotateCamera(float dPitch, float dYaw);
    void setCameraRotation(float pitch, float yaw);
    void render() { renderer_->render(scene_); };
    uint8_t *initTexture(int width, int height);
    void uploadTextureToGPU();
    void deleteTexture();

    float getPitch() { return scene_->getCamera()->getPitch(); }
    float getYaw() { return scene_->getCamera()->getYaw(); }

    void addMesh(Mesh *mesh) { scene_->addMesh(mesh); }
};

#endif