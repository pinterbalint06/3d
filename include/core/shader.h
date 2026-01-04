#ifndef SHADER_H
#define SHADER_H

#include "utils/mathUtils.h"
#include "core/distantLight.h"
#include "core/material.h"
#include "core/vertex.h"
#include "core/texture.h"
#include <GLES3/gl3.h>
#include <string>

namespace Shaders
{
    class Shader
    {
    private:
        GLuint programID_;
        GLuint compileShader(const char *src, GLuint type);
        std::string loadHelperFiles();

    public:
        Shader(const char *pathToVertex, const char *pathToFragment);
        ~Shader();
        void use();

        GLuint getProgramID() { return programID_; }

        void setUniformInt(std::string variableName, int value);
    };
    /// @brief The SHADINGMODE enum for selecting shading algorithms
    enum SHADINGMODE
    {
        PHONG = 0,     /// Phong shading
        GOURAUD = 1,   /// Gouraud shading
        FLAT = 2,      /// Flat shading
        NO_SHADING = 3 /// No shading
    };
}

#endif