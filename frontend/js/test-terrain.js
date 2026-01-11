import { CanvasInput } from './CanvasInput.js';

// kamera tulajdonsagai
let fokuszTavolsag = 18.0; // mm focalLength
const filmSzel = 25.4;
const filmMag = 25.4;
const jsCanvasSzelesseg = 1000;
const jsCanvasMagassag = 1000;
// near clipping plane - kozel vagasi sik
const n = 0.1;
// far clipping plane - tavol vagasi sik
const f = 1000;
const canvasId = "canvas";
const meret = 256;

function initModule() {
    console.log("module betoltve");
    Module.init(meret, fokuszTavolsag, filmSzel, filmMag, jsCanvasSzelesseg, jsCanvasMagassag, n, f);
    ujTerkep();
    Module.startRenderingLoop();

    let canvas = document.getElementById(canvasId);
    let inputControls = new CanvasInput(canvas, {
        focalLength: fokuszTavolsag,
        onRotate: (x, y) => {
            xyForgas(x, y);
        },
        onZoom: (ujFokuszTavolsag) => {
            Module.changeFocalLength(ujFokuszTavolsag);
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

function xyForgas(xszoggel, yszoggel) {
    Module.xyForog(xszoggel * (Math.PI / 180), yszoggel * (Math.PI / 180));
}

// mennyi idő lenne lerenderelni a cubemapet
function teszt() {
    let tempX = Module.getXForog() * (180 / Math.PI);
    let tempY = Module.getYForog() * (180 / Math.PI);
    let most = performance.now();
    irany(90, 0);
    Module.render();
    irany(-90, 0);
    Module.render();
    irany(0, 0);
    Module.render();
    irany(0, 180);
    Module.render();
    irany(0, 90);
    Module.render();
    irany(0, -90);
    Module.render();
    document.getElementById("ido").innerText = Math.round(performance.now() - most);
    irany(tempX, tempY);
}

function ujTerkep() {
    // 45-75ms
    let eleje = performance.now()
    general();
    console.log("Új térkép idő:", performance.now() - eleje)
}

function ujKameraMagassag() {
    let cHeight = document.getElementById("kameraHeight");
    Module.newCameraHeight(parseFloat(cHeight.value));
}

function UjPerlinParam(e) {
    let id = "";
    if (e) {
        id = e.id;
    }
    let auto = document.getElementById("autoUpdate").checked;
    if (id == "gomb" || auto) {
        general();
    }
}

function general() {
    let size = parseInt(document.getElementById("mapSize").value);
    let seed = parseInt(document.getElementById("seed").value);
    let persistence = parseFloat(document.getElementById("persistence").value);
    let lacunarity = parseFloat(document.getElementById("lacunarity").value);
    let oktav = parseInt(document.getElementById("oktav").value);
    let frequency = parseFloat(document.getElementById("frequency").value);
    let mult = parseFloat(document.getElementById("multiplier").value);
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
    Module.newPerlinMap(size, parameters);
    UjDomainWarp();
}

function UjFenyIntenzitas() {
    let intensity = document.getElementById("lightIntensity");
    Module.newLightIntensity(parseInt(intensity.value));
}

function UjFenyIrany() {
    let angle = document.getElementById("lightDirection").value * (Math.PI / 180);
    let x = Math.cos(angle);
    let y = Math.sin(angle);
    korRajzol(x, y);
    Module.newLightDirection(x, y);
}

function ujArnyalas() {
    let type = document.querySelector('input[name="shading"]:checked').value;
    Module.setShadingTechnique(parseInt(type));
}

function ujElsmitas() {
    let elsimitas = document.getElementById("antialias");
    Module.setAntialias(parseInt(elsimitas.value));
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

function ujAnyag() {
    let color = document.getElementById("groundColor");
    let red = fromHexaToDec(color.value[1]) * 16 + fromHexaToDec(color.value[2]);
    let green = fromHexaToDec(color.value[3]) * 16 + fromHexaToDec(color.value[4]);
    let blue = fromHexaToDec(color.value[5]) * 16 + fromHexaToDec(color.value[6]);
    let diff = document.getElementById("diffuseness");
    let spec = document.getElementById("specularity");
    let shin = document.getElementById("shininess");
    Module.setGroundMaterial(red, green, blue, parseFloat(diff.value), parseFloat(spec.value), parseFloat(shin.value));
}

function talajFu() {
    document.getElementById("groundColor").value = "#41980a";
    let diff = document.getElementById("diffuseness");
    let spec = document.getElementById("specularity");
    let shin = document.getElementById("shininess");
    diff.value = 1.0;
    diff.nextElementSibling.value = 1.0;
    spec.value = 0.02;
    spec.nextElementSibling.value = 0.02;
    shin.value = 10.0;
    shin.nextElementSibling.value = 10.0;
    Module.setMaterialGrass();
}

function talajFold() {
    document.getElementById("groundColor").value = "#9b7653";
    let diff = document.getElementById("diffuseness");
    let spec = document.getElementById("specularity");
    let shin = document.getElementById("shininess");
    diff.value = 1.0;
    diff.nextElementSibling.value = 1.0;
    spec.value = 0.01;
    spec.nextElementSibling.value = 0.01;
    shin.value = 10.0;
    shin.nextElementSibling.value = 10.0;
    Module.setMaterialDirt();
}

function ujhely() {
    Module.ujHely();
}

function ujFenyszin() {
    let color = document.getElementById("lightColor");
    let red = fromHexaToDec(color.value[1]) * 16 + fromHexaToDec(color.value[2]);
    let green = fromHexaToDec(color.value[3]) * 16 + fromHexaToDec(color.value[4]);
    let blue = fromHexaToDec(color.value[5]) * 16 + fromHexaToDec(color.value[6]);
    Module.setLightColor(red, green, blue);
}

function ujKornyezetiFeny() {
    let ambient = document.getElementById("ambientLight");
    Module.setAmbientLight(parseFloat(ambient.value));
}

function irany(x, y) {
    Module.setRotate(x * (Math.PI / 180), y * (Math.PI / 180));
}

function mozgas(iranyZ, iranyX) {
    let yForog = Module.getYForog();

    let eloreX = Math.sin(yForog);
    let eloreZ = Math.cos(yForog);

    let jobbraX = Math.sin(yForog + Math.PI / 2);
    let jobbraZ = Math.cos(yForog + Math.PI / 2);

    let mozgasX = Math.round(iranyZ * eloreX + iranyX * jobbraX);
    let mozgasZ = Math.round(iranyZ * eloreZ + iranyX * jobbraZ);

    Module.mozgas(mozgasZ, mozgasX);
}

function ujUrlbol() {
    imgFromUrl(document.getElementById("url").value);
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

        const ptr = Module.initTexture(this.width, this.height);
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
        Module.uploadTextureToGPU();
    };
    img.src = url;
}

function texturaTorles() {
    Module.deleteTexture();
}

function setTexturaMeret() {
    let textureSpacing = document.getElementById("textureSpacing");
    Module.setTextureSpacing(1.0 / parseFloat(textureSpacing.value));
}

function UjDomainWarp() {
    let domainWarp = document.getElementById("domainWarp");
    Module.setDomainWarp(domainWarp.checked);
}

window.UjPerlinParam = UjPerlinParam;
window.ujKameraMagassag = ujKameraMagassag;
window.ujhely = ujhely;
window.irany = irany;
window.xyForgas = xyForgas;
window.mozgas = mozgas;
window.ujElsmitas = ujElsmitas;
window.teszt = teszt;
window.ujArnyalas = ujArnyalas;
window.UjFenyIntenzitas = UjFenyIntenzitas;
window.UjFenyIrany = UjFenyIrany;
window.ujFenyszin = ujFenyszin;
window.ujKornyezetiFeny = ujKornyezetiFeny;
window.talajFu = talajFu;
window.talajFold = talajFold;
window.ujAnyag = ujAnyag;
window.ujUrlbol = ujUrlbol;
window.texturaTorles = texturaTorles;
window.setTexturaMeret = setTexturaMeret;
