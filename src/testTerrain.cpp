#include <emscripten.h>
#include <emscripten/bind.h>
#include "core/engine.h"
#include "core/shader.h"
#include "utils/perlin.h"
#include "core/terrainEngine.h"
#include "core/material.h"

EMSCRIPTEN_BINDINGS(enums)
{
    emscripten::enum_<Shaders::SHADINGMODE>("SHADINGMODE")
        .value("PHONG", Shaders::SHADINGMODE::PHONG)
        .value("GOURAUD", Shaders::SHADINGMODE::GOURAUD)
        .value("NO_SHADING", Shaders::SHADINGMODE::NO_SHADING);
}

EMSCRIPTEN_BINDINGS(structs)
{
    emscripten::value_object<PerlinNoise::PerlinParameters>("PerlinParameters")
        .field("seed", &PerlinNoise::PerlinParameters::seed)
        .field("octaveCount", &PerlinNoise::PerlinParameters::octaveCount)
        .field("frequency", &PerlinNoise::PerlinParameters::frequency)
        .field("amplitude", &PerlinNoise::PerlinParameters::amplitude)
        .field("persistence", &PerlinNoise::PerlinParameters::persistence)
        .field("lacunarity", &PerlinNoise::PerlinParameters::lacunarity)
        .field("noiseSize", &PerlinNoise::PerlinParameters::noiseSize)
        .field("scaling", &PerlinNoise::PerlinParameters::scaling)
        .field("steepness", &PerlinNoise::PerlinParameters::steepness)
        .field("contrast", &PerlinNoise::PerlinParameters::contrast);

    emscripten::class_<Materials::Color>("Color")
        .constructor<>()
        .property("r", &Materials::Color::r)
        .property("g", &Materials::Color::g)
        .property("b", &Materials::Color::b)
        .class_function("fromRGB", &Materials::Color::fromRGB);

    emscripten::class_<Materials::Material>("Material")
        .constructor<>()
        .property("albedo", &Materials::Material::albedo)
        .property("diffuseness", &Materials::Material::diffuseness)
        .property("specularity", &Materials::Material::specularity)
        .property("shininess", &Materials::Material::shininess)
        .property("texture", &Materials::Material::texture, emscripten::allow_raw_pointers())
        .class_function("Grass", &Materials::Material::Grass)
        .class_function("Dirt", &Materials::Material::Dirt)
        .class_function("createMaterial", &Materials::Material::createMaterial);
}

EMSCRIPTEN_BINDINGS(terrainEngineBinding)
{
    emscripten::class_<Engine>("Engine");
    emscripten::class_<TerrainEngine, emscripten::base<Engine>>("TerrainEngine")
        .constructor<std::string, int>()
        .function("getNoiseParameters", &TerrainEngine::getNoiseParameters)
        .function("setTerrainParams", &TerrainEngine::setTerrainParams)
        .function("getWarpParameters", &TerrainEngine::getWarpParameters)
        .function("setWarpParams", &TerrainEngine::setWarpParams)
        .function("setCameraHeight", &TerrainEngine::setCameraHeight)
        .function("setTextureSpacing", &TerrainEngine::setTextureSpacing)
        .function("setDomainWarp", &TerrainEngine::setDomainWarp)
        .function("setGroundMaterial", &TerrainEngine::setGroundMaterial)
        .function("randomizeLocation", &TerrainEngine::randomizeLocation)
        .function("moveCamera", &TerrainEngine::moveCamera)
        .function("setLightDirection", &TerrainEngine::setLightDirection)
        .function("setLightIntensity", &TerrainEngine::setLightIntensity)
        .function("setShadingMode", &TerrainEngine::setShadingMode)
        .function("setFrustum", &TerrainEngine::setFrustum)
        .function("setLightColor", &TerrainEngine::setLightColor)
        .function("setAmbientLight", &TerrainEngine::setAmbientLight)
        .function("setFocalLength", &TerrainEngine::setFocalLength)
        .function("rotateCamera", &TerrainEngine::rotateCamera)
        .function("setCameraRotation", &TerrainEngine::setCameraRotation)
        .function("render", &TerrainEngine::render)
        .function("initTexture", emscripten::optional_override(
                                     [](TerrainEngine &self, int width, int height) -> int
                                     {
                                         return (int)self.initTexture(width, height);
                                     }))
        .function("uploadTextureToGPU", &TerrainEngine::uploadTextureToGPU)
        .function("deleteTexture", &TerrainEngine::deleteTexture)
        .function("getPitch", &TerrainEngine::getPitch)
        .function("getYaw", &TerrainEngine::getYaw);
}
