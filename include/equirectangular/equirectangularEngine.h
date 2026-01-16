#ifndef EQUIRECTANGULAR_ENGINE_H
#define EQUIRECTANGULAR_ENGINE_H

#include <core/engine.h>
#include <string>
#include <vector>

class Mesh;

enum EQUIRECTANGULARMODE
{
    FULL = 1,
    SPLIT_2X2 = 2,
    SPLIT_4X4 = 4
};

class EquirectangularEngine : public Engine
{
private:
    Mesh *generateSphereSegment(int rings, int segments, float radius,
                                float uMin, float uMax, float vMin, float vMax);
    void generateSphere();
    std::vector<Texture *> imageTiles_;
    EQUIRECTANGULARMODE currMode_;

    void changeImageMode(EQUIRECTANGULARMODE mode);
    void uploadTiles(const std::string &url, int ctx);

public:
    EquirectangularEngine(const std::string &canvasID);
    ~EquirectangularEngine();
    void loadEquirectangularImage(const std::string &url, int width, int height);
};

#endif