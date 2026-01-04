precision mediump float;

vec4 phongReflectionModel(
    vec3 normal,
    vec3 worldPos,
    vec3 camPos,

    vec3 lightVec,
    vec3 lightColorPreCalc,
    vec3 lightColor,
    float ambientLight,

    vec3 matAlbedo,
    float matDiffuseness,
    float matSpecularity,
    float matShininess
) {
    // diffuse
    float dotNL = dot(normal, lightVec);
    float diffFactor = max(0.0, dotNL);
    vec4 returnColor;
    if(diffFactor > 0.0) {
        vec3 diffuseColor = diffFactor * matAlbedo * matDiffuseness * lightColorPreCalc;
        //specular
        vec3 reflectionV = reflect(-lightVec, normal);
        vec3 viewVec = normalize(camPos - worldPos);
        float dotRV = max(0.0, dot(reflectionV, viewVec));
        float specFactor = pow(dotRV, matShininess);
        vec3 specColor = (dotNL > 0.0) ? (matSpecularity * specFactor * lightColorPreCalc) : vec3(0.0);
        // ambient
        vec3 ambientColor = ambientLight * lightColor * matAlbedo;

        returnColor = vec4((diffuseColor + specColor + ambientColor) / 255.0, 1.0);
    } else {
        // no light is shone on the surface
        returnColor = vec4(vec3(0.0), 1.0);
    }
    return returnColor;
}
