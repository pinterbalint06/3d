#ifndef CAMERA_H
#define CAMERA_H

#include <cmath>
#include <algorithm>
#include <cstring>
#include <cstdlib>

class Camera
{
private:
    /**
     * @brief Pointer to the camera's view matrix.
     *
     * This matrix defines the transformation from world space to camera (view) space.
     * It is a 4x4 matrix stored in a contiguous float array in row-major order.
     */
    float *viewMatrix_;

    /**
     * @brief Pointer to the projection matrix used by the camera for transforming 3D coordinates to 2D screen space.
     *
     * It is a 4x4 matrix stored in a contiguous float array in row-major order.
     */
    float *projMatrix_;

    /// @brief The coordinates of the camera's position in 3D space.
    float x_, y_, z_;

    /// @brief The yaw angle of the camera, representing rotation around the vertical (Y) axis, in radians.
    float yaw_;

    /// @brief The pitch angle of the camera, representing rotation around the vertical (X) axis, in radians.
    float pitch_;

    /// @brief Indicates whether the camera view has to be updated
    bool newView_;

    /// @brief Camera properties
    float focalLength_, filmW_, filmH_, imageW_, imageH_, n_, f_;

    /**
     * @brief Sets the perspective projection matrix for the camera.
     *
     * Configures the camera's projection matrix based on focal length, film size,
     * image size, and near/far clipping planes. Adjusts for differences between the film and image
     * aspect ratios to ensure correct field of view and image coverage.
     *
     */
    void updatePerspective();

public:
    /**
     * @brief Default constructor for the Camera class.
     *
     * Initializes the camera's view and projection matrices to identity matrices,
     * allocates memory for both matrices, and sets the camera's position (x, y, z)
     * and orientation (yaw, pitch) to zero. Also marks the view as needing an update.
     */
    Camera();

    /**
     * @brief Destructor for the Camera class.
     *
     * Releases the memory allocated for the view and projection matrices,
     * if they have been previously allocated.
     */
    ~Camera();

    // getters
    /**
     * @brief Returns the view matrix.
     *
     * @return Pointer to the view matrix.
     */
    float *getViewMatrix() const { return viewMatrix_; }

    /**
     * @brief Returns the projection matrix.
     *
     * @return Pointer to the projection matrix.
     */
    float *getProjMatrix() const { return projMatrix_; }

    // position getters
    /**
     * @brief Returns the current x-coordinate of the camera.
     *
     * @return The x-coordinate of the camera.
     */
    float getXPosition() { return x_; }

    /**
     * @brief Returns the current y-coordinate of the camera.
     *
     * @return The y-coordinate of the camera.
     */
    float getYPosition() { return y_; }

    /**
     * @brief Returns the current z-coordinate of the camera.
     *
     * @return The z-coordinate of the camera.
     */
    float getZPosition() { return z_; }

    // rotation getters
    /**
     * @brief Returns the current yaw angle of the camera.
     *
     * @return The yaw angle in radians.
     */
    float getYaw() const { return yaw_; }

    /**
     * @brief Returns the current pitch angle of the camera.
     *
     * @return The pitch angle in radians.
     */
    float getPitch() const { return pitch_; }

    // camera propery sett
    /**
     * @brief Sets the focal length of the camera.
     *
     * Updates the camera's focal length to the specified value,
     * and calls updatePerspective().
     *
     * @param pitch The new pitch angle (in radians).
     * @param yaw The new yaw angle (in radians).
     */
    void setFocalLength(float focalLength);

    // position setter
    /**
     * @brief Sets the position of the camera in 3D space.
     *
     * Updates the camera's x, y, and z coordinates to the specified values,
     * and marks the view as needing to be updated.
     *
     * @param x The new x-coordinate of the camera.
     * @param y The new y-coordinate of the camera.
     * @param z The new z-coordinate of the camera.
     */
    void setPosition(float x, float y, float z);

    // rotation setters
    /**
     * @brief Sets the rotation of the camera.
     *
     * Updates the camera's pitch and yaw angles to the specified values,
     * and marks the view as needing to be updated.
     *
     * @param pitch The new pitch angle (in radians).
     * @param yaw The new yaw angle (in radians).
     */
    void setRotation(float pitch, float yaw);

    /**
     * @brief Rotates the camera by adjusting its pitch and yaw angles.
     *
     * This function increments the camera's pitch and yaw by the specified amounts,
     * and marks the view as needing an update.
     *
     * @param dPitch The amount to add to the current pitch angle (in radians).
     * @param dYaw The amount to add to the current yaw angle (in radians).
     */
    void rotate(float dPitch, float dYaw);

    /**
     * @brief Updates the camera's view matrix based on its current position and orientation.
     *
     * This method recalculates the view matrix if the camera's view has changed (newView is true).
     * It constructs rotation matrices for the yaw (Y axis) and pitch (X axis) angles, multiplies them
     * to form the combined rotation matrix, and then applies a translation matrix based on the camera's
     * position (x, y, z). The final view matrix is the product of the translation and rotation matrices.
     * After updating, the newView flag is set to false.
     */
    void updateViewMatrix();

    /**
     * @brief Sets the camera's properties and calls updatePerspective().
     *
     * @param focal   The focal length of the camera lens.
     * @param filmW   The width of the film/sensor.
     * @param filmH   The height of the film/sensor.
     * @param imageW  The width of the output image in pixels.
     * @param imageH  The height of the output image in pixels.
     * @param n       The near clipping plane distance.
     * @param f       The far clipping plane distance.
     */
    void setPerspective(float focal, float filmW, float filmH,
                        int imageW, int imageH, float n, float f);
};

#endif