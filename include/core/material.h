#ifndef MATERIAL_H
#define MATERIAL_H
#include <cmath>

namespace Materials
{
    struct Color
    {
        // albedo
        float r_, g_, b_;

        static Color fromRGB(float r, float g, float b)
        {
            Color returnColor;
            returnColor.r_ = std::pow(r / 255.0f, 2.2f);
            returnColor.g_ = std::pow(g / 255.0f, 2.2f);
            returnColor.b_ = std::pow(b / 255.0f, 2.2f);
            return returnColor;
        }
    };

    struct Material
    {
        Color albedo_;
        float diffuseness_; /// [0;1]
        float specularity_; /// [0;1]
        float shininess_; /// [1;[

        static Material createMaterial(float r, float g, float b)
        {
            Material returnMat;
            returnMat.albedo_ = Color::fromRGB(r, g, b);
            return returnMat;
        }

        static Material Grass()
        {
            Material returnMat;
            returnMat.albedo_ = Color::fromRGB(65, 152, 10);
            returnMat.diffuseness_ = 1.0f;
            returnMat.specularity_ = 0.1f;
            returnMat.shininess_ = 1.0f;
            return returnMat;
        }

        static Material Dirt()
        {
            Material returnMat;
            returnMat.albedo_ = Color::fromRGB(155, 118, 83);
            returnMat.diffuseness_ = 1.0f;
            returnMat.specularity_ = 0.0f;
            returnMat.shininess_ = 1.0f;
            return returnMat;
        }
    };
};

#endif