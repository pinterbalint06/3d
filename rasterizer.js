// kamera tulajdonsagai
const fokuszTavolsag = 12.7; // mm focalLength
const filmSzel = 25.4;
const filmMag = 25.4;
const jsCanvasSzelesseg = 1000;
const jsCanvasMagassag = 1000;
// near clipping plane - kozel vagasi sik
const n = 1;
// far clipping plane - tavol vagasi sik
const f = 1000;

document.addEventListener("DOMContentLoaded", async function () {
    korRajzol(0, -1);
    let canvas = document.getElementById("canvas");
    canvas.get
    canvas.width = jsCanvasSzelesseg;
    canvas.height = jsCanvasMagassag;
    let sd = document.getElementById("seed");
    seed = Math.floor(Math.random() * 10000) + 1;
    sd.value = seed;
    sd.nextElementSibling.value = sd.value;
    Module.onRuntimeInitialized = function () {
        Module.init();
        Module.meretBeallit(meret);
        Module.setFrustum(fokuszTavolsag, filmSzel, filmMag, jsCanvasSzelesseg, jsCanvasMagassag, n, f);
        ujTerkep();
    };
});

const meret = 256;
let seed;

function xyForgas(xszoggel, yszoggel) {
    Module.xForog(xszoggel * (Math.PI / 180));
    Module.yForog(yszoggel * (Math.PI / 180));
    rendereles();
}

// mennyi idő lenne lerenderelni a cubemapet
function teszt() {
    let tempX = Module.getXForog() * (180 / Math.PI);
    let tempY = Module.getYForog() * (180 / Math.PI);
    let most = performance.now();
    irany(90, 0);
    irany(-90, 0);
    irany(0, 0);
    irany(0, 180);
    irany(0, 90);
    irany(0, -90);
    document.getElementById("ido").innerText = Math.round(performance.now() - most);
    irany(tempX, tempY);
}

function ujTerkep() {
    // 45-75ms
    let persistence = document.getElementById("persistence");
    let lacunarity = document.getElementById("lacunarity");
    let oktav = document.getElementById("oktav");
    let eleje = performance.now()
    Module.newMap(seed, lacunarity.value, persistence.value, oktav.value);
    console.log("Új térkép idő:", performance.now() - eleje)
}

function ujMagassag() {
    let mult = document.getElementById("multiplier");
    Module.newHeightMult(mult.value);
}

function ujKameraMagassag() {
    let cHeight = document.getElementById("kameraHeight");
    Module.newCameraHeight(cHeight.value);
}

function UjPerlinParam() {
    let oktav = document.getElementById("oktav");
    let lacunarity = document.getElementById("lacunarity");
    let persistence = document.getElementById("persistence");
    Module.newPerlinSameMap(seed, lacunarity.value, persistence.value, oktav.value);
}

function UjFenyIntenzitas() {
    let intensity = document.getElementById("lightIntensity");
    Module.newLightIntensity(intensity.value);
}

function UjFenyIrany() {
    let angle = document.getElementById("lightDirection").value * (Math.PI / 180);
    let x = Math.cos(angle);
    let y = Math.sin(angle);
    korRajzol(x, y);
    Module.newLightDirection(x, y);
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
    rendereles();
}

function irany(x, y) {
    Module.setXForog(x * (Math.PI / 180));
    Module.setYForog(y * (Math.PI / 180));
    rendereles();
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

function render(canvasId, antialias = 1) {
    Module.setAntialias(antialias);
    let imageBufferHely = Module.render();
    let imageBufferMeret = Module.imageBufferSize();
    let imageBuffer = new Float32Array(
        wasmMemory.buffer,
        imageBufferHely,
        imageBufferMeret
    )
    let ctx = document.getElementById(canvasId).getContext("2d");
    ctx.clearRect(0, 0, jsCanvasSzelesseg, jsCanvasMagassag);

    let img = ctx.createImageData(jsCanvasSzelesseg, jsCanvasMagassag);
    let data = img.data;
    for (let i = 0; i < imageBufferMeret / 3; i++) {
        data[i * 4] = imageBuffer[i * 3];
        data[i * 4 + 1] = imageBuffer[i * 3 + 1];
        data[i * 4 + 2] = imageBuffer[i * 3 + 2];
        data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    Module.freeImageBuffer();
}

function rendereles() {
    let elsimitas = parseInt(document.getElementById("antialias").value);
    render("canvas", elsimitas);
}