#include "core/texture.h"
#include <cstdint>
#include <string>
#include <emscripten/html5.h>
#include <emscripten/emscripten.h>
#include <GLES3/gl3.h>

namespace
{
    EM_JS(void, textureFromURL, (int textureID, const char *url, int ctxId), {
        let gl = GL.contexts[ctxId].GLctx;
        let img = new Image();
        let imgUrl = UTF8ToString(url);

        img.onload = function()
        {
            let texture = GL.textures[textureID];
            if (texture)
            {
                gl.bindTexture(gl.TEXTURE_2D, texture);

                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                gl.generateMipmap(gl.TEXTURE_2D);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

                gl.bindTexture(gl.TEXTURE_2D, null);
            }
            else
            {
                console.error("Texture failed to load (it no longer exists):\t" + imgUrl);
            }
        };

        img.onerror = function()
        {
            console.error("Texture failed to load:\t" + imgUrl);
        };

        img.src = imgUrl;
    });
}

Texture::Texture()
{
    width_ = 0;
    height_ = 0;
    textureGL_ = 0;
    imgData_ = nullptr;
    initGL();
}

Texture::Texture(int width, int height)
{
    textureGL_ = 0;
    width_ = width;
    height_ = height;
    imgData_ = (uint8_t *)malloc(width_ * height_ * 3 * sizeof(uint8_t));
    initGL();
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

void Texture::initGL()
{
    if (textureGL_ == 0)
    {
        glGenTextures(1, &textureGL_);
        glBindTexture(GL_TEXTURE_2D, textureGL_);

        uint8_t placeholder[4];
        placeholder[0] = 0;
        placeholder[1] = 0;
        placeholder[2] = 0;
        placeholder[3] = 255;
        glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, 1, 1, 0, GL_RGBA, GL_UNSIGNED_BYTE, placeholder);
        glGenerateMipmap(GL_TEXTURE_2D);

        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    }
}

void Texture::loadFromUrl(const std::string &url)
{
    if (imgData_)
    {
        free(imgData_);
    }
    width_ = 0;
    height_ = 0;

    int ctx = emscripten_webgl_get_current_context();
    if (ctx > 0)
    {
        textureFromURL(textureGL_, url.c_str(), ctx);
    }
}

void Texture::uploadToGPU()
{
    glBindTexture(GL_TEXTURE_2D, textureGL_);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, width_, height_, 0, GL_RGB, GL_UNSIGNED_BYTE, imgData_);
    glGenerateMipmap(GL_TEXTURE_2D);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glBindTexture(GL_TEXTURE_2D, 0);
}

void Texture::bind(int location)
{
    glActiveTexture(GL_TEXTURE0 + location);
    glBindTexture(GL_TEXTURE_2D, textureGL_);
}
