#include "utils/frameBuffer.h"
#include <cstring>
#include <algorithm>
#include <cmath>

FrameBuffer::FrameBuffer(int width, int height, int antialias)
{
    width_ = width;
    height_ = height;
    allocate();
    antialias_ = antialias;
}

FrameBuffer::~FrameBuffer()
{
    cleanup();
}

void FrameBuffer::allocate()
{
    int size = width_ * height_;
    imageBuffer_ = (uint8_t *)malloc(size * 4 * sizeof(uint8_t));
    zBuffer_ = (float *)malloc(size * antialias_ * sizeof(float));
    antialiasImgBuff_ = (float *)malloc(size * antialias_ * 3 * sizeof(float));
}

void FrameBuffer::cleanup()
{
    if (imageBuffer_)
    {
        free(imageBuffer_);
    }
    if (zBuffer_)
    {
        free(zBuffer_);
    }
    if (antialiasImgBuff_)
    {
        free(antialiasImgBuff_);
    }
}

void FrameBuffer::clear()
{
    int size = width_ * height_;
    std::memset(imageBuffer_, 0, size * 4 * sizeof(uint8_t));
    std::fill(zBuffer_, zBuffer_ + size * antialias_, 1.0f);
    std::memset(antialiasImgBuff_, 0, size * antialias_ * 3 * sizeof(float));
}

void FrameBuffer::calculateAntialias()
{
    float r, g, b;
    int altalanosIndex, imageAntiIndex, subImageIndex, imageBufferIndex;
    float antiRec = 1.0f / antialias_;
    for (int y = 0; y < height_; y++)
    {
        for (int x = 0; x < width_; x++)
        {
            altalanosIndex = (y * width_ + x);
            imageAntiIndex = altalanosIndex * antialias_;
            imageBufferIndex = altalanosIndex * 4;
            r = 0.0f;
            g = 0.0f;
            b = 0.0f;
            for (int k = 0; k < antialias_; k++)
            {
                subImageIndex = (imageAntiIndex + k) * 3;
                r += antialiasImgBuff_[subImageIndex];
                g += antialiasImgBuff_[subImageIndex + 1];
                b += antialiasImgBuff_[subImageIndex + 2];
            }
            imageBuffer_[imageBufferIndex] = static_cast<uint8_t>(
                std::round(
                    std::clamp(r * antiRec, 0.0f, 255.0f)));
            imageBuffer_[imageBufferIndex + 1] = static_cast<uint8_t>(
                std::round(
                    std::clamp(g * antiRec, 0.0f, 255.0f)));
            imageBuffer_[imageBufferIndex + 2] = static_cast<uint8_t>(
                std::round(
                    std::clamp(b * antiRec, 0.0f, 255.0f)));
            imageBuffer_[imageBufferIndex + 3] = 255;
        }
    }
}

void FrameBuffer::setHeight(int height)
{
    height_ = height;
    cleanup();
    allocate();
}
void FrameBuffer::setWidth(int width)
{
    width_ = width;
    cleanup();
    allocate();
}

void FrameBuffer::setAntialias(int antialias)
{
    antialias_ = antialias;
    if (zBuffer_)
    {
        free(zBuffer_);
    }
    if (antialiasImgBuff_)
    {
        free(antialiasImgBuff_);
    }
    int size = width_ * height_;
    zBuffer_ = (float *)malloc(size * antialias_ * sizeof(float));
    antialiasImgBuff_ = (float *)malloc(size * antialias_ * 3 * sizeof(float));
}

void FrameBuffer::setNewOptions(int width, int height, int antialias)
{
    antialias_ = antialias;
    width_ = width;
    height_ = height;
    cleanup();
    allocate();
}
