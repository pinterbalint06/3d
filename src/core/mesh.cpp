#include "core/mesh.h"
#include <cstdint>

Mesh::Mesh(int vertexCount, int indexCount)
{
    vertexCount_ = vertexCount;
    indexCount_ = indexCount;
    normalCount_ = vertexCount_;
    vertices_ = (float *)malloc(vertexCount_ * 3 * sizeof(float));
    indices_ = (int32_t *)malloc(indexCount_ * sizeof(int32_t));
    normals_ = (float *)malloc(normalCount_ * 3 * sizeof(float));
}

Mesh::~Mesh()
{
    cleanup();
}

void Mesh::cleanup()
{
    if (vertices_)
    {
        free(vertices_);
        vertices_ = nullptr;
    }
    if (normals_)
    {
        free(normals_);
        normals_ = nullptr;
    }
    if (indices_)
    {
        free(indices_);
        indices_ = nullptr;
    }
    vertexCount_ = 0;
    indexCount_ = 0;
}