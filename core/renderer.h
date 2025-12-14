#ifndef RENDERER_H
#define RENDERER_H

#include "shader.h"
#include "../utils/frameBuffer.h"

class Clipper;
class Scene;
class Camera;

class Renderer
{
private:
    int imageWidth_, imageHeight_;
    int antialias_;
    // subpixels count
    int sqrAntialias_;
    // one subpixel's width and height
    int32_t sqrAntialiasRec_;
    // half of one subpixel's width and height
    // >> 1 = / 2
    int32_t inc_;
    float *projectedTriangles_;
    int projectedTrianglesSize_;
    Shaders::SHADINGMODE currShadingMode_;
    float *p0_;
    float *p1_;
    float *p2_;
    float *normal_;
    Clipper *clipper_;
    FrameBuffer *frameBuffer_;

    template <typename StructShader>
    void renderTemplate(const Scene *scene);

    void projectAndClipTriangle(const int &i0, const int &i1, const int &i2, float *normal, float *vertices, Camera *mainCamera);

public:
    Renderer();
    ~Renderer();

    uint8_t *getImageBuffer() const { return frameBuffer_->getImageBuffer(); };

    void setAntialias(int antialias);
    void setShadingMode(Shaders::SHADINGMODE shadingMode);

    void setFrustum(float focal, float filmW, float filmH, int imageW, int imageH, float n, float f);
    void render(const Scene *scene);
};

#endif