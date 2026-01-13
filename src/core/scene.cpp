#include "core/scene.h"
#include "core/distantLight.h"
#include "core/mesh.h"
#include "core/camera.h"

Scene::Scene()
{
    // sun color
    // red: 255.0 normalize -> 255.0f/255.0 = 1.0
    // green: 223.0 normalize -> 223.0f/255.0 = 0.8745
    // blue: 34.0 normalize -> 34.0f/255.0 = 0.13333
    light_ = new DistantLight(1.0f, 1.0f, 1.0f, 1500.0f, 0, -1, 0);
    cam_ = new Camera();
    ambientLight_ = 4.0f;
}

Scene::~Scene()
{
    delete light_;
    delete cam_;
    for (int i = 0; i < meshes_.size(); i++)
    {
        delete meshes_[i];
    }
}

void Scene::setAmbientLight(float ambientLightIntensity)
{
    ambientLight_ = ambientLightIntensity;
}

void Scene::addMesh(Mesh *mesh)
{
    mesh->setUpOpenGL();
    meshes_.push_back(mesh);
}

void Scene::removeMesh(int index)
{
    meshes_.erase(meshes_.begin() + index);
}
