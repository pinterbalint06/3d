#ifndef MESH_H
#define MESH_H
#include <emscripten/emscripten.h>
#include "core/material.h"
#include "core/vertex.h"
#include <cstdint>
#include <GLES3/gl3.h>

class Mesh
{
private:
    Vertex *vertices_;
    uint32_t *indices_;

    // vertex buffer object
    GLuint vbo_;
    // element buffer object
    GLuint ebo_;
    // vertax array object
    GLuint vao_;

    int vertexCount_;
    int indexCount_;
    int normalCount_;

    Materials::Material material_;

    void cleanup();

public:
    Mesh(int vertexCount, int indexCount);
    ~Mesh();

    GLuint setUpOpenGL();

    // getters
    int getVertexCount() const { return vertexCount_; }

    int getIndexCount() const { return indexCount_; }

    Vertex *getVertices() const { return vertices_; }

    uint32_t *getIndices() const { return indices_; }

    Materials::Material getMaterial() const { return material_; }

    GLuint getVAO() const { return vao_; }

    // setters
    void setMaterial(Materials::Material material) { material_ = material; }

    Mesh(const Mesh &) = delete;
    Mesh &operator=(const Mesh &) = delete;
};

#endif