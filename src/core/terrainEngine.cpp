#include <core/terrainEngine.h>
#include <core/engine.h>
#include <core/vertex.h>
#include <core/renderer.h>
#include <core/terrain.h>
#include <string>

TerrainEngine::TerrainEngine(std::string canvID, int size) : Engine(canvID)
{
    terrain_ = new Terrain(size);
    terrain_->setUpNoiseForGPU(renderer_->getPerlinUBOloc(), renderer_->getWarpUBOloc());
    terrain_->setMaterial(Materials::Material::Grass());
    terrain_->regenerate();
    scene_->addMesh(terrain_);
    renderer_->setDefaultColor(135.0f, 206.0f, 235.0f);
    cameraHeight_ = 3.8;
    cameraLocation_ = 0;
    calcNewCamLoc();
}

TerrainEngine::~TerrainEngine()
{
    if (terrain_)
    {
        delete terrain_;
    }
}

void TerrainEngine::calcNewCamLoc()
{
    Vertex vertex = terrain_->getVertices()[cameraLocation_];
    Vertex worldSpaceVert;
    worldSpaceVert.x = vertex.x;
    worldSpaceVert.y = vertex.y;
    worldSpaceVert.z = vertex.z;
    worldSpaceVert.w = vertex.w;

    float *modelMatrix = terrain_->getModelMatrix();
    worldSpaceVert.multWithMatrix(modelMatrix);
    scene_->getCamera()->setPosition(worldSpaceVert.x, worldSpaceVert.y + cameraHeight_, worldSpaceVert.z);
}

void TerrainEngine::setCameraHeight(float cameraHeight)
{
    cameraHeight_ = cameraHeight;
    calcNewCamLoc();
}

void TerrainEngine::setTerrainParams(int size, PerlinNoise::PerlinParameters &params)
{
    terrain_->setParams(size, params);
    calcNewCamLoc();
}

void TerrainEngine::setWarpParams(int size, PerlinNoise::PerlinParameters &params)
{
    terrain_->setWarpParams(size, params);
    calcNewCamLoc();
}

void TerrainEngine::setTextureSpacing(float textureSpacing)
{
    terrain_->setTextureSpacing(textureSpacing);
}

void TerrainEngine::setDomainWarp(bool domainWarp)
{
    terrain_->setDomainWarp(domainWarp);
    calcNewCamLoc();
};

void TerrainEngine::setGroundMaterial(Materials::Material material)
{
    terrain_->setMaterial(material);
}

void TerrainEngine::randomizeLocation()
{
    cameraLocation_ = rand() % (terrain_->getVertexCount());
    calcNewCamLoc();
}

void TerrainEngine::moveCamera(int x, int z)
{
    int size = terrain_->getSize();
    int newLocation = cameraLocation_ + z * size + x;
    if (!((x == -1 && newLocation % size == size - 1) || (x == 1 && newLocation % size == 0) || (newLocation < 0) || (newLocation >= size * size)))
    {
        cameraLocation_ += z * size + x;
        calcNewCamLoc();
    }
}
