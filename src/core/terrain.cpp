#include "core/mesh.h"
#include "core/terrain.h"
#include <cstring>
#include "utils/perlin.h"

Terrain::Terrain(int size)
{
    size_ = size;
    heightMultiplier_ = 150.0f;
    lacunarity_ = 2.0f;
    persistence_ = 0.4f;
    octaves_ = 8;
    frequency_ = 1.0f;
    seed_ = 0;
    spacing_ = 1.0f;
    perlinValues_ = (float *)malloc(size_ * size_ * sizeof(float));
    mesh_ = new Mesh(size * size, (size - 1) * (size - 1) * 6);
}

void Terrain::cleanup()
{
    if (perlinValues_)
    {
        free(perlinValues_);
    }
    if (mesh_)
    {
        delete mesh_;
    }
}

Terrain::~Terrain()
{
    cleanup();
}

void Terrain::setSize(int size)
{
    Materials::Material currentMaterial = Materials::Material::Grass();
    if (mesh_)
    {
        currentMaterial = mesh_->getMaterial();
    }
    size_ = size;
    cleanup();
    perlinValues_ = (float *)malloc(size_ * size_ * sizeof(float));
    mesh_ = new Mesh(size * size, (size - 1) * (size - 1) * 6);
    mesh_->setMaterial(currentMaterial);
}

void Terrain::regenerate()
{
    std::memset(perlinValues_, 0, size_ * size_ * sizeof(float));
    PerlinNoise::generatePerlinNoise(perlinValues_, mesh_->getNormals(), frequency_, size_, seed_, 2, octaves_, lacunarity_, persistence_, 0.0f, heightMultiplier_);
    buildTerrain();
}

void Terrain::buildTerrain()
{
    int i;
    float *vertices = mesh_->getVertices();
    for (int y = 0; y < size_; y++)
    {
        for (int x = 0; x < size_; x++)
        {
            i = y * size_ + x;
            vertices[i * 3] = x * spacing_;
            vertices[i * 3 + 1] = perlinValues_[i];
            vertices[i * 3 + 2] = -y * spacing_;
        }
    }

    // calculate indices
    int32_t *indices = mesh_->getIndices();
    int currIndex = 0;
    for (int y = 0; y < size_ - 1; y++)
    {
        for (int x = 0; x < size_ - 1; x++)
        {
            i = y * size_ + x;

            // We form two triangles from a rectangle in the perlin grid
            indices[currIndex++] = i + 1;     // top-right vertex
            indices[currIndex++] = i + size_; // bottom-left vertex
            indices[currIndex++] = i;         // top-left vertex

            indices[currIndex++] = i + 1;         // top-right vertex
            indices[currIndex++] = i + size_ + 1; // bottom-right vertex
            indices[currIndex++] = i + size_;     // bottom-left vertex
        }
    }
}

void Terrain::setSpacing(float spacing)
{
    spacing_ = spacing;
    buildTerrain();
}
