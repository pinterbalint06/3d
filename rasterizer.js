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
    // x / (-z) * n -al megkapjuk a screen coordinate system beli koordinátáit a pontnak -  középpontja a canvas közepe - x jobbra nő
    // eddig a n egynek felteteleztuk ha nem egy akkor be kell szorozni vele az arany P'.y/Zkozel=P.y/P.z, P'.y=P.y/P.z*Zkozel
    // A videókártyák NDC [-1;1] intervallum l < x < r levezethezjük hogy -1 < 2x / (r-l) - (r+l) / (r-l) < 1
    return (2 * ((x / (-z)) * n) / (r - l) - (r + l) / (r - l));
}

function kameraHelybolNDCHelybeY(y, z) {
    // y / (-z) * n -al megkapjuk a screen coordinate system beli koordinátáit a pontnak -  középpontja a canvas közepe - y felfele nő
    // eddig a n egynek felteteleztuk ha nem egy akkor be kell szorozni vele az arany P'.y/Zkozel=P.y/P.z, P'.y=P.y/P.z*Zkozel
    // A videókártyák NDC [-1;1] intervallum b < y < t levezethezjük hogy -1 < 2y / (t-b) - (t+b) / (t-b) < 1
    return (2 * ((y / (-z)) * n) / (t - b) - (t + b) / (t - b));
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

function pontvet(pont, P) {
    let er = pontMatrixSzorzas(pont, P);
    return [(er[0] + 1) * 0.5 * jsCanvasSzelesseg, (1 - er[1]) * 0.5 * jsCanvasMagassag, er[2]]
}

function kirajzol(canvasId, antialias = 1) {
    console.log("Renderelés ", antialias, "x élsimítással");
    let eleje = performance.now()
    let pontKivetitesIdo = 0;
    let pixelTesztIdo = 0;
    let ido = 0;
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
    ido = performance.now();
    // jsCanvasMagassag * gyokElsmitas * jsCanvasSzelesseg * gyokElsimitas = jsCanvasMagassag * jsCanvasSzelesseg * antialias
    let zbuffer = new Float32Array(jsCanvasMagassag * jsCanvasSzelesseg * antialias);
    zbuffer.fill(f);
    let kivetitettPontok;
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
    console.log("Bufferek létrehozása, előszámítások:", performance.now() - ido, "ms");
    for (let i = 0; i < indexek.length; i += 3) {
        htminx = 2000;
        htminy = 2000;
        htmaxx = -2000;
        htmaxy = -2000;
        // A pontokat átírjuk mátrix szorzással a kamera koordináta rendszerébe majd kivetetítjük őket
        ido = performance.now();
        kameraKoordinatak = [
            pontMatrixSzorzas([pontok[indexek[i] * 3], pontok[indexek[i] * 3 + 1], pontok[indexek[i] * 3 + 2]], kameraMatrix),
            pontMatrixSzorzas([pontok[indexek[i + 1] * 3], pontok[indexek[i + 1] * 3 + 1], pontok[indexek[i + 1] * 3 + 2]], kameraMatrix),
            pontMatrixSzorzas([pontok[indexek[i + 2] * 3], pontok[indexek[i + 2] * 3 + 1], pontok[indexek[i + 2] * 3 + 2]], kameraMatrix)
        ];
        pontKivetitesIdo += performance.now() - ido;
        if (-n >= kameraKoordinatak[0][2] && kameraKoordinatak[0][2] >= -f &&
            -n >= kameraKoordinatak[1][2] && kameraKoordinatak[1][2] >= -f &&
            -n >= kameraKoordinatak[2][2] && kameraKoordinatak[2][2] >= -f
        ) {
            ido = performance.now();
            kivetitettPontok = [
                pontvet(kameraKoordinatak[0], P),
                pontvet(kameraKoordinatak[1], P),
                pontvet(kameraKoordinatak[2], P),
            ];
            pontKivetitesIdo += performance.now() - ido;
            ido = performance.now();
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
                    for (let ya = 0; ya < gyokElsimitas; ya++) {
                        for (let xa = 0; xa < gyokElsimitas; xa++) {
                            // A pixel közepe rajta van-e a kivetitett pontok altal meghatarozott haromszogon
                            // kis pixelek közepének kiszámolása:
                            // x a pixelünk kezdete
                            // legyen egy pixel egy egység hosszú ezt felosztjuk gyokElsimitas kis pixelre egy kis pixel hossza 1/gyokElsimitas tehat gyokelSimitasReciprok
                            // a kis pixel közepe kell úgy hogy kell a kis pixel hosszának fele ami = (1/gyokElsimitas)/2 = gyokElsimitasReciprok*0.5
                            // ehhez még hozzá kell adni azt hogy hanyadik kis pixelben vagyunk ez xa-szor a kis pixel hossza tehát xa*gyokElsimitasReciprok
                            // a teljes koordináta x+gyokElsimitasReciprok*0.5+xa*gyokElsimitasReciprok. kiemelve gyokElsimitasReciprok-ot. x+(xa + 0.5) * gyokElsimitasReciprok
                            baricentrikus = rajtaVanEAPixelAHaromszogon(kivetitettPontok[0], kivetitettPontok[1], kivetitettPontok[2], [x + (xa + 0.5) * gyokElsimitasReciprok, y + (ya + 0.5) * gyokElsimitasReciprok]);
                            if (baricentrikus !== null) {
                                zMelyseg = 1 / ((1 / kivetitettPontok[0][2]) * baricentrikus[0] + (1 / kivetitettPontok[1][2]) * baricentrikus[1] + (1 / kivetitettPontok[2][2]) * baricentrikus[2]);
                                bufferIndex = (y * jsCanvasSzelesseg + x) * antialias + ya * gyokElsimitas + xa;
                                if (zMelyseg < zbuffer[bufferIndex]) {
                                    zbuffer[(y * jsCanvasSzelesseg + x) * antialias + ya * gyokElsimitas + xa] = zMelyseg;
                                    kepIndex = bufferIndex * 3;
                                    image[kepIndex] = 255 / kivetitettPontok[0][2] * baricentrikus[0] * zMelyseg;
                                    image[kepIndex + 1] = 255 / kivetitettPontok[1][2] * baricentrikus[1] * zMelyseg;
                                    image[kepIndex + 2] = 255 / kivetitettPontok[2][2] * baricentrikus[2] * zMelyseg;
                                }
                            }
                        }
                    }
                }
            }
            pixelTesztIdo += performance.now() - ido;
        }
    }
    console.log("Pontok kivetítése: ", pontKivetitesIdo, "ms");
    console.log("Pixel teszt idő: ", pixelTesztIdo, "ms");
    ido = performance.now();
    let img = ctx.createImageData(jsCanvasSzelesseg, jsCanvasMagassag);
    let data = img.data;
    let r, g, b;
    let altalanosIndex, imageIndex, dataIndex, subImageIndex;
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
            data[dataIndex] = r / antialias;
            data[dataIndex + 1] = g / antialias;
            data[dataIndex + 2] = b / antialias;
            data[dataIndex + 3] = 255;
        }
    }
    ctx.putImageData(img, 0, 0);
    console.log("Kép létrhozása:", performance.now() - ido, "ms");
    console.log("Teljes renderelés idő:", performance.now() - eleje, "ms");
    console.log("------------------------------");
}

function negyzetSzamE(x) {
    let gyok = Math.sqrt(x);
    return gyok == parseInt(gyok);
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

function forgatasYMatrix4x4(szog) {
    const cosinus = Math.cos(szog);
    const sinus = Math.sin(szog);
    return [
        [cosinus, 0, -sinus, 0],
        [0, 1, 0, 0],
        [sinus, 0, cosinus, 0],
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
    const Ry = [
        [cosinus, 0, -sinus],
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