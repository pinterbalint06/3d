#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/html5.h>
#include <emscripten/html5_webgl.h>
#include <GLES3/gl3.h>
#include <core/terrain.h>
#include <core/mesh.h>
#include <core/camera.h>
#include <core/shader.h>

EM_JS(int, getWindowWidth, (), {
    return window.innerWidth;
});

EM_JS(int, getWindowHeight, (), {
    return window.innerHeight;
});

Shaders::Shader *shaderProgram;
Terrain *terrain;
Camera *cam;
GLuint mvpLoc;
double lastTime;
int frameCount;

void setCanvasSize(int width, int height)
{
    cam->setImageDimensions(width, height);
    emscripten_set_canvas_element_size("#canvas", width, height);
    glViewport(0, 0, width, height);
}

void fpsCounter()
{
    frameCount++;
    double currentTime = emscripten_get_now();

    if (currentTime - lastTime >= 1000.0)
    {
        EM_ASM({ console.log('FPS: ' + $0); }, frameCount);
        frameCount = 0;
        lastTime = currentTime;
    }
}

void render()
{
    fpsCounter();

    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    glUniformMatrix4fv(mvpLoc, 1, GL_FALSE, cam->getProjMatrix());

    glBindVertexArray(terrain->getMesh()->getVAO());

    glDrawElements(GL_TRIANGLES, terrain->getMesh()->getIndexCount(), GL_UNSIGNED_INT, 0);
    glBindVertexArray(0);
}

int main()
{
    EmscriptenWebGLContextAttributes attrs;
    emscripten_webgl_init_context_attributes(&attrs);
    attrs.majorVersion = 2;
    int ctx = emscripten_webgl_create_context("#canvas", &attrs);
    if (!ctx)
    {
        EM_ASM(
            throw('A böngésződ nem támogatja a WebGL-t!'););
    }
    else
    {
        emscripten_webgl_make_context_current(ctx);
        glClearColor(0, 0, 0, 1);
        EM_ASM(
            console.log('WebGL sikeresen inicializálva!'););

        shaderProgram = new Shaders::Shader("shaders/vertex.vert", "shaders/fragment.frag");
        shaderProgram->use();

        terrain = new Terrain(2048);
        terrain->regenerate();
        terrain->getMesh()->setUpOpenGL();

        glEnable(GL_DEPTH_TEST);
        lastTime = emscripten_get_now();
        frameCount = 0;

        cam = new Camera();
        int width = getWindowWidth();
        int height = getWindowHeight();
        cam->setPerspective(12.7f, 25.4f, 25.4f, width, height, 0.1f, 1000.0f);
        emscripten_set_canvas_element_size("#canvas", width, height);
        glViewport(0, 0, width, height);

        mvpLoc = glGetUniformLocation(shaderProgram->getProgramID(), "uMVP");

        emscripten_set_main_loop(render, 0, 1);
    }
    return 0;
}

EMSCRIPTEN_BINDINGS(my_module)
{
    emscripten::function("updateCanvasSize", &setCanvasSize);
}
