#ifndef CLIPPING_H
#define CLIPPING_H

class Clipper
{
private:
    float *clipped_;
    float *input_;
    int clippedSize_;
    int inputSize_;

    void SutherlandHodgman(const float *pont0, const float *pont1, const float *pont2);

public:
    Clipper();
    ~Clipper();

    // getter
    float *getClipped() { return clipped_; }
    int getClippedSize() { return clippedSize_; }

    // Sutherland-Hodgman
    void clip(const float *pont0, const float *pont1, const float *pont2);
};

#endif
