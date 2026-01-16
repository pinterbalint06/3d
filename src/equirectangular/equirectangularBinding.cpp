#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <string>
#include "equirectangular/equirectangularEngine.h"

EMSCRIPTEN_BINDINGS(equirectangularEngineBinding)
{
    emscripten::class_<EquirectangularEngine, emscripten::base<Engine>>("EquirectangularEngine")
        .constructor<std::string>()
        .function("loadEquirectangularImage", &EquirectangularEngine::loadEquirectangularImage);
}
