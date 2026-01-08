#include "core/mesh.h"
#include "core/terrain.h"
#include <cstring>
#include "utils/perlin.h"

Terrain::Terrain(int size) : Mesh(size * size, (size - 1) * (size - 1) * 6)
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
    parameters.scaling = 1.0f / 128.0f;
    parameters.steepness = 3.5f;
    textureSpacing_ = 1.0f;
    perlinNoise_ = new PerlinNoise::Perlin(parameters);
}

Terrain::~Terrain()
{
    if (perlinNoise_)
    {
        delete perlinNoise_;
    }
}

void Terrain::setSeed(int seed)
{
    PerlinNoise::PerlinParameters parameters = perlinNoise_->getParameters();
    parameters.seed = seed;
    GLuint *uboLoc = perlinNoise_->getUBOloc();
    if (perlinNoise_)
    {
        delete perlinNoise_;
    }
    perlinNoise_ = new PerlinNoise::Perlin(parameters);
    if (uboLoc)
    {
        perlinNoise_->setUpGPU(uboLoc);
    }
}

void Terrain::setSize(int size)
{
    if (size != size_)
    {
        size_ = size;
        resize(size_ * size_, (size_ - 1) * (size_ - 1) * 6);
        regenerate();
    }
}

void Terrain::regenerate()
{
    buildTerrain();
    setUpOpenGL();
}

void Terrain::buildTerrain()
{
    int i;
    float scale = 1.0f / 128.0f;
    // generate heightmap
    for (int y = 0; y < size_; y++)
    {
        for (int x = 0; x < size_; x++)
        {
            i = y * size_ + x;
            vertices_[i].x = x;
            vertices_[i].y = perlinNoise_->fbm(x * scale, y * scale);
            vertices_[i].z = -y;
            vertices_[i].w = 1.0f;
            vertices_[i].u = (float)x * textureSpacing_;
            vertices_[i].v = (float)y * textureSpacing_;
        }
    }

    // calculate normals
    for (int y = 0; y < size_; y++)
    {
        for (int x = 0; x < size_; x++)
        {
            i = y * size_ + x;
            // if it is already calculated get it from the heightmap if not calculate it
            float prevValueX = x - 1 < 0 ? perlinNoise_->fbm(x * scale, y * scale) : vertices_[y * size_ + x - 1].y;
            float nxtValueX = x + 1 > size_ - 1 ? perlinNoise_->fbm(x * scale, y * scale) : vertices_[y * size_ + x + 1].y;
            float centralDifferenceX = (nxtValueX - prevValueX) * 0.5f;

            // if it is already calculated get it from the heightmap if not calculate it
            float prevValueY = y - 1 < 0 ? perlinNoise_->fbm(x * scale, y * scale) : vertices_[(y - 1) * size_ + x].y;
            float nxtValueY = y + 1 > size_ - 1 ? perlinNoise_->fbm(x * scale, y * scale) : vertices_[(y + 1) * size_ + x].y;
            float centralDifferenceY = (nxtValueY - prevValueY) * 0.5f;

            vertices_[i].nx = -centralDifferenceX;
            vertices_[i].ny = 1.0f;
            vertices_[i].nz = centralDifferenceY;

            float normLen = std::sqrt(vertices_[i].nx * vertices_[i].nx + vertices_[i].ny * vertices_[i].ny + vertices_[i].nz * vertices_[i].nz);
            vertices_[i].nx /= normLen;
            vertices_[i].ny /= normLen;
            vertices_[i].nz /= normLen;
        }
    }

    // calculate indices
    int currIndex = 0;
    for (int y = 0; y < size_ - 1; y++)
    {
        for (int x = 0; x < size_ - 1; x++)
        {
            i = y * size_ + x;

            // We form two triangles from a rectangle in the perlin grid
            indices_[currIndex++] = i + 1;     // top-right vertex
            indices_[currIndex++] = i + size_; // bottom-left vertex
            indices_[currIndex++] = i;         // top-left vertex

            indices_[currIndex++] = i + 1;         // top-right vertex
            indices_[currIndex++] = i + size_ + 1; // bottom-right vertex
            indices_[currIndex++] = i + size_;     // bottom-left vertex
        }
    }
}

void Terrain::setTextureSpacing(float textureSpacing)
{
    textureSpacing_ = textureSpacing;
    // recalculate uvs
    for (int y = 0; y < size_; y++)
    {
        for (int x = 0; x < size_; x++)
        {
            int i = y * size_ + x;
            vertices_[i].u = (float)x * textureSpacing_;
            vertices_[i].v = (float)y * textureSpacing_;
        }
    }
    // upload to GPU
    setUpOpenGL();
}

void Terrain::setUpNoiseForGPU(GLuint *loc)
{
    perlinNoise_->setUpGPU(loc);
}
