// kamera tulajdonsagai
const fokuszTavolsag = 12.7; // mm focalLength
const filmSzel = 25.4;
const filmMag = 25.4;
const jsCanvasSzelesseg = 1000;
const jsCanvasMagassag = 1000;
// near clipping plane - kozel vagasi sik
const n = 0.1;
// far clipping plane - tavol vagasi sik
const f = 1000;
const canvasId = "canvas";

document.addEventListener("DOMContentLoaded", async function () {
    korRajzol(0, -1);
    let canvas = document.getElementById(canvasId);
    canvas.get
    canvas.width = jsCanvasSzelesseg;
    canvas.height = jsCanvasMagassag;
    let sd = document.getElementById("seed");
    let seed = Math.floor(Math.random() * 10000) + 1;
    sd.value = seed;
    sd.nextElementSibling.value = sd.value;
    Module.onRuntimeInitialized = function () {
        Module.init(meret, fokuszTavolsag, filmSzel, filmMag, jsCanvasSzelesseg, jsCanvasMagassag, n, f);
        ujTerkep();
    };
});

const meret = 256;

function xyForgas(xszoggel, yszoggel) {
    Module.xyForog(xszoggel * (Math.PI / 180), yszoggel * (Math.PI / 180));
    drawImage(canvasId);
}

// mennyi idő lenne lerenderelni a cubemapet
function teszt() {
    let tempX = Module.getXForog() * (180 / Math.PI);
    let tempY = Module.getYForog() * (180 / Math.PI);
    let most = performance.now();
    irany(90, 0);
    drawImage(canvasId);
    irany(-90, 0);
    drawImage(canvasId);
    irany(0, 0);
    drawImage(canvasId);
    irany(0, 180);
    drawImage(canvasId);
    irany(0, 90);
    drawImage(canvasId);
    irany(0, -90);
    drawImage(canvasId);
    document.getElementById("ido").innerText = Math.round(performance.now() - most);
    irany(tempX, tempY);
}

function ujTerkep() {
    // 45-75ms
    let eleje = performance.now()
    UjPerlinParam();
    console.log("Új térkép idő:", performance.now() - eleje)
}

function ujKameraMagassag() {
    let cHeight = document.getElementById("kameraHeight");
    Module.newCameraHeight(parseFloat(cHeight.value));
    drawImage(canvasId);
}

function UjPerlinParam() {
    let seed = document.getElementById("seed");
    let persistence = document.getElementById("persistence");
    let lacunarity = document.getElementById("lacunarity");
    let oktav = document.getElementById("oktav");
    let frequency = document.getElementById("frequency");
    let mult = document.getElementById("multiplier");
    Module.newPerlinMap(parseInt(seed.value), parseFloat(frequency.value), parseFloat(lacunarity.value), parseFloat(persistence.value), parseInt(oktav.value), parseFloat(mult.value));
    drawImage(canvasId);
}

function UjFenyIntenzitas() {
    let intensity = document.getElementById("lightIntensity");
    Module.newLightIntensity(parseInt(intensity.value));
    drawImage(canvasId);
}

function UjFenyIrany() {
    let angle = document.getElementById("lightDirection").value * (Math.PI / 180);
    let x = Math.cos(angle);
    let y = Math.sin(angle);
    korRajzol(x, y);
    Module.newLightDirection(x, y);
    drawImage(canvasId);
}

function ujTalaj() {
    let type = document.querySelector('input[name="ground"]:checked').value;
    Module.newGroundType(parseInt(type));
    drawImage(canvasId);
}

function ujArnyalas() {
    let type = document.querySelector('input[name="shading"]:checked').value;
    Module.setShadingTechnique(parseInt(type));
    drawImage(canvasId);
}

function UjNormalSzamitas() {
    let type = document.querySelector('input[name="normalCalc"]:checked').value;
    Module.setNormalCalculationMode(parseInt(type));
    drawImage(canvasId);
}

function ujElsmitas() {
    let elsimitas = document.getElementById("antialias");
    Module.setAntialias(parseInt(elsimitas.value));
    drawImage(canvasId);
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
    ctx.strokeStyle = 'black';
    ctx.stroke();

    let vektorVegeX = centerX - sugar * x;
    let vektorVegeY = centerY - sugar * y;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(vektorVegeX, vektorVegeY);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function ujhely() {
    Module.ujHely();
    drawImage(canvasId);
}

function irany(x, y) {
    Module.setRotate(x * (Math.PI / 180), y * (Math.PI / 180));
    drawImage(canvasId);
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
    drawImage(canvasId);
}

function drawImage(canvasId) {
    let imageBufferHely = Module.getImageLocation();
    let clampedArray = new Uint8ClampedArray(
        wasmMemory.buffer,
        imageBufferHely,
        jsCanvasSzelesseg * jsCanvasMagassag * 4
    );
    let ctx = document.getElementById(canvasId).getContext("2d");
    ctx.clearRect(0, 0, jsCanvasSzelesseg, jsCanvasMagassag);

    let imgData = new ImageData(clampedArray, jsCanvasSzelesseg, jsCanvasMagassag);
    ctx.putImageData(imgData, 0, 0);
}
