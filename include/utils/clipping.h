#ifndef CLIPPING_H
#define CLIPPING_H

class Clipper
{
private:
    float *clipped_;
    float *input_;
    int clippedSize_;
    int inputSize_;

public:
    Clipper();
    ~Clipper();

    // getter
    float *getClipped() { return clipped_; }
    int getClippedSize() { return clippedSize_; }

    // Sutherland-Hodgman
    void clip(float *pont0, float *pont1, float *pont2);
    int clipAgainstSinglePlane(float *input, float *result, int planeInd);
};

#endif
