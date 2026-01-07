precision highp float;
precision highp int;
precision mediump usampler2D;

uniform usampler2D uPermutationTable;
uniform sampler2D uGradients;

layout(std140) uniform PerlinData {
    int seed;          // 0
    int octaveCount;   // 4
    float frequency;   // 8
    float amplitude;   // 12
    float persistence; // 16
    float lacunarity;  // 20
    float noiseSize;   // 24
    float scaling;     // 28
    float steepness;   // 32
                       // total of 32 bytes
};

float quintic(float d) {
    return d * d * d * (d * (d * 6.0 - 15.0) + 10.0);
}

int hash(int x, int y) {
    int firstLookup = int(texelFetch(uPermutationTable, ivec2(x, 0), 0).r);
    return int(texelFetch(uPermutationTable, ivec2(firstLookup + y, 0), 0).r);
}

vec2 calculateDerivatives(vec2 pos) {
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
    vec2 g00 = texelFetch(uGradients, ivec2(hash(x0, y0), 0), 0).rg;
    vec2 g10 = texelFetch(uGradients, ivec2(hash(x1, y0), 0), 0).rg;
    vec2 g01 = texelFetch(uGradients, ivec2(hash(x0, y1), 0), 0).rg;
    vec2 g11 = texelFetch(uGradients, ivec2(hash(x1, y1), 0), 0).rg;

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
    return vec2(derivX, derivY);
}

vec3 calculateNoiseNormalFBM(vec2 pos) {
    float maxValue = 0.0;
    float amp = amplitude;
    float freq = frequency;
    vec2 derivatives = vec2(0.0);
    for(int i = 0; i < octaveCount; i++) {
        derivatives += calculateDerivatives(pos * freq) * amp * freq;
        maxValue += amp;
        amp *= persistence;
        freq *= lacunarity;
    }
    derivatives *= scaling;
    return normalize(vec3(-derivatives.x * noiseSize, steepness, -derivatives.y * noiseSize));
}