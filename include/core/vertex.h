#ifndef VERTEX_H
#define VERTEX_H
#include "utils/mathUtils.h"

/**
 * @brief It's a vertex in 3D space with attributes.
 */
struct Vertex
{
    // Position
    float x, y, z, w;

    // Normal
    float nx, ny, nz;

    void multWithMatrix(const float *matrix)
    {
        float tempX = x * matrix[0] + y * matrix[4] + z * matrix[8] + matrix[12];
        float tempY = x * matrix[1] + y * matrix[5] + z * matrix[9] + matrix[13];
        float tempZ = x * matrix[2] + y * matrix[6] + z * matrix[10] + matrix[14];
        float tempW = x * matrix[3] + y * matrix[7] + z * matrix[11] + matrix[15];

        x = tempX;
        y = tempY;
        z = tempZ;
        w = tempW;
    }

    static Vertex interpolate(const Vertex &v1, const Vertex &v2, const float &t)
    {
        Vertex returnVertex;
        // Interpolate position
        returnVertex.x = MathUtils::interpolation(v1.x, v2.x, t);
        returnVertex.y = MathUtils::interpolation(v1.y, v2.y, t);
        returnVertex.z = MathUtils::interpolation(v1.z, v2.z, t);
        returnVertex.w = MathUtils::interpolation(v1.w, v2.w, t);

        // Interpolate normals
        returnVertex.nx = MathUtils::interpolation(v1.nx, v2.nx, t);
        returnVertex.ny = MathUtils::interpolation(v1.ny, v2.ny, t);
        returnVertex.nz = MathUtils::interpolation(v1.nz, v2.nz, t);

        return returnVertex;
    }

    static inline void calculateFaceNormal(const Vertex &p0, const Vertex &p1, const Vertex &p2, float *normalVector)
    {
        float vec1[3];
        float vec2[3];

        vec1[0] = p1.x - p0.x;
        vec1[1] = p1.y - p0.y;
        vec1[2] = p1.z - p0.z;

        vec2[0] = p2.x - p0.x;
        vec2[1] = p2.y - p0.y;
        vec2[2] = p2.z - p0.z;
        normalVector[0] = vec1[1] * vec2[2] - vec1[2] * vec2[1];
        normalVector[1] = vec1[2] * vec2[0] - vec1[0] * vec2[2];
        normalVector[2] = vec1[0] * vec2[1] - vec1[1] * vec2[0];
    }
};

#endif