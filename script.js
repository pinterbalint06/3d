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
            indexek.push(indexe); // bal felső pontja
            indexek.push(indexe + 1); // jobb felső pontja
            indexek.push(indexe + meret); // bal alsó pontja

            indexek.push(indexe + 1); // jobb felső pontja
            indexek.push(indexe + meret); // bal alsó pontja
            indexek.push(indexe + meret + 1); // jobb alsó pontja
            // a négyzetet felosztottuk két háromszögre
        }
    }
    return indexek;
}

function kirajzol(pontok, indexek, ctx, eredeti) {
    ctx.clearRect(0, 0, 1000, 1000);
    let kivetitettPont = [];
    let canvasMeret = 2;
    // kamera helye
    const kameraPont = [84, 0, -260];
    for (let i = 0; i < pontok.length / 3; i++) {
        // 2Ds canvasra kell kirajzolnunk a 3Ds pontokat
        //x jobbra balra
        //z le fel
        // y mélység
        let x = pontok[i * 3] - kameraPont[0];
        let y = pontok[i * 3 + 1] - kameraPont[1];
        let z = pontok[i * 3 + 2] - kameraPont[2];
        // x / (-z) -al megkapjuk a screen coordinate system beli koordinátáit a pontnak [-1,1] -  középpontja a canvas közepe - x jobbra nő y felfele nő
        // x / (-z) + 1)/2 ehhez hozzáadva egyet és osztva kettővel normalizáljuk a koordinátákat és megkapjuk a Normalized Device Coordinates (NDC)-t [0,1] - közzéppontja a kép bal alsó sarka - x jobbra nő y felfele nő
        // Math.floor(((x / (-z) + 1)/2) * 1000) megszorozzuk a kép (raster) szélességével/magasságával és kerekítjuk így megkapjuk a raster coordinate system beli koordinátáját - középpontja a kép bal felső sarka - x jobbra nő y lefele nő
        // A js canvasa máshogy működik y-nak elvileg Math.floor(((1-(y / (-z) + 1)/2)) * 1000) - nek kéne lenni.
        kivetitettPont.push(Math.floor(((x / (-z) + canvasMeret / 2) / canvasMeret) * 1000)); // x koordináta = x/(z+D) perspektívikus vetítes (perspective divide)
        kivetitettPont.push(Math.floor(((y / (-z) + canvasMeret / 2) / canvasMeret) * 1000)); // y koordináta = y/(z+D) perspektívikus vetítes (perspective divide)
    }

    // kiszámoljuk a háromszög súlypontjának és a kamerának a távolságát
    // majd csökkenő sorrendbe rakjuk így a távoliak lesznek berajzolva elsőnek és a közeliek rájuk rajzolódnak
    // festő algoritmus
    let tavolsagok = [];

    for (let i = 0; i < indexek.length; i += 3) {
        let i1 = indexek[i];
        let i2 = indexek[i + 1];
        let i3 = indexek[i + 2];
        let tavolsag = (pontok[i1 * 3 + 2] + pontok[i2 * 3 + 2] + pontok[i3 * 3 + 2]) / 3;

        tavolsagok.push([tavolsag, i, i + 1, i + 2]);
    }

    tavolsagok.sort((a, b) => {
        return b[0] - a[0];
    });

    // kirajzolas
    // tavolsag szerint csokkenon végig megyünk
    for (let i = 0; i < tavolsagok.length; i++) {
        // megkapjuk a pontok indexeit
        let i1 = indexek[tavolsagok[i][1]];
        let i2 = indexek[tavolsagok[i][2]];
        let i3 = indexek[tavolsagok[i][3]];

        // a 2Ds pontokat megkapjuk
        let x1 = kivetitettPont[i1 * 2];
        let y1 = kivetitettPont[i1 * 2 + 1];

        let x2 = kivetitettPont[i2 * 2];
        let y2 = kivetitettPont[i2 * 2 + 1];

        let x3 = kivetitettPont[i3 * 2];
        let y3 = kivetitettPont[i3 * 2 + 1];

        // kirajzoljuk a háromszöget
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        if ((eredeti[i1 * 3 + 1] + eredeti[i2 * 3 + 1] + eredeti[i3 * 3 + 1]) / 3 > 20) {
            ctx.fillStyle = "rgb(128,128,128)";
            ctx.strokeStyle = "rgb(80,80,80)";
        } else {
            ctx.fillStyle = "#32CD32";
            ctx.strokeStyle = "#195c19ff";
        }
        ctx.fill();
        ctx.stroke();
    }
}

function forgatasXtengelyen(szog, forgatando) {
    const cosinus = Math.cos(szog);
    const sinus = Math.sin(szog);
    const Rx = [[1, 0, 0],
    [0, cosinus, sinus],
    [0, -sinus, cosinus]
    ];
    forgatas(Rx, forgatando);
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
        let eredmeny = matrixSzorzas([[forgatando[i * 3],forgatando[i * 3 + 1],forgatando[i * 3 + 2]]],
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
    let sd = document.getElementById("seed");
    sd.value = Math.floor(Math.random() * 10000) + 1;
    sd.nextElementSibling.value = sd.value
    fo();
});

function fo() {
    let seed = document.getElementById("seed").value;
    const meret = 128;
    let perlinErtekek = perlin(1, meret, seed, 2, 9, 2, 2.2);
    let pontok = pontokKiszamolasa(perlinErtekek, 150);
    let eredeti = [...pontok];
    let indexek = osszekotesekKiszamolasa(meret);

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 1000;
    let kozep = (meret - 1) / 2;
    eltolas(-kozep, pontok);
    forgatasXtengelyen(Math.PI / -8, pontok);
    eltolas(kozep, pontok);
    skalazas(1.3, pontok);
    kirajzol(pontok, indexek, ctx, eredeti);
}