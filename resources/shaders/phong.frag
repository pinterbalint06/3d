#version 300 es

precision highp float;
precision highp int;

in vec4 vPosition;
in vec3 vNormal;
in vec2 vTexCoords;

layout(std140) uniform SceneData {
    mat4 uMVP;                  // View-Projection Matrix (not used here but needed for padding)
                                // layout 4 vec4 so 16 * 4 = 64 bytes
                                // row 1 : 0 bytes
                                // row 2 : 16 bytes
                                // row 3 : 32 bytes
                                // row 4 : 48 bytes
    vec3 uCamPos;               // Camera Position
                                // at 64 bytes
    vec3 uLightVec;             // Light Vector
                                // at 80 bytes
    vec3 uLightColor;           // Light Color
                                // at 96 bytes
    vec3 uLightColorPreCalc;    // Light Color pre calc
                                // at 112 bytes
    float uAmbientLight;        // Ambient Intensity
                                // at 128 bytes until 132 bytes
                                // total size has to be multiple of the largest aligment (16)
                                // total size is 144 bytes
};

layout(std140) uniform MaterialData {
    vec3 uMatAlbedo;       // 0-12
    float uMatDiffuseness; // 12-16
    float uMatSpecularity; // 16-20
    float uMatShininess;   // 20-24
                           // 24-28-32
};

uniform int uUseTexture;
uniform sampler2D uTexture0;

uniform int uIsTerrain;

out vec4 outColor;

void main() {
    vec3 normal;
    if(uIsTerrain == 1) {
        normal = calculateNoiseNormalFBM(vec2(vPosition.x * scaling, -vPosition.z * scaling));
    } else {
        normal = normalize(vNormal);
    }
    vec3 baseColor;
    if(uUseTexture == 1) {
        baseColor = texture(uTexture0, vTexCoords).rgb;
    } else {
        baseColor = uMatAlbedo;
    }
    outColor = phongReflectionModel(normal, vPosition.xyz, uCamPos, uLightVec, uLightColorPreCalc, uLightColor, uAmbientLight, baseColor, uMatDiffuseness, uMatSpecularity, uMatShininess);
}