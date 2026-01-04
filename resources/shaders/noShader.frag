#version 300 es
precision mediump float;

out vec4 outColor;
in vec2 vTex;

layout(std140) uniform MaterialData {
    vec3 uMatAlbedo;       // 0-12
    float uMatDiffuseness; // 12-16
    float uMatSpecularity; // 16-20
    float uMatShininess;   // 20-24
                           // 24-28-32
};

uniform int uUseTexture;
uniform sampler2D texture1;

void main() {
    vec3 baseColor;
    if(uUseTexture == 1) {
        baseColor = texture(texture1, vTex).rgb;
    } else {
        baseColor = uMatAlbedo;
    }
    outColor = vec4(baseColor, 1.0f);
}