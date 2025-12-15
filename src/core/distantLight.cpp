#include <emscripten/emscripten.h>
#include "core/distantLight.h"
#define INV_PI 0.318309886f

distantLight::distantLight(float r, float g, float b, float intensity, float x, float y, float z)
{
    red_ = r;
    green_ = g;
    blue_ = b;
    intensity_ = intensity;
    direction_[0] = x;
    direction_[1] = y;
    direction_[2] = z;
    redPreCalc_ = red_ * INV_PI * intensity_;
    greenPreCalc_ = green_ * INV_PI * intensity_;
    bluePreCalc_ = blue_ * INV_PI * intensity_;
}

distantLight::~distantLight() {
    free(direction_);
}

void distantLight::setRed(float red)
{
    red_ = red;
    redPreCalc_ = red_ * INV_PI * intensity_;
}

void distantLight::setGreen(float green)
{
    green_ = green;
    greenPreCalc_ = green_ * INV_PI * intensity_;
}

void distantLight::setBlue(float blue)
{
    blue_ = blue;
    bluePreCalc_ = blue_ * INV_PI * intensity_;
}

void distantLight::setIntensity(float intensity)
{
    intensity_ = intensity;
    redPreCalc_ = red_ * INV_PI * intensity_;
    greenPreCalc_ = green_ * INV_PI * intensity_;
    bluePreCalc_ = blue_ * INV_PI * intensity_;
}

void distantLight::setDirection(float x, float y, float z)
{
    direction_[0] = x;
    direction_[1] = y;
    direction_[2] = z;
}
