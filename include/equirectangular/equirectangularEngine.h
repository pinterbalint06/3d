#ifndef EQUIRECTANGULAR_ENGINE_H
#define EQUIRECTANGULAR_ENGINE_H

#include <core/engine.h>
#include <string>

class Mesh;

class EquirectangularEngine : public Engine
{
private:
    Mesh *generateSphereSegment(int rings, int segments, float radius,
                                float uMin, float uMax, float vMin, float vMax);

public:
    EquirectangularEngine(const std::string &canvasID);
};

#endif