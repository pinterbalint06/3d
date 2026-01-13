import { CanvasInput } from './CanvasInput.js';

// |------------------|
// | GLOBAL VARIABLES |
// |------------------|
// kamera tulajdonsagai
let fokuszTavolsag = 18.0;
const canvasId = "canvas";
const jsCanvasSzelesseg = 1000;
const jsCanvasMagassag = 1000;
let equirectangularEngine;

// |--------------------|
// | UTILITIES AND MATH |
// |--------------------|

function degToRad(angle) {
    return angle * (Math.PI / 180.0);
}

// |------------------------------|
// | MAIN LOOP AND INITIALIZATION |
// |------------------------------|

function mainLoop() {
    equirectangularEngine.render();
    requestAnimationFrame(mainLoop);
}

function initModule() {
    console.log("module betoltve");
    equirectangularEngine = new Module.EquirectangularEngine(canvasId);
    imgFromUrl("../images/cathedral.jpg");

    let canvas = document.getElementById(canvasId);
    let inputControls = new CanvasInput(canvas, {
        focalLength: fokuszTavolsag,
        onRotate: (x, y) => {
            rotateCamera(x, y);
        },
        onZoom: (ujFokuszTavolsag) => {
            equirectangularEngine.setFocalLength(ujFokuszTavolsag);
        }
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    let canvas = document.getElementById(canvasId);
    canvas.width = jsCanvasSzelesseg;
    canvas.height = jsCanvasMagassag;

    canvas.style.cursor = "grab";

    if (Module.calledRun) {
        initModule();
    } else {
        Module.onRuntimeInitialized = initModule;
    }
});

// |------------------------|
// | MATERIALS AND TEXTURES |
// |------------------------|

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

        const ptr = equirectangularEngine.initTexture(this.width, this.height);
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
        equirectangularEngine.uploadTextureToGPU();
        requestAnimationFrame(mainLoop);
    };
    img.src = url;
}

window.ujUrlbol = ujUrlbol;

// |---------------------|
// | CAMERA AND MOVEMENT |
// |---------------------|

// rotate camera by degree
function rotateCamera(pitch, yaw) {
    equirectangularEngine.rotateCamera(degToRad(pitch), degToRad(yaw))
}

window.xyForgas = rotateCamera;
