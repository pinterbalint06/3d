#include "core/mesh.h"
#include "core/vertex.h"
#include <cstdint>
#include <GLES3/gl3.h>

Mesh::Mesh(int vertexCount, int indexCount)
{
    vertexCount_ = vertexCount;
    indexCount_ = indexCount;
    normalCount_ = vertexCount_;
    vertices_ = (Vertex *)malloc(vertexCount_ * sizeof(Vertex));
    indices_ = (uint32_t *)malloc(indexCount_ * sizeof(uint32_t));
    vbo_ = 0;
    vao_ = 0;
    ebo_ = 0;
}

Mesh::~Mesh()
{
    cleanup();
}

GLuint Mesh::setUpOpenGL()
{
    if (vao_ == 0)
    {
        glGenVertexArrays(1, &vao_);
        glGenBuffers(1, &vbo_);
        glGenBuffers(1, &ebo_);

        glBindVertexArray(vao_);

        glBindBuffer(GL_ARRAY_BUFFER, vbo_);
        glBufferData(GL_ARRAY_BUFFER, vertexCount_ * sizeof(Vertex), vertices_, GL_STATIC_DRAW);

        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, ebo_);
        glBufferData(GL_ELEMENT_ARRAY_BUFFER, indexCount_ * sizeof(uint32_t), indices_, GL_STATIC_DRAW);

        glVertexAttribPointer(0, 4, GL_FLOAT, GL_FALSE, sizeof(Vertex), (void *)0);
        glEnableVertexAttribArray(0);
        glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex), (void *)(4 * sizeof(float)));
        glEnableVertexAttribArray(1);
        glVertexAttribPointer(2, 2, GL_FLOAT, GL_FALSE, sizeof(Vertex), (void *)(7 * sizeof(float)));
        glEnableVertexAttribArray(2);
    }
    else
    {
        glBindVertexArray(vao_);

        glBindBuffer(GL_ARRAY_BUFFER, vbo_);
        glBufferData(GL_ARRAY_BUFFER, vertexCount_ * sizeof(Vertex), vertices_, GL_STATIC_DRAW);

        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, ebo_);
        glBufferData(GL_ELEMENT_ARRAY_BUFFER, indexCount_ * sizeof(uint32_t), indices_, GL_STATIC_DRAW);
    }

    glBindVertexArray(0);
    return vao_;
}

void Mesh::cleanup()
{
    if (vertices_)
    {
        free(vertices_);
        vertices_ = nullptr;
    }
    if (indices_)
    {
        free(indices_);
        indices_ = nullptr;
    }
    if (vbo_ != 0)
    {
        glDeleteBuffers(1, &vbo_);
    }
    if (vao_ != 0)
    {
        glDeleteVertexArrays(1, &vao_);
    }
    if (ebo_ != 0)
    {
        glDeleteBuffers(1, &ebo_);
    }
    vertexCount_ = 0;
    indexCount_ = 0;
}