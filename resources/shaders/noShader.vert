#version 300 es

precision highp float;
precision highp int;

layout(location = 0) in vec4 aPosition;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aTexCoords;

layout(std140) uniform SceneData {
    mat4 uVP;           // View-Projection Matrix
                         // layout 4 vec4 so 16 * 4 = 64 bytes
                         // row 1 : 0 bytes
                         // row 2 : 16 bytes
                         // row 3 : 32 bytes
                         // row 4 : 48 bytes
    vec3 uCamPos;        // Camera Position
                         // at 64 bytes
    vec3 uLightVec;      // Light Vector
                         // at 80 bytes
    vec3 uLightColor;    // Light Color
                         // at 96 bytes
    float uAmbientLight; // Ambient Intensity
                         // at 112 bytes
                         // total size has to be multiple of the largest aligment
                         // so total size is 128 bytes
};

layout(std140) uniform MeshData {
    mat4 uM;
};

out vec3 vNormal;
out vec2 vTex;

void main() {
    vNormal = aNormal;
    vTex = aTexCoords;
    gl_Position = uVP * uM * aPosition;
}
