#version 300 es

layout(location = 0) in vec4 aPosition;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aTexCoords;
out vec3 vNormal;

uniform mat4 uMVP;

void main() {
    vNormal = aNormal;
    gl_Position = uMVP * aPosition;
}
