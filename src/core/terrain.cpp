#include "core/mesh.h"
#include "core/terrain.h"
#include <cstring>
#include "utils/perlin.h"

Terrain::Terrain(int size) : Mesh(size * size, (size - 1) * (size - 1) * 6)
{
    size_ = size;
    PerlinNoise::PerlinParameters parameters;
    parameters.amplitude = 2.0f;
    parameters.lacunarity = 1.95f;
    parameters.persistence = 0.375f;
    parameters.octaveCount = 10;
    parameters.frequency = 1.0f;
    parameters.seed = 0;
    parameters.noiseSize = 150.0f;
    parameters.scaling = 1.0f / 128.0f;
    parameters.contrast = 1;
    parameters.steepness = 1.0f;
    textureSpacing_ = 1.0f;
    perlinNoise_ = new PerlinNoise::Perlin(parameters);

    PerlinNoise::PerlinParameters warpParameters;
    warpParameters.amplitude = 2.0f;
    warpParameters.lacunarity = 1.95f;
    warpParameters.persistence = 0.375f;
    warpParameters.octaveCount = 3;
    warpParameters.frequency = 1.0f;
    warpParameters.seed = 0;
    warpParameters.noiseSize = 1.0f;
    warpParameters.scaling = 1.0f / 128.0f;
    warpParameters.contrast = 1.0f;
    warpParameters.steepness = 1.0f;
    textureSpacing_ = 1.0f;
    warpNoise_ = new PerlinNoise::Perlin(warpParameters);
    domainWarp_ = 0;
}

Terrain::~Terrain()
{
    if (perlinNoise_)
    {
        delete perlinNoise_;
    }
    if (warpNoise_)
    {
        delete warpNoise_;
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

float Terrain::calculateHeight(float x, float y)
{
    float scale = 1.0f / 128.0f;
    float noiseX = x * scale;
    float noiseY = y * scale;

    float noiseValue;
    if (domainWarp_ == 1)
    {

        float qx = warpNoise_->fbm(noiseX + 1.1, noiseY + 3.5);
        float qy = warpNoise_->fbm(noiseX + 2.4, noiseY + 4.5);

        float rx = warpNoise_->fbm(noiseX + 2.0f * qx, noiseY + 2.0f * qy);
        float ry = warpNoise_->fbm(noiseX + 2.0f * qx, noiseY + 2.0f * qy);

        float warpStrength = 1.5f;

        noiseX += rx * warpStrength;
        noiseY += ry * warpStrength;
    }
    return perlinNoise_->fbm(noiseX, noiseY);
}

void Terrain::buildTerrain()
{
    int i;
    // generate heightmap
    for (int y = 0; y < size_; y++)
    {
        for (int x = 0; x < size_; x++)
        {
            i = y * size_ + x;
            vertices_[i].x = x;
            vertices_[i].y = calculateHeight(x, y);
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
            float prevValueX = x - 1 < 0 ? calculateHeight(x, y) : vertices_[y * size_ + x - 1].y;
            float nxtValueX = x + 1 > size_ - 1 ? calculateHeight(x, y) : vertices_[y * size_ + x + 1].y;
            float centralDifferenceX = (nxtValueX - prevValueX) * 0.5f;

            // if it is already calculated get it from the heightmap if not calculate it
            float prevValueY = y - 1 < 0 ? calculateHeight(x, y) : vertices_[(y - 1) * size_ + x].y;
            float nxtValueY = y + 1 > size_ - 1 ? calculateHeight(x, y) : vertices_[(y + 1) * size_ + x].y;
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

void Terrain::setUpNoiseForGPU(GLuint *perlinLoc, GLuint *warpLoc)
{
    perlinNoise_->setUpGPU(perlinLoc);
    warpNoise_->setUpGPU(warpLoc);
}

void Terrain::setDomainWarp(bool domainWarp)
{
    if (domainWarp != domainWarp_)
    {
        domainWarp_ = domainWarp;
        regenerate();
    }
}
