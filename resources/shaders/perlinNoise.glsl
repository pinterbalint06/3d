precision highp float;
precision highp int;
precision mediump usampler2D;

uniform usampler2D uNoisePermutationTable;
uniform sampler2D uNoiseGradients;

uniform usampler2D uWarpPermutationTable;
uniform sampler2D uWarpGradients;

struct PerlinParameters {
    int seed;
    int octaveCount;
    float frequency;
    float amplitude;
    float persistence;
    float lacunarity;
    float size;
    float scaling;
    float steepness;
    int contrast;
};

layout(std140) uniform PerlinData {
    PerlinParameters noiseParams;
};

layout(std140) uniform PerlinWarpData {
    PerlinParameters warpParams;
};

uniform int uUseDomainWarp;

float quintic(float d) {
    return d * d * d * (d * (d * 6.0 - 15.0) + 10.0);
}

int hash(int x, int y, usampler2D permutationTable) {
    int firstLookup = int(texelFetch(permutationTable, ivec2(x, 0), 0).r);
    return int(texelFetch(permutationTable, ivec2(firstLookup + y, 0), 0).r);
}

float noise(vec2 pos, sampler2D gradients, usampler2D permutationTable) {
    int x0 = int(floor(pos.x)) & 255;
    int y0 = int(floor(pos.y)) & 255;
    int x1 = (x0 + 1) & 255;
    int y1 = (y0 + 1) & 255;
    float px = pos.x - floor(pos.x);
    float py = pos.y - floor(pos.y);
    float u = quintic(px);
    float v = quintic(py);

    // Get Gradients
    vec2 g00 = texelFetch(gradients, ivec2(hash(x0, y0, permutationTable), 0), 0).rg;
    vec2 g10 = texelFetch(gradients, ivec2(hash(x1, y0, permutationTable), 0), 0).rg;
    vec2 g01 = texelFetch(gradients, ivec2(hash(x0, y1, permutationTable), 0), 0).rg;
    vec2 g11 = texelFetch(gradients, ivec2(hash(x1, y1, permutationTable), 0), 0).rg;

    // to point in grid vector components
    float leftToPoint = px;
    float rightToPoint = px - 1.0;
    float bottomToPoint = py;
    float topToPoint = py - 1.0;

    vec2 p00 = vec2(leftToPoint, bottomToPoint);
    vec2 p10 = vec2(rightToPoint, bottomToPoint);
    vec2 p01 = vec2(leftToPoint, topToPoint);
    vec2 p11 = vec2(rightToPoint, topToPoint);

    // // dot products
    float a = dot(g00, p00);
    float b = dot(g10, p10);
    float c = dot(g01, p01);
    float d = dot(g11, p11);

    float inter1 = mix(a, b, u);
    float inter2 = mix(c, d, u);

    return mix(inter1, inter2, v);
}

float power(float base, int exponent) {
    if(base >= 0.0) {
        return pow(base, float(exponent));
    } else {
        float abs_base_pow = pow(abs(base), float(exponent));
        if(exponent % 2 == 0) {
            return abs_base_pow;
        } else {
            return -abs_base_pow;
        }
    }
}

float fbm(vec2 pos, PerlinParameters params, sampler2D gradients, usampler2D permutationTable) {
    float maxValue = 0.0;
    float amp = params.amplitude;
    float freq = params.frequency;
    float noiseValue = 0.0;
    for(int i = 0; i < params.octaveCount; i++) {
        noiseValue += noise(pos * freq, gradients, permutationTable) * amp;
        maxValue += amp;
        amp *= params.persistence;
        freq *= params.lacunarity;
    }
    noiseValue /= maxValue;
    noiseValue = power(noiseValue, params.contrast);
    return noiseValue * params.size;
}

float domainWarpFBM(vec2 pos, PerlinParameters params, sampler2D gradients, usampler2D permutationTable) {
    vec2 noiseCoords = pos * params.scaling;
    if(uUseDomainWarp == 1) {
        float qx = fbm(noiseCoords, warpParams, uWarpGradients, uWarpPermutationTable);
        float qy = fbm(noiseCoords + vec2(5.2, 1.3), warpParams, uWarpGradients, uWarpPermutationTable);

        float turbulence = 0.5;
        noiseCoords.x += qx * turbulence;
        noiseCoords.y += qy * turbulence;
    }
    return fbm(noiseCoords, params, gradients, permutationTable);
}

vec3 calculateFiniteDifference(vec2 pos, PerlinParameters params) {
    float epsilon = 0.001;

    float prevX = domainWarpFBM(pos - vec2(epsilon, 0.0), params, uNoiseGradients, uNoisePermutationTable);
    float nextX = domainWarpFBM(pos + vec2(epsilon, 0.0), params, uNoiseGradients, uNoisePermutationTable);
    float centralDiffX = (nextX - prevX) / (epsilon * 2.0);

    float prevY = domainWarpFBM(pos - vec2(0.0, epsilon), params, uNoiseGradients, uNoisePermutationTable);
    float nextY = domainWarpFBM(pos + vec2(0.0, epsilon), params, uNoiseGradients, uNoisePermutationTable);
    float centralDiffY = (nextY - prevY) / (epsilon * 2.0);
    return normalize(vec3(-centralDiffX, params.steepness, centralDiffY));
}
