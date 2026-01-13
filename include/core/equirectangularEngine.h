#ifndef EQUIRECTANGULAR_ENGINE_H
#define EQUIRECTANGULAR_ENGINE_H

#include <core/engine.h>

class EquirectangularEngine : public Engine
{
private:
    Mesh *generateSphere(int rings, int segments, float radius);

public:
    EquirectangularEngine(std::string canvasID);
};

#endif