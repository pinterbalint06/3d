#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <GLES3/gl3.h>
#include <vector>
#include <cmath>
#include <string>
#include "core/mesh.h"
#include "core/scene.h"
#include "core/vertex.h"
#include "core/renderer.h"
#include "core/material.h"
#include "core/shader.h"
#include "core/camera.h"
#include "core/texture.h"
#include "core/equirectangularEngine.h"

EquirectangularEngine *engine = nullptr;
int start = 0;

void init()
{
    std::string canvasID = "canvas";
    engine = new EquirectangularEngine(canvasID);
}

void rotateCamera(float dPitch, float dYaw)
{
    if (engine)
    {
        engine->rotateCamera(dPitch, dYaw);
    }
}

int initTexture(int width, int height)
{
    uint8_t *textureRet = nullptr;
    if (engine)
    {
        textureRet = engine->initTexture(width, height);
    }
    return (int)textureRet;
}

void uploadTextureToGPU()
{
    if (engine)
    {
        engine->uploadTextureToGPU();
    }
}

void render()
{
    if (engine)
    {
        engine->render();
    }
}

void changeFocalLength(float focal)
{
    if (engine)
    {
        engine->setFocalLength(focal);
    }
}

void startRenderingLoop()
{
    if (start == 0)
    {
        emscripten_set_main_loop(render, 0, 0);
        start++;
    }
}

EMSCRIPTEN_BINDINGS(my_module)
{
    emscripten::function("init", &init);
    emscripten::function("xyForog", &rotateCamera);
    emscripten::function("initTexture", &initTexture);
    emscripten::function("render", &render);
    emscripten::function("changeFocalLength", &changeFocalLength);
    emscripten::function("startRenderingLoop", &startRenderingLoop);
    emscripten::function("uploadTextureToGPU", &uploadTextureToGPU);
}
