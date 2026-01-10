precision highp float;
precision highp int;
precision mediump usampler2D;

uniform usampler2D uNoisePermutationTable;
uniform sampler2D uNoiseGradients;

uniform usampler2D uWarpPermutationTable;
uniform sampler2D uWarpGradients;

layout(std140) uniform PerlinData {
    int uNoiseSeed;             // 0
    int uNoiseOctaveCount;      // 4
    float uNoiseFrequency;      // 8
    float uNoiseAmplitude;      // 12
    float uNoisePersistence;    // 16
    float uNoiseLacunarity;     // 20
    float uNoiseSize;           // 24
    float uNoiseScaling;        // 28
    float uNoiseSteepness;      // 32
    int uNoiseContrast;         // 36
                                // total of 48 bytes
};

layout(std140) uniform PerlinWarpData {
    int uWarpSeed;             // 0
    int uWarpOctaveCount;      // 4
    float uWarpFrequency;      // 8
    float uWarpAmplitude;      // 12
    float uWarpPersistence;    // 16
    float uWarpLacunarity;     // 20
    float uWarpSize;           // 24
    float uWarpScaling;        // 28
    float uWarpSteepness;      // 32
    int uWarpContrast;         // 36
                               // total of 48 bytes
};

uniform int uUseDomainWarp;

float quintic(float d) {
    return d * d * d * (d * (d * 6.0 - 15.0) + 10.0);
}

int hash(int x, int y) {
    int firstLookup = int(texelFetch(uNoisePermutationTable, ivec2(x, 0), 0).r);
    return int(texelFetch(uNoisePermutationTable, ivec2(firstLookup + y, 0), 0).r);
}

vec3 calculateDerivatives(vec2 pos) {
    int x0 = int(floor(pos.x)) & 255;
    int y0 = int(floor(pos.y)) & 255;
    int x1 = (x0 + 1) & 255;
    int y1 = (y0 + 1) & 255;
    float px = pos.x - floor(pos.x);
    float py = pos.y - floor(pos.y);
    float u = quintic(px);
    float v = quintic(py);
    // derivative of smoothing function
    // 30t^2(t-1)^2
    float du = 30.0 * px * px * (px * px - 2.0 * px + 1.0);
    float dv = 30.0 * py * py * (py * py - 2.0 * py + 1.0);

    // Get Gradients
    vec2 g00 = texelFetch(uNoiseGradients, ivec2(hash(x0, y0), 0), 0).rg;
    vec2 g10 = texelFetch(uNoiseGradients, ivec2(hash(x1, y0), 0), 0).rg;
    vec2 g01 = texelFetch(uNoiseGradients, ivec2(hash(x0, y1), 0), 0).rg;
    vec2 g11 = texelFetch(uNoiseGradients, ivec2(hash(x1, y1), 0), 0).rg;

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

    // // a + (b - a) * u + (c + (d - c) * u - (a + (b - a) * u )) * v
    // // a + (b - a) * u + (c + (d - c) * u - a - (b - a) * u ) * v
    // // a + bu - au + (c + du - cu - a - bu + au) * v
    // // a + bu - au + cv + duv - cuv - av - buv + auv
    // // a + bu - au + cv - av + duv - cuv - buv + auv
    // // a + u (b - a) + v(c - a) + uv(d - c - b + a)

    // // partial derivative with respect to u
    // // u' (b - a) + u'v(d - c - b + a)
    // // u' ((b - a) + v(d - c - b + a))
    // // partial derivative with respect to v
    // // v'(c - a) + uv'(d - c - b + a)
    // // v' ((c - a) + u(d - c - b + a))
    // // precalculate coefficients
    float k0 = b - a;
    float k1 = c - a;
    float k2 = d - c - b + a;

    // dot product derivatives
    float gX_botttom = mix(g00.x, g10.x, u);
    float gX_top = mix(g01.x, g11.x, u);
    float interpolatedGradientX = mix(gX_botttom, gX_top, v);

    float gY_left = mix(g00.y, g01.y, v);
    float gY_right = mix(g10.y, g11.y, v);
    float interpolatedGradientY = mix(gY_left, gY_right, u);

    // // u' ((b - a) + v(d - c - b + a))
    // // u' (k0 + v * k3)
    float derivX = du * (k0 + v * k2) + interpolatedGradientX;
    // // v' ((c - a) + u(d - c - b + a))
    // // v' (k1 + u * k3)
    float derivY = dv * (k1 + u * k2) + interpolatedGradientY;

    float interpolate1 = mix(a, b, u);
    float interpolate2 = mix(c, d, u);

    float finalInterpolate = mix(interpolate1, interpolate2, v);

    return vec3(finalInterpolate, derivX, derivY);
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
float fbm(vec2 pos) {
    float maxValue = 0.0;
    float amp = uNoiseAmplitude;
    float freq = uNoiseFrequency;
    float noiseValue = 0.0;
    for(int i = 0; i < uNoiseOctaveCount; i++) {
        vec3 perlinResult = calculateDerivatives(pos * freq) * amp;
        noiseValue += perlinResult.x;
        maxValue += amp;
        amp *= uNoisePersistence;
        freq *= uNoiseLacunarity;
    }
    noiseValue /= maxValue;
    return power(noiseValue, uNoiseContrast);
}

vec3 calculateNoiseNormalFBM(vec2 pos) {
    float maxValue = 0.0;
    float amp = uNoiseAmplitude;
    float freq = uNoiseFrequency;
    float noiseValue = 0.0;
    vec2 derivatives = vec2(0.0);
    vec2 noisePos = pos;
    if(uUseDomainWarp == 1) {
        vec2 q = vec2(fbm(noisePos + vec2(1.1, 3.5)), fbm(noisePos + vec2(2.4, 4.5)));
        vec2 r = vec2(fbm(noisePos + 2.0 * q), fbm(noisePos + 2.0 * q));
        float warpStrength = 1.5;

        noisePos += r * warpStrength;
    }
    for(int i = 0; i < uNoiseOctaveCount; i++) {
        vec3 perlinResult = calculateDerivatives(noisePos * freq) * amp;
        noiseValue += perlinResult.x;
        derivatives += perlinResult.yz * freq;
        maxValue += amp;
        amp *= uNoisePersistence;
        freq *= uNoiseLacunarity;
    }
    derivatives /= maxValue;
    noiseValue /= maxValue;
    float derivalas = float(uNoiseContrast) * power(noiseValue, uNoiseContrast - 1);
    derivatives *= derivalas;
    derivatives *= uNoiseScaling * uNoiseSize;
    return normalize(vec3(-derivatives.x, uNoiseSteepness, -derivatives.y));
}
