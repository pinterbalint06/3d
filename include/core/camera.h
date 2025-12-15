#ifndef CAMERA_H
#define CAMERA_H

#include <cmath>
#include <algorithm>
#include <cstring>
#include <cstdlib>

class Camera {
private:
    // camera matrix
    float* viewMatrix_;
    // perspective projection matrix
    float* projMatrix_;

    // camera postion
    float x_, y_, z_;
    
    // rotation in radian
    float yaw_;
    float pitch_;

    // need to recalculate view matrix
    bool newView_;
public:
    Camera();
    ~Camera();

    // getters
    float* getViewMatrix() const { return viewMatrix_; }
    float* getProjMatrix() const { return projMatrix_; }

    // position getters
    float getXPosition() { return x_; }
    float getYPosition() { return y_; }
    float getZPosition() { return z_; }

    // rotation getters
    float getYaw() const { return yaw_; }
    float getPitch() const { return pitch_; }

    // position setter
    void setPosition(float x, float y, float z);
    
    // rotation setters
    void setRotation(float pitch, float yaw);
    void rotate(float dPitch, float dYaw);

    // view matrix calculation
    void updateViewMatrix();
    
    // calculates frustum
    void setPerspective(float focal, float filmW, float filmH, 
                       int imageW, int imageH, float n, float f);
};

#endif