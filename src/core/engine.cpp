#include "core/engine.h"
#include "core/mesh.h"
#include "core/scene.h"
#include "core/renderer.h"
#include "core/vertex.h"
#include "core/texture.h"
#include <string>
#include <emscripten/html5.h>

Engine::Engine(std::string canvID)
{
    canvas_ = canvID;
    scene_ = new Scene();
    renderer_ = new Renderer(canvas_);
    setFrustum(18.0f, 25.4f, 25.4f, 1000, 1000, 0.1f, 1000.0f);
}

Engine::~Engine()
{
    if (scene_)
    {
        delete scene_;
    }
    if (renderer_)
    {
        delete renderer_;
    }
}

void Engine::setLightIntensity(float intensity)
{
    scene_->getLight()->setIntensity(intensity);
}

void Engine::setLightDirection(float x, float y, float z)
{
    scene_->getLight()->setDirection(x, y, z);
}

void Engine::setShadingMode(Shaders::SHADINGMODE shadingmode)
{
    renderer_->setShadingMode(shadingmode);
}

void Engine::setFrustum(float focal, float filmW, float filmH, int imageW, int imageH, float n, float f)
{
    renderer_->setImageDimensions(imageW, imageH);
    scene_->getCamera()->setPerspective(focal, filmW, filmH, imageW, imageH, n, f);
}

void Engine::setLightColor(float r, float g, float b)
{
    scene_->getLight()->setColor(r, g, b);
}

void Engine::setAmbientLight(float ambientLightIntensity)
{
    scene_->setAmbientLight(ambientLightIntensity);
}

void Engine::setFocalLength(float focal)
{
    scene_->getCamera()->setFocalLength(focal);
}

void Engine::setCanvasSize(int width, int height)
{
    scene_->getCamera()->setImageDimensions(width, height);
    std::string canvID = "#" + canvas_;
    emscripten_set_canvas_element_size(canvID.c_str(), width, height);
    renderer_->setImageDimensions(width, height);
}

void Engine::rotateCamera(float dPitch, float dYaw)
{
    scene_->getCamera()->rotate(dPitch, dYaw);
}

void Engine::setCameraRotation(float pitch, float yaw)
{

    scene_->getCamera()->setRotation(pitch, yaw);
}

uint8_t *Engine::initTexture(int width, int height)
{
    deleteTexture();
    Texture *texture = new Texture(width, height);
    Materials::Material newTexMat = scene_->getMesh(0)->getMaterial();
    newTexMat.texture = texture;
    scene_->getMesh(0)->setMaterial(newTexMat);
    return texture->getImgData();
}

void Engine::uploadTextureToGPU()
{
    scene_->getMesh(0)->getMaterial().texture->uploadToGPU();
}

void Engine::deleteTexture()
{
    if (scene_->getMesh(0)->getMaterial().texture != nullptr)
    {
        delete scene_->getMesh(0)->getMaterial().texture;
        Materials::Material newTexMat = scene_->getMesh(0)->getMaterial();
        newTexMat.texture = nullptr;
        scene_->getMesh(0)->setMaterial(newTexMat);
    }
}
