// row-major
function matrixSzorzas(m1, m2) {
    if (m1[0].length == m2.length) {
        let eredmeny = [];
        for (let i = 0; i < m1.length; i++) {
            eredmeny.push([]);
            for (let j = 0; j < m2[0].length; j++) {
                eredmeny[i].push(0);
            }
        }
        for (let i = 0; i < m1.length; i++) {
            for (let j = 0; j < m2[0].length; j++) {
                for (let k = 0; k < m1[0].length; k++) {
                    eredmeny[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }
        return eredmeny;
    } else {
        throw "Nem megfelelő mátrixok";
    }
}

// row-major
function matrixSzorzas4x4(m1, m2, erHely) {
    let m1t = new Float32Array(
        wasmMemory.buffer,
        m1Hely,
        16
    );
    let m2t = new Float32Array(
        wasmMemory.buffer,
        m2Hely,
        16
    );
    for (let i = 0; i < 16; i++) {
        m1t[i] = m1[i];
        m2t[i] = m2[i];
    }
    let eredmeny = new Float32Array(
        wasmMemory.buffer,
        erHely,
        16
    );
    Module._matrixSzorzas4x4(m1Hely, m2Hely, erHely);
    return eredmeny;
}

// row-major
function pontMatrix(pont, matrix) {
    let eredmeny = new Float32Array(4);
    for (let i = 0; i < 4; i++) {
        eredmeny[i] = pont[0] * matrix[i] + pont[1] * matrix[4 + i] + pont[2] * matrix[8 + i] + matrix[12 + i];
    }
    return eredmeny;
}

function transpose(m) {
    let transposed = [];
    for (let i = 0; i < m.length; i++) {
        transposed.push([]);
        for (let j = 0; j < m[0].length; j++) {
            transposed[i].push(0);
        }
    }
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++) {
            transposed[j][i] = m[i][j];
        }
    }
    return transposed;
}

function linearis_interpolacio(a1, a2, d) {
    return a1 + (a2 - a1) * d;
}

// Gauss-Jordan Method
// A mátrix és inverzének szorzata egyenlő az egységmátrixal
// a mátrixunkat augmentáljuk egy egységmátrixal (a mátrixunkon végzett műveleteket elvégezzük az egységmátrixon is)
// A mátrixunkat alapvető számsorú műveletekkel egységmátrixá alakítjuk. A kezdetileg egységmátrixból így az alap mátrixunk inverz mátrixát kapjuk.
// Négyzetmátrixnak kell lennie és determinánsa nem 0
// row-major
function invertalas(matrix) {
    let m = JSON.parse(JSON.stringify(matrix));
    if (m.length == m[0].length) {
        // inverz alapból egyenlő az egységmátrixal
        let inverze = [];
        for (let i = 0; i < m.length; i++) {
            inverze.push([]);
            for (let j = 0; j < m.length; j++) {
                inverze[i].push(i == j ? 1 : 0);
            }
        }
        // 1. lépés
        // egy főátló se lehet 0 ha valamelyik főátló 0 akkor kicseréljük a sorokat. Arra a sorra amelyikben a megfelelő érték abszolút értéke a legnagyobb
        for (let oszlop = 0; oszlop < m.length; oszlop++) {
            if (m[oszlop][oszlop] == 0) {
                let maxs = 0;
                for (let sor = 1; sor < m.length; sor++) {
                    if (Math.abs(m[sor][oszlop]) > Math.abs(m[maxs][oszlop])) {
                        maxs = sor;
                    }
                }
                if (m[maxs][oszlop] == 0) {
                    throw "nem invertalható halló szia";
                } else {
                    // működik reference cserével
                    let segitseg = m[maxs];
                    m[maxs] = m[oszlop];
                    m[oszlop] = segitseg;
                    segitseg = inverze[maxs];
                    inverze[maxs] = inverze[oszlop];
                    inverze[oszlop] = segitseg;
                }
            }
        }

        // 2. lépés
        // Gauss-Jordán eliminációval a főátló alatti értékeket 0ra hozzuk
        // alapvető számsorú műveletek végrehajtásával
        for (let oszlo = 0; oszlo < m.length - 1; oszlo++) {
            for (let sor = oszlo + 1; sor < m.length; sor++) {
                let k = m[sor][oszlo] / m[oszlo][oszlo];
                for (let j = 0; j < m[0].length; j++) {
                    m[sor][j] -= k * m[oszlo][j];
                    inverze[sor][j] -= k * inverze[oszlo][j];
                }
            }
        }

        // 3. lépés
        // A főátlő értékeit egyre hozzuk
        // Elosztjuk a sorukat az értékükkel, így a főátló (pivot) értéke 1 lesz
        for (let sor = 0; sor < m.length; sor++) {
            let oszto = m[sor][sor];
            for (let oszlop = 0; oszlop < m.length; oszlop++) {
                m[sor][oszlop] /= oszto;
                inverze[sor][oszlop] /= oszto;
            }
        }

        // 4. lépés
        // A főátló feletti számok nullára hozása
        // az j oszlopnál az j sort vesszük
        // Az egyre hozás miatt az j sornál az j oszlop a főátló vagyis 1 és ha ennek a sornak a -elem ét hozzáadjuk akkor az elem nulla lesz (hozzáadjuk ellentettét)
        // A már 0 elemeket ez nem változtatja meg mert a 0 * (bármi) = 0 vagyis marad 0
        for (let sor = 0; sor < m.length - 1; sor++) {
            // sor+1-től kezdődnek az átló feletti együtthatók
            for (let oszlop = sor + 1; oszlop < m.length; oszlop++) {
                let szorzoa = m[sor][oszlop];
                for (let k = 0; k < m.length; k++) {
                    m[sor][k] -= m[oszlop][k] * szorzoa;
                    inverze[sor][k] -= inverze[oszlop][k] * szorzoa;
                }
            }
        }
        return inverze;
    } else {
        throw "halo hiba";
    }
}

/**
 * Kiszámolja a vektor hosszát
 *
 * @param {number[]} vektor - A vektor [x, y, z] formában
 * @returns {number} A vektor hossza
 */
function vektorHossza(vektor) {
    return Math.sqrt(
        vektor[0] * vektor[0] + vektor[1] * vektor[1] + vektor[2] * vektor[2]
    );
}

/**
 * Normalizálja a vektort
 *
 * @param {number[]} vektor - A vektor [x, y, z] formában
 * @returns A normalizált vektor
 */
function vektorNormalizal(vektor) {
    let normalizalt = [];
    let hossz = vektorHossza(vektor);
    if (hossz > 1) {
        let reciprok = 1 / hossz;
        normalizalt.push(vektor[0] / reciprok);
        normalizalt.push(vektor[1] / reciprok);
        normalizalt.push(vektor[2] / reciprok);
    }
    return normalizalt;
}

/**
 * Gömbkoordinátákat átkonvertálja Descartes-féle koordinátákba
 *
 * @param {number} theta - A gömbkoordináta théta szöge radiánban
 * @param {number} phi - A gömbkoordináta phi szöge radiánban
 * @returns A vektor Descartes-féle koordinátákban [x, y, z] alakban. Z fel konvencióval.
 */
function gombbolDescartesba(theta, phi) {
    return [
        Math.sin(theta) * Math.cos(phi),
        Math.sin(theta) * Math.sin(phi),
        Math.cos(theta),
    ];
}

/**
 * Kiszámolja a thétát.
 *
 * @param {number[]} vektor - Az átváltandó vektor. Z fel konvencióban és normalizálva.
 * @returns Théta [0;π]
 */
function gombTheta(vektor) {
    return Math.acos(vektor[2]);
}

/**
 * Kiszámolja a phit.
 *
 * @param {number[]} vektor - Az átváltandó vektor. Z fel konvencióban és normalizálva.
 * @returns Phi. [0;2π]
 */
function gombPhi(vektor) {
    let phi = Math.atan2(vektor[1], vektor[0]);
    return phi < 0 ? phi + 2 * Math.PI : phi;
}

function forgatasXMatrix4x4(szog) {
    const cosinus = Math.cos(szog);
    const sinus = Math.sin(szog);
    return [
        1, 0, 0, 0,
        0, cosinus, sinus, 0,
        0, -sinus, cosinus, 0,
        0, 0, 0, 1
    ];
}

function forgatasYMatrix4x4(szog) {
    const cosinus = Math.cos(szog);
    const sinus = Math.sin(szog);
    return [
        cosinus, 0, -sinus, 0,
        0, 1, 0, 0,
        sinus, 0, cosinus, 0,
        0, 0, 0, 1
    ];
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
