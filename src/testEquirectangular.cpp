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

Renderer *renderer = nullptr;
Scene *scene = nullptr;
Texture *texture = nullptr;
int start = 0;

Mesh *generateSphere(int rings, int segments, float radius)
{
    Mesh *mesh = new Mesh((rings + 1) * (segments + 1), rings * segments * 6);
    Vertex *vertices = mesh->getVertices();

    int count = 0;
    for (int lat = 0; lat <= rings; lat++)
    {
        float theta = lat * M_PI / rings;
        float sinTheta = sin(theta);
        float cosTheta = cos(theta);

        for (int lon = 0; lon <= segments; lon++)
        {
            float phi = lon * 2.0f * M_PI / segments;
            float sinPhi = sin(phi);
            float cosPhi = cos(phi);

            float x = cosPhi * sinTheta;
            float y = cosTheta;
            float z = sinPhi * sinTheta;

            Vertex vert;
            vert.x = x * radius;
            vert.y = y * radius;
            vert.z = z * radius;
            vert.w = 1.0f;
            vert.nx = -x;
            vert.ny = -y;
            vert.nz = -z;
            float u = (float)lon / segments;
            float v = (float)lat / rings;
            vert.u = u;
            vert.v = v;

            vertices[count++] = vert;
        }
    }
    uint32_t *indices = mesh->getIndices();

    count = 0;
    for (int lat = 0; lat < rings; lat++)
    {
        for (int lon = 0; lon < segments; lon++)
        {
            int first = (lat * (segments + 1)) + lon;
            int second = first + segments + 1;

            // first triangle
            indices[count++] = first;
            indices[count++] = second;
            indices[count++] = first + 1;

            // second triangle
            indices[count++] = second;
            indices[count++] = second + 1;
            indices[count++] = first + 1;
        }
    }

    mesh->setMaterial(Materials::Material::Grass());

    return mesh;
}

void init(int size, float focal, float filmW, float filmH, int imageW, int imageH, float n, float f)
{
    std::string canvasID = "canvas";
    renderer = new Renderer(canvasID);
    scene = new Scene();
    renderer->setImageDimensions(imageW, imageH);
    scene->getCamera()->setPerspective(focal, filmW, filmH, imageW, imageH, n, f);
    renderer->setShadingMode(Shaders::SHADINGMODE::NO_SHADING);
    scene->setMesh(generateSphere(32, 32, 10.0f));
    scene->getMesh()->setUpOpenGL();
}

void rotateCamera(float dPitch, float dYaw)
{
    if (scene && renderer)
    {
        scene->getCamera()->rotate(dPitch, dYaw);
    }
}

int initTexture(int width, int height)
{
    texture = new Texture(width, height);
    Materials::Material newTexMat = Materials::Material::Grass();
    newTexMat.texture = texture;
    scene->getMesh()->setMaterial(newTexMat);
    return (int)texture->getImgData();
}

void uploadTextureToGPU()
{
    texture->uploadToGPU();
}

void render()
{
    if (scene && renderer)
    {
        renderer->render(scene);
    }
}

void changeFocalLength(float focal)
{
    if (scene && renderer)
    {
        scene->getCamera()->setFocalLength(focal);
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
