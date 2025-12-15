#include "core/scene.h"
#include "core/distantLight.h"
#include "core/terrain.h"
#include "core/camera.h"

Scene::Scene(int terrainSize) {
    // sun color
    // red: 255.0 normalize -> 255.0f/255.0 = 1.0
    // green: 223.0 normalize -> 223.0f/255.0 = 0.8745
    // blue: 34.0 normalize -> 34.0f/255.0 = 0.13333
    light_ = new distantLight(1.0f, 0.8745f, 0.13333f, 1800.0f, 0, -1, 0);
    worldTerrain_ = new Terrain(terrainSize);
    cam_ = new Camera();
}

Scene::~Scene() {
    delete light_;
    delete worldTerrain_;
    delete cam_;
}
