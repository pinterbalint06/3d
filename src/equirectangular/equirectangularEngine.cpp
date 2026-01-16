#include <equirectangular/equirectangularEngine.h>
#include <emscripten/html5.h>
#include <emscripten/emscripten.h>
#include <core/engine.h>
#include <core/mesh.h>
#include <core/vertex.h>
#include <core/material.h>
#include <utils/mathUtils.h>
#include <string>
#include <cmath>
#include <cstdint>
#include <emscripten/val.h>

EM_JS(void, equirectangularFromURL, (const char *url, int ctxId, int tiles, emscripten::EM_VAL textureIdsHandle), {
    let gl = GL.contexts[ctxId].GLctx;
    let img = new Image();
    let imgUrl = UTF8ToString(url);
    let textureIds = Emval.toValue(textureIdsHandle);

    img.onload = function()
    {
        let textureCount = tiles * tiles;
        let textures = [];
        let i = 0;
        while (i < textureCount && GL.textures[textureIds[i]])
        {
            textures.push(GL.textures[textureIds[i]]);
            i++;
        }
        if (i == textureCount)
        {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let tileW = img.width / tiles;
            let tileH = img.height / tiles;
            canvas.width = tileW;
            canvas.height = tileH;
            let i = 0;
            for (let x = 0; x < tiles; x++)
            {
                for (let y = 0; y < tiles; y++)
                {
                    ctx.clearRect(0, 0, tileW, tileH);
                    ctx.drawImage(img, x * tileW, y * tileH, tileW, tileH, 0, 0, tileW, tileH);

                    gl.bindTexture(gl.TEXTURE_2D, textures[i]);

                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
                    gl.generateMipmap(gl.TEXTURE_2D);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                    gl.bindTexture(gl.TEXTURE_2D, null);
                    i++;
                }
            }
        }
        else
        {
            console.error("Texture failed to load (it no longer exists):\t" + imgUrl);
        }
    };

    img.onerror = function()
    {
        console.error("Texture failed to load:\t" + imgUrl);
    };

    img.src = imgUrl;
});

Mesh *EquirectangularEngine::generateSphereSegment(int rings, int segments, float radius,
                                                   float uMin, float uMax, float vMin, float vMax)
{
    Mesh *mesh = new Mesh((rings + 1) * (segments + 1), rings * segments * 6);
    Vertex *vertices = mesh->getVertices();

    int count = 0;
    // latitutes, vertical
    for (int lat = 0; lat <= rings; lat++)
    {
        // the latitude progress on the sphere in this loop ranges [0;1]
        float vProgress = (float)lat / rings;

        // remap [0;1] to [vMin; vMax] by linearly interpolating
        // also
        // 0 <= vMin <= 1
        // 0 <= vMax <= 1
        float vGlobal = MathUtils::interpolation(vMin, vMax, vProgress);

        // multiplied by pi spherical coordinates theta ranges [0;PI]
        // where 0 is north pole
        // PI/2 is equator
        // PI is south pole
        float theta = vGlobal * M_PI;
        float sinTheta = sin(theta);
        float cosTheta = cos(theta);

        // longitudes, horizontal
        for (int lon = 0; lon <= segments; lon++)
        {
            // the longitude progress on the sphere in this loop ranges [0;1]
            float uProgress = (float)lon / segments;

            // remap [0;1] to [uMin; uMax] by linearly interpolating
            float uGlobal = MathUtils::interpolation(uMin, uMax, uProgress);

            // multiplied by 2*pi spherical coordinates phi ranges [0;2*PI]
            // full circle
            float phi = uGlobal * 2.0f * M_PI;
            float sinPhi = sin(phi);
            float cosPhi = cos(phi);

            // spherical coordinates to cartesian coordinates
            float x = cosPhi * sinTheta;
            float y = cosTheta;
            float z = sinPhi * sinTheta;

            Vertex vert;
            vert.x = x * radius;
            vert.y = y * radius;
            vert.z = z * radius;
            vert.w = 1.0f;

            // normals pointing inwards for view from inside
            vert.nx = -x;
            vert.ny = -y;
            vert.nz = -z;

            // store the local uvs so whole texture spans just this segment
            vert.u = uProgress;
            vert.v = vProgress;

            vertices[count++] = vert;
        }
    }

    uint32_t *indices = mesh->getIndices();
    count = 0;
    for (int lat = 0; lat < rings; lat++)
    {
        for (int lon = 0; lon < segments; lon++)
        {
            // 1d array indexing latitudes are stored in blocks
            // so lat * (segments + 1) + long
            //          the rings size + place in the ring
            int first = (lat * (segments + 1)) + lon;
            // second is one ring below first
            int second = first + segments + 1;

            indices[count++] = first;
            indices[count++] = second;
            indices[count++] = first + 1;

            indices[count++] = second;
            indices[count++] = second + 1;
            indices[count++] = first + 1;
        }
    }

    return mesh;
}

void EquirectangularEngine::generateSphere()
{
    int rings = 32;
    int segs = 32;
    float rad = 10.0f;

    const int tiles = currMode_;
    const float rec = 1.0f / (float)tiles;
    int i = 0;

    clearScene();
    for (int x = 0; x < tiles; x++)
    {
        for (int y = 0; y < tiles; y++)
        {
            Mesh *sphereSegment = generateSphereSegment(rings, segs, rad, rec * x, rec * (x + 1), rec * y, rec * (y + 1));
            Materials::Material defaultMat = Materials::Material::Error();
            defaultMat.texture = imageTiles_[i];
            sphereSegment->setMaterial(defaultMat);
            addMesh(sphereSegment);
            i++;
        }
    }
}

EquirectangularEngine::EquirectangularEngine(const std::string &canvasID) : Engine(canvasID)
{
    setShadingMode(Shaders::SHADINGMODE::NO_SHADING);

    const int maxTextures = 16;
    imageTiles_.reserve(maxTextures);
    for (int i = 0; i < maxTextures; i++)
    {
        Texture *tileTexture = new Texture();
        imageTiles_.push_back(tileTexture);
    }

    currMode_ = EQUIRECTANGULARMODE::FULL;
    generateSphere();
}

EquirectangularEngine::~EquirectangularEngine()
{
    for (int i = 0; i < imageTiles_.size(); i++)
    {
        if (imageTiles_[i])
        {
            delete imageTiles_[i];
        }
    }
}

void EquirectangularEngine::changeImageMode(EQUIRECTANGULARMODE mode)
{
    if (mode != currMode_)
    {
        currMode_ = mode;
        generateSphere();
    }
}

void EquirectangularEngine::uploadTiles(const std::string &url, int ctx)
{
    int tiles = currMode_;
    emscripten::val textureIds = emscripten::val::global("Uint32Array").new_(tiles * tiles);

    for (size_t i = 0; i < tiles * tiles; i++)
    {
        textureIds.set(i, imageTiles_[i]->getTextureIndex());
    }
    equirectangularFromURL(url.c_str(), ctx, tiles, textureIds.as_handle());
}

void EquirectangularEngine::loadEquirectangularImage(const std::string &url, int width, int height)
{
    int ctx = emscripten_webgl_get_current_context();

    if (ctx > 0)
    {
        GLint maxTextureSize = 0;
        glGetIntegerv(GL_MAX_TEXTURE_SIZE, &maxTextureSize);
        if (maxTextureSize >= width && maxTextureSize >= height)
        {
            EM_ASM(console.log("full"));
            changeImageMode(EQUIRECTANGULARMODE::FULL);
            loadTextureFromUrl(url, 0);
        }
        else
        {
            if (maxTextureSize >= width / 2 && maxTextureSize >= height / 2)
            {
                EM_ASM(console.log("2x2"));
                changeImageMode(EQUIRECTANGULARMODE::SPLIT_2X2);
                uploadTiles(url, ctx);
            }
            else
            {
                if (maxTextureSize >= width / 4 && maxTextureSize >= height / 4)
                {
                    EM_ASM(console.log("4x4"));
                    changeImageMode(EQUIRECTANGULARMODE::SPLIT_4X4);
                    uploadTiles(url, ctx);
                }
                else
                {
                    // if can't fit textures generate one whole sphere
                    changeImageMode(EQUIRECTANGULARMODE::FULL);
                    // set its material to the error material
                    scene_->getMesh(0)->setMaterial(Materials::Material::Error());
                }
            }
        }
    }
}
