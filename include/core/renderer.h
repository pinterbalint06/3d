#ifndef RENDERER_H
#define RENDERER_H

#include "core/shader.h"
#include "core/vertex.h"
#include <GLES3/gl3.h>
#include <string>
#include <map>

class Clipper;
class Scene;
class Camera;
class fpsCounter;
class Mesh;

class Renderer
{
private:
    int ctx_;
    Shaders::SHADINGMODE currShadingMode_;
    std::map<Shaders::SHADINGMODE, std::unique_ptr<Shaders::Shader>> shaderPrograms_;
    fpsCounter *fps;
    GLuint uboScene_, uboMat_, uboPerlin_, uboWarp_, uboMesh_;
    float rBuffer_, gBuffer_, bBuffer_;

    void createShadingPrograms();
    void updateSceneUBO(const Scene *scene);
    void updateMaterialUBO(const Materials::Material meshMat);
    void updateMeshUBO(Mesh *mesh);

public:
    Renderer(const std::string &canvasID);
    ~Renderer();

    GLuint *getPerlinUBOloc() { return &uboPerlin_; };
    GLuint *getWarpUBOloc() { return &uboWarp_; };
    void setShadingMode(Shaders::SHADINGMODE shadingMode);
    void setDefaultColor(float r, float g, float b)
    {
        rBuffer_ = r / 255.0f;
        gBuffer_ = g / 255.0f;
        bBuffer_ = b / 255.0f;
    };

    void setImageDimensions(int imageW, int imageH);
    void render(const Scene *scene);
};

#endif