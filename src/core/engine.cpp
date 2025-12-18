#include "core/engine.h"
#include "core/mesh.h"
#include "core/scene.h"
#include "core/renderer.h"
#include "core/terrain.h"

Engine::Engine(int size)
{
    scene_ = new Scene(size);
    Mesh *mesh = scene_->getTerrain()->getMesh();
    mesh->setMaterial(Materials::Material::Grass());
    renderer_ = new Renderer();
    cameraHeight_ = 3.8;
    cameraLocation_ = 0;
    calcNewCamLoc();
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

void Engine::calcNewCamLoc()
{
    float *vertices = scene_->getTerrain()->getMesh()->getVertices();
    scene_->getCamera()->setPosition(vertices[cameraLocation_ * 3], vertices[cameraLocation_ * 3 + 1] + cameraHeight_, vertices[cameraLocation_ * 3 + 2]);
}

void Engine::randomizeLocation()
{
    cameraLocation_ = rand() % (scene_->getTerrain()->getMesh()->getVertexCount() / 3);
    calcNewCamLoc();
    renderer_->render(scene_);
}

void Engine::setAntialias(int antialias)
{
    renderer_->setAntialias(antialias);
    renderer_->render(scene_);
}

void Engine::setTerrainParams(int size, int seed, float frequency, float lacunarity, float persistence, int octaves, float heightMultiplier)
{
    Terrain *worldTerrain = scene_->getTerrain();
    Mesh *mesh = worldTerrain->getMesh();
    Materials::Material mat = mesh->getMaterial();
    worldTerrain->setSize(size);
    mesh->setMaterial(Materials::Material::Grass());
    worldTerrain->setFrequency(frequency);
    worldTerrain->setSeed(seed);
    worldTerrain->setLacunarity(lacunarity);
    worldTerrain->setPersistence(persistence);
    worldTerrain->setOctaves(octaves);
    worldTerrain->setHeightMultiplier(heightMultiplier);
    worldTerrain->regenerate();
    calcNewCamLoc();
    renderer_->render(scene_);
}

void Engine::setLightIntensity(float intensity)
{
    scene_->getLight()->setIntensity(intensity);
    renderer_->render(scene_);
}

void Engine::setCameraHeight(float cameraHeight)
{
    cameraHeight_ = cameraHeight;
    calcNewCamLoc();
    renderer_->render(scene_);
}

void Engine::setLightDirection(float x, float y, float z)
{
    scene_->getLight()->setDirection(x, y, z);
    renderer_->render(scene_);
}

void Engine::setGroundMaterial(Materials::Material material)
{
    scene_->getTerrain()->getMesh()->setMaterial(material);
    renderer_->render(scene_);
}

void Engine::setShadingMode(Shaders::SHADINGMODE shadingmode)
{
    renderer_->setShadingMode(shadingmode);
    renderer_->render(scene_);
}

void Engine::setFrustum(float focal, float filmW, float filmH, int imageW, int imageH, float n, float f)
{

    renderer_->setImageDimensions(imageW, imageH);
    scene_->getCamera()->setPerspective(focal, filmW, filmH, imageW, imageH, n, f);
    renderer_->render(scene_);
}

void Engine::setLightColor(float r, float g, float b)
{
    scene_->getLight()->setColor(r, g, b);
    renderer_->render(scene_);
}

void Engine::setAmbientLight(float ambientLightIntensity)
{
    scene_->setAmbientLight(ambientLightIntensity);
    renderer_->render(scene_);
}

void Engine::setMapSpacing(float mapSpacing)
{
    scene_->getTerrain()->setSpacing(mapSpacing);
    calcNewCamLoc();
    renderer_->render(scene_);
}

void Engine::moveCamera(int x, int z)
{
    int size = scene_->getTerrain()->getSize();
    int newLocation = cameraLocation_ + z * size + x;
    if (!((x == -1 && newLocation % size == size - 1) || (x == 1 && newLocation % size == 0) || (newLocation < 0) || (newLocation >= size * size)))
    {
        cameraLocation_ += z * size + x;
        calcNewCamLoc();
        renderer_->render(scene_);
    }
}

void Engine::rotateCamera(float dPitch, float dYaw)
{
    scene_->getCamera()->rotate(dPitch, dYaw);
    renderer_->render(scene_);
}

void Engine::setCameraRotation(float pitch, float yaw)
{

    scene_->getCamera()->setRotation(pitch, yaw);
    renderer_->render(scene_);
}
