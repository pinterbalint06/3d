#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/html5.h>
#include <emscripten/html5_webgl.h>
#include <GLES3/gl3.h>
#include <core/terrain.h>
#include <core/mesh.h>
#include <core/camera.h>
#include <core/shader.h>
#include <core/scene.h>
#include <core/renderer.h>
#include <core/terrainEngine.h>
#include <string>

EM_JS(int, getWindowWidth, (), {
    return window.innerWidth;
});

EM_JS(int, getWindowHeight, (), {
    return window.innerHeight;
});

TerrainEngine *terrainEngine;

void setCanvasSize(int width, int height)
{
    if (terrainEngine)
    {
        terrainEngine->setCanvasSize(width, height);
    }
}

void render()
{
    if (terrainEngine)
    {
        terrainEngine->render();
    }
}

int main()
{
    int width = getWindowWidth();
    int height = getWindowHeight();
    terrainEngine = new TerrainEngine("canvas", 256);
    terrainEngine->setCanvasSize(width, height);

    emscripten_set_main_loop(render, 0, 1);
    return 0;
}

EMSCRIPTEN_BINDINGS(my_module)
{
    emscripten::function("updateCanvasSize", &setCanvasSize);
}
