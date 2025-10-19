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


// Gauss-Jordan Method
// A mátrix és inverzének szorzata egyenlő az egységmátrixal
// a mátrixunkat augmentáljuk egy egységmátrixal (a mátrixunkon végzett műveleteket elvégezzük az egységmátrixon is)
// A mátrixunkat alapvető számsorú műveletekkel egységmátrixá alakítjuk. A kezdetileg egységmátrixból így az alap mátrixunk inverz mátrixát kapjuk.
// Négyzetmátrixnak kell lennie és determinánsa nem 0
function invertalas(matrix) {
    m = JSON.parse(JSON.stringify(matrix));
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
        for (let sor = 0; sor < m.length-1; sor++) {
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