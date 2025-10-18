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
function invertalas(m) {
    if (m.length == m[0].length) {
        // inverz alapból egyenlő az egységmátrixal
        let inverze = [];
        for (let i = 0; i < m.length; i++) {
            inverze.push([]);
            for (let j = 0; j < m[0].length; j++) {
                inverze[i].push(i == j ? 1 : 0);
            }
        }
        // egy főátló se lehet 0 ha valamelyik főátló 0 akkor kicseréljük a sorokat. Arra a sorra amelyikben a megfelelő érték abszolút értéke a legnagyobb
        for (let oszlop = 0; oszlop < m[0].length; oszlop++) {
            if (m[oszlop][oszlop] == 0) {
                let maxs = 0;
                for (let sor = 1; sor < m.length; sor++) {
                    if (Math.abs(m[sor][oszlop]) > Math.abs(m[maxs][oszlop])) {
                        maxs = sor;
                    }
                }
                if (m[maxs][oszlop] == 0) {
                    throw "nem invertalható halló szia";
                }
            }
        }
        return inverze;
    } else {
        throw "halo hiba";
    }
}