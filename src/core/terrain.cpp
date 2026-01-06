#include "core/mesh.h"
#include "core/terrain.h"
#include <cstring>
#include "utils/perlin.h"

Terrain::Terrain(int size)
{
    size_ = size;
    PerlinNoise::PerlinParameters parameters;
    parameters.amplitude = 2.0f;
    parameters.lacunarity = 2.0f;
    parameters.persistence = 0.4f;
    parameters.octaveCount = 8;
    parameters.frequency = 1.0f;
    parameters.seed = 0;
    parameters.noiseSize = 150.0f;
    spacing_ = 1.0f;
    textureSpacing_ = 1.0f;
    perlinNoise_ = new PerlinNoise::Perlin(parameters, true);
    mesh_ = new Mesh(size * size, (size - 1) * (size - 1) * 6);
}

void Terrain::cleanup()
{
    if (mesh_)
    {
        delete mesh_;
    }
}

Terrain::~Terrain()
{
    cleanup();
}

void Terrain::setSeed(int seed)
{
    PerlinNoise::PerlinParameters parameters = perlinNoise_->getParameters();
    parameters.seed = seed;
    if (perlinNoise_)
    {
        delete perlinNoise_;
    }
    perlinNoise_ = new PerlinNoise::Perlin(parameters, true);
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
    mesh_ = new Mesh(size * size, (size - 1) * (size - 1) * 6);
    mesh_->setMaterial(currentMaterial);
}

void Terrain::regenerate()
{
    buildTerrain();
    mesh_->setUpOpenGL();
}

void Terrain::buildTerrain()
{
    int i;
    Vertex *vertices = mesh_->getVertices();
    float scale = 1.0f / 128.0f;
    // generate heightmap
    for (int y = 0; y < size_; y++)
    {
        for (int x = 0; x < size_; x++)
        {
            i = y * size_ + x;
            vertices[i].x = x * spacing_;
            vertices[i].y = perlinNoise_->fbm(x * scale, y * scale);
            vertices[i].z = -y * spacing_;
            vertices[i].w = 1.0f;
            vertices[i].u = (float)x * textureSpacing_;
            vertices[i].v = (float)y * textureSpacing_;
        }
    }

    float spacingInv = 1.0f / spacing_;
    // calculate normals
    for (int y = 0; y < size_; y++)
    {
        for (int x = 0; x < size_; x++)
        {
            i = y * size_ + x;
            // if it is already calculated get it from the heightmap if not calculate it
            float prevValueX = x - 1 < 0 ? perlinNoise_->fbm(x * scale, y * scale) : vertices[y * size_ + x - 1].y;
            float nxtValueX = x + 1 > size_ - 1 ? perlinNoise_->fbm(x * scale, y * scale) : vertices[y * size_ + x + 1].y;
            float centralDifferenceX = (nxtValueX - prevValueX) * 0.5f * spacingInv;

            // if it is already calculated get it from the heightmap if not calculate it
            float prevValueY = y - 1 < 0 ? perlinNoise_->fbm(x * scale, y * scale) : vertices[(y - 1) * size_ + x].y;
            float nxtValueY = y + 1 > size_ - 1 ? perlinNoise_->fbm(x * scale, y * scale) : vertices[(y + 1) * size_ + x].y;
            float centralDifferenceY = (nxtValueY - prevValueY) * 0.5f * spacingInv;

            vertices[i].nx = -centralDifferenceX;
            vertices[i].ny = 1.0f;
            vertices[i].nz = centralDifferenceY;

            float normLen = std::sqrt(vertices[i].nx * vertices[i].nx + vertices[i].ny * vertices[i].ny + vertices[i].nz * vertices[i].nz);
            vertices[i].nx /= normLen;
            vertices[i].ny /= normLen;
            vertices[i].nz /= normLen;
        }
    }

    // calculate indices
    uint32_t *indices = mesh_->getIndices();
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
    regenerate();
}

void Terrain::setTextureSpacing(float textureSpacing)
{
    textureSpacing_ = textureSpacing;
    // recalculate uvs
    Vertex *vertices = mesh_->getVertices();
    for (int y = 0; y < size_; y++)
    {
        for (int x = 0; x < size_; x++)
        {
            int i = y * size_ + x;
            vertices[i].u = (float)x * textureSpacing_;
            vertices[i].v = (float)y * textureSpacing_;
        }
    }
    // upload to GPU
    mesh_->setUpOpenGL();
}
