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
    imgFromURL("http://localhost:3000/images/cathedral.jpg");
    requestAnimationFrame(mainLoop);

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

function imgFromURL(url) {
    equirectangularEngine.loadTextureFromUrl(url, 0);
}

window.ujUrlbol = function () {
    let element = document.getElementById("url");
    if (element) {
        imgFromURL(element.value);
    }
};

// |---------------------|
// | CAMERA AND MOVEMENT |
// |---------------------|

// rotate camera by degree
function rotateCamera(pitch, yaw) {
    equirectangularEngine.rotateCamera(degToRad(pitch), degToRad(yaw))
}

window.xyForgas = rotateCamera;
