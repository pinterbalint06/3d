#ifndef DISTANT_LIGHT_H
#define DISTANT_LIGHT_H

class distantLight
{
private:
    // color
    float red_, green_, blue_;
    float redPreCalc_, greenPreCalc_, bluePreCalc_;
    float intensity_;
    float direction_[3];

public:
    distantLight(float r, float g, float b, float intensity, float x, float y, float z);
    ~distantLight();
    // getters
    float getRed() const { return red_; }

    float getBlue() const { return blue_; }

    float getGreen() const { return green_; }

    float getRedCalculated() const { return redPreCalc_; }

    float getBlueCalculated() const { return bluePreCalc_; }

    float getGreenCalculated() const { return greenPreCalc_; }

    const float *getDirection() const { return direction_; }

    // setters
    void setRed(float red);
    void setGreen(float green);
    void setBlue(float blue);
    void setIntensity(float intensity);
    void setDirection(float x, float y, float z);
};

#endif