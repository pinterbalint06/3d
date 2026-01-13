import { CanvasInput } from './CanvasInput.js';

// kamera tulajdonsagai
let fokuszTavolsag = 18.0;
const jsCanvasSzelesseg = 1000;
const jsCanvasMagassag = 1000;
const canvasId = "canvas";
const meret = 256;
let terrainEngine;

function mainLoop() {
    terrainEngine.render();

    requestAnimationFrame(mainLoop);
}

function degToRad(angle) {
    return angle * (Math.PI / 180.0);
}

function rotateCamera(pitch, yaw) {
    terrainEngine.rotateCamera(degToRad(pitch), degToRad(yaw))
}

function mozgas(iranyZ, iranyX) {
    let yForog = terrainEngine.getYaw();

    let eloreX = Math.sin(yForog);
    let eloreZ = Math.cos(yForog);

    let jobbraX = Math.sin(yForog + Math.PI / 2);
    let jobbraZ = Math.cos(yForog + Math.PI / 2);

    let mozgasX = Math.round(iranyZ * eloreX + iranyX * jobbraX);
    let mozgasZ = Math.round(iranyZ * eloreZ + iranyX * jobbraZ);

    terrainEngine.moveCamera(mozgasX, mozgasZ);
}

function initModule() {
    console.log("module betoltve");
    terrainEngine = new Module.TerrainEngine("canvas", meret);
    requestAnimationFrame(mainLoop);
    generalDomborzat();

    let canvas = document.getElementById(canvasId);
    let inputControls = new CanvasInput(canvas, {
        focalLength: fokuszTavolsag,
        onRotate: (pitch, yaw) => {
            rotateCamera(pitch, yaw);
        },
        onZoom: (ujFokuszTavolsag) => {
            terrainEngine.setFocalLength(ujFokuszTavolsag);
        }
    });

    window.addEventListener('keyup', (e) => {
        switch (e.key) {
            case ("w"):
                mozgas(1, 0);
                break;
            case ("s"):
                mozgas(-1, 0);
                break;
            case ("d"):
                mozgas(0, 1);
                break;
            case ("a"):
                mozgas(0, -1);
                break;
        }
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    korRajzol(0, -1);
    let canvas = document.getElementById(canvasId);
    canvas.width = jsCanvasSzelesseg;
    canvas.height = jsCanvasMagassag;
    let sd = document.getElementById("seed");
    let seed = Math.floor(Math.random() * 10000) + 1;
    sd.value = seed;
    sd.nextElementSibling.value = sd.value;

    if (Module.calledRun) {
        initModule();
    } else {
        Module.onRuntimeInitialized = initModule;
    }
});

function setDomainWarp() {
    let domainWarp = document.getElementById("domainWarp");
    if (domainWarp) {
        terrainEngine.setDomainWarp(domainWarp.checked);
    }
}

function generalDomborzat() {
    let size = parseInt(document.getElementById("mapSize").value);
    let seed = parseInt(document.getElementById("seed").value);
    let persistence = parseFloat(document.getElementById("persistence").value);
    let lacunarity = parseFloat(document.getElementById("lacunarity").value);
    let oktav = parseInt(document.getElementById("octaveCount").value);
    let frequency = parseFloat(document.getElementById("frequency").value);
    let mult = parseFloat(document.getElementById("noiseSize").value);
    let contrast = parseInt(document.getElementById("contrast").value);
    let amplitude = parseInt(document.getElementById("amplitude").value);
    let steepness = parseFloat(document.getElementById("steepness").value);

    let parameters = {
        "seed": seed,
        "octaveCount": oktav,
        "frequency": frequency,
        "amplitude": amplitude,
        "persistence": persistence,
        "lacunarity": lacunarity,
        "noiseSize": mult,
        "scaling": 1.0 / 128.0,
        "steepness": steepness,
        "contrast": contrast
    };
    let curr = document.querySelector('input[name="noiseSettings"]:checked').value;
    if (curr == "noise") {
        terrainEngine.setTerrainParams(size, parameters);
        setDomainWarp();
    } else {
        if (curr == "warp") {
            terrainEngine.setWarpParams(size, parameters);
            setDomainWarp();
        }
    }
}

function korRajzol(x, y) {
    let canvas = document.getElementById('canvasAngle');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let sugar = Math.min(centerX, centerY) - 5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, sugar, 0, 2 * Math.PI);
    ctx.strokeStyle = 'gray';
    ctx.stroke();

    let vektorVegeX = centerX - sugar * x;
    let vektorVegeY = centerY - sugar * y;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(vektorVegeX, vektorVegeY);
    ctx.strokeStyle = 'gray';
    ctx.stroke();
}

function fromHexaToDec(num) {
    let returnVal = 0;
    switch (num) {
        case "a":
            returnVal = 10;
            break;
        case "b":
            returnVal = 11;
            break;
        case "c":
            returnVal = 12;
            break;
        case "d":
            returnVal = 13;
            break;
        case "e":
            returnVal = 14;
            break;
        case "f":
            returnVal = 15;
            break;
        default:
            returnVal = parseInt(num);
            break;
    }
    return returnVal;
}

function imgFromUrl(url) {
    let img = new Image;
    img.crossOrigin = "anonymous";
    img.onload = function () {
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        let imgData = ctx.getImageData(0, 0, this.width, this.height);
        let rgbaData = imgData.data;

        const ptr = terrainEngine.initTexture(this.width, this.height);
        let rgbData = new Uint8Array(
            Module.HEAPU8.buffer,
            ptr,
            this.width * this.height * 3
        );
        let index = 0;
        for (let i = 0; i < rgbaData.length; i += 4) {
            rgbData[index] = rgbaData[i];
            index++;
            rgbData[index] = rgbaData[i + 1];
            index++;
            rgbData[index] = rgbaData[i + 2];
            index++;
        }
        terrainEngine.uploadTextureToGPU();
    };
    img.src = url;
}

window.UjPerlinParam = function (e) {
    let id = "";
    if (e) {
        id = e.id;
    }
    let auto = document.getElementById("autoUpdate").checked;
    if (id == "gomb" || auto) {
        generalDomborzat();
    }
};

window.ujKameraMagassag = function () {
    let element = document.getElementById("kameraHeight");
    if (element) {
        terrainEngine.setCameraHeight(parseFloat(element.value));
    }
};

window.ujhely = function () {
    terrainEngine.randomizeLocation();
};

window.irany = function (pitch, yaw) {
    terrainEngine.setCameraRotation(degToRad(pitch), degToRad(yaw));
};

window.xyForgas = function (pitch, yaw) {
    rotateCamera(pitch, yaw);
};

window.mozgas = mozgas;

window.teszt = function () {
    // mennyi idő lenne lerenderelni egy cubemapet
    let tempX = terrainEngine.getPitch() * (180 / Math.PI);
    let tempY = terrainEngine.getYaw() * (180 / Math.PI);
    let most = performance.now();
    irany(90, 0);
    terrainEngine.render();
    irany(-90, 0);
    terrainEngine.render();
    irany(0, 0);
    terrainEngine.render();
    irany(0, 180);
    terrainEngine.render();
    irany(0, 90);
    terrainEngine.render();
    irany(0, -90);
    terrainEngine.render();
    document.getElementById("ido").innerText = Math.round(performance.now() - most);
    irany(tempX, tempY);
};

window.ujArnyalas = function () {
    let typeShad = document.querySelector('input[name="shading"]:checked');
    if (typeShad) {
        let valu = typeShad.value;
        let result;
        switch (valu) {
            case "0":
                result = Module.SHADINGMODE.PHONG;
                break;
            case "1":
                result = Module.SHADINGMODE.GOURAUD;
                break;
            case "2":
                result = Module.SHADINGMODE.NO_SHADING;
                break;
        }
        terrainEngine.setShadingMode(result);
    }
};

window.UjFenyIntenzitas = function () {
    let element = document.getElementById("lightIntensity");
    if (element) {
        terrainEngine.setLightIntensity(parseInt(element.value));
    }
};

window.UjFenyIrany = function () {
    let angle = document.getElementById("lightDirection").value * (Math.PI / 180);
    let x = Math.cos(angle);
    let y = Math.sin(angle);
    korRajzol(x, y);
    terrainEngine.setLightDirection(x, y, 0.0);
};

window.ujFenyszin = function () {
    let color = document.getElementById("lightColor");
    let red = fromHexaToDec(color.value[1]) * 16 + fromHexaToDec(color.value[2]);
    let green = fromHexaToDec(color.value[3]) * 16 + fromHexaToDec(color.value[4]);
    let blue = fromHexaToDec(color.value[5]) * 16 + fromHexaToDec(color.value[6]);
    terrainEngine.setLightColor(red / 255.0, green / 255.0, blue / 255.0);
};

window.ujKornyezetiFeny = function () {
    let ambient = document.getElementById("ambientLight");
    terrainEngine.setAmbientLight(parseFloat(ambient.value));
};

window.talajFu = function () {
    let grass = Module.Material.Grass();
    document.getElementById("groundColor").value = "#9b7653";
    let diff = document.getElementById("diffuseness");
    let spec = document.getElementById("specularity");
    let shin = document.getElementById("shininess");
    let diffuseness = Math.round(1000 * grass.diffuseness) / 1000;
    diff.value = diffuseness;
    diff.nextElementSibling.value = diffuseness;

    let specularity = Math.round(1000 * grass.specularity) / 1000;
    spec.value = specularity;
    spec.nextElementSibling.value = specularity;

    let shininess = Math.round(1000 * grass.shininess) / 1000;
    shin.value = shininess;
    shin.nextElementSibling.value = shininess;
    terrainEngine.setGroundMaterial(grass);
};

window.talajFold = function () {
    let dirt = Module.Material.Dirt();
    document.getElementById("groundColor").value = "#9b7653";
    let diff = document.getElementById("diffuseness");
    let spec = document.getElementById("specularity");
    let shin = document.getElementById("shininess");
    let diffuseness = Math.round(1000 * dirt.diffuseness) / 1000;
    diff.value = diffuseness;
    diff.nextElementSibling.value = diffuseness;

    let specularity = Math.round(1000 * dirt.specularity) / 1000;
    spec.value = specularity;
    spec.nextElementSibling.value = specularity;

    let shininess = Math.round(1000 * dirt.shininess) / 1000;
    shin.value = shininess;
    shin.nextElementSibling.value = shininess;
    terrainEngine.setGroundMaterial(dirt);
};

window.ujAnyag = function () {
    let color = document.getElementById("groundColor");
    let red = fromHexaToDec(color.value[1]) * 16 + fromHexaToDec(color.value[2]);
    let green = fromHexaToDec(color.value[3]) * 16 + fromHexaToDec(color.value[4]);
    let blue = fromHexaToDec(color.value[5]) * 16 + fromHexaToDec(color.value[6]);
    let albedo = Module.Color.fromRGB(red, green, blue);
    let diff = parseFloat(document.getElementById("diffuseness").value);
    let spec = parseFloat(document.getElementById("specularity").value);
    let shin = parseFloat(document.getElementById("shininess").value);
    let material = Module.Material.createMaterial(albedo, diff, spec, shin);
    terrainEngine.setGroundMaterial(material);
};

window.ujUrlbol = function () {
    imgFromUrl(document.getElementById("url").value);
};

window.texturaTorles = function () {
    terrainEngine.deleteTexture();
};

window.setTexturaMeret = function () {
    let textureSpacing = document.getElementById("textureSpacing");
    if (textureSpacing) {
        terrainEngine.setTextureSpacing(1.0 / parseFloat(textureSpacing.value));
    }
};

window.ZajParamValt = function () {
    let curr = document.querySelector('input[name="noiseSettings"]:checked');
    if (curr) {
        let valu = curr.value;
        let params = {};
        if (valu == "noise") {
            params = terrainEngine.getNoiseParameters();
            let noiseSize = document.getElementById("noiseSize");
            noiseSize.setAttribute("max", 500.0);
            noiseSize.setAttribute("min", 1.0);
            noiseSize.setAttribute("step", 1.0);
        } else {
            if (valu == "warp") {
                params = terrainEngine.getWarpParameters();
                let noiseSize = document.getElementById("noiseSize");
                noiseSize.setAttribute("max", 4.0);
                noiseSize.setAttribute("min", 0.1);
                noiseSize.setAttribute("step", 0.1);

            }
        }
        for (const key in params) {
            let element = document.getElementById(key);
            if (element) {
                element.value = params[key];
                if (element.nextElementSibling) {
                    let ertek = params[key];
                    if (ertek % 1 != 0) {
                        ertek = Math.round(1000 * ertek) / 1000;
                    }
                    element.nextElementSibling.value = ertek;
                }
            }
        }
    }
};
