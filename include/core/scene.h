#ifndef SCENE_H
#define SCENE_H

class Camera;
class DistantLight;
class Terrain;

class Scene
{
private:
    Camera *cam_;
    DistantLight *light_;
    float ambientLight_;
    Terrain *worldTerrain_;

public:
    Scene(int terrainSize);
    ~Scene();

    // getters
    Camera *getCamera() const { return cam_; }
    DistantLight *getLight() const { return light_; }
    float getAmbientLight() const { return ambientLight_; }
    Terrain *getTerrain() const { return worldTerrain_; }

    // setter
    void setAmbientLight(float ambientLightIntensity);
};

#endif