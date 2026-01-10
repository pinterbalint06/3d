#include <emscripten.h>
#include <emscripten/bind.h>
#include "core/engine.h"

// Game engine
Engine *gEngine = nullptr;

void setFrustum(float focal, float filmW, float filmH, int imageW, int imageH, float n, float f)
{
    if (gEngine)
    {
        gEngine->setFrustum(focal, filmW, filmH, imageW, imageH, n, f);
    }
}

void init(int size, float focal, float filmW, float filmH, int imageW, int imageH, float n, float f)
{
    gEngine = new Engine(size);
    setFrustum(focal, filmW, filmH, imageW, imageH, n, f);
}

void setTerrainParams(int size, int seed, float frequency, float lacunarity, float persistence, int octaves, float heightMultiplier, int contrast)
{
    if (gEngine)
    {
        gEngine->setTerrainParams(size, seed, frequency, lacunarity, persistence, octaves, heightMultiplier, contrast);
    }
}

void randomizeLocation()
{
    if (gEngine)
    {
        gEngine->randomizeLocation();
    }
}

void setLightIntensity(float intensity)
{
    if (gEngine)
    {
        gEngine->setLightIntensity(intensity);
    }
}

void newCameraHeight(float height)
{
    if (gEngine)
    {
        gEngine->setCameraHeight(height);
    }
}

void setLightDirection(float x, float y)
{
    if (gEngine)
    {
        gEngine->setLightDirection(x, y, 0.0f);
    }
}

void setGroundMaterial(int r, int g, int b, float diff, float spec, float shin)
{
    if (gEngine)
    {
        Materials::Material ground;
        ground.albedo = Materials::Color::fromRGB(r, g, b);
        ground.diffuseness = diff;
        ground.specularity = spec;
        ground.shininess = shin;
        gEngine->setGroundMaterial(ground);
    }
}

void setShadingMode(int shading)
{
    if (gEngine)
    {
        gEngine->setShadingMode(static_cast<Shaders::SHADINGMODE>(shading));
    }
}

void moveCamera(int z, int x)
{
    if (gEngine)
    {
        gEngine->moveCamera(x, z);
    }
}

void rotateCamera(float dPitch, float dYaw)
{
    if (gEngine)
    {
        gEngine->rotateCamera(dPitch, dYaw);
    }
}

void setRotate(float pitch, float yaw)
{
    if (gEngine)
    {
        gEngine->setCameraRotation(pitch, yaw);
    }
}

float getPitch()
{
    float returnValue = 0.0f;
    if (gEngine)
    {
        returnValue = gEngine->getPitch();
    }
    return returnValue;
}

float getYaw()
{
    float returnValue = 0.0f;
    if (gEngine)
    {
        returnValue = gEngine->getYaw();
    }
    return returnValue;
}

void setMaterialGrass()
{
    if (gEngine)
    {
        gEngine->setGroundMaterial(Materials::Material::Grass());
    }
}

void setMaterialDirt()
{
    if (gEngine)
    {
        gEngine->setGroundMaterial(Materials::Material::Dirt());
    }
}

void setLightColor(int r, int g, int b)
{
    if (gEngine)
    {
        gEngine->setLightColor(r / 255.0f, g / 255.0f, b / 255.0f);
    }
}

void setAmbientLight(float ambientLightIntensity)
{
    if (gEngine)
    {
        gEngine->setAmbientLight(ambientLightIntensity);
    }
}

void render()
{
    if (gEngine)
    {
        gEngine->render();
    }
}

void changeFocalLength(float focal)
{
    if (gEngine)
    {
        gEngine->setFocalLength(focal);
    }
}

void startRenderingLoop()
{
    if (gEngine)
    {
        emscripten_set_main_loop(render, 0, 0);
    }
}

int initTexture(int width, int height)
{
    uint8_t *returnPtr = nullptr;
    if (gEngine)
    {
        returnPtr = gEngine->initTexture(width, height);
    }

    return (int)returnPtr;
}

void uploadTextureToGPU()
{
    if (gEngine)
    {
        gEngine->uploadTextureToGPU();
    }
}

void deleteTexture()
{
    if (gEngine)
    {
        gEngine->deleteTexture();
    }
}

void setTextureSpacing(float textureSpacing)
{
    if (gEngine)
    {
        gEngine->setTextureSpacing(textureSpacing);
    }
}

void setSteepness(float steepness)
{
    if (gEngine)
    {
        gEngine->setSteepness(steepness);
    }
}

EMSCRIPTEN_BINDINGS(my_module)
{
    emscripten::function("init", &init);
    emscripten::function("ujHely", &randomizeLocation);
    emscripten::function("setFrustum", &setFrustum);
    emscripten::function("xyForog", &rotateCamera);
    emscripten::function("setRotate", &setRotate);
    emscripten::function("getXForog", &getPitch);
    emscripten::function("getYForog", &getYaw);
    emscripten::function("newCameraHeight", &newCameraHeight);
    emscripten::function("newPerlinMap", &setTerrainParams);
    emscripten::function("newLightIntensity", &setLightIntensity);
    emscripten::function("newLightDirection", &setLightDirection);
    emscripten::function("mozgas", &moveCamera);
    emscripten::function("setGroundMaterial", &setGroundMaterial);
    emscripten::function("setMaterialGrass", &setMaterialGrass);
    emscripten::function("setMaterialDirt", &setMaterialDirt);
    emscripten::function("setLightColor", &setLightColor);
    emscripten::function("setAmbientLight", &setAmbientLight);
    emscripten::function("setShadingTechnique", &setShadingMode);
    emscripten::function("render", &render);
    emscripten::function("changeFocalLength", &changeFocalLength);
    emscripten::function("startRenderingLoop", &startRenderingLoop);
    emscripten::function("initTexture", &initTexture);
    emscripten::function("uploadTextureToGPU", &uploadTextureToGPU);
    emscripten::function("deleteTexture", &deleteTexture);
    emscripten::function("setTextureSpacing", &setTextureSpacing);
    emscripten::function("setSteepness", &setSteepness);
}