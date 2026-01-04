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