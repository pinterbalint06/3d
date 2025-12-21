#include <emscripten/emscripten.h>
#include "core/distantLight.h"
#define INV_PI 0.318309886f

DistantLight::DistantLight(float r, float g, float b, float intensity, float x, float y, float z)
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

DistantLight::~DistantLight()
{
    free(direction_);
}

void DistantLight::setRed(float red)
{
    red_ = red;
    redPreCalc_ = red_ * INV_PI * intensity_;
}

void DistantLight::setGreen(float green)
{
    green_ = green;
    greenPreCalc_ = green_ * INV_PI * intensity_;
}

void DistantLight::setBlue(float blue)
{
    blue_ = blue;
    bluePreCalc_ = blue_ * INV_PI * intensity_;
}

void DistantLight::setColor(float red, float green, float blue)
{
    red_ = red;
    green_ = green;
    blue_ = blue;
    redPreCalc_ = red_ * INV_PI * intensity_;
    greenPreCalc_ = green_ * INV_PI * intensity_;
    bluePreCalc_ = blue_ * INV_PI * intensity_;
}

void DistantLight::setIntensity(float intensity)
{
    intensity_ = intensity;
    redPreCalc_ = red_ * INV_PI * intensity_;
    greenPreCalc_ = green_ * INV_PI * intensity_;
    bluePreCalc_ = blue_ * INV_PI * intensity_;
}

void DistantLight::setDirection(float x, float y, float z)
{
    direction_[0] = x;
    direction_[1] = y;
    direction_[2] = z;
}
