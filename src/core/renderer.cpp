#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/html5.h>
#include <emscripten/html5_webgl.h>
#include <GLES3/gl3.h>
#include <core/renderer.h>
#include "core/shader.h"
#include "core/scene.h"
#include "core/material.h"
#include "core/camera.h"
#include "core/distantLight.h"
#include "core/mesh.h"
#include "core/terrain.h"
#include "utils/mathUtils.h"
#include "utils/fpsCounter.h"
#include "core/vertex.h"
#include <cstring>
#include <map>

Renderer::Renderer(std::string &canvasID)
{
    imageWidth_ = 100;
    imageHeight_ = 100;
    rBuffer_ = 0.0f;
    gBuffer_ = 0.0f;
    bBuffer_ = 0.0f;
    currShadingMode_ = Shaders::SHADINGMODE::PHONG;
    EmscriptenWebGLContextAttributes attrs;
    emscripten_webgl_init_context_attributes(&attrs);
    attrs.majorVersion = 2;
    ctx_ = emscripten_webgl_create_context(("#" + canvasID).c_str(), &attrs);
    if (!ctx_)
    {
        EM_ASM(
            throw('A böngésződ nem támogatja a WebGL-t!'););
    }
    emscripten_webgl_make_context_current(ctx_);
    glClearColor(rBuffer_, gBuffer_, bBuffer_, 1);

    // scene ubo
    glGenBuffers(1, &uboScene_);
    glBindBuffer(GL_UNIFORM_BUFFER, uboScene_);
    glBufferData(GL_UNIFORM_BUFFER, sizeof(SceneData), NULL, GL_STATIC_DRAW);
    glBindBuffer(GL_UNIFORM_BUFFER, 0);
    glBindBufferRange(GL_UNIFORM_BUFFER, 0, uboScene_, 0, sizeof(SceneData));

    // material ubo
    glGenBuffers(1, &uboMat_);
    glBindBuffer(GL_UNIFORM_BUFFER, uboMat_);
    glBufferData(GL_UNIFORM_BUFFER, sizeof(Materials::MaterialData), NULL, GL_STATIC_DRAW);
    glBindBuffer(GL_UNIFORM_BUFFER, 0);
    glBindBufferRange(GL_UNIFORM_BUFFER, 1, uboMat_, 0, sizeof(Materials::MaterialData));

    // perlin ubo
    glGenBuffers(1, &uboPerlin_);
    glBindBuffer(GL_UNIFORM_BUFFER, uboPerlin_);
    glBufferData(GL_UNIFORM_BUFFER, sizeof(PerlinNoise::PerlinParameters), NULL, GL_STATIC_DRAW);
    glBindBuffer(GL_UNIFORM_BUFFER, 0);
    glBindBufferRange(GL_UNIFORM_BUFFER, 2, uboPerlin_, 0, sizeof(PerlinNoise::PerlinParameters));

    // mesh ubo
    glGenBuffers(1, &uboMesh_);
    glBindBuffer(GL_UNIFORM_BUFFER, uboMesh_);
    glBufferData(GL_UNIFORM_BUFFER, sizeof(MeshData), NULL, GL_STATIC_DRAW);
    glBindBuffer(GL_UNIFORM_BUFFER, 0);
    glBindBufferRange(GL_UNIFORM_BUFFER, 3, uboMesh_, 0, sizeof(MeshData));

    createShadingPrograms();
    shaderPrograms_[currShadingMode_]->use();

    glEnable(GL_DEPTH_TEST);

    fps = new fpsCounter();
}

Renderer::~Renderer()
{
    if (uboScene_ != 0)
    {
        glDeleteBuffers(1, &uboScene_);
    }
    if (uboMat_ != 0)
    {
        glDeleteBuffers(1, &uboMat_);
    }
    if (uboPerlin_ != 0)
    {
        glDeleteBuffers(1, &uboPerlin_);
    }
    if (uboMesh_ != 0)
    {
        glDeleteBuffers(1, &uboMesh_);
    }
    if (fps)
    {
        delete fps;
    }
    if (ctx_)
    {
        emscripten_webgl_destroy_context(ctx_);
    }
}

void Renderer::createShadingPrograms()
{
    shaderPrograms_[Shaders::SHADINGMODE::GOURAUD] =
        std::make_unique<Shaders::Shader>("shaders/gouraud.vert", "shaders/gouraud.frag");
    shaderPrograms_[Shaders::SHADINGMODE::PHONG] =
        std::make_unique<Shaders::Shader>("shaders/phong.vert", "shaders/phong.frag");
    shaderPrograms_[Shaders::SHADINGMODE::NO_SHADING] =
        std::make_unique<Shaders::Shader>("shaders/noShader.vert", "shaders/noShader.frag");
}

void Renderer::setShadingMode(Shaders::SHADINGMODE shadingMode)
{
    currShadingMode_ = shadingMode;
    shaderPrograms_[currShadingMode_]->use();
}

void Renderer::setImageDimensions(int imageW, int imageH)
{
    imageWidth_ = imageW;
    imageHeight_ = imageH;
}

void Renderer::updateSceneUBO(const Scene *scene)
{
    SceneData currSceneData;
    // camera
    Camera *mainCamera = scene->getCamera();
    currSceneData.camPos[0] = mainCamera->getXPosition();
    currSceneData.camPos[1] = mainCamera->getYPosition();
    currSceneData.camPos[2] = mainCamera->getZPosition();
    mainCamera->updateViewMatrix();
    MathUtils::multiplyMatrix(mainCamera->getViewMatrix(), mainCamera->getProjMatrix(), currSceneData.VP);

    // light
    DistantLight *sun = scene->getLight();
    float ambientLight = scene->getAmbientLight();
    float lightVec[3];
    const float *lightDir = sun->getDirection();
    currSceneData.lightVec[0] = -lightDir[0];
    currSceneData.lightVec[1] = -lightDir[1];
    currSceneData.lightVec[2] = -lightDir[2];

    currSceneData.lightColor[0] = sun->getRed();
    currSceneData.lightColor[1] = sun->getGreen();
    currSceneData.lightColor[2] = sun->getBlue();

    currSceneData.lightColorPreCalc[0] = sun->getRedCalculated();
    currSceneData.lightColorPreCalc[1] = sun->getGreenCalculated();
    currSceneData.lightColorPreCalc[2] = sun->getBlueCalculated();
    currSceneData.ambientLight = scene->getAmbientLight();

    // upload to GPU
    glBindBuffer(GL_UNIFORM_BUFFER, uboScene_);
    glBufferSubData(GL_UNIFORM_BUFFER, 0, sizeof(SceneData), &currSceneData);
    glBindBuffer(GL_UNIFORM_BUFFER, 0);
}

void Renderer::updateMaterialUBO(const Materials::Material meshMat)
{
    Materials::Color meshCol = meshMat.albedo;
    Materials::MaterialData currMatData;
    currMatData.albedo[0] = meshCol.r;
    currMatData.albedo[1] = meshCol.g;
    currMatData.albedo[2] = meshCol.b;

    currMatData.diffuseness = meshMat.diffuseness;
    currMatData.specularity = meshMat.specularity;
    currMatData.shininess = meshMat.shininess;

    int useTexture = 0;

    if (meshMat.texture != nullptr)
    {
        glActiveTexture(GL_TEXTURE0);
        glBindTexture(GL_TEXTURE_2D, meshMat.texture->getGPULoc());
        shaderPrograms_[currShadingMode_]->setUniformInt("uTexture0", 0);
        useTexture = 1;
    }

    shaderPrograms_[currShadingMode_]->setUniformInt("uUseTexture", useTexture);

    glBindBuffer(GL_UNIFORM_BUFFER, uboMat_);
    glBufferSubData(GL_UNIFORM_BUFFER, 0, sizeof(Materials::MaterialData), &currMatData);
    glBindBuffer(GL_UNIFORM_BUFFER, 0);
}

void Renderer::updateMeshUBO(Mesh *mesh)
{
    // update mesh data
    MeshData currMeshData;
    std::memcpy(currMeshData.modelMatrix, mesh->getModelMatrix(), 16 * sizeof(float));

    glBindBuffer(GL_UNIFORM_BUFFER, uboMesh_);
    glBufferSubData(GL_UNIFORM_BUFFER, 0, sizeof(MeshData), &currMeshData);
    glBindBuffer(GL_UNIFORM_BUFFER, 0);

    // update material
    updateMaterialUBO(mesh->getMaterial());

    // if terrain upload perlin noise data for analytical normal calculation
    int isTerrain = 0;
    Terrain *terrain = dynamic_cast<Terrain *>(mesh);
    if (terrain != nullptr)
    {
        isTerrain = 1;
        glActiveTexture(GL_TEXTURE5);
        glBindTexture(GL_TEXTURE_2D, terrain->getPermGPULoc());
        shaderPrograms_[currShadingMode_]->setUniformInt("uPermutationTable", 5);
        glActiveTexture(GL_TEXTURE6);
        glBindTexture(GL_TEXTURE_2D, terrain->getGradGPULoc());
        shaderPrograms_[currShadingMode_]->setUniformInt("uGradients", 6);
    }

    shaderPrograms_[currShadingMode_]->setUniformInt("uIsTerrain", isTerrain);
}

void Renderer::render(const Scene *scene)
{
    fps->update();
    // clear buffers
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    // update uniform buffer objects
    updateSceneUBO(scene);

    for (int i = 0; i < scene->getMeshCount(); i++)
    {
        Mesh *currMesh = scene->getMesh(i);
        updateMeshUBO(currMesh);

        // bind current mesh
        glBindVertexArray(currMesh->getVAO());

        // draw mesh
        glDrawElements(GL_TRIANGLES, currMesh->getIndexCount(), GL_UNSIGNED_INT, 0);
        // unbind mesh
        glBindVertexArray(0);
    }
}
