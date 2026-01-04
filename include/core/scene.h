#ifndef SCENE_H
#define SCENE_H

class Camera;
class DistantLight;
class Mesh;

struct SceneData
{
    float MVP[16];              // 0
    float camPos[3];            // 64
    float pad0;                 // 76
    float lightVec[3];          // 80
    float pad1;                 // 92
    float lightColor[3];        // 96
    float pad2;                 // 108
    float lightColorPreCalc[3]; // 112
    float ambientLight;         // 128
    float pad4[3];              // 132->144
};

class Scene
{
private:
    Camera *cam_;
    DistantLight *light_;
    float ambientLight_;
    Mesh *mesh_;

public:
    Scene();
    ~Scene();

    // getters
    Camera *getCamera() const { return cam_; }
    DistantLight *getLight() const { return light_; }
    float getAmbientLight() const { return ambientLight_; }
    Mesh *getMesh() const { return mesh_; }

    // setter
    void setAmbientLight(float ambientLightIntensity);
    void setMesh(Mesh *mesh);
};

#endif