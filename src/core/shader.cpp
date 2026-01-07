#include <core/shader.h>
#include <GLES3/gl3.h>
#include <string>
#include <fstream>
#include <sstream>
#include <iostream>
#include <vector>
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
        std::stringstream completeBuffer;
        std::vector<std::string> helpers = {
            "shaders/phongReflectionModel.glsl",
            "shaders/perlinNoise.glsl"};

        for (int i = 0; i < helpers.size(); i++)
        {
            std::ifstream file;

            file.exceptions(std::ifstream::failbit | std::ifstream::badbit);
            try
            {
                file.open(helpers[i]);
                completeBuffer << file.rdbuf() << "\n";
                file.close();
            }
            catch (std::ifstream::failure e)
            {
                EM_ASM({ throw("Sikertelen shader helper fájl beolvasás: " + UTF8ToString($0)); }, helpers[i].c_str());
            }
        }
        return completeBuffer.str();
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

        GLuint uniformBlockIndexPerlin = glGetUniformBlockIndex(programID_, "PerlinData");
        glUniformBlockBinding(programID_, uniformBlockIndexPerlin, 2);
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

    void Shader::setUniformInt(std::string variableName, int value)
    {
        int uniformLoc = glGetUniformLocation(programID_, variableName.c_str());
        if (uniformLoc != -1)
        {
            glUniform1i(uniformLoc, value);
        }
    }
}
