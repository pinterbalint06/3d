precision mediump float;
varying vec3 vNormal;

void main() {
    vec3 color = vec3(0.11 * vNormal.y, 0.62 * vNormal.y, 0.22 * vNormal.y);
    gl_FragColor = vec4(color, 1.0);
}