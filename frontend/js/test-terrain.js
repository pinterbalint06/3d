// kamera tulajdonsagai
let fokuszTavolsag = 12.7; // mm focalLength
const minfokuszTavolsag = 7.5;
const maxfokuszTavolsag = 150.0;
const zoomSpeed = 0.05;
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
    canvas.width = jsCanvasSzelesseg;
    canvas.height = jsCanvasMagassag;
    let sd = document.getElementById("seed");
    let seed = Math.floor(Math.random() * 10000) + 1;
    sd.value = seed;
    sd.nextElementSibling.value = sd.value;

    let fogva = false;
    let utolsoX = 0;
    let utolsoY = 0;
    const sensitivity = 0.15;
    Module.onRuntimeInitialized = function () {
        Module.init(meret, fokuszTavolsag, filmSzel, filmMag, jsCanvasSzelesseg, jsCanvasMagassag, n, f);
        ujTerkep();
        Module.startRenderingLoop();
        canvas.addEventListener('mousedown', (e) => {
            fogva = true;
            utolsoX = e.clientX;
            utolsoY = e.clientY;
            canvas.style.cursor = "grabbing";
        });

        window.addEventListener('mouseup', () => {
            if (fogva) {
                fogva = false;
                canvas.style.cursor = "grab";
            }
        });

        canvas.addEventListener('mousemove', (e) => {
            if (fogva) {

                let dX = e.clientX - utolsoX;
                let dY = e.clientY - utolsoY;

                utolsoX = e.clientX;
                utolsoY = e.clientY;

                // jobbra huzza balra mozogjon -> invertalni kell
                const rotX = -dY * sensitivity;
                const rotY = -dX * sensitivity;

                xyForgas(rotX, rotY);
            }
        });

        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();

            const d = e.deltaY * -zoomSpeed;
            fokuszTavolsag += d;

            if (fokuszTavolsag < minfokuszTavolsag) {
                fokuszTavolsag = minfokuszTavolsag;
            };
            if (fokuszTavolsag > maxfokuszTavolsag) {
                fokuszTavolsag = maxfokuszTavolsag;
            };

            Module.changeFocalLength(fokuszTavolsag);
        });
    };

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
});

const meret = 256;

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
    drawImage();
    irany(-90, 0);
    Module.render();
    drawImage();
    irany(0, 0);
    Module.render();
    drawImage();
    irany(0, 180);
    Module.render();
    drawImage();
    irany(0, 90);
    Module.render();
    drawImage();
    irany(0, -90);
    Module.render();
    drawImage();
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
}

function UjPerlinParam() {
    let size = document.getElementById("mapSize");
    let seed = document.getElementById("seed");
    let persistence = document.getElementById("persistence");
    let lacunarity = document.getElementById("lacunarity");
    let oktav = document.getElementById("oktav");
    let frequency = document.getElementById("frequency");
    let mult = document.getElementById("multiplier");
    Module.newPerlinMap(parseInt(size.value), parseInt(seed.value), parseFloat(frequency.value), parseFloat(lacunarity.value), parseFloat(persistence.value), parseInt(oktav.value), parseFloat(mult.value));
}

function UjTerkoz() {
    let spacing = document.getElementById("spacing");
    Module.setMapSpacing(parseFloat(spacing.value));
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

function UjNormalSzamitas() {
    let type = document.querySelector('input[name="normalCalc"]:checked').value;
    Module.setNormalCalculationMode(parseInt(type));
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

function drawImage() {
    let imageBufferHely = Module.getImageLocation();
    let clampedArray = new Uint8ClampedArray(
        Module.HEAPU8.buffer,
        imageBufferHely,
        jsCanvasSzelesseg * jsCanvasMagassag * 4
    );
    let ctx = document.getElementById(canvasId).getContext("2d");
    ctx.putImageData(new ImageData(clampedArray, jsCanvasSzelesseg, jsCanvasMagassag), 0, 0);
}
