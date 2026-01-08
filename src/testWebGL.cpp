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
#include <string>

EM_JS(int, getWindowWidth, (), {
    return window.innerWidth;
});

EM_JS(int, getWindowHeight, (), {
    return window.innerHeight;
});

Shaders::Shader *shaderProgram;
Terrain *terrain;
Scene *scene;
GLuint mvpLoc;
Renderer *renderer;

void setCanvasSize(int width, int height)
{
    scene->getCamera()->setImageDimensions(width, height);
    emscripten_set_canvas_element_size("#canvas", width, height);
    glViewport(0, 0, width, height);
}

void render()
{
    renderer->render(scene);
}

int main()
{
    scene = new Scene();

    int width = getWindowWidth();
    int height = getWindowHeight();
    scene->getCamera()->setPerspective(12.7f, 25.4f, 25.4f, width, height, 0.1f, 1000.0f);
    emscripten_set_canvas_element_size("#canvas", width, height);

    std::string canvID = "canvas";
    renderer = new Renderer(canvID);
    renderer->setImageDimensions(width, height);
    terrain = new Terrain(2048);
    terrain->setUpNoiseForGPU(renderer->getPerlinUBOloc());
    terrain->regenerate();
    scene->addMesh(terrain);
    terrain->setMaterial(Materials::Material::Grass());
    terrain->setUpOpenGL();
    glViewport(0, 0, width, height);

    emscripten_set_main_loop(render, 0, 1);
    return 0;
}

EMSCRIPTEN_BINDINGS(my_module)
{
    emscripten::function("updateCanvasSize", &setCanvasSize);
}
