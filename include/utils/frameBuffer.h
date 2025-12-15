#ifndef FRAME_BUFFER_H
#define FRAME_BUFFER_H

#include <cstdint>

class FrameBuffer
{
private:
    uint8_t *imageBuffer_;
    float *zBuffer_;
    float *antialiasImgBuff_;
    int width_, height_;
    int antialias_;
    void allocate();

public:
    FrameBuffer(int width, int height, int antialias = 1);
    ~FrameBuffer();

    // getters
    uint8_t *getImageBuffer() const { return imageBuffer_; }
    float *getZBuffer() const { return zBuffer_; }
    float *getAntialiasImageBuffer() const { return antialiasImgBuff_; }

    // setters
    void setWidth(int width);
    void setHeight(int height);
    void setAntialias(int antialias);
    void setNewOptions(int width, int height, int antialias);

    void cleanup();
    void clear();
    void calculateAntialias();
};

#endif