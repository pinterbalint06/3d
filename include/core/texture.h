#ifndef TEXTURE_H
#define TEXTURE_H

#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <cstdint>
#include <string>

typedef unsigned int GLuint;

class Texture
{
private:
    int width_;
    int height_;
    uint8_t *imgData_;
    GLuint textureGL_;

    void initGL();

public:
    Texture();
    Texture(int width, int height);
    ~Texture();

    int getWidth() { return width_; }
    int getHeight() { return height_; }

    uint8_t *getImgData() { return imgData_; }
    GLuint getTextureIndex() const { return textureGL_; }

    void loadFromUrl(const std::string &url);
    void uploadToGPU();
    void bind(int location);
};
#endif