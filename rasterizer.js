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
let xKitoltes = 1;
let yKitoltes = 1;
// a filmAspectRatiot lekicsinyítjük a resolutionGateAspectRatiora a képünk képarányára
if (filmSzel / filmMag > jsCanvasSzelesseg / jsCanvasMagassag) {
    xKitoltes = (jsCanvasSzelesseg / jsCanvasMagassag) / (filmSzel / filmMag);
} else {
    yKitoltes = (filmSzel / filmMag) / (jsCanvasSzelesseg / jsCanvasMagassag);
}
// derekszogu haromszog latoszoggel szembeni oldal a filmnyilas szelessegenek fele melette levo oldal a fokusztavolsag
// const fovHorizontalis = 2*Math.atan((filmSzel/2)/fokuszTavolsag);
// const canvasJobbSzel = Math.tan(fovHorizontalis/2) * n;
// const canvasBalSzel = -canvasJobbSzel;
// const fovVertikalis = 2*Math.atan((filmMag/2)/fokuszTavolsag);
// const canvasFelsoSzel = Math.tan(fovVertikalis/2) * n;
// const canvasAlsoSzel = -canvasFelsoSzel;
// const canvasTavolsag = 1;
// let canvasMeret = 2 * Math.tan(fov/2) * canvasTavolsag;

// gyorsabban. kiszamoljuk a felso szélét ennek ellentettje az also
// a jobb oldalit megkapjuk ha a felsőt megszorozzuk a képaránnyal  
const t = ((filmMag / 2) / fokuszTavolsag * n) * yKitoltes;
const r = t * (filmSzel / filmMag) * xKitoltes;
const b = -t;
const l = -r;
const canvasSzelesseg = r * 2;
const canvasMagassag = t * 2;
const s = (filmSzel / 2) / fokuszTavolsag;
/*
[
    [2 * n / (r - l), 0, 0, 0],
    [0, 2 * n / (t - b), 0, 0],
    [(r + l) / (r - l), (t + b) / (t - b), f / (n - f), -1],
    [0, 0, n * f / (n - f), 0]
]
*/
const P = new Float32Array(16);
P[0] = 2 * n / (r - l);
P[5] = 2 * n / (t - b);
P[8] = (r + l) / (r - l);
P[9] = (t + b) / (t - b);
P[10] = f / (n - f);
P[11] = -1;
P[14] = n * f / (n - f);

const sikok = [
    3, 0, -1, // w - x
    3, 0, 1,  // w + x
    3, 1, -1, // w - y
    3, 1, 1,  // w + y
    3, 2, -1, // w - z
    3, 2, 1   // w + z
];

/**
 * Edge function. E(x,y) = (x-X) dY - (y-Y) dX.
 * P1(X, Y) és P2(x1, y1) egy vonalat hátoroznak meg.
 * A függvény P0(x0, y0) pontrol dönti el, hogy a vonal melyik "oldalán" van.
 * Az A vektor P1->P0 => (x0-X, y0-Y, 0).
 * A B vektor P1->P2 => (x1-X, y1-Y, 0).
 * Vektoriális szorzatuk Z koordinátája 0, ha a két vektor párhuzamos vagyis a P0 pont a vonalon van.
 * Z>0, ha a vonal jobb oldalán van P0 és Z<0, ha a vonal bal oldalán van P0.
 * 
 * @param {number} X A vonalat meghatározó első pont X koordinátája
 * @param {number} Y A vonalat meghatározó első pont Y koordinátája
 * @param {number} dX A vonalat meghatározó vektor X koordinátája
 * @param {number} y1 A vonalat meghatározó vektor Y koordinátája
 * @param {number} x0 A vizsgált pont X koordinátája
 * @param {number} y0 A vizsgált pont Y koordinátája
 * @returns {number} Vektoriális szorzatuk Z koordinátája. Z=0 vonalon. Z>0 jobbra. Z<0 balra.
 */
function edgeFunction(X, Y, dX, dY, x, y) {
    return (x - X) * dY - (y - Y) * dX;
}

function pontokKivetitese(x0, y0, z0, x1, y1, z1, x2, y2, z2, Mkamera) {
    let MVP = matrixSzorzas4x4(Mkamera, P);
    let p0t = pontMatrix([x0, y0, z0], MVP);
    let p1t = pontMatrix([x1, y1, z1], MVP);
    let p2t = pontMatrix([x2, y2, z2], MVP);

    let clipped = SutherlandHodgman(p0t, p1t, p2t);
    let vissza = [];

    for (let i = 0; i < clipped.length / 4 - 2; i++) {
        let wRec = 1 / clipped[3];
        vissza.push(
            (clipped[0] * wRec + 1) * 0.5 * jsCanvasSzelesseg,
            (1 - clipped[1] * wRec) * 0.5 * jsCanvasMagassag,
            clipped[2] * wRec
        );
        for (let j = 1; j <= 2; j++) {
            wRec = 1 / clipped[(i + j) * 4 + 3];
            vissza.push(
                (clipped[(i + j) * 4] * wRec + 1) * 0.5 * jsCanvasSzelesseg,
                (1 - clipped[(i + j) * 4 + 1] * wRec) * 0.5 * jsCanvasMagassag,
                clipped[(i + j) * 4 + 2] * wRec
            );
        }
    }
    return vissza;
}

function SutherlandHodgman(p0, p1, p2) {
    let kimenet = new Array(12);
    for (let i = 0; i < 4; i++) {
        kimenet[i] = p0[i];
        kimenet[i + 4] = p1[i];
        kimenet[i + 8] = p2[i];
    }
    let elozoPontIndex, tavolsag, elozoTavolsag, bemenet, dTav;
    for (let k = 0; k < 6; k++) {
        bemenet = kimenet;
        kimenet = new Array();
        elozoPontIndex = bemenet.length - 4;
        for (let i = 0; i < bemenet.length; i += 4) {
            tavolsag = bemenet[i + sikok[k * 3]] + bemenet[i + sikok[k * 3 + 1]] * sikok[k * 3 + 2];
            elozoTavolsag = bemenet[elozoPontIndex + sikok[k * 3]] + bemenet[elozoPontIndex + sikok[k * 3 + 1]] * sikok[k * 3 + 2];
            if (tavolsag >= 0) {
                if (elozoTavolsag < 0) {
                    dTav = elozoTavolsag / (elozoTavolsag - tavolsag);
                    kimenet.push(linearis_interpolacio(bemenet[elozoPontIndex], bemenet[i], dTav));
                    kimenet.push(linearis_interpolacio(bemenet[elozoPontIndex + 1], bemenet[i + 1], dTav));
                    kimenet.push(linearis_interpolacio(bemenet[elozoPontIndex + 2], bemenet[i + 2], dTav));
                    kimenet.push(linearis_interpolacio(bemenet[elozoPontIndex + 3], bemenet[i + 3], dTav));
                }
                kimenet.push(bemenet[i]);
                kimenet.push(bemenet[i + 1]);
                kimenet.push(bemenet[i + 2]);
                kimenet.push(bemenet[i + 3]);
            } else {
                if (elozoTavolsag >= 0) {
                    dTav = elozoTavolsag / (elozoTavolsag - tavolsag);
                    kimenet.push(linearis_interpolacio(bemenet[elozoPontIndex], bemenet[i], dTav));
                    kimenet.push(linearis_interpolacio(bemenet[elozoPontIndex + 1], bemenet[i + 1], dTav));
                    kimenet.push(linearis_interpolacio(bemenet[elozoPontIndex + 2], bemenet[i + 2], dTav));
                    kimenet.push(linearis_interpolacio(bemenet[elozoPontIndex + 3], bemenet[i + 3], dTav));
                }
            }
            elozoPontIndex = i;
        }
    }
    return kimenet;
}

function kirajzol(canvasId, antialias = 1) {
    if (!negyzetSzamE(antialias)) {
        throw "Nem megfelelő élsimítás";
    }
    let ctx = document.getElementById(canvasId).getContext("2d");
    ctx.clearRect(0, 0, jsCanvasSzelesseg, jsCanvasMagassag);
    // kamera helye
    let kameraMatrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -pontok[rndszm * 3], -pontok[rndszm * 3 + 1] - 20, -pontok[rndszm * 3 + 2], 1
    ];
    if (yforgas != 0) {
        kameraMatrix = matrixSzorzas4x4(kameraMatrix, forgatasYMatrix4x4(Math.PI * yforgas));
    }
    if (xforgas != 0) {
        kameraMatrix = matrixSzorzas4x4(kameraMatrix, forgatasXMatrix4x4(Math.PI * xforgas));
    }
    // jsCanvasMagassag * gyokElsmitas * jsCanvasSzelesseg * gyokElsimitas = jsCanvasMagassag * jsCanvasSzelesseg * antialias
    let zbuffer = new Float32Array(jsCanvasMagassag * jsCanvasSzelesseg * antialias);
    zbuffer.fill(1);
    let kivetitettHaromszogek;
    // a háromszög határolókeretje
    let htminx, htminy, htmaxx, htmaxy;
    let zMelyseg;
    let kepIndex;
    // jsCanvasMagassag * gyokElsmitas * jsCanvasSzelesseg * gyokElsimitas = jsCanvasMagassag * jsCanvasSzelesseg * antialias
    let image = new Float32Array(jsCanvasMagassag * jsCanvasSzelesseg * antialias * 3);
    let bufferIndex;
    let gyokElsimitas = Math.sqrt(antialias);
    let gyokElsimitasReciprok = 1 / Math.sqrt(antialias);
    let inc = gyokElsimitasReciprok * 0.5;
    for (let i = 0; i < indexek.length; i += 3) {
        htminx = jsCanvasSzelesseg;
        htminy = jsCanvasMagassag;
        htmaxx = -jsCanvasSzelesseg;
        htmaxy = -jsCanvasMagassag;
        // A pontokat átírjuk mátrix szorzással a kamera koordináta rendszerébe majd kivetetítjük őket
        kivetitettHaromszogek = pontokKivetitese(
            pontok[indexek[i] * 3], pontok[indexek[i] * 3 + 1], pontok[indexek[i] * 3 + 2],
            pontok[indexek[i + 1] * 3], pontok[indexek[i + 1] * 3 + 1], pontok[indexek[i + 1] * 3 + 2],
            pontok[indexek[i + 2] * 3], pontok[indexek[i + 2] * 3 + 1], pontok[indexek[i + 2] * 3 + 2],
            kameraMatrix
        );
        for (let i = 0; i < kivetitettHaromszogek.length; i += 9) {
            // A háromszöget határolókeret pontjainak kiszámolása
            for (let k = 0; k < 9; k += 3) {
                if (kivetitettHaromszogek[i + k] < htminx) {
                    htminx = kivetitettHaromszogek[i + k];
                }
                if (kivetitettHaromszogek[i + k] > htmaxx) {
                    htmaxx = kivetitettHaromszogek[i + k];
                }
                if (kivetitettHaromszogek[i + k + 1] < htminy) {
                    htminy = kivetitettHaromszogek[i + k + 1];
                }
                if (kivetitettHaromszogek[i + k + 1] > htmaxy) {
                    htmaxy = kivetitettHaromszogek[i + k + 1];
                }
            }
            htminx = Math.max(0, Math.min(jsCanvasSzelesseg - 1, Math.floor(htminx)));
            htminy = Math.max(0, Math.min(jsCanvasMagassag - 1, Math.floor(htminy)));
            htmaxx = Math.max(0, Math.min(jsCanvasSzelesseg - 1, Math.ceil(htmaxx)));
            htmaxy = Math.max(0, Math.min(jsCanvasMagassag - 1, Math.ceil(htmaxy)));
            let dX0 = kivetitettHaromszogek[i + 6] - kivetitettHaromszogek[i + 3];
            let dY0 = kivetitettHaromszogek[i + 7] - kivetitettHaromszogek[i + 4];
            let dX1 = kivetitettHaromszogek[i] - kivetitettHaromszogek[i + 6];
            let dY1 = kivetitettHaromszogek[i + 1] - kivetitettHaromszogek[i + 7];
            let dX2 = kivetitettHaromszogek[i + 3] - kivetitettHaromszogek[i];
            let dY2 = kivetitettHaromszogek[i + 4] - kivetitettHaromszogek[i + 1];
            // kiszámoljuk a bounding box-tól balra fenti pixel edgefunctionjét
            let w0 = edgeFunction(kivetitettHaromszogek[i + 3], kivetitettHaromszogek[i + 4], dX0, dY0, htminx - 1 + inc, htminy - 1 + inc);
            let w1 = edgeFunction(kivetitettHaromszogek[i + 6], kivetitettHaromszogek[i + 7], dX1, dY1, htminx - 1 + inc, htminy - 1 + inc);
            let w2 = edgeFunction(kivetitettHaromszogek[i], kivetitettHaromszogek[i + 1], dX2, dY2, htminx - 1 + inc, htminy - 1 + inc);
            let z0Rec = 1 / kivetitettHaromszogek[i + 2];
            let z1Rec = 1 / kivetitettHaromszogek[i + 5];
            let z2Rec = 1 / kivetitettHaromszogek[i + 8];
            let jobbraKicsiPixel0 = dY0 * gyokElsimitasReciprok;
            let jobbraKicsiPixel1 = dY1 * gyokElsimitasReciprok;
            let jobbraKicsiPixel2 = dY2 * gyokElsimitasReciprok;
            // dY0 * gyokElsimitas * gyokElsimitasReciprok + dX0 * gyokElsimitasReciprok
            // ki lehet emelni gyokElsimitasReciprokot
            let balreFel0 = gyokElsimitasReciprok * (dY0 * gyokElsimitas + dX0);
            let balreFel1 = gyokElsimitasReciprok * (dY1 * gyokElsimitas + dX1);
            let balreFel2 = gyokElsimitasReciprok * (dY2 * gyokElsimitas + dX2);
            let sorEleje0 = dY0 * (htmaxx - htminx + 1);
            let sorEleje1 = dY1 * (htmaxx - htminx + 1);
            let sorEleje2 = dY2 * (htmaxx - htminx + 1);
            let lambda0, lambda1, lambda2;
            let haromszogterulet = 1 / edgeFunction(kivetitettHaromszogek[i], kivetitettHaromszogek[i + 1], kivetitettHaromszogek[i + 3] - kivetitettHaromszogek[i], kivetitettHaromszogek[i + 4] - kivetitettHaromszogek[i + 1], kivetitettHaromszogek[i + 6], kivetitettHaromszogek[i + 7]);
            for (let y = htminy; y <= htmaxy; y++) {
                // Ei(x, y+1) = Ei(x, y) - dXi
                // letoljuk egy pixellel
                w0 -= dX0;
                w1 -= dX1;
                w2 -= dX2;
                for (let x = htminx; x <= htmaxx; x++) {
                    // Ei(x+1, y) = Ei(x, y) + dYi
                    // jobbra toljuk egy pixellel
                    w0 += dY0;
                    w1 += dY1;
                    w2 += dY2;
                    for (let ya = 0; ya < gyokElsimitas; ya++) {
                        for (let xa = 0; xa < gyokElsimitas; xa++) {
                            // elsőre jó helyen van ellenőrizzük
                            if (w0 >= 0 && w1 >= 0 && w2 >= 0) {
                                lambda0 = w0 * haromszogterulet;
                                lambda1 = w1 * haromszogterulet;
                                lambda2 = w2 * haromszogterulet;
                                zMelyseg = 1 / (z0Rec * lambda0 + z1Rec * lambda1 + z2Rec * lambda2);
                                bufferIndex = (y * jsCanvasSzelesseg + x) * antialias + ya * gyokElsimitas + xa;
                                if (zMelyseg < zbuffer[bufferIndex]) {
                                    zbuffer[bufferIndex] = zMelyseg;
                                    kepIndex = bufferIndex * 3;
                                    image[kepIndex] = 255 / kivetitettHaromszogek[i + 2] * lambda0 * zMelyseg;
                                    image[kepIndex + 1] = 255 / kivetitettHaromszogek[i + 5] * lambda1 * zMelyseg;
                                    image[kepIndex + 2] = 255 / kivetitettHaromszogek[i + 8] * lambda2 * zMelyseg;
                                }
                            }
                            // a következő ciklusra eltoljuk jobbra a kis pixel hosszával (gyokElsimitasReciprok)
                            w0 += jobbraKicsiPixel0;
                            w1 += jobbraKicsiPixel1;
                            w2 += jobbraKicsiPixel2;
                        }
                        // Ei(x-1, y) = Ei(x, y) - dYi
                        // Ei(x, y+1) = Ei(x, y) - dXi
                        // ha a sor végére értünk
                        // vissza a sor elejére:
                        // dYi * gyokElsimitas * gyokElsimitasReciprok-vel visszatoljuk balra a kis pixelek (száma(gyokElsimitas)*kis pixel hossza(gyokElsimitasReciprok))-val
                        // egy sorral lejjebb
                        // dXi * gyokElsimitasReciprok letoljuk egyel a kis pixel hosszával
                        w0 -= balreFel0;
                        w1 -= balreFel1;
                        w2 -= balreFel2;
                    }
                    // Ei(x, y-1) = Ei(x, y) + dXi
                    // a sorok végére jutottunk. Visszatoljuk az első sorra
                    // vissza fel toljuk a (kis pixelek száma(gyokElsimitas)*kis pixel hossza(gyokElsimitasReciprok))-val
                    w0 += dX0 * gyokElsimitas * gyokElsimitasReciprok;
                    w1 += dX1 * gyokElsimitas * gyokElsimitasReciprok;
                    w2 += dX2 * gyokElsimitas * gyokElsimitasReciprok;
                }
                // Ei(x-1, y) = Ei(x, y) - dYi
                // a sor végére jutottunk visszatoljuk a sor elejére
                w0 -= sorEleje0;
                w1 -= sorEleje1;
                w2 -= sorEleje2;
            }
        }
    }
    let img = ctx.createImageData(jsCanvasSzelesseg, jsCanvasMagassag);
    let data = img.data;
    let r, g, b;
    let altalanosIndex, imageIndex, dataIndex, subImageIndex;
    let antiRec = 1 / antialias;
    for (let y = 0; y < jsCanvasMagassag; y++) {
        for (let x = 0; x < jsCanvasSzelesseg; x++) {
            altalanosIndex = (y * jsCanvasSzelesseg + x);
            imageIndex = altalanosIndex * antialias;
            dataIndex = altalanosIndex * 4;
            r = 0;
            g = 0;
            b = 0;
            for (let k = 0; k < antialias; k++) {
                subImageIndex = (imageIndex + k) * 3;
                r += image[subImageIndex];
                g += image[subImageIndex + 1];
                b += image[subImageIndex + 2];
            }
            data[dataIndex] = r * antiRec;
            data[dataIndex + 1] = g * antiRec;
            data[dataIndex + 2] = b * antiRec;
            data[dataIndex + 3] = 255;
        }
    }
    ctx.putImageData(img, 0, 0);
}

function negyzetSzamE(x) {
    let gyok = Math.sqrt(x);
    return gyok == parseInt(gyok);
}

document.addEventListener("DOMContentLoaded", async function () {
    let canvas = document.getElementById("canvas");
    canvas.get
    canvas.width = jsCanvasSzelesseg;
    canvas.height = jsCanvasMagassag;
    let sd = document.getElementById("seed");
    seed = Math.floor(Math.random() * 10000) + 1;
    sd.value = seed;
    sd.nextElementSibling.value = sd.value;
    ujhely();
    Module.onRuntimeInitialized = function () {
        Module._meretBeallit(meret);
        ujTerkep();
    };
});

let yforgas = 0;
let xforgas = 0;
let rndszm;
const meret = 256;
let seed;
// listak
let perlinErtekek, pontok, indexek;

function forgasTovab() {
    yforgas += 0.1;
    rendereles();
}

// mennyi idő lenne lerenderelni a cubemapet
function teszt() {
    let most = performance.now();
    irany(0.5, 0);
    irany(-0.5, 0);
    irany(0, 0);
    irany(0, 1);
    irany(0, 0.5);
    irany(0, -0.5);
    document.getElementById("ido").innerText = Math.round(performance.now() - most);
}

function ujTerkep() {
    // 45-75ms
    let eleje = performance.now()
    let perlinHelye = Module._allocatePerlin(meret * meret);
    perlinErtekek = new Float32Array(
        wasmMemory.buffer,
        perlinHelye,
        meret * meret * 3
    );
    perlin(perlinErtekek, 1, meret, seed, 2, 9, 2, 2.2);
    let pontokHelye = Module._allocatePontok(meret * meret * 3);
    pontok = new Float32Array(
        wasmMemory.buffer,
        pontokHelye,
        meret * meret * 3
    );
    let indexekHelye = Module._allocateIndexek((meret - 1) * (meret - 1) * 6);
    indexek = new Int32Array(
        wasmMemory.buffer,
        indexekHelye,
        (meret - 1) * (meret - 1) * 6
    );
    Module._pontokKiszamolasa(150);
    Module._osszekotesekKiszamolasa();
    console.log("Új térkép idő:", performance.now() - eleje);
    rendereles();
}

function ujhely() {
    rndszm = Math.round(Math.random() * meret * meret);
}

function irany(x, y) {
    yforgas = y;
    xforgas = x;
    rendereles();
}

function rendereles() {
    let elsimitas = parseInt(document.getElementById("antialias").value);
    kirajzol("canvas", elsimitas);
}