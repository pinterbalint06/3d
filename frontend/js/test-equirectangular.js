// kamera tulajdonsagai
let fokuszTavolsag = 18.0; // mm focalLength
const minfokuszTavolsag = 10.5;
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
    let canvas = document.getElementById(canvasId);
    canvas.width = jsCanvasSzelesseg;
    canvas.height = jsCanvasMagassag;

    let utolsoX = 0;
    let utolsoY = 0;
    let prevDiff = 0;
    const sensitivity = 0.2;
    let pointers = [];

    canvas.style.cursor = "grab";

    Module.onRuntimeInitialized = function () {
        console.log("module betoltve");
        Module.init(256, fokuszTavolsag, filmSzel, filmMag, jsCanvasSzelesseg, jsCanvasMagassag, n, f);
        Module.setShadingTexture();
        imgFromUrl("../imgs/cathedral.jpg");
        Module.startRenderingLoop();

        canvas.addEventListener('pointerdown', (e) => {
            if (pointers.length < 2) {
                pointers.push(e);
                if (pointers.length == 1) {
                    utolsoX = e.clientX;
                    utolsoY = e.clientY;
                } else {
                    if (pointers.length == 2) {
                        // két pont távolsága
                        prevDiff = Math.sqrt(
                            Math.pow(pointers[0].clientX - pointers[1].clientX, 2) +
                            Math.pow(pointers[0].clientY - pointers[1].clientY, 2)
                        );
                    }
                }
            }

            canvas.style.cursor = pointers.length == 1 ? "grabbing" : "grab";
        });

        canvas.addEventListener('pointerup', (e) => {
            let i = 0;
            while (i < pointers.length && pointers[i].pointerId != e.pointerId) {
                i++;
            }
            if (i < pointers.length) {
                pointers.splice(i, 1);
            }

            if (pointers.length == 1) {
                prevDiff = 0;
                utolsoX = pointers[0].clientX;
                utolsoY = pointers[0].clientY;
            }

            if (pointers.length == 0) {
                canvas.style.cursor = "grab";
            }
        });

        canvas.addEventListener('pointermove', (e) => {
            let i = 0;
            while (i < pointers.length && pointers[i].pointerId != e.pointerId) {
                i++;
            }
            if (i < pointers.length) {
                pointers[i] = e;
            }
            if (pointers.length == 1) {

                let dX = e.clientX - utolsoX;
                let dY = e.clientY - utolsoY;

                utolsoX = e.clientX;
                utolsoY = e.clientY;

                // jobbra huzza balra mozogjon -> invertalni kell
                const rotX = -dY * sensitivity * (minfokuszTavolsag / fokuszTavolsag);
                const rotY = -dX * sensitivity * (minfokuszTavolsag / fokuszTavolsag);

                xyForgas(rotX, rotY);
            } else {
                if (pointers.length == 2) {
                    let currDiff = Math.sqrt(
                        Math.pow(pointers[0].clientX - pointers[1].clientX, 2) +
                        Math.pow(pointers[0].clientY - pointers[1].clientY, 2)
                    );
                    let valtozas = (currDiff - prevDiff) * sensitivity;
                    fokuszTavolsag += valtozas;

                    if (fokuszTavolsag < minfokuszTavolsag) {
                        fokuszTavolsag = minfokuszTavolsag;
                    };
                    if (fokuszTavolsag > maxfokuszTavolsag) {
                        fokuszTavolsag = maxfokuszTavolsag;
                    };

                    prevDiff = currDiff;
                    Module.changeFocalLength(fokuszTavolsag);
                }
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
