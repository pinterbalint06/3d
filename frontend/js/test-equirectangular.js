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

function initModule() {
    console.log("module betoltve");
    Module.init(256, fokuszTavolsag, filmSzel, filmMag, jsCanvasSzelesseg, jsCanvasMagassag, n, f);
    Module.setShadingTexture();
    imgFromUrl("../imgs/cathedral.jpg");
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

function ujUrlbol() {
    imgFromUrl(document.getElementById("url").value);
}

function ujElsmitas() {
    let elsimitas = document.getElementById("antialias");
    Module.setAntialias(parseInt(elsimitas.value));
    drawImage();
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

function xyForgas(xszoggel, yszoggel) {
    Module.xyForog(xszoggel * (Math.PI / 180), yszoggel * (Math.PI / 180));
}

window.xyForgas = xyForgas;
window.ujUrlbol = ujUrlbol;
window.ujElsmitas = ujElsmitas;
