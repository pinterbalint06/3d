#ifndef MATERIAL_H
#define MATERIAL_H
#include <cmath>

namespace Materials
{
    /**
     * @brief Represents an RGB color with helper methods for gamma correction.
     */
    struct Color
    {
        float r_, g_, b_; ///< Red, Green, Blue components in range [0, 1].

        /**
         * @brief Creates a Color object from 0-255 integer RGB values.
         * Applies gamma correction (power of 2.2).
         * @param r Red component (0-255).
         * @param g Green component (0-255).
         * @param b Blue component (0-255).
         * @return Color The normalized and gamma-corrected color.
         */
        static Color fromRGB(float r, float g, float b)
        {
            Color returnColor;
            returnColor.r_ = std::pow(r / 255.0f, 2.2f);
            returnColor.g_ = std::pow(g / 255.0f, 2.2f);
            returnColor.b_ = std::pow(b / 255.0f, 2.2f);
            return returnColor;
        }
    };

    /**
     * @brief Defines surface properties for lighting calculations.
     */
    struct Material
    {
        Color albedo_;      ///< Base color of the material.
        float diffuseness_; ///< Diffuse reflection coefficient [0;1].
        float specularity_; ///< Specular reflection coefficient [0;1].
        float shininess_;   ///< Specular exponent (shininess factor) [1; infinity[.

        /**
         * @brief Creates a basic material with a specific color.
         * @param r Red component.
         * @param g Green component.
         * @param b Blue component.
         * @return Material A default material with the specified albedo.
         */
        static Material createMaterial(float r, float g, float b)
        {
            Material returnMat;
            returnMat.albedo_ = Color::fromRGB(r, g, b);
            return returnMat;
        }

        /**
         * @brief Predefined material resembling grass.
         * @return Material A green, low-specularity material.
         */
        static Material Grass()
        {
            Material returnMat;
            returnMat.albedo_ = Color::fromRGB(65, 152, 10);
            returnMat.diffuseness_ = 1.0f;
            returnMat.specularity_ = 0.02f;
            returnMat.shininess_ = 10.0f;
            return returnMat;
        }

        /**
         * @brief Predefined material resembling dirt.
         * @return Material A brown, low-specularity material.
         */
        static Material Dirt()
        {
            Material returnMat;
            returnMat.albedo_ = Color::fromRGB(155, 118, 83);
            returnMat.diffuseness_ = 1.0f;
            returnMat.specularity_ = 0.01f;
            returnMat.shininess_ = 10.0f;
            return returnMat;
        }
    };
};

#endif