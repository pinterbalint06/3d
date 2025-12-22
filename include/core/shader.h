#ifndef SHADER_H
#define SHADER_H

#include "utils/mathUtils.h"
#include "core/distantLight.h"
#include "core/material.h"
#include "core/vertex.h"

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
     * @param light Pointer to the DistantLight object representing the light source.
     * @param result Pointer to a float array of size 3 where the resulting RGB color will be stored.
     */
    inline void phongReflectionModel(
        float vertX, float vertY, float vertZ,
        float camX, float camY, float camZ,
        float normX, float normY, float normZ,
        float lightX, float lightY, float lightZ,
        Materials::Material material,
        DistantLight *light,
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

        Materials::Color color = material.albedo;
        // kc * kd * (L . N) * i
        // kc the color component of the material
        // kd diffuseness of the material
        // (L . N) diffuseness factor angle between the normal and light vector
        // i the color component of the light
        float diffuseR = color.r * material.diffuseness * diffFactor * lightR;
        float diffuseG = color.g * material.diffuseness * diffFactor * lightG;
        float diffuseB = color.b * material.diffuseness * diffFactor * lightB;
        // END OF DIFFUSE

        // CALCULATE SPECULAR
        float specR = 0.0f;
        float specG = 0.0f;
        float specB = 0.0f;

        // if material is specular and light hits the object
        if (material.specularity > 0.0f && diffFactor > 0.0f)
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
            float specFactor = std::pow(dotRV, material.shininess);

            // ks * (R . V)^alph * i
            // ksd specularity of the material
            // (R . V)^alph specFactor variable above
            // i the color component of the light
            specR = material.specularity * specFactor * lightR;
            specG = material.specularity * specFactor * lightG;
            specB = material.specularity * specFactor * lightB;
        }
        // END OF SPECULAR

        // CALCULATE AMBIENT
        float ambientR = ambientLight * light->getRed() * color.r;
        float ambientG = ambientLight * light->getGreen() * color.g;
        float ambientB = ambientLight * light->getBlue() * color.b;
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
        float r, g, b;

        /**
         * @brief Stores the values required for shading in the inner loop.
         *
         * @param faceNormal Pointer to the face normal vector.
         * @param vertices Pointer to the triangle's vertices. (unused here but needed so the same function can be used in the rendering loop)
         * @param i Index of the current triangle. (unused here)
         * @param lightVec Pointer to the light direction vector.
         * @param material The material of the triangle.
         * @param sun Pointer to the distant light source. (unused here)
         * @param z0Rec Reciprocal of the first vertex's depth. (unused here)
         * @param z1Rec Reciprocal of the second vertex's depth. (unused here)
         * @param z2Rec Reciprocal of the third vertex's depth. (unused here)
         * @param ambientLight The ambient light of the environment. (unused here)
         */
        inline void setupTriangle(
            float *faceNormal, Vertex *vertices, int i,
            float *lightVec, Materials::Material material, DistantLight *sun,
            float z0Rec, float z1Rec, float z2Rec, float camX, float camY, float camZ, float ambientLight)
        {
            Materials::Color albedo = material.albedo;
            float matR = albedo.r;
            float matG = albedo.g;
            float matB = albedo.b;

            float dotProd = std::max(0.0f, MathUtils::dotProduct3D(faceNormal, lightVec));
            r = matR * sun->getRedCalculated() * dotProd;
            g = matG * sun->getGreenCalculated() * dotProd;
            b = matB * sun->getBlueCalculated() * dotProd;
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
            imageAntiBuffer[imageIndex] = r;
            imageAntiBuffer[imageIndex + 1] = g;
            imageAntiBuffer[imageIndex + 2] = b;
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
        float r0, g0, b0;
        /// @brief The color components for vertex 1.
        float r1, g1, b1;
        /// @brief The color components for vertex 2.
        float r2, g2, b2;

        /**
         * @brief Stores the values required for shading in the inner loop.
         *
         * @param faceNormal Pointer to the face normal vector (unused here but needed so the same function can be used in the rendering loop).
         * @param vertices Pointer to the triangle's vertices.
         * @param i Index of the current triangle.
         * @param lightVec Pointer to the light direction vector.
         * @param material The material of the triangle.
         * @param sun Pointer to the distant light source.
         * @param z0Rec Reciprocal of the first vertex's depth.
         * @param z1Rec Reciprocal of the second vertex's depth.
         * @param z2Rec Reciprocal of the third vertex's depth.
         * @param ambientLight The ambient light of the environment.
         */
        inline void setupTriangle(
            float *faceNormal, Vertex *vertices, int i,
            float *lightVec, Materials::Material material, DistantLight *sun,
            float z0Rec, float z1Rec, float z2Rec, float camX, float camY, float camZ, float ambientLight)
        {
            float result[3];
            Vertex &vert0 = vertices[0];
            Vertex &vert1 = vertices[1];
            Vertex &vert2 = vertices[2];

            phongReflectionModel(
                vert0.x, vert0.y, vert0.z,
                camX, camY, camZ,
                vert0.nx, vert0.ny, vert0.nz,
                lightVec[0], lightVec[1], lightVec[2],
                material,
                sun,
                ambientLight,
                result);
            // predivide with z for perspective-correct interpolation
            r0 = result[0] * z0Rec;
            g0 = result[1] * z0Rec;
            b0 = result[2] * z0Rec;

            phongReflectionModel(
                vert1.x, vert1.y, vert1.z,
                camX, camY, camZ,
                vert1.nx, vert1.ny, vert1.nz,
                lightVec[0], lightVec[1], lightVec[2],
                material,
                sun,
                ambientLight,
                result);
            // predivide with z for perspective-correct interpolation
            r1 = result[0] * z1Rec;
            g1 = result[1] * z1Rec;
            b1 = result[2] * z1Rec;

            phongReflectionModel(
                vert2.x, vert2.y, vert2.z,
                camX, camY, camZ,
                vert2.nx, vert2.ny, vert2.nz,
                lightVec[0], lightVec[1], lightVec[2],
                material,
                sun,
                ambientLight,
                result);
            // predivide with z for perspective-correct interpolation
            r2 = result[0] * z2Rec;
            g2 = result[1] * z2Rec;
            b2 = result[2] * z2Rec;
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
            imageAntiBuffer[imageIndex] = (lambda0 * r0 + lambda1 * r1 + lambda2 * r2) * zDepth;
            imageAntiBuffer[imageIndex + 1] = (lambda0 * g0 + lambda1 * g1 + lambda2 * g2) * zDepth;
            imageAntiBuffer[imageIndex + 2] = (lambda0 * b0 + lambda1 * b1 + lambda2 * b2) * zDepth;
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
        float n0x, n0y, n0z;
        /// @brief The coordinates of the normal at vertex 1.
        float n1x, n1y, n1z;
        /// @brief The coordinates of the normal at vertex 2.
        float n2x, n2y, n2z;

        /// @brief The coordinates of vertex 0.
        float v0x, v0y, v0z;
        /// @brief The coordinates of vertex 1.
        float v1x, v1y, v1z;
        /// @brief The coordinates of vertex 2.
        float v2x, v2y, v2z;

        /// @brief The coordinates of camera.
        float cx, cy, cz;

        /// @brief The coordinates of the light vector.
        float lx, ly, lz;

        /// @brief The material of the triangle.
        Materials::Material material;

        /// @brief The distant light object.
        DistantLight *pSun;

        /// @brief Ambient light of the scene.
        float ambientLight;

        /**
         * @brief Stores the values required for shading in the inner loop.
         *
         * @param faceNormal Pointer to the face normal vector (unused here but needed so the same function can be used in the rendering loop).
         * @param vertices Pointer to the triangle's vertices.
         * @param i Index of the current triangle.
         * @param lightVec Pointer to the light direction vector.
         * @param material The material of the triangle.
         * @param sun Pointer to the distant light source.
         * @param z0Rec Reciprocal of the first vertex's depth.
         * @param z1Rec Reciprocal of the second vertex's depth.
         * @param z2Rec Reciprocal of the third vertex's depth.
         * @param ambientLight The ambient light of the environment.
         */
        inline void setupTriangle(
            float *faceNormal, Vertex *vertices, int i,
            float *lightVec, Materials::Material material, DistantLight *sun,
            float z0Rec, float z1Rec, float z2Rec, float camX, float camY, float camZ, float ambientLight)
        {
            pSun = sun;
            Vertex &vert0 = vertices[0];
            Vertex &vert1 = vertices[1];
            Vertex &vert2 = vertices[2];

            // predivide with z for perspective-correct interpolation
            v0x = vert0.x * z0Rec;
            v0y = vert0.y * z0Rec;
            v0z = vert0.z * z0Rec;

            v1x = vert1.x * z1Rec;
            v1y = vert1.y * z1Rec;
            v1z = vert1.z * z1Rec;

            v2x = vert2.x * z2Rec;
            v2y = vert2.y * z2Rec;
            v2z = vert2.z * z2Rec;

            n0x = vert0.nx * z0Rec;
            n0y = vert0.ny * z0Rec;
            n0z = vert0.nz * z0Rec;

            n1x = vert1.nx * z1Rec;
            n1y = vert1.ny * z1Rec;
            n1z = vert1.nz * z1Rec;

            n2x = vert2.nx * z2Rec;
            n2y = vert2.ny * z2Rec;
            n2z = vert2.nz * z2Rec;

            cx = camX;
            cy = camY;
            cz = camZ;

            lx = lightVec[0];
            ly = lightVec[1];
            lz = lightVec[2];

            this->material = material;

            this->ambientLight = ambientLight;
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
            float nx = (lambda0 * n0x + lambda1 * n1x + lambda2 * n2x) * zDepth;
            float ny = (lambda0 * n0y + lambda1 * n1y + lambda2 * n2y) * zDepth;
            float nz = (lambda0 * n0z + lambda1 * n1z + lambda2 * n2z) * zDepth;

            // normalize normal
            float normalLengthInv = 1.0f / std::sqrt(nx * nx + ny * ny + nz * nz);
            nx *= normalLengthInv;
            ny *= normalLengthInv;
            nz *= normalLengthInv;

            // perspective correct interpolation
            float px = (lambda0 * v0x + lambda1 * v1x + lambda2 * v2x) * zDepth;
            float py = (lambda0 * v0y + lambda1 * v1y + lambda2 * v2y) * zDepth;
            float pz = (lambda0 * v0z + lambda1 * v1z + lambda2 * v2z) * zDepth;
            phongReflectionModel(
                px, py, pz,
                cx, cy, cz,
                nx, ny, nz,
                lx, ly, lz,
                material,
                pSun,
                ambientLight,
                &imageAntiBuffer[imageIndex]);
        }
    };
}

#endif