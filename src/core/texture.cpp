#include "core/texture.h"
#include <vector>
#include <algorithm>
#include <cmath>
#include <cstdint>
#include <GLES3/gl3.h>

Texture::Texture(int width, int height)
{
    width_ = width;
    height_ = height;
    imgData_ = (uint8_t *)malloc(width_ * height_ * 3 * sizeof(uint8_t));
    textureGL_ = 0;
}

Texture::~Texture()
{
    if (imgData_)
    {
        free(imgData_);
    }
    if (textureGL_ != 0)
    {
        glDeleteTextures(1, &textureGL_);
        textureGL_ = 0;
    }
}

void Texture::uploadToGPU()
{
    glGenTextures(1, &textureGL_);
    glBindTexture(GL_TEXTURE_2D, textureGL_);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, width_, height_, 0, GL_RGB, GL_UNSIGNED_BYTE, imgData_);
    glGenerateMipmap(GL_TEXTURE_2D);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
}
