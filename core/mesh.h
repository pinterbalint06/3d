#ifndef MESH_H
#define MESH_H
#include <emscripten/emscripten.h>
#include <cstdint>

class Mesh
{
private:
    float *vertices_;
    int32_t *indices_;
    float *normals_;

    int vertexCount_;
    int indexCount_;
    int normalCount_;

    float r_, g_, b_;

public:
    Mesh(int vertexCount, int indexCount);

    ~Mesh();

    void cleanup();

    // getters
    int getVertexCount() const { return vertexCount_; }

    int getIndexCount() const { return indexCount_; }

    float *getVertices() const { return vertices_; }

    int32_t *getIndices() const { return indices_; }

    float *getNormals() const { return normals_; }

    float getRed() const { return r_; }
    float getGreen() const { return g_; }
    float getBlue() const { return b_; }
    
    // setters
    void setRed(float r) { r_ = r; }
    void setGreen(float g) { g_ = g; }
    void setBlue(float b) { b_ = b; }

    Mesh(const Mesh &) = delete;
    Mesh &operator=(const Mesh &) = delete;
};

#endif