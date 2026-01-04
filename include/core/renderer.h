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

struct SceneData
{
    float MVP[16];              // 0
    float camPos[3];            // 64
    float pad0;                 // 76
    float lightVec[3];          // 80
    float pad1;                 // 92
    float lightColor[3];        // 96
    float pad2;                 // 108
    float lightColorPreCalc[3]; // 112
    float pad3;                 // 124
    float ambientLight;         // 128
    float pad4[3];              // 132->144
};

class Renderer
{
private:
    int imageWidth_, imageHeight_;
    Shaders::SHADINGMODE currShadingMode_;
    std::map<Shaders::SHADINGMODE, std::unique_ptr<Shaders::Shader>> shaderPrograms_;
    fpsCounter *fps;
    GLuint uboScene_, uboMat_;
    float rBuffer_, gBuffer_, bBuffer_;

    void createShadingPrograms();

public:
    Renderer(std::string &canvasID);
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