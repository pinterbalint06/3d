#version 300 es

layout(location = 0) in vec4 aPosition;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aTexCoords;

layout(std140) uniform SceneData {
    mat4 uMVP;                  // View-Projection Matrix
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
    vec4 uMatAlbedo;       // 0
    float uMatDiffuseness; // 16
    float uMatSpecularity; // 20
    float uMatShininess;   // 24
                           // 32
};

out vec3 vColor;

void main() {
    // diffuse
    float dotNL = dot(aNormal, uLightVec);
    float diffFactor = max(0.0f, dotNL);
    vec3 diffuseColor = diffFactor * uMatAlbedo.rgb * uMatDiffuseness * uLightColorPreCalc;
    //specular
    vec3 reflectionV = reflect(-uLightVec, aNormal);
    vec3 viewVec = normalize(uCamPos - aPosition.xyz);
    float dotRV = max(0.0f, dot(reflectionV, viewVec));
    float specFactor = pow(dotRV, uMatShininess);
    vec3 specColor = uMatSpecularity * specFactor * uLightColorPreCalc;
    // ambient
    vec3 ambientColor = uAmbientLight * uLightColor * uMatAlbedo.rgb;

    vColor = (diffuseColor + specColor + ambientColor) / 255.0f;
    gl_Position = uMVP * aPosition;
}
