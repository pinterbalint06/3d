#version 300 es

layout(location = 0) in vec4 aPosition;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aTexCoords;
out vec3 vNormal;
void main() {
    vNormal = aNormal;
    vec4 scaledPos = aPosition;
    scaledPos.xyz = (scaledPos.xyz / 25.0f);
    gl_Position = scaledPos;
}
