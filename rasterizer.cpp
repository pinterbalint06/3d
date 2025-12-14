#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include "core/camera.h"
#include "core/mesh.h"
#include "core/terrain.h"
#include "core/distantLight.h"
#include "utils/mathUtils.h"
#include "core/shader.h"
#include "utils/frameBuffer.h"
#include "utils/edgeFunction.h"
#include "utils/clipping.h"
#include "core/scene.h"
#include "core/renderer.h"
#include <cmath>
#include <cstdlib>
#include <cstdint>
#include <algorithm>
#include <stdexcept>

int cameraLocation;
// kamera magassága a talajtól
float kameraMagassag;
// grass color
// 65 -> (65/255)^2.2=0.04943 albedo
// float rGrass = 0.04943;
// // 152 -> (152/255)^2.2=0.32038 albedo
// float gGrass = 0.32038f;
// // 10 -> (10/255)^2.2=0.000804 albedo
// float bGrass = 0.000804f;
// // dirt color
// // 155 -> (155/255)^2.2=0.33445
// float rDirt = 0.33445;
// // 118 -> (118/255)^2.2=0.1835489
// float gDirt = 0.1835489f;
// // 83  -> (83/255)^2.2=0.08464
// float bDirt = 0.08464f;
// scene to render
Scene *scene = nullptr;
// renderer
Renderer *renderer = nullptr;

void calcNewLocationCamera(int index)
{
    float *vertices = scene->getTerrain()->getMesh()->getVertices();
    scene->getCamera()->setPosition(vertices[index * 3], vertices[index * 3 + 1] + kameraMagassag, vertices[index * 3 + 2]);
}

void ujHely()
{
    cameraLocation = rand() % (scene->getTerrain()->getMesh()->getVertexCount() / 3);
    calcNewLocationCamera(cameraLocation);
}

int imageBufferSize()
{
    return 1000 * 1000 * 4;
}

void meretBeallit(int meretKert)
{
    scene = new Scene(meretKert);
    Mesh *mesh = scene->getTerrain()->getMesh();
    mesh->setRed(0.04943f);
    mesh->setGreen(0.32038f);
    mesh->setBlue(0.000804f);
    calcNewLocationCamera(cameraLocation);
}

EM_JS(void, renderJs, (), {
    render("canvas");
});

void setAntialias(int anti)
{
    renderer->setAntialias(anti);
    renderJs();
}

void newPerlinMap(int seed, float frequency, float lacunarity, float persistence, int octaves, float heightMultiplier)
{
    Terrain *worldTerrain = scene->getTerrain();
    worldTerrain->setFrequency(frequency);
    worldTerrain->setSeed(seed);
    worldTerrain->setLacunarity(lacunarity);
    worldTerrain->setPersistence(persistence);
    worldTerrain->setOctaves(octaves);
    worldTerrain->setHeightMultiplier(heightMultiplier);
    worldTerrain->regenerate();
    calcNewLocationCamera(cameraLocation);
    renderJs();
}

void newLightIntensity(float intensity)
{
    scene->getLight()->setIntensity(intensity);
    renderJs();
}

void newCameraHeight(float height)
{
    kameraMagassag = height;
    calcNewLocationCamera(cameraLocation);
    renderJs();
}

void newLightDirection(float x, float y)
{
    scene->getLight()->setDirection(x, y, 0.0f);
    renderJs();
}

void newGroundType(int type)
{

    // grass color
    // 65 -> (65/255)^2.2=0.04943 albedo
    // 152 -> (152/255)^2.2=0.32038 albedo
    // 10 -> (10/255)^2.2=0.000804 albedo

    // dirt color
    // 155 -> (155/255)^2.2=0.33445
    // 118 -> (118/255)^2.2=0.1835489
    // 83  -> (83/255)^2.2=0.08464

    Mesh *mesh = scene->getTerrain()->getMesh();
    switch (type)
    {
    case 0:
        mesh->setRed(0.04943f);
        mesh->setGreen(0.32038f);
        mesh->setBlue(0.000804f);
        break;
    case 1:
        mesh->setRed(0.33445f);
        mesh->setGreen(0.1835489f);
        mesh->setBlue(0.08464f);
        break;
    default:
        mesh->setRed(0.04943f);
        mesh->setGreen(0.32038f);
        mesh->setBlue(0.000804f);
        break;
    }
    renderJs();
}

void setShadingTechnique(int shading)
{
    renderer->setShadingMode(static_cast<Shaders::SHADINGMODE>(shading));
    renderJs();
}

void move(int z, int x)
{
    int size = scene->getTerrain()->getSize();
    int newLocation = cameraLocation + z * size + x;
    if (!((x == -1 && newLocation % size == size - 1) || (x == 1 && newLocation % size == 0) || (newLocation < 0) || (newLocation >= size * size)))
    {
        cameraLocation += z * size + x;
        calcNewLocationCamera(cameraLocation);
        renderJs();
    }
}

void xyForog(float dPitch, float dYaw)
{
    scene->getCamera()->rotate(dPitch, dYaw);
}

void setRotate(float pitch, float yaw)
{
    scene->getCamera()->setRotation(pitch, yaw);
}

float getXForog()
{
    return scene->getCamera()->getPitch();
}

float getYForog()
{
    return scene->getCamera()->getYaw();
}

void setFrustum(float focal, float filmW, float filmH, int imageW, int imageH, float n, float f)
{
    renderer->setFrustum(focal, filmW, filmH, imageW, imageH, n, f);
    scene->getCamera()->setPerspective(focal, filmW, filmH, imageW, imageH, n, f);
}

int render()
{
    renderer->render(scene);

    return (int)renderer->getImageBuffer();
}

void init()
{
    cameraLocation = 0;
    kameraMagassag = 3.8;
    renderer = new Renderer();
}

EMSCRIPTEN_BINDINGS(my_module)
{
    emscripten::function("init", &init);
    emscripten::function("render", &render);
    emscripten::function("imageBufferSize", &imageBufferSize);
    emscripten::function("ujHely", &ujHely);
    emscripten::function("meretBeallit", &meretBeallit);
    emscripten::function("setFrustum", &setFrustum);
    emscripten::function("xyForog", &xyForog);
    emscripten::function("setRotate", &setRotate);
    emscripten::function("getXForog", &getXForog);
    emscripten::function("getYForog", &getYForog);
    emscripten::function("setAntialias", &setAntialias);
    emscripten::function("newCameraHeight", &newCameraHeight);
    emscripten::function("newPerlinMap", &newPerlinMap);
    emscripten::function("newLightIntensity", &newLightIntensity);
    emscripten::function("newLightDirection", &newLightDirection);
    emscripten::function("mozgas", &move);
    emscripten::function("newGroundType", &newGroundType);
    emscripten::function("setShadingTechnique", &setShadingTechnique);
}