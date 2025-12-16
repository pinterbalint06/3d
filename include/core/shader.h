#ifndef SHADER_H
#define SHADER_H

#include "utils/mathUtils.h"
#include "core/distantLight.h"
#include "core/material.h"

namespace Shaders
{
    /// @brief The SHADINGMODE enum for selecting shading algorithms
    enum SHADINGMODE
    {
        PHONG = 0,   /// Phong shading
        GOURAUD = 1, /// Gouraud shading
        FLAT = 2     /// Flat shading
    };

    /**
     * @brief Shades the triangle using flat shading.
     */
    struct FlatShader
    {
        /// @brief The color components for the triangle.
        float r_, g_, b_;

        /**
         * @brief Calculates and stores the RGB color values for the triangle.
         *
         * Calculates the color values of the triangle based on its face normal,
         * ground color, and a distant light.
         * @param faceNormal Pointer to the face normal vector.
         * @param vertNormals Pointer to the vertex normals array (unused here but needed so the same function can be used in the rendering loop).
         * @param indices Pointer to the triangle's vertex indices (unused here).
         * @param i Index of the current triangle (unused here).
         * @param lightVec Pointer to the light direction vector.
         * @param material The material of the triangle.
         * @param sun Pointer to the distant light source.
         * @param z0Rec Reciprocal of the first vertex's depth (unused here).
         * @param z1Rec Reciprocal of the second vertex's depth (unused here).
         * @param z2Rec Reciprocal of the third vertex's depth (unused here).
         */
        inline void setupTriangle(float *faceNormal, float *vertNormals, int32_t *indices, int i,
                                  float *lightVec, Materials::Material material, distantLight *sun,
                                  float z0Rec, float z1Rec, float z2Rec)
        {
            Materials::Color albedo = material.albedo_;
            float rGround = albedo.r_;
            float gGround = albedo.g_;
            float bGround = albedo.b_;

            float dotProd = std::max(0.0f, MathUtils::dotProduct3D(faceNormal, lightVec));
            r_ = rGround * sun->getRedCalculated() * dotProd;
            g_ = gGround * sun->getGreenCalculated() * dotProd;
            b_ = bGround * sun->getBlueCalculated() * dotProd;
        }

        /**
         * @brief Writes the precomputed RGB color values to the image buffer for a pixel.
         * @param lambda0 Barycentric coordinate for the first vertex (unused here but needed so the same function can be used in the rendering loop).
         * @param lambda1 Barycentric coordinate for the second vertex (unused here).
         * @param lambda2 Barycentric coordinate for the third vertex (unused here).
         * @param zDepth Depth value for the pixel (unused here).
         * @param imageAntiBuffer Pointer to the image buffer.
         * @param imageIndex Index in the image buffer where the pixel's color should be written.
         */
        inline void shadePixel(float lambda0, float lambda1, float lambda2,
                               float zDepth, float *imageAntiBuffer, int imageIndex)
        {
            imageAntiBuffer[imageIndex] = r_;
            imageAntiBuffer[imageIndex + 1] = g_;
            imageAntiBuffer[imageIndex + 2] = b_;
        }
    };

    /**
     * @brief Shades the triangle using Gouraud shading.
     *
     * Gouraud shader precalculates vertex colors and interpolates those.
     */
    struct GouraudShader
    {
        /// @brief The color components for vertex 0.
        float r0_, g0_, b0_;
        /// @brief The color components for vertex 1.
        float r1_, g1_, b1_;
        /// @brief The color components for vertex 2.
        float r2_, g2_, b2_;
        /// @brief The inverse of the z-coordinates of the triangle's vertices.
        float z0Rec_, z1Rec_, z2Rec_;

        /**
         * @brief Calculates and sets the RGB color values for the triangle's vertices. Stores the inverse of the z-coordinates.
         *
         * Calculates the color values for the triangle at all of its vertices based on vertex normals,
         * ground color, and a distant light.
         * @param faceNormal Pointer to the face normal vector (unused here but needed so the same function can be used in the rendering loop).
         * @param vertNormals Pointer to the vertex normals array.
         * @param indices Pointer to the triangle's vertex indices.
         * @param i Index of the current triangle.
         * @param lightVec Pointer to the light direction vector.
         * @param material The material of the triangle.
         * @param sun Pointer to the distant light source.
         * @param z0Rec Reciprocal of the first vertex's depth.
         * @param z1Rec Reciprocal of the second vertex's depth.
         * @param z2Rec Reciprocal of the third vertex's depth.
         */
        inline void setupTriangle(float *faceNormal, float *vertNormals, int32_t *indices, int i,
                                  float *lightVec, Materials::Material material, distantLight *sun,
                                  float z0Rec, float z1Rec, float z2Rec)
        {
            float dotProd0 = std::max(0.0f, MathUtils::dotProduct3D(&vertNormals[indices[i] * 3], lightVec));
            float dotProd1 = std::max(0.0f, MathUtils::dotProduct3D(&vertNormals[indices[i + 1] * 3], lightVec));
            float dotProd2 = std::max(0.0f, MathUtils::dotProduct3D(&vertNormals[indices[i + 2] * 3], lightVec));

            Materials::Color albedo = material.albedo_;
            float rGround = albedo.r_;
            float gGround = albedo.g_;
            float bGround = albedo.b_;

            r0_ = rGround * sun->getRedCalculated() * dotProd0;
            g0_ = gGround * sun->getGreenCalculated() * dotProd0;
            b0_ = bGround * sun->getBlueCalculated() * dotProd0;

            r1_ = rGround * sun->getRedCalculated() * dotProd1;
            g1_ = gGround * sun->getGreenCalculated() * dotProd1;
            b1_ = bGround * sun->getBlueCalculated() * dotProd1;

            r2_ = rGround * sun->getRedCalculated() * dotProd2;
            g2_ = gGround * sun->getGreenCalculated() * dotProd2;
            b2_ = bGround * sun->getBlueCalculated() * dotProd2;

            z0Rec_ = z0Rec;
            z1Rec_ = z1Rec;
            z2Rec_ = z2Rec;
        }

        /**
         * @brief Perspective-correctly interpolates the vertex colors and writes them to the image buffer for a pixel.
         * @param lambda0 Barycentric coordinate for the first vertex.
         * @param lambda1 Barycentric coordinate for the second vertex.
         * @param lambda2 Barycentric coordinate for the third vertex.
         * @param zDepth Depth value for the pixel.
         * @param imageAntiBuffer Pointer to the image buffer.
         * @param imageIndex Index in the image buffer where the pixel's color should be written.
         */
        inline void shadePixel(float lambda0, float lambda1, float lambda2,
                               float zDepth, float *imageAntiBuffer, int imageIndex)
        {
            // perspective correct interpolation
            imageAntiBuffer[imageIndex] = (lambda0 * r0_ * z0Rec_ + lambda1 * r1_ * z1Rec_ + lambda2 * r2_ * z2Rec_) * zDepth;
            imageAntiBuffer[imageIndex + 1] = (lambda0 * g0_ * z0Rec_ + lambda1 * g1_ * z1Rec_ + lambda2 * g2_ * z2Rec_) * zDepth;
            imageAntiBuffer[imageIndex + 2] = (lambda0 * b0_ * z0Rec_ + lambda1 * b1_ * z1Rec_ + lambda2 * b2_ * z2Rec_) * zDepth;
        }
    };

    /**
     * @brief Shades the triangle using Phong shading.
     *
     * Phong shader precalculates vertex colors and interpolates those.
     */
    /**
     * @brief Represents a Phong shader for triangle rendering.
     *
     * Stores the RGB color values calculated for a triangle at all of its vertices based on vertex normals,
     * ground color, and a distant light. It also stores the inverse of the z-coordinates of the triangle's vertices.
     * It provides methods to set up the triangle's
     * shading and to shade individual pixels.
     * Phong shader interpolates the vertex normals and calculates the color in the inner loop.
     */
    struct PhongShader
    {
        /// @brief The coordinates of the normal at vertex 0.
        float n0x_, n0y_, n0z_;
        /// @brief The coordinates of the normal at vertex 1.
        float n1x_, n1y_, n1z_;
        /// @brief The coordinates of the normal at vertex 2.
        float n2x_, n2y_, n2z_;
        /// @brief The inverse of the z-coordinates of the triangle's vertices.
        float z0Rec_, z1Rec_, z2Rec_;
        /// @brief The coordinates of the light vector.
        float lx_, ly_, lz_;
        /// @brief The color values of the ground.
        float rGround_, gGround_, bGround_;
        /// @brief The distant light object.
        distantLight *pSun_;

        /**
         * @brief Stores the values required for shading in the inner loop.
         *
         * @param faceNormal Pointer to the face normal vector (unused here but needed so the same function can be used in the rendering loop).
         * @param vertNormals Pointer to the vertex normals array.
         * @param indices Pointer to the triangle's vertex indices.
         * @param i Index of the current triangle.
         * @param lightVec Pointer to the light direction vector.
         * @param material The material of the triangle.
         * @param sun Pointer to the distant light source.
         * @param z0Rec Reciprocal of the first vertex's depth.
         * @param z1Rec Reciprocal of the second vertex's depth.
         * @param z2Rec Reciprocal of the third vertex's depth.
         */
        inline void setupTriangle(float *faceNormal, float *vertNormals, int32_t *indices, int i,
                                  float *lightVec, Materials::Material material, distantLight *sun,
                                  float z0Rec, float z1Rec, float z2Rec)
        {
            pSun_ = sun;
            float *n0 = &vertNormals[indices[i] * 3];
            float *n1 = &vertNormals[indices[i + 1] * 3];
            float *n2 = &vertNormals[indices[i + 2] * 3];

            n0x_ = n0[0];
            n0y_ = n0[1];
            n0z_ = n0[2];

            n1x_ = n1[0];
            n1y_ = n1[1];
            n1z_ = n1[2];

            n2x_ = n2[0];
            n2y_ = n2[1];
            n2z_ = n2[2];

            lx_ = lightVec[0];
            ly_ = lightVec[1];
            lz_ = lightVec[2];

            z0Rec_ = z0Rec;
            z1Rec_ = z1Rec;
            z2Rec_ = z2Rec;

            Materials::Color albedo = material.albedo_;
            rGround_ = albedo.r_;
            gGround_ = albedo.g_;
            bGround_ = albedo.b_;
        }

        /**
         * @brief Perspective-correctly interpolates the vertex normals then computes the color values and writes them to the image buffer.
         * @param lambda0 Barycentric coordinate for the first vertex.
         * @param lambda1 Barycentric coordinate for the second vertex.
         * @param lambda2 Barycentric coordinate for the third vertex.
         * @param zDepth Depth value for the pixel.
         * @param imageAntiBuffer Pointer to the image buffer.
         * @param imageIndex Index in the image buffer where the pixel's color should be written.
         */
        inline void shadePixel(float lambda0, float lambda1, float lambda2,
                               float zDepth, float *imageAntiBuffer, int imageIndex)
        {
            // perspective correct interpolation
            float nx = (lambda0 * n0x_ * z0Rec_ + lambda1 * n1x_ * z1Rec_ + lambda2 * n2x_ * z2Rec_) * zDepth;
            float ny = (lambda0 * n0y_ * z0Rec_ + lambda1 * n1y_ * z1Rec_ + lambda2 * n2y_ * z2Rec_) * zDepth;
            float nz = (lambda0 * n0z_ * z0Rec_ + lambda1 * n1z_ * z1Rec_ + lambda2 * n2z_ * z2Rec_) * zDepth;
            float normalLengthInv = 1.0f / std::sqrt(nx * nx + ny * ny + nz * nz);
            nx *= normalLengthInv;
            ny *= normalLengthInv;
            nz *= normalLengthInv;

            float dotProd = std::max(0.0f, nx * lx_ + ny * ly_ + nz * lz_);

            imageAntiBuffer[imageIndex] = rGround_ * pSun_->getRedCalculated() * dotProd;
            imageAntiBuffer[imageIndex + 1] = gGround_ * pSun_->getGreenCalculated() * dotProd;
            imageAntiBuffer[imageIndex + 2] = bGround_ * pSun_->getBlueCalculated() * dotProd;
        }
    };
}

#endif