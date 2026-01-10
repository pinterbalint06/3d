#include "core/engine.h"
#include "core/mesh.h"
#include "core/scene.h"
#include "core/renderer.h"
#include "core/terrain.h"
#include "core/vertex.h"
#include "core/texture.h"
#include <string>

Engine::Engine(int size)
{
    scene_ = new Scene();
    std::string canvID = "canvas";
    renderer_ = new Renderer(canvID);
    terrain_ = new Terrain(size);
    terrain_->setUpNoiseForGPU(renderer_->getPerlinUBOloc());
    terrain_->setMaterial(Materials::Material::Grass());
    scene_->addMesh(terrain_);
    renderer_->setDefaultColor(135.0f, 206.0f, 235.0f);
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
    if (terrain_)
    {
        delete terrain_;
    }
    if (renderer_)
    {
        delete renderer_;
    }
}

void Engine::calcNewCamLoc()
{
    Vertex vertex = terrain_->getVertices()[cameraLocation_];
    Vertex worldSpaceVert;
    worldSpaceVert.x = vertex.x;
    worldSpaceVert.y = vertex.y;
    worldSpaceVert.z = vertex.z;
    worldSpaceVert.w = vertex.w;

    float *modelMatrix = terrain_->getModelMatrix();
    worldSpaceVert.multWithMatrix(modelMatrix);
    scene_->getCamera()->setPosition(worldSpaceVert.x, worldSpaceVert.y + cameraHeight_, worldSpaceVert.z);
}

void Engine::randomizeLocation()
{
    cameraLocation_ = rand() % (terrain_->getVertexCount());
    calcNewCamLoc();
}

void Engine::setTerrainParams(int size, int seed, float frequency, float lacunarity, float persistence, int octaves, float heightMultiplier, int contrast)
{
    terrain_->setFrequency(frequency);
    terrain_->setSeed(seed);
    terrain_->setLacunarity(lacunarity);
    terrain_->setPersistence(persistence);
    terrain_->setOctaves(octaves);
    terrain_->setHeightMultiplier(heightMultiplier);
    terrain_->setContrast(contrast);
    if (terrain_->getSize() != size)
    {
        terrain_->setSize(size);
    }
    else
    {
        terrain_->regenerate();
    }
    calcNewCamLoc();
}

void Engine::setLightIntensity(float intensity)
{
    scene_->getLight()->setIntensity(intensity);
}

void Engine::setCameraHeight(float cameraHeight)
{
    cameraHeight_ = cameraHeight;
    calcNewCamLoc();
}

void Engine::setLightDirection(float x, float y, float z)
{
    scene_->getLight()->setDirection(x, y, z);
}

void Engine::setGroundMaterial(Materials::Material material)
{
    terrain_->setMaterial(material);
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

void Engine::setTextureSpacing(float textureSpacing)
{
    terrain_->setTextureSpacing(textureSpacing);
}

void Engine::setSteepness(float steepness)
{
    terrain_->setSteepness(steepness);
};

void Engine::moveCamera(int x, int z)
{
    int size = terrain_->getSize();
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
