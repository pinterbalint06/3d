#include <equirectangular/equirectangularEngine.h>
#include <core/engine.h>
#include <core/mesh.h>
#include <core/vertex.h>
#include <core/material.h>
#include <string>
#include <cmath>
#include <cstdint>

Mesh *EquirectangularEngine::generateSphere(int rings, int segments, float radius)
{
    Mesh *mesh = new Mesh((rings + 1) * (segments + 1), rings * segments * 6);
    Vertex *vertices = mesh->getVertices();

    int count = 0;
    for (int lat = 0; lat <= rings; lat++)
    {
        float theta = lat * M_PI / rings;
        float sinTheta = sin(theta);
        float cosTheta = cos(theta);

        for (int lon = 0; lon <= segments; lon++)
        {
            float phi = lon * 2.0f * M_PI / segments;
            float sinPhi = sin(phi);
            float cosPhi = cos(phi);

            float x = cosPhi * sinTheta;
            float y = cosTheta;
            float z = sinPhi * sinTheta;

            Vertex vert;
            vert.x = x * radius;
            vert.y = y * radius;
            vert.z = z * radius;
            vert.w = 1.0f;
            vert.nx = -x;
            vert.ny = -y;
            vert.nz = -z;
            float u = (float)lon / segments;
            float v = (float)lat / rings;
            vert.u = u;
            vert.v = v;

            vertices[count++] = vert;
        }
    }
    uint32_t *indices = mesh->getIndices();

    count = 0;
    for (int lat = 0; lat < rings; lat++)
    {
        for (int lon = 0; lon < segments; lon++)
        {
            int first = (lat * (segments + 1)) + lon;
            int second = first + segments + 1;

            // first triangle
            indices[count++] = first;
            indices[count++] = second;
            indices[count++] = first + 1;

            // second triangle
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
    Mesh *sphere = generateSphere(32, 32, 10.0f);
    addMesh(sphere);
}
