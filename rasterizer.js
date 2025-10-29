// kamera tulajdonsagai
const fokuszTavolsag = 35; // mm focalLength
const filmNyilasSzelesseg = 0.980;
const filmNyilasMagassag = 0.735;
const jsCanvasSzelesseg = 1200;
const jsCanvasMagassag = 900;
const inchToMm = 25.4;
const kozelVagasiSikZ = 0.1;
const tavollVagasiSikZ = 1000;
let xKitoltes = 1;
let yKitoltes = 1;
// a filmAspectRatiot lekicsinyítjük a resolutionGateAspectRatiora a képünk képarányára
if (filmNyilasSzelesseg / filmNyilasMagassag > jsCanvasSzelesseg / jsCanvasMagassag) {
    xKitoltes = (jsCanvasSzelesseg / jsCanvasMagassag) / (filmNyilasSzelesseg / filmNyilasMagassag);
} else {
    yKitoltes = (filmNyilasSzelesseg / filmNyilasMagassag) / (jsCanvasSzelesseg / jsCanvasMagassag);
}
// derekszogu haromszog latoszoggel szembeni oldal a filmnyilas szelessegenek fele melette levo oldal a fokusztavolsag
// const fovHorizontalis = 2*Math.atan((filmNyilasSzelesseg*inchToMm/2)/fokuszTavolsag);
// const canvasJobbSzel = Math.tan(fovHorizontalis/2) * kozelVagasiSikZ;
// const canvasBalSzel = -canvasJobbSzel;
// const fovVertikalis = 2*Math.atan((filmNyilasMagassag*inchToMm/2)/fokuszTavolsag);
// const canvasFelsoSzel = Math.tan(fovVertikalis/2) * kozelVagasiSikZ;
// const canvasAlsoSzel = -canvasFelsoSzel;
// const canvasTavolsag = 1;
// let canvasMeret = 2 * Math.tan(fov/2) * canvasTavolsag;

// gyorsabban. kiszamoljuk a felso szélét ennek ellentettje az also
// a jobb oldalit megkapjuk ha a felsőt megszorozzuk a képaránnyal
const t = ((filmNyilasMagassag * inchToMm / 2) / fokuszTavolsag * kozelVagasiSikZ) * yKitoltes;
const r = t * (filmNyilasSzelesseg / filmNyilasMagassag) * xKitoltes;
const b = -t;
const l = -r;
const canvasSzelesseg = r * 2;
const canvasMagassag = t * 2;

function pontokKiszamolasa(perlinek, szorzo) {
    let pontok = [];
    for (let y = 0; y < perlinek.length; y++) {
        for (let x = 0; x < perlinek[y].length; x++) {
            pontok.push(x); // x koordináta
            pontok.push(perlinek[y][x] * szorzo); // y koordináta
            pontok.push(-y); // z koordináta
        }
    }
    return pontok;
}

function osszekotesekKiszamolasa(meret) {
    let indexe;
    let indexek = [];
    for (let sor = 0; sor < meret - 1; sor++) {
        for (let oszlop = 0; oszlop < meret - 1; oszlop++) {
            indexe = sor * meret + oszlop;
            // A három indexnek a pontjait (pontok[index] pontot ad meg) összekötjük háromszögekre
            // A négyzet
            indexek.push(indexe + 1); // jobb felső pontja
            indexek.push(indexe); // bal felső pontja
            indexek.push(indexe + meret); // bal alsó pontja

            indexek.push(indexe + 1); // jobb felső pontja
            indexek.push(indexe + meret); // bal alsó pontja
            indexek.push(indexe + meret + 1); // jobb alsó pontja
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
 * @param {number} x1 A vonalat meghatározó második pont X koordinátája
 * @param {number} y1 A vonalat meghatározó második pont Y koordinátája
 * @param {number} x0 A vizsgált pont X koordinátája
 * @param {number} y0 A vizsgált pont Y koordinátája
 * @returns {number} Vektoriális szorzatuk Z koordinátája. Z=0 vonalon. Z>0 jobbra. Z<0 balra.
 */
function edgeFunction(X, Y, x1, y1, x0, y0) {
    return (x0 - X) * (y1 - Y) - (y0 - Y) * (x1 - X);
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
    let w0 = edgeFunction(v1[0], v1[1], v2[0], v2[1], p[0], p[1]);
    let w1 = edgeFunction(v2[0], v2[1], v0[0], v0[1], p[0], p[1]);
    let w2 = edgeFunction(v0[0], v0[1], v1[0], v1[1], p[0], p[1]);
    let vissza = null;
    if (w0 >= 0 && w1 >= 0 && w2 >= 0) {
        let haromszogterulet = edgeFunction(v0[0], v0[1], v1[0], v1[1], v2[0], v2[1]);
        vissza = [w0 / haromszogterulet, w1 / haromszogterulet, w2 / haromszogterulet];
    }
    return vissza;
}

function zBufferInit(zbuffer) {
    for (let j = 0; j < jsCanvasMagassag * jsCanvasSzelesseg; j++) {
        zbuffer.push(2000);
    }
}

function pontKivetitese(pont) {
    // eltároljuk az eredeti pont z koordinátáját is a z buffereléshez
    // x: ((NDC + 1)/2) * jsCanvasSzelesseg) és y: ((1-NDC)/2) * jsCanvasMagassag) 
    // megszorozzuk a kép (raster) szélességével/magasságával így megkapjuk a raster coordinate system beli koordinátáját - középpontja a kép bal felső sarka - x jobbra nő y lefele nő
    return [
        (kameraHelybolNDCHelybeX(pont[0], pont[2]) + 1) / 2 * jsCanvasSzelesseg,
        (1 - kameraHelybolNDCHelybeY(pont[1], pont[2])) / 2 * jsCanvasMagassag,
        -pont[2]
    ]
}

function kameraHelybolNDCHelybeX(x, z) {
    // x / (-z) * kozelVagasiSikZ -al megkapjuk a screen coordinate system beli koordinátáit a pontnak -  középpontja a canvas közepe - x jobbra nő
    // eddig a kozelVagasiSikZ egynek felteteleztuk ha nem egy akkor be kell szorozni vele az arany P'.y/Zkozel=P.y/P.z, P'.y=P.y/P.z*Zkozel
    // A videókártyák NDC [-1;1] intervallum l < x < r levezethezjük hogy -1 < 2x / (r-l) - (r+l) / (r-l) < 1
    return (2 * ((x / (-z)) * kozelVagasiSikZ) / (r - l) - (r + l) / (r - l));
}

function kameraHelybolNDCHelybeY(y, z) {
    // y / (-z) * kozelVagasiSikZ -al megkapjuk a screen coordinate system beli koordinátáit a pontnak -  középpontja a canvas közepe - y felfele nő
    // eddig a kozelVagasiSikZ egynek felteteleztuk ha nem egy akkor be kell szorozni vele az arany P'.y/Zkozel=P.y/P.z, P'.y=P.y/P.z*Zkozel
    // A videókártyák NDC [-1;1] intervallum b < y < t levezethezjük hogy -1 < 2y / (t-b) - (t+b) / (t-b) < 1
    return (2 * ((y / (-z)) * kozelVagasiSikZ) / (t - b) - (t + b) / (t - b));
}

function kirajzol(pontok, indexek, ctx) {
    ctx.clearRect(0, 0, jsCanvasSzelesseg, jsCanvasMagassag);
    // kamera helye
    let kameraMatrix = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [-120, -200, 470, 1]
    ];
    kameraMatrix = matrixSzorzas(kameraMatrix, forgatasXMatrix4x4(Math.PI / -5.2));
    let zbuffer = [];
    zBufferInit(zbuffer);
    let kivetitettPontok;
    // a háromszög határolókeretje
    let htminx, htminy, htmaxx, htmaxy;
    let zMelyseg;
    let kepIndex;

    let img = ctx.createImageData(jsCanvasSzelesseg, jsCanvasMagassag);
    let data = img.data;
    let baricentrikus;
    for (let i = 0; i < indexek.length; i += 3) {
        htminx = 2000;
        htminy = 2000;
        htmaxx = -2000;
        htmaxy = -2000;
        // A pontokat átírjuk mátrix szorzással a kamera koordináta rendszerébe majd kivetetítjük őket
        kivetitettPontok = [
            pontKivetitese(matrixSzorzas([[pontok[indexek[i] * 3], pontok[indexek[i] * 3 + 1], pontok[indexek[i] * 3 + 2], 1]], kameraMatrix)[0]),
            pontKivetitese(matrixSzorzas([[pontok[indexek[i + 1] * 3], pontok[indexek[i + 1] * 3 + 1], pontok[indexek[i + 1] * 3 + 2], 1]], kameraMatrix)[0]),
            pontKivetitese(matrixSzorzas([[pontok[indexek[i + 2] * 3], pontok[indexek[i + 2] * 3 + 1], pontok[indexek[i + 2] * 3 + 2], 1]], kameraMatrix)[0])
        ]
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
        for (let y = htminy; y <= htmaxy; y++) {
            for (let x = htminx; x <= htmaxx; x++) {
                // A pixel közepe rajta van-e a kivetitett pontok altal meghatarozott haromszogon
                baricentrikus = rajtaVanEAPixelAHaromszogon(kivetitettPontok[0], kivetitettPontok[1], kivetitettPontok[2], [x + 0.5, y + 0.5]);
                if (baricentrikus !== null) {
                    zMelyseg = 1 / (1 / kivetitettPontok[0][2] * baricentrikus[0] + 1 / kivetitettPontok[1][2] * baricentrikus[1] + 1 / kivetitettPontok[2][2] * baricentrikus[2]);
                    if (zMelyseg < zbuffer[y * jsCanvasSzelesseg + x]) {
                        zbuffer[y * jsCanvasSzelesseg + x] = zMelyseg;
                        kepIndex = (y * jsCanvasSzelesseg + x) * 4;
                        data[kepIndex] = 255 / kivetitettPontok[0][2] * baricentrikus[0] * zMelyseg;
                        data[kepIndex + 1] = 255 / kivetitettPontok[1][2] * baricentrikus[1] * zMelyseg;
                        data[kepIndex + 2] = 255 / kivetitettPontok[2][2] * baricentrikus[2] * zMelyseg;
                        data[kepIndex + 3] = 255;
                    }
                }
            }
        }
    }
    ctx.putImageData(img, 0, 0);
}

function forgatasXMatrix4x4(szog) {
    const cosinus = Math.cos(szog);
    const sinus = Math.sin(szog);
    return [
        [1, 0, 0, 0],
        [0, cosinus, sinus, 0],
        [0, -sinus, cosinus, 0],
        [0, 0, 0, 1]
    ];
}

function forgatasXMatrix(szog) {
    const cosinus = Math.cos(szog);
    const sinus = Math.sin(szog);
    return [
        [1, 0, 0],
        [0, cosinus, sinus],
        [0, -sinus, cosinus]
    ];
}

function forgatasXtengelyen(szog, forgatando) {
    forgatas(forgatasXMatrix(szog), forgatando);
}

function forgatasYtengelyen(szog, forgatando) {
    const cosinus = Math.cos(szog);
    const sinus = Math.sin(szog);
    const Ry = [[cosinus, 0, -sinus],
    [0, 1, 0],
    [sinus, 0, cosinus]
    ];
    forgatas(Ry, forgatando);
}

function forgatasZtengelyen(szog, forgatando) {
    const cosinus = Math.cos(szog);
    const sinus = Math.sin(szog);
    const Rz = [[cosinus, sinus, 0],
    [-sinus, cosinus, 0],
    [0, 0, 1]
    ];
    forgatas(Rz, forgatando);
}


function forgatas(Rmatrix, forgatando) {
    for (let i = 0; i < forgatando.length / 3; i++) {
        let eredmeny = matrixSzorzas([[forgatando[i * 3], forgatando[i * 3 + 1], forgatando[i * 3 + 2]]],
            Rmatrix);
        forgatando[i * 3] = eredmeny[0][0];
        forgatando[i * 3 + 1] = eredmeny[0][1];
        forgatando[i * 3 + 2] = eredmeny[0][2];
    }
}

function eltolas(mertek, eltolandok) {
    for (let i = 0; i < eltolandok.length / 3; i++) {
        // csak x-et és z-t kell eltolni
        // y eltolása megváltoztatná a magasságot
        eltolandok[i * 3] += mertek;
        eltolandok[i * 3 + 2] += mertek;
    }
}

function skalazas(mertek, skalazandok) {
    for (let i = 0; i < skalazandok.length / 3; i++) {
        // csak x-et és z-t kell skalazni
        skalazandok[i * 3] *= mertek;
        skalazandok[i * 3 + 2] *= mertek;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // let matrix = [[1, 6, 3, 7], [4, 0, 6, 5], [7, 8, 9, 2], [23, 21, 2, 0]];
    // console.log(matrixSzorzas(invertalas(matrix), matrix));
    let sd = document.getElementById("seed");
    sd.value = Math.floor(Math.random() * 10000) + 1;
    sd.nextElementSibling.value = sd.value
    fo();
});

function fo() {
    let eleje = performance.now()

    let seed = document.getElementById("seed").value;
    const meret = 256;
    let perlinErtekek = perlin(1, meret, seed, 2, 9, 2, 2.2);
    let pontok = pontokKiszamolasa(perlinErtekek, 150);
    let indexek = osszekotesekKiszamolasa(meret);

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = jsCanvasSzelesseg;
    canvas.height = jsCanvasMagassag;
    kirajzol(pontok, indexek, ctx);

    console.log(performance.now() - eleje);
}