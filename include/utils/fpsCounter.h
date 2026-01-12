#ifndef FPS_COUNTER_H
#define FPS_COUNTER_H

#include <string>

class fpsCounter
{
private:
    int frameCount_;
    double lastTime_;
    std::string id_;

public:
    fpsCounter(std::string id);
    void update();
};

#endif