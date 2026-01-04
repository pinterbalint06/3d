#include <core/shader.h>
#include <GLES3/gl3.h>
#include <string>
#include <fstream>
#include <sstream>
#include <iostream>
#include <emscripten/emscripten.h>

namespace Shaders
{
    GLuint Shader::compileShader(const char *src, GLuint type)
    {
        int success;
        GLuint shader = glCreateShader(type);
        glShaderSource(shader, 1, &src, NULL);
        glCompileShader(shader);

        glGetShaderiv(shader, GL_COMPILE_STATUS, &success);
        if (!success)
        {
            char infoLog[512];
            glGetShaderInfoLog(shader, 512, NULL, infoLog);
            EM_ASM({ throw("Sikertelen shader fordítás: " + UTF8ToString($0)); }, infoLog);
        };
        return shader;
    }

    std::string Shader::loadHelperFiles()
    {
        std::string hCode;
        std::ifstream hFile;

        hFile.exceptions(std::ifstream::failbit | std::ifstream::badbit);
        try
        {
            hFile.open("shaders/phongReflectionModel.glsl");
            std::stringstream hBuffer;
            hBuffer << hFile.rdbuf();
            hFile.close();
            hCode = hBuffer.str();
        }
        catch (std::ifstream::failure e)
        {
            EM_ASM(
                throw("Sikertelen shader helper fájl beolvasás"));
        }
        return hCode;
    }

    Shader::Shader(const char *pathToVertex, const char *pathToFragment)
    {
        std::string vCode;
        std::string fCode;
        std::ifstream vFile;
        std::ifstream fFile;

        vFile.exceptions(std::ifstream::failbit | std::ifstream::badbit);
        fFile.exceptions(std::ifstream::failbit | std::ifstream::badbit);
        try
        {
            vFile.open(pathToVertex);
            fFile.open(pathToFragment);
            std::stringstream vBuffer, fBuffer;
            vBuffer << vFile.rdbuf();
            fBuffer << fFile.rdbuf();
            vFile.close();
            fFile.close();
            vCode = vBuffer.str();
            fCode = fBuffer.str();
        }
        catch (std::ifstream::failure e)
        {
            EM_ASM(
                throw("Sikertelen shader fájl beolvasás"));
        }

        std::string helperFiles = loadHelperFiles();
        int vFirstEndOfLine = vCode.find("\n");
        vCode.insert(vFirstEndOfLine + 1, helperFiles);
        int fFirstEndOfLine = fCode.find("\n");
        fCode.insert(fFirstEndOfLine + 1, helperFiles);

        const char *vertSrc = vCode.c_str();
        const char *fragSrc = fCode.c_str();
        GLuint vertexShader = compileShader(vertSrc, GL_VERTEX_SHADER);
        GLuint fragmentShader = compileShader(fragSrc, GL_FRAGMENT_SHADER);

        int success;
        programID_ = glCreateProgram();
        glAttachShader(programID_, vertexShader);
        glAttachShader(programID_, fragmentShader);
        glLinkProgram(programID_);

        glGetProgramiv(programID_, GL_LINK_STATUS, &success);
        if (!success)
        {
            char infoLog[512];
            glGetProgramInfoLog(programID_, 512, NULL, infoLog);
            EM_ASM({ throw("Sikertelen shader összekapcsolás: " + UTF8ToString($0)); }, infoLog);
        }
        glDeleteShader(vertexShader);
        glDeleteShader(fragmentShader);

        GLuint uniformBlockIndexScene = glGetUniformBlockIndex(programID_, "SceneData");
        glUniformBlockBinding(programID_, uniformBlockIndexScene, 0);

        GLuint uniformBlockIndexMat = glGetUniformBlockIndex(programID_, "MaterialData");
        glUniformBlockBinding(programID_, uniformBlockIndexMat, 1);
    }

    Shader::~Shader()
    {
        if (programID_ != 0)
        {
            glDeleteProgram(programID_);
        }
    }

    void Shader::use()
    {
        glUseProgram(programID_);
    }
}
