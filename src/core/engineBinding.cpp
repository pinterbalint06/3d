#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include "core/engine.h"

EMSCRIPTEN_BINDINGS(engineBinding)
{
    emscripten::class_<Engine>("Engine")
        .constructor<std::string>()
        .function("setLightDirection", &Engine::setLightDirection)
        .function("setLightIntensity", &Engine::setLightIntensity)
        .function("setShadingMode", &Engine::setShadingMode)
        .function("setFrustum", &Engine::setFrustum)
        .function("setLightColor", &Engine::setLightColor)
        .function("setAmbientLight", &Engine::setAmbientLight)
        .function("setFocalLength", &Engine::setFocalLength)
        .function("rotateCamera", &Engine::rotateCamera)
        .function("setCameraRotation", &Engine::setCameraRotation)
        .function("render", &Engine::render)
        .function("initTexture", emscripten::optional_override(
                                     [](Engine &self, int width, int height, int meshIndex) -> int
                                     {
                                         return (int)self.initTexture(width, height, meshIndex);
                                     }))
        .function("uploadTextureToGPU", &Engine::uploadTextureToGPU)
        .function("deleteTexture", &Engine::deleteTexture)
        .function("loadTextureFromUrl", &Engine::loadTextureFromUrl)
        .function("getPitch", &Engine::getPitch)
        .function("getYaw", &Engine::getYaw)
        .function("setCanvasSize", &Engine::setCanvasSize);
}
