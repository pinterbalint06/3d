#include <equirectangular/equirectangularEngine.h>
#include <core/engine.h>
#include <core/mesh.h>
#include <core/vertex.h>
#include <core/material.h>
#include <utils/mathUtils.h>
#include <string>
#include <cmath>
#include <cstdint>

Mesh *EquirectangularEngine::generateSphereSegment(int rings, int segments, float radius,
                                                   float uMin, float uMax, float vMin, float vMax)
{
    Mesh *mesh = new Mesh((rings + 1) * (segments + 1), rings * segments * 6);
    Vertex *vertices = mesh->getVertices();

    int count = 0;
    // latitutes, vertical
    for (int lat = 0; lat <= rings; lat++)
    {
        // the latitude progress on the sphere in this loop ranges [0;1]
        float vProgress = (float)lat / rings;

        // remap [0;1] to [vMin; vMax] by linearly interpolating
        // also
        // 0 <= vMin <= 1
        // 0 <= vMax <= 1
        float vGlobal = MathUtils::interpolation(vMin, vMax, vProgress);

        // multiplied by pi spherical coordinates theta ranges [0;PI]
        // where 0 is north pole
        // PI/2 is equator
        // PI is south pole
        float theta = vGlobal * M_PI;
        float sinTheta = sin(theta);
        float cosTheta = cos(theta);

        // longitudes, horizontal
        for (int lon = 0; lon <= segments; lon++)
        {
            // the longitude progress on the sphere in this loop ranges [0;1]
            float uProgress = (float)lon / segments;

            // remap [0;1] to [uMin; uMax] by linearly interpolating
            float uGlobal = MathUtils::interpolation(uMin, uMax, uProgress);

            // multiplied by 2*pi spherical coordinates phi ranges [0;2*PI]
            // full circle
            float phi = uGlobal * 2.0f * M_PI;
            float sinPhi = sin(phi);
            float cosPhi = cos(phi);

            // spherical coordinates to cartesian coordinates
            float x = cosPhi * sinTheta;
            float y = cosTheta;
            float z = sinPhi * sinTheta;

            Vertex vert;
            vert.x = x * radius;
            vert.y = y * radius;
            vert.z = z * radius;
            vert.w = 1.0f;

            // normals pointing inwards for view from inside
            vert.nx = -x;
            vert.ny = -y;
            vert.nz = -z;

            // store the local uvs so whole texture spans just this segment
            vert.u = uProgress;
            vert.v = vProgress;

            vertices[count++] = vert;
        }
    }

    uint32_t *indices = mesh->getIndices();
    count = 0;
    for (int lat = 0; lat < rings; lat++)
    {
        for (int lon = 0; lon < segments; lon++)
        {
            // 1d array indexing latitudes are stored in blocks
            // so lat * (segments + 1) + long
            //          the rings size + place in the ring
            int first = (lat * (segments + 1)) + lon;
            // second is one ring below first
            int second = first + segments + 1;

            indices[count++] = first;
            indices[count++] = second;
            indices[count++] = first + 1;

            indices[count++] = second;
            indices[count++] = second + 1;
            indices[count++] = first + 1;
        }
    }

    return mesh;
}

EquirectangularEngine::EquirectangularEngine(const std::string &canvasID) : Engine(canvasID)
{
    setShadingMode(Shaders::SHADINGMODE::NO_SHADING);
    int rings = 32;
    int segs = 32;
    float rad = 10.0f;

    const int tiles = 1;
    const float rec = 1.0f / (float)tiles;
    for (int x = 0; x < tiles; x++)
    {
        for (int y = 0; y < tiles; y++)
        {
            addMesh(generateSphereSegment(rings, segs, rad, rec * x, rec * (x + 1), rec * y, rec * (y + 1)));
        }
    }
}
