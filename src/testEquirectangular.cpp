#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <string>
#include "core/equirectangularEngine.h"

EMSCRIPTEN_BINDINGS(equirectangularEngineBinding)
{
    emscripten::class_<Engine>("Engine")
        .function("setLightDirection", &EquirectangularEngine::setLightDirection)
        .function("setLightIntensity", &EquirectangularEngine::setLightIntensity)
        .function("setShadingMode", &EquirectangularEngine::setShadingMode)
        .function("setFrustum", &EquirectangularEngine::setFrustum)
        .function("setLightColor", &EquirectangularEngine::setLightColor)
        .function("setAmbientLight", &EquirectangularEngine::setAmbientLight)
        .function("setFocalLength", &EquirectangularEngine::setFocalLength)
        .function("rotateCamera", &EquirectangularEngine::rotateCamera)
        .function("setCameraRotation", &EquirectangularEngine::setCameraRotation)
        .function("render", &EquirectangularEngine::render)
        .function("initTexture", emscripten::optional_override(
                                     [](EquirectangularEngine &self, int width, int height) -> int
                                     {
                                         return (int)self.initTexture(width, height);
                                     }))
        .function("uploadTextureToGPU", &EquirectangularEngine::uploadTextureToGPU)
        .function("deleteTexture", &EquirectangularEngine::deleteTexture)
        .function("getPitch", &EquirectangularEngine::getPitch)
        .function("getYaw", &EquirectangularEngine::getYaw);

    emscripten::class_<EquirectangularEngine, emscripten::base<Engine>>("EquirectangularEngine")
        .constructor<std::string>();
}
