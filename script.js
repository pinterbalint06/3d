function pontokKiszamolasa(perlinek, szorzo) {
    let pontok = [];
    for (let y = 0; y < perlinek.length; y++) {
        for (let x = 0; x < perlinek[y].length; x++) {
            pontok.push(x); // x koordináta
            pontok.push(perlinek[y][x] * szorzo); // y koordináta
            pontok.push(y); // z koordináta
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
    // kamera távolsága
    const D = 1;
    // kamera helye
    const kameraPont = [0, 20, -64];
    for (let i = 0; i < pontok.length / 3; i++) {
        // 2Ds canvasra kell kirajzolnunk a 3Ds pontokat
        //x jobbra balra
        //z le fel
        // y mélység
        let x = pontok[i * 3] - kameraPont[0];
        let y = pontok[i * 3 + 1] - kameraPont[1];
        let z = pontok[i * 3 + 2] - kameraPont[2];
        kivetitettPont.push((((x / (-z) + 1)/2) * 1000)); // x koordináta = x/(z+D) perspektívikus vetítes (perspective divide)
        kivetitettPont.push((((y / (-z) + 1)/2) * 1000)); // y koordináta = y/(z+D) perspektívikus vetítes (perspective divide)
    }

    // kiszámoljuk a háromszög súlypontjának és a kamerának a távolságát
    // majd csökkenő sorrendbe rakjuk így a távoliak lesznek berajzolva elsőnek és a közeliek rájuk rajzolódnak
    // festő algoritmus
    let tavolsagok = [];

    for (let i = 0; i < indexek.length; i += 3) {
        let i1 = indexek[i];
        let i2 = indexek[i + 1];
        let i3 = indexek[i + 2];
        let tavolsag = (pontok[i1 * 3 + 1] + pontok[i2 * 3 + 1] + pontok[i3 * 3 + 1]) / 3;

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

function forgatasZtengelyen(szog, forgatando) {
    const cosinus = Math.cos(szog);
    const sinus = Math.sin(szog);
    for (let i = 0; i < forgatando.length / 3; i++) {
        let x = forgatando[i * 3];
        let y = forgatando[i * 3 + 1];

        forgatando[i * 3] = x * cosinus - y * sinus;
        forgatando[i * 3 + 1] = x * sinus + y * cosinus;
    }
}

function forgatasXtengelyen(szog, forgatando) {
    const cosinus = Math.cos(szog);
    const sinus = Math.sin(szog);
    for (let i = 0; i < forgatando.length / 3; i++) {
        let y = forgatando[i * 3 + 1];
        let z = forgatando[i * 3 + 2];

        forgatando[i * 3 + 1] = y * cosinus - z * sinus;
        forgatando[i * 3 + 2] = y * sinus + z * cosinus;
    }
}

function forgatasYtengelyen(szog, forgatando) {
    const cosinus = Math.cos(szog);
    const sinus = Math.sin(szog);
    for (let i = 0; i < forgatando.length / 3; i++) {
        let x = forgatando[i * 3];
        let z = forgatando[i * 3 + 2];

        forgatando[i * 3] = x * cosinus + z * sinus;
        forgatando[i * 3 + 2] = (-1) * x * sinus + z * cosinus;
    }
}

function eltolas(mertek, eltolandok) {
    for (let i = 0; i < eltolandok.length / 3; i++) {
        // csak x-et és y-t kell eltolni
        // z eltolása megváltoztatná a magasságot
        eltolandok[i * 3] += mertek;
        eltolandok[i * 3 + 1] += mertek;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let sd = document.getElementById("seed");
    sd.value = Math.floor(Math.random()*10000)+1;
    sd.nextElementSibling.value = sd.value
    fo();
});

function fo() {
    let seed = document.getElementById("seed").value;
    const meret = 128;
    let perlinErtekek = perlin(1, meret, seed, 1, 9, 2, 2.2);
    let pontok = pontokKiszamolasa(perlinErtekek, 150);
    let eredeti = [...pontok];
    let indexek = osszekotesekKiszamolasa(meret);

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 1000;
    // let kozep = (meret - 1) / 2;
    // eltolas(-kozep, pontok);
    // forgatasXtengelyen(Math.PI / 2, pontok);
    // eltolas(kozep, pontok);
    kirajzol(pontok, indexek, ctx, eredeti);
}