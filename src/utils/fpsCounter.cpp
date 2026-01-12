#include <utils/fpsCounter.h>
#include <emscripten.h>
#include <emscripten/bind.h>
#include <string>

fpsCounter::fpsCounter(std::string id)
{
    id_ = id;
    frameCount_ = 0;
    lastTime_ = emscripten_get_now();
}

void fpsCounter::update()
{
    frameCount_++;
    double currentTime = emscripten_get_now();
    if (currentTime - lastTime_ >= 1000.0)
    {
        EM_ASM({
            let fps = document.getElementById(UTF8ToString($1));
            if (fps) {
                fps.innerText = $0;
            } }, frameCount_, id_.c_str());
        frameCount_ = 0;
        lastTime_ = currentTime;
    }
}
