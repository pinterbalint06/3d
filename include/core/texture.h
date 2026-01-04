#ifndef TEXTURE_H
#define TEXTURE_H

#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <cstdint>

typedef unsigned int GLuint;

class Texture
{
private:
    int width_;
    int height_;
    uint8_t *imgData_;
    GLuint textureGL_;

public:
    Texture(int width, int height);
    ~Texture();

    int getWidth() { return width_; }
    int getHeight() { return height_; }

    uint8_t *getImgData() { return imgData_; }
    GLuint getGPULoc() { return textureGL_; }

    void uploadToGPU();
};
#endif