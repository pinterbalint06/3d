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
     * @brief Calculates the color at a point on a surface using the Phong reflection model.
     *
     * This function computes the diffuse and specular lighting for a given vertex,
     * normal, camera position, and light direction, based on the Phong reflection model.
     * The result is stored as an RGB triplet in the provided result array.
     *
     * @param vertX X coordinate of the vertex position.
     * @param vertY Y coordinate of the vertex position.
     * @param vertZ Z coordinate of the vertex position.
     * @param camX X coordinate of the camera position.
     * @param camY Y coordinate of the camera position.
     * @param camZ Z coordinate of the camera position.
     * @param normX X component of the (normalized) surface normal at the vertex.
     * @param normY Y component of the (normalized) surface normal at the vertex.
     * @param normZ Z component of the (normalized) surface normal at the vertex.
     * @param lightX X component of the (normalized) light direction vector.
     * @param lightY Y component of the (normalized) light direction vector.
     * @param lightZ Z component of the (normalized) light direction vector.
     * @param material Material properties (albedo, diffuseness, specularity, shininess).
     * @param light Pointer to the distantLight object representing the light source.
     * @param result Pointer to a float array of size 3 where the resulting RGB color will be stored.
     */
    inline void phongReflectionModel(
        float vertX, float vertY, float vertZ,
        float camX, float camY, float camZ,
        float normX, float normY, float normZ,
        float lightX, float lightY, float lightZ,
        Materials::Material material,
        distantLight *light,
        float ambientLight,
        float *result)
    {
        // CALCULATE DIFFUSE
        /// @brief dot product of the normal and the light vector
        float dotNL = normX * lightX + normY * lightY + normZ * lightZ;
        float diffFactor = std::max(0.0f, dotNL);

        float lightR = light->getRedCalculated();
        float lightG = light->getGreenCalculated();
        float lightB = light->getBlueCalculated();

        Materials::Color color = material.albedo_;
        // kc * kd * (L . N) * i
        // kc the color component of the material
        // kd diffuseness of the material
        // (L . N) diffuseness factor angle between the normal and light vector
        // i the color component of the light
        float diffuseR = color.r_ * material.diffuseness_ * diffFactor * lightR;
        float diffuseG = color.g_ * material.diffuseness_ * diffFactor * lightG;
        float diffuseB = color.b_ * material.diffuseness_ * diffFactor * lightB;
        // END OF DIFFUSE

        // CALCULATE SPECULAR
        float specR = 0.0f;
        float specG = 0.0f;
        float specB = 0.0f;

        // if material is specular and light hits the object
        if (material.specularity_ > 0.0f && diffFactor > 0.0f)
        {
            // view vector (POINT -> EYE (camera))
            float viewX = camX - vertX;
            float viewY = camY - vertY;
            float viewZ = camZ - vertZ;

            // normalize view vector
            float viewLengthInv = 1.0f / std::sqrt(viewX * viewX + viewY * viewY + viewZ * viewZ);
            viewX *= viewLengthInv;
            viewY *= viewLengthInv;
            viewZ *= viewLengthInv;

            // Reflection vector (perfectly reflected ray of light would take)
            // 2(L . N)N - L
            float rx = 2.0f * dotNL * normX - lightX;
            float ry = 2.0f * dotNL * normY - lightY;
            float rz = 2.0f * dotNL * normZ - lightZ;

            /// @brief dot product of the reflection vector and view vector
            float dotRV = std::max(0.0f, rx * viewX + ry * viewY + rz * viewZ);

            // (R . V)^alph
            // R reflection vector
            // v view vector
            // alph shininess constant of the material
            float specFactor = std::pow(dotRV, material.shininess_);

            // ks * (R . V)^alph * i
            // ksd specularity of the material
            // (R . V)^alph specFactor variable above
            // i the color component of the light
            specR = material.specularity_ * specFactor * lightR;
            specG = material.specularity_ * specFactor * lightG;
            specB = material.specularity_ * specFactor * lightB;
        }
        // END OF SPECULAR

        // CALCULATE AMBIENT
        float ambientR = ambientLight * light->getRed() * color.r_;
        float ambientG = ambientLight * light->getGreen() * color.g_;
        float ambientB = ambientLight * light->getBlue() * color.b_;
        // END OF AMBIENT

        // diffuse + specular + ambient
        result[0] = diffuseR + specR + ambientR;
        result[1] = diffuseG + specG + ambientG;
        result[2] = diffuseB + specB + ambientB;
    }

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
         * material color, and a distant light.
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
        inline void setupTriangle(
            float *faceNormal, float *vertNormals, float *vertices, int32_t *indices, int i,
            float *lightVec, Materials::Material material, distantLight *sun,
            float z0Rec, float z1Rec, float z2Rec, float camX, float camY, float camZ, float ambientLight)
        {
            Materials::Color albedo = material.albedo_;
            float matR = albedo.r_;
            float matG = albedo.g_;
            float matB = albedo.b_;

            float dotProd = std::max(0.0f, MathUtils::dotProduct3D(faceNormal, lightVec));
            r_ = matR * sun->getRedCalculated() * dotProd;
            g_ = matG * sun->getGreenCalculated() * dotProd;
            b_ = matB * sun->getBlueCalculated() * dotProd;
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
        inline void shadePixel(
            float lambda0, float lambda1, float lambda2,
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
         * material color, and a distant light.
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
        inline void setupTriangle(
            float *faceNormal, float *vertNormals, float *vertices, int32_t *indices, int i,
            float *lightVec, Materials::Material material, distantLight *sun,
            float z0Rec, float z1Rec, float z2Rec, float camX, float camY, float camZ, float ambientLight)
        {
            float result[3];
            float *n0 = &vertNormals[indices[i] * 3];
            float *n1 = &vertNormals[indices[i + 1] * 3];
            float *n2 = &vertNormals[indices[i + 2] * 3];

            float *vert0 = &vertices[indices[i] * 3];
            float *vert1 = &vertices[indices[i + 1] * 3];
            float *vert2 = &vertices[indices[i + 2] * 3];

            phongReflectionModel(
                vert0[0], vert0[1], vert0[2],
                camX, camY, camZ,
                n0[0], n0[1], n0[2],
                lightVec[0], lightVec[1], lightVec[2],
                material,
                sun,
                ambientLight,
                result);
            r0_ = result[0];
            g0_ = result[1];
            b0_ = result[2];

            phongReflectionModel(
                vert1[0], vert1[1], vert1[2],
                camX, camY, camZ,
                n1[0], n1[1], n1[2],
                lightVec[0], lightVec[1], lightVec[2],
                material,
                sun,
                ambientLight,
                result);
            r1_ = result[0];
            g1_ = result[1];
            b1_ = result[2];

            phongReflectionModel(
                vert2[0], vert2[1], vert2[2],
                camX, camY, camZ,
                n2[0], n2[1], n2[2],
                lightVec[0], lightVec[1], lightVec[2],
                material,
                sun,
                ambientLight,
                result);
            r2_ = result[0];
            g2_ = result[1];
            b2_ = result[2];

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
        inline void shadePixel(
            float lambda0, float lambda1, float lambda2,
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
    struct PhongShader
    {
        /// everything is in world space
        /// @brief The coordinates of the normal at vertex 0.
        float n0x_, n0y_, n0z_;
        /// @brief The coordinates of the normal at vertex 1.
        float n1x_, n1y_, n1z_;
        /// @brief The coordinates of the normal at vertex 2.
        float n2x_, n2y_, n2z_;

        /// @brief The coordinates of vertex 0.
        float v0x_, v0y_, v0z_;
        /// @brief The coordinates of vertex 1.
        float v1x_, v1y_, v1z_;
        /// @brief The coordinates of vertex 2.
        float v2x_, v2y_, v2z_;

        /// @brief The coordinates of camera.
        float cx_, cy_, cz_;

        /// @brief The inverse of the z-coordinates of the triangle's vertices.
        float z0Rec_, z1Rec_, z2Rec_;

        /// @brief The coordinates of the light vector.
        float lx_, ly_, lz_;

        /// @brief The material of the triangle.
        Materials::Material material_;

        /// @brief The distant light object.
        distantLight *pSun_;

        /// @brief Ambient light of the scene.
        float ambientLight_;

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
        inline void setupTriangle(
            float *faceNormal, float *vertNormals, float *vertices, int32_t *indices, int i,
            float *lightVec, Materials::Material material, distantLight *sun,
            float z0Rec, float z1Rec, float z2Rec, float camX, float camY, float camZ, float ambientLight)
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

            float *v0 = &vertices[indices[i] * 3];
            float *v1 = &vertices[indices[i + 1] * 3];
            float *v2 = &vertices[indices[i + 2] * 3];

            v0x_ = v0[0];
            v0y_ = v0[1];
            v0z_ = v0[2];

            v1x_ = v1[0];
            v1y_ = v1[1];
            v1z_ = v1[2];

            v2x_ = v2[0];
            v2y_ = v2[1];
            v2z_ = v2[2];

            cx_ = camX;
            cy_ = camY;
            cz_ = camZ;

            lx_ = lightVec[0];
            ly_ = lightVec[1];
            lz_ = lightVec[2];

            z0Rec_ = z0Rec;
            z1Rec_ = z1Rec;
            z2Rec_ = z2Rec;

            material_ = material;

            ambientLight_ = ambientLight;
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
        inline void shadePixel(
            float lambda0, float lambda1, float lambda2,
            float zDepth, float *imageAntiBuffer, int imageIndex)
        {
            // perspective correct interpolation
            float nx = (lambda0 * n0x_ * z0Rec_ + lambda1 * n1x_ * z1Rec_ + lambda2 * n2x_ * z2Rec_) * zDepth;
            float ny = (lambda0 * n0y_ * z0Rec_ + lambda1 * n1y_ * z1Rec_ + lambda2 * n2y_ * z2Rec_) * zDepth;
            float nz = (lambda0 * n0z_ * z0Rec_ + lambda1 * n1z_ * z1Rec_ + lambda2 * n2z_ * z2Rec_) * zDepth;

            // normalize normal
            float normalLengthInv = 1.0f / std::sqrt(nx * nx + ny * ny + nz * nz);
            nx *= normalLengthInv;
            ny *= normalLengthInv;
            nz *= normalLengthInv;

            // perspective correct interpolation
            float px = (lambda0 * v0x_ * z0Rec_ + lambda1 * v1x_ * z1Rec_ + lambda2 * v2x_ * z2Rec_) * zDepth;
            float py = (lambda0 * v0y_ * z0Rec_ + lambda1 * v1y_ * z1Rec_ + lambda2 * v2y_ * z2Rec_) * zDepth;
            float pz = (lambda0 * v0z_ * z0Rec_ + lambda1 * v1z_ * z1Rec_ + lambda2 * v2z_ * z2Rec_) * zDepth;
            phongReflectionModel(
                px, py, pz,
                cx_, cy_, cz_,
                nx, ny, nz,
                lx_, ly_, lz_,
                material_,
                pSun_,
                ambientLight_,
                &imageAntiBuffer[imageIndex]);
        }
    };
}

#endif