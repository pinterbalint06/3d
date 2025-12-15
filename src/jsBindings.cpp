#include <emscripten/emscripten.h>
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

void setTerrainParams(int seed, float frequency, float lacunarity, float persistence, int octaves, float heightMultiplier)
{
    if (gEngine)
    {
        gEngine->setTerrainParams(seed, frequency, lacunarity, persistence, octaves, heightMultiplier);
    }
}

void randomizeLocation()
{
    if (gEngine)
    {
        gEngine->randomizeLocation();
    }
}

void setAntialias(int anti)
{
    if (gEngine)
    {
        gEngine->setAntialias(anti);
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

void setGroundType(int type)
{
    if (gEngine)
    {
        gEngine->setGroundType(type);
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

int getImageBufferLocation()
{
    int returnValue = 0;
    if (gEngine)
    {
        returnValue = (int)gEngine->getImageBufferLocation();
    }
    return returnValue;
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
    emscripten::function("setAntialias", &setAntialias);
    emscripten::function("newCameraHeight", &newCameraHeight);
    emscripten::function("newPerlinMap", &setTerrainParams);
    emscripten::function("newLightIntensity", &setLightIntensity);
    emscripten::function("newLightDirection", &setLightDirection);
    emscripten::function("mozgas", &moveCamera);
    emscripten::function("newGroundType", &setGroundType);
    emscripten::function("setShadingTechnique", &setShadingMode);
    emscripten::function("getImageLocation", &getImageBufferLocation);
}