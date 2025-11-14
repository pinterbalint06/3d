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
const P = [
    [2 * n / (r - l), 0, 0, 0],
    [0, 2 * n / (t - b), 0, 0],
    [(r + l) / (r - l), (t + b) / (t - b), f / (n - f), -1],
    [0, 0, n * f / (n - f), 0]
];

function pontokKiszamolasa(pontok, perlinek, szorzo) {
    for (let y = 0; y < perlinek.length; y++) {
        for (let x = 0; x < perlinek[y].length; x++) {
            pontok[(y * perlinek.length + x) * 3] = x; // x koordináta
            pontok[(y * perlinek.length + x) * 3 + 1] = perlinek[y][x] * szorzo; // y koordináta
            pontok[(y * perlinek.length + x) * 3 + 2] = -y; // z koordináta
        }
    }
    return pontok;
}

function osszekotesekKiszamolasa(indexek, meret) {
    let indexe;
    for (let sor = 0; sor < meret - 1; sor++) {
        for (let oszlop = 0; oszlop < meret - 1; oszlop++) {
            indexe = sor * meret + oszlop;
            // A három indexnek a pontjait (pontok[index] pontot ad meg) összekötjük háromszögekre
            // A négyzet
            indexek[indexe * 6] = indexe + 1; // jobb felső pontja
            indexek[indexe * 6 + 1] = indexe + meret; // bal alsó pontja
            indexek[indexe * 6 + 2] = indexe; // bal felső pontja

            indexek[indexe * 6 + 3] = indexe + 1; // jobb felső pontja
            indexek[indexe * 6 + 4] = indexe + meret + 1; // jobb alsó pontja
            indexek[indexe * 6 + 5] = indexe + meret; // bal alsó pontja
            // a négyzetet felosztottuk két háromszögre
        }
    }
    return indexek;
}

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

/**
 * Az Edge Function-t használva megállapítja, hogy a háromszögben van-e a pont.
 * A pontokat órajárással megegyező irányban kell megadni!
 * 
 * @param {number} v0 A háromszög egy pontja
 * @param {number} v1 A háromszög egy pontja
 * @param {number} v2 A háromszög egy pontja
 * @param {number} p A vizsgálandó pont
 * @returns {boolean} Igaz, ha benne van, hamis a nincs benne.
 */
function haromszogbenVanE(v0, v1, v2, p) {
    return edgeFunction(v0[0], v0[1], v1[0], v1[1], p[0], p[1]) >= 0 &&
        edgeFunction(v1[0], v1[1], v2[0], v2[1], p[0], p[1]) >= 0 &&
        edgeFunction(v2[0], v2[1], v0[0], v0[1], p[0], p[1]) >= 0;
}

/**
 * Az Edge Function-t használva megállapítja, hogy a háromszögben van-e a pont.
 * A pontokat órajárással ellentétes irányban kell megadni!
 * 
 * @param {number} v0 A háromszög egy pontja
 * @param {number} v1 A háromszög egy pontja
 * @param {number} v2 A háromszög egy pontja
 * @param {number} p A vizsgálandó pont
 * @returns {boolean} Ha a háromszögben van akkor visszaadja a baricentrikus koordinátáit egyébként null.
 */
function rajtaVanEAPixelAHaromszogon(v0, v1, v2, p) {
    let w0 = edgeFunction(v1[0], v1[1], v2[0] - v1[0], v2[1] - v1[1], p[0], p[1]);
    let w1 = edgeFunction(v2[0], v2[1], v0[0] - v2[0], v0[1] - v2[1], p[0], p[1]);
    let w2 = edgeFunction(v0[0], v0[1], v1[0] - v0[0], v1[1] - v0[1], p[0], p[1]);
    let vissza = null;
    if (w0 >= 0 && w1 >= 0 && w2 >= 0) {
        let haromszogterulet = edgeFunction(v0[0], v0[1], v1[0] - v0[0], v1[1] - v0[1], v2[0], v2[1]);
        vissza = [w0 / haromszogterulet, w1 / haromszogterulet, w2 / haromszogterulet];
    }
    return vissza;
}

function pontMatrixSzorzas(pont, matrix) {
    let eredmeny = matrixSzorzas([[pont[0], pont[1], pont[2], 1]], matrix)[0];
    if (eredmeny[3] != 1) {
        eredmeny[0] = eredmeny[0] / eredmeny[3];
        eredmeny[1] = eredmeny[1] / eredmeny[3];
        eredmeny[2] = eredmeny[2] / eredmeny[3];
    }
    return [eredmeny[0], eredmeny[1], eredmeny[2]];
}

function kameraTerbe(x0, y0, z0, x1, y1, z1, x2, y2, z2, Mkamera) {
    return [
        matrixSzorzas([[x0, y0, z0, 1]], Mkamera)[0],
        matrixSzorzas([[x1, y1, z1, 1]], Mkamera)[0],
        matrixSzorzas([[x2, y2, z2, 1]], Mkamera)[0]
    ];
}

function pontokKivetitese(p0, p1, p2) {
    let p0t = matrixSzorzas([[p0[0], p0[1], p0[2], 1]], P)[0];
    let p1t = matrixSzorzas([[p1[0], p1[1], p1[2], 1]], P)[0];
    let p2t = matrixSzorzas([[p2[0], p2[1], p2[2], 1]], P)[0];

    let clipped = SutherlandHodgman(p0t, p1t, p2t);
    let vissza = [];

    for (let i = 0; i < clipped.length - 2; i++) {
        let v0_clip = clipped[0];
        let v1_clip = clipped[i + 1];
        let v2_clip = clipped[i + 2];

        let haromszog = [];
        for (let v of [v0_clip, v1_clip, v2_clip]) {
            const invW = 1.0 / v[3];
            haromszog.push([
                (v[0] * invW + 1) * 0.5 * jsCanvasSzelesseg,
                (1 - v[1] * invW) * 0.5 * jsCanvasMagassag,
                v[2] * invW
            ]);
        }
        vissza.push(haromszog);
    }
    return vissza;
}

function SutherlandHodgman(p0, p1, p2) {
    let kimenet = [p0, p1, p2];
    let oldalak = [
        [3, 0, -1],
        [3, 0, 1],
        [3, 1, -1],
        [3, 1, 1],
        [3, 2, -1],
        [3, 2, 1]
    ];
    let pont, elozoPont, tavolsag, elozoTavolsag, bemenet;
    for (let k = 0; k < oldalak.length; k++) {
        bemenet = [...kimenet];
        kimenet.length = 0;
        for (let i = 0; i < bemenet.length; i++) {
            pont = bemenet[i];
            tavolsag = pont[oldalak[k][0]] + pont[oldalak[k][1]] * oldalak[k][2];
            elozoPont = bemenet[i == 0 ? bemenet.length - 1 : i - 1];
            elozoTavolsag = elozoPont[oldalak[k][0]] + elozoPont[oldalak[k][1]] * oldalak[k][2];
            if (tavolsag >= 0) {
                if (elozoTavolsag < 0) {
                    kimenet.push([
                        linearis_interpolacio(elozoPont[0], pont[0], elozoTavolsag / (elozoTavolsag - tavolsag)),
                        linearis_interpolacio(elozoPont[1], pont[1], elozoTavolsag / (elozoTavolsag - tavolsag)),
                        linearis_interpolacio(elozoPont[2], pont[2], elozoTavolsag / (elozoTavolsag - tavolsag)),
                        linearis_interpolacio(elozoPont[3], pont[3], elozoTavolsag / (elozoTavolsag - tavolsag)),
                    ]);
                }
                kimenet.push(pont);
            } else {
                if (elozoTavolsag >= 0) {
                    kimenet.push([
                        linearis_interpolacio(elozoPont[0], pont[0], elozoTavolsag / (elozoTavolsag - tavolsag)),
                        linearis_interpolacio(elozoPont[1], pont[1], elozoTavolsag / (elozoTavolsag - tavolsag)),
                        linearis_interpolacio(elozoPont[2], pont[2], elozoTavolsag / (elozoTavolsag - tavolsag)),
                        linearis_interpolacio(elozoPont[3], pont[3], elozoTavolsag / (elozoTavolsag - tavolsag)),
                    ]);
                }
            }
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
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [-pontok[rndszm * 3], -pontok[rndszm * 3 + 1] - 15, -pontok[rndszm * 3 + 2], 1]
    ];
    if (yforgas != 0) {
        kameraMatrix = matrixSzorzas(kameraMatrix, forgatasYMatrix4x4(Math.PI * yforgas));
    }
    if (xforgas != 0) {
        kameraMatrix = matrixSzorzas(kameraMatrix, forgatasXMatrix4x4(Math.PI * xforgas));
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
    let baricentrikus, bufferIndex;
    let kameraKoordinatak;
    let gyokElsimitas = Math.sqrt(antialias);
    let gyokElsimitasReciprok = 1 / Math.sqrt(antialias);
    let inc = gyokElsimitasReciprok * 0.5;
    for (let i = 0; i < indexek.length; i += 3) {
        htminx = jsCanvasSzelesseg;
        htminy = jsCanvasMagassag;
        htmaxx = -jsCanvasSzelesseg;
        htmaxy = -jsCanvasMagassag;
        // A pontokat átírjuk mátrix szorzással a kamera koordináta rendszerébe majd kivetetítjük őket
        kameraKoordinatak = kameraTerbe(
            pontok[indexek[i] * 3], pontok[indexek[i] * 3 + 1], pontok[indexek[i] * 3 + 2],
            pontok[indexek[i + 1] * 3], pontok[indexek[i + 1] * 3 + 1], pontok[indexek[i + 1] * 3 + 2],
            pontok[indexek[i + 2] * 3], pontok[indexek[i + 2] * 3 + 1], pontok[indexek[i + 2] * 3 + 2],
            kameraMatrix
        );
        kivetitettHaromszogek = pontokKivetitese(kameraKoordinatak[0], kameraKoordinatak[1], kameraKoordinatak[2]);
        for (let kivetitettPontok of kivetitettHaromszogek) {
            // A háromszöget határolókeret pontjainak kiszámolása
            for (let k = 0; k < kivetitettPontok.length; k++) {
                if (kivetitettPontok[k][0] < htminx) {
                    htminx = kivetitettPontok[k][0];
                }
                if (kivetitettPontok[k][0] > htmaxx) {
                    htmaxx = kivetitettPontok[k][0];
                }
                if (kivetitettPontok[k][1] < htminy) {
                    htminy = kivetitettPontok[k][1];
                }
                if (kivetitettPontok[k][1] > htmaxy) {
                    htmaxy = kivetitettPontok[k][1];
                }
            }
            htminx = Math.max(0, Math.min(jsCanvasSzelesseg - 1, Math.floor(htminx)));
            htminy = Math.max(0, Math.min(jsCanvasMagassag - 1, Math.floor(htminy)));
            htmaxx = Math.max(0, Math.min(jsCanvasSzelesseg - 1, Math.ceil(htmaxx)));
            htmaxy = Math.max(0, Math.min(jsCanvasMagassag - 1, Math.ceil(htmaxy)));
            let dX0 = kivetitettPontok[2][0] - kivetitettPontok[1][0];
            let dY0 = kivetitettPontok[2][1] - kivetitettPontok[1][1];
            let dX1 = kivetitettPontok[0][0] - kivetitettPontok[2][0];
            let dY1 = kivetitettPontok[0][1] - kivetitettPontok[2][1];
            let dX2 = kivetitettPontok[1][0] - kivetitettPontok[0][0];
            let dY2 = kivetitettPontok[1][1] - kivetitettPontok[0][1];
            // kiszámoljuk a bounding box-tól balra fenti pixel edgefunctionjét
            let w0 = edgeFunction(kivetitettPontok[1][0], kivetitettPontok[1][1], dX0, dY0, htminx - 1 + inc, htminy - 1 + inc);
            let w1 = edgeFunction(kivetitettPontok[2][0], kivetitettPontok[2][1], dX1, dY1, htminx - 1 + inc, htminy - 1 + inc);
            let w2 = edgeFunction(kivetitettPontok[0][0], kivetitettPontok[0][1], dX2, dY2, htminx - 1 + inc, htminy - 1 + inc);
            let z0Rec = 1 / kivetitettPontok[0][2];
            let z1Rec = 1 / kivetitettPontok[1][2];
            let z2Rec = 1 / kivetitettPontok[2][2];
            let jobbraKicsiPixel0 = dY0 * gyokElsimitasReciprok;
            let jobbraKicsiPixel1 = dY1 * gyokElsimitasReciprok;
            let jobbraKicsiPixel2 = dY2 * gyokElsimitasReciprok;
            let balreFel0 = dY0 * gyokElsimitas * gyokElsimitasReciprok + dX0 * gyokElsimitasReciprok;
            let balreFel1 = dY1 * gyokElsimitas * gyokElsimitasReciprok + dX1 * gyokElsimitasReciprok;
            let balreFel2 = dY2 * gyokElsimitas * gyokElsimitasReciprok + dX2 * gyokElsimitasReciprok;
            let sorEleje0 = dY0 * (htmaxx - htminx + 1);
            let sorEleje1 = dY1 * (htmaxx - htminx + 1);
            let sorEleje2 = dY2 * (htmaxx - htminx + 1);
            let haromszogterulet = 1 / edgeFunction(kivetitettPontok[0][0], kivetitettPontok[0][1], kivetitettPontok[1][0] - kivetitettPontok[0][0], kivetitettPontok[1][1] - kivetitettPontok[0][1], kivetitettPontok[2][0], kivetitettPontok[2][1]);
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
                                baricentrikus = [w0 * haromszogterulet, w1 * haromszogterulet, w2 * haromszogterulet];
                                zMelyseg = 1 / (z0Rec * baricentrikus[0] + z1Rec * baricentrikus[1] + z2Rec * baricentrikus[2]);
                                bufferIndex = (y * jsCanvasSzelesseg + x) * antialias + ya * gyokElsimitas + xa;
                                if (zMelyseg < zbuffer[bufferIndex]) {
                                    zbuffer[bufferIndex] = zMelyseg;
                                    kepIndex = bufferIndex * 3;
                                    image[kepIndex] = 255 / kivetitettPontok[0][2] * baricentrikus[0] * zMelyseg;
                                    image[kepIndex + 1] = 255 / kivetitettPontok[1][2] * baricentrikus[1] * zMelyseg;
                                    image[kepIndex + 2] = 255 / kivetitettPontok[2][2] * baricentrikus[2] * zMelyseg;
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

document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.getElementById("canvas");
    canvas.get
    canvas.width = jsCanvasSzelesseg;
    canvas.height = jsCanvasMagassag;
    let sd = document.getElementById("seed");
    seed = Math.floor(Math.random() * 10000) + 1;
    sd.value = seed;
    sd.nextElementSibling.value = sd.value
    ujhely();
    ujTerkep();
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
    let eleje = performance.now()
    perlinErtekek = perlin(1, meret, seed, 2, 9, 2, 2.2);
    pontok = new Float32Array(meret * meret * 3);
    pontokKiszamolasa(pontok, perlinErtekek, 150);
    indexek = new Float32Array((meret - 1) * (meret - 1) * 6);
    osszekotesekKiszamolasa(indexek, meret)
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