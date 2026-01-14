import { CanvasInput } from './CanvasInput.js';

// |------------------|
// | GLOBAL VARIABLES |
// |------------------|
// Camera properties
let fokuszTavolsag = 18.0;

// Canvas settings
const jsCanvasSzelesseg = 1000;
const jsCanvasMagassag = 1000;
const canvasId = "canvas";

// base map size
const meret = 256;

// The engine
let terrainEngine;


// |--------------------|
// | UTILITIES AND MATH |
// |--------------------|

function degToRad(angle) {
    return angle * (Math.PI / 180.0);
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
        default: returnVal = parseInt(num); break;
    }
    return returnVal;
}

// Draws the light vector
function korRajzol(x, y) {
    let canvas = document.getElementById('canvasAngle');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate circle center
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let sugar = Math.min(centerX, centerY) - 5;

    // Draw circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, sugar, 0, 2 * Math.PI);
    ctx.strokeStyle = 'gray';
    ctx.stroke();

    // Draw light vector
    let vektorVegeX = centerX - sugar * x;
    let vektorVegeY = centerY - sugar * y;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(vektorVegeX, vektorVegeY);
    ctx.strokeStyle = 'gray';
    ctx.stroke();
}

// |------------------------------|
// | MAIN LOOP AND INITIALIZATION |
// |------------------------------|

document.addEventListener("DOMContentLoaded", async function () {
    // Inital light vector
    korRajzol(0, -1);

    let canvas = document.getElementById(canvasId);
    canvas.width = jsCanvasSzelesseg;
    canvas.height = jsCanvasMagassag;

    // Generate random seed
    let sd = document.getElementById("seed");
    let seed = Math.floor(Math.random() * 10000) + 1;
    sd.value = seed;
    sd.nextElementSibling.value = sd.value;

    if (Module.calledRun) {
        // If webassembly is ready initialize
        initModule();
    } else {
        // Else set a callback function
        Module.onRuntimeInitialized = initModule;
    }
});

function initModule() {
    console.log("module betoltve");

    // Initialize the terrainEngine
    terrainEngine = new Module.TerrainEngine(canvasId, meret);

    // Generate terrain and start the rendering loop
    generalDomborzat();
    requestAnimationFrame(mainLoop);

    // Setup user input
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

function mainLoop() {
    terrainEngine.render();
    requestAnimationFrame(mainLoop);
}

// |---------------------|
// | CAMERA AND MOVEMENT |
// |---------------------|

// rotate camera by degree
function rotateCamera(pitch, yaw) {
    terrainEngine.rotateCamera(degToRad(pitch), degToRad(yaw))
}

window.xyForgas = rotateCamera;

// movement logic
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

window.mozgas = mozgas;

// set camera height based on value from DOM
window.ujKameraMagassag = function () {
    let element = document.getElementById("kameraHeight");
    if (element) {
        terrainEngine.setCameraHeight(parseFloat(element.value));
    }
};

// randomize location on terrain
window.ujhely = function () {
    terrainEngine.randomizeLocation();
};

// set view direction
window.irany = function (pitch, yaw) {
    terrainEngine.setCameraRotation(degToRad(pitch), degToRad(yaw));
};

// |--------------------|
// | TERRAIN GENERATION |
// |--------------------|

function generalDomborzat() {
    // get values from DOM
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

    // set parameters to noise or warp based on selection
    let curr = document.querySelector('input[name="noiseSettings"]:checked').value;
    if (curr == "noise") {
        terrainEngine.setTerrainParams(size, parameters);
        setDomainWarp();
    } else if (curr == "warp") {
        terrainEngine.setWarpParams(size, parameters);
        setDomainWarp();
    }
}

// enable/disable domain warp based on selection
function setDomainWarp() {
    let domainWarp = document.getElementById("domainWarp");
    if (domainWarp) {
        terrainEngine.setDomainWarp(domainWarp.checked);
    }
}

// perlin parameters input changed if auto update is set it generates instantly
window.UjPerlinParam = function (e) {
    let id = "";
    if (e) { id = e.id; }

    let auto = document.getElementById("autoUpdate").checked;
    if (id == "gomb" || auto) {
        generalDomborzat();
    }
};

// change what noise is set
window.ZajParamValt = function () {
    let curr = document.querySelector('input[name="noiseSettings"]:checked');
    if (curr) {
        let valu = curr.value;
        let params = {};
        let noiseSize = document.getElementById("noiseSize");

        if (valu == "noise") {
            // for noise bigger noise sizes
            params = terrainEngine.getNoiseParameters();
            noiseSize.setAttribute("max", 500.0);
            noiseSize.setAttribute("min", 1.0);
            noiseSize.setAttribute("step", 1.0);
        } else if (valu == "warp") {
            // for warp smaller noise sizes are needed
            params = terrainEngine.getWarpParameters();
            noiseSize.setAttribute("max", 4.0);
            noiseSize.setAttribute("min", 0.1);
            noiseSize.setAttribute("step", 0.1);
        }

        // set the inputs based on selected noise
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

// |----------------------|
// | SHADING AND LIGHTING |
// |----------------------|

// set new shading mode
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

// set the light's intensity
window.UjFenyIntenzitas = function () {
    let element = document.getElementById("lightIntensity");
    if (element) {
        terrainEngine.setLightIntensity(parseInt(element.value));
    }
};

// set the light's direction
window.UjFenyIrany = function () {
    let angle = document.getElementById("lightDirection").value * (Math.PI / 180);
    let x = Math.cos(angle);
    let y = Math.sin(angle);
    korRajzol(x, y);
    terrainEngine.setLightDirection(x, y, 0.0);
};

// set the light's color
window.ujFenyszin = function () {
    let color = document.getElementById("lightColor");
    let red = fromHexaToDec(color.value[1]) * 16 + fromHexaToDec(color.value[2]);
    let green = fromHexaToDec(color.value[3]) * 16 + fromHexaToDec(color.value[4]);
    let blue = fromHexaToDec(color.value[5]) * 16 + fromHexaToDec(color.value[6]);
    terrainEngine.setLightColor(red / 255.0, green / 255.0, blue / 255.0);
};

// set the ambient light
window.ujKornyezetiFeny = function () {
    let ambient = document.getElementById("ambientLight");
    terrainEngine.setAmbientLight(parseFloat(ambient.value));
};

// |------------------------|
// | MATERIALS AND TEXTURES |
// |------------------------|

// set the material inputs' values to the given material's values
function updateMaterialInputs(material) {
    let diff = document.getElementById("diffuseness");
    let spec = document.getElementById("specularity");
    let shin = document.getElementById("shininess");

    let diffuseness = Math.round(1000 * material.diffuseness) / 1000;
    diff.value = diffuseness;
    diff.nextElementSibling.value = diffuseness;

    let specularity = Math.round(1000 * material.specularity) / 1000;
    spec.value = specularity;
    spec.nextElementSibling.value = specularity;

    let shininess = Math.round(1000 * material.shininess) / 1000;
    shin.value = shininess;
    shin.nextElementSibling.value = shininess;
}

// set material to grass
window.talajFu = function () {
    let grass = Module.Material.Grass();
    document.getElementById("groundColor").value = "#41980a";
    updateMaterialInputs(grass);
    terrainEngine.setGroundMaterial(grass);
};

// set material to dirt
window.talajFold = function () {
    let dirt = Module.Material.Dirt();
    document.getElementById("groundColor").value = "#9b7653";
    updateMaterialInputs(dirt);
    terrainEngine.setGroundMaterial(dirt);
};

// set material based on DOM
window.ujAnyag = function () {
    let color = document.getElementById("groundColor").value;
    // convert hex color to rgb
    let red = fromHexaToDec(color[1]) * 16 + fromHexaToDec(color[2]);
    let green = fromHexaToDec(color[3]) * 16 + fromHexaToDec(color[4]);
    let blue = fromHexaToDec(color[5]) * 16 + fromHexaToDec(color[6]);

    // retrieve material properties
    let albedo = Module.Color.fromRGB(red, green, blue);
    let diff = parseFloat(document.getElementById("diffuseness").value);
    let spec = parseFloat(document.getElementById("specularity").value);
    let shin = parseFloat(document.getElementById("shininess").value);

    // create material
    let material = Module.Material.createMaterial(albedo, diff, spec, shin);

    // set material
    terrainEngine.setGroundMaterial(material);
};

// get the url from the input and load from url inside engine
window.ujUrlbol = function () {
    terrainEngine.loadTextureFromUrl(document.getElementById("url").value, 0);
};

// delete texture
window.texturaTorles = function () {
    terrainEngine.deleteTexture();
};

// set the texture's size
window.setTexturaMeret = function () {
    let textureSpacing = document.getElementById("textureSpacing");
    if (textureSpacing) {
        terrainEngine.setTextureSpacing(1.0 / parseFloat(textureSpacing.value));
    }
};


// |------------|
// | PERFOMANCE |
// |------------|

window.teszt = function () {
    // how much time it would take to render a cubemap
    // store current rotation
    let tempX = terrainEngine.getPitch() * (180 / Math.PI);
    let tempY = terrainEngine.getYaw() * (180 / Math.PI);
    let most = performance.now();

    // down
    window.irany(90, 0);
    terrainEngine.render();
    // up
    window.irany(-90, 0);
    terrainEngine.render();
    // forward
    window.irany(0, 0);
    terrainEngine.render();
    // back
    window.irany(0, 180);
    terrainEngine.render();
    // right
    window.irany(0, 90);
    terrainEngine.render();
    // left
    window.irany(0, -90);
    terrainEngine.render();

    document.getElementById("ido").innerText = Math.round(performance.now() - most);

    // restore rotation
    window.irany(tempX, tempY);
};