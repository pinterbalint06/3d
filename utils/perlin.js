function skalar_szorzat(vektor1, vektor2) {
    return vektor1[0] * vektor2[0] + vektor1[1] * vektor2[1];
}

function smoothing_fuggveny(ertek) {
    //  6 * t^5 - 15 * t^4 + 10 * t^3 = t * t * t * (t * (t * 6 - 15) + 10);
    // Horner-elrendezésben
    return ertek * ertek * ertek * (ertek * (ertek * 6 - 15) + 10);
}

function linearis_interpolacio(a1, a2, d) {
    return a1 + (a2 - a1) * smoothing_fuggveny(d);
}

function randomVektor(rand) {
    let angle = rand.nextFloat() * 2 * Math.PI;
    return [Math.cos(angle), Math.sin(angle)];
}

function perlin(ertekek, frekvencia, max, seed, amplitudum, oktavok, reszletessegArany=2, erossegArany=2, zajEltolas=0, zajMeret=1) {
    let ciklusAmplitudum = amplitudum;
    let gridSizeCiklus = max / frekvencia;
    let osszAmplitudum = 0;
    for (let i = 0; i < oktavok; i++) {
        let rnd = new PCG_XOR_RR(seed + i);
        let vektorok = [];
        for (let y = 0; y <= max / gridSizeCiklus; y++) {
            vektorok.push([]);
            for (let x = 0; x <= max / gridSizeCiklus; x++) {
                // vektorok[y].push([rnd.nextFloat() * (rnd.nextFloat() < 0.5 ? 1 : -1), rnd.nextFloat() * (rnd.nextFloat() < 0.5 ? 1 : -1)]);
                vektorok[y].push(randomVektor(rnd));
            }
        }
        for (let y = 0; y < max; y++) {
            for (let x = 0; x < max; x++) {
                // vektor kiszamolasa
                // x1-x0, y1-y0
                // jelenlegi pont (x1;y1)
                // legkozelebbi sarok (x0;y0)
                let balFelsoVektor = [(x / gridSizeCiklus) - Math.floor(x / gridSizeCiklus), (y / gridSizeCiklus) - Math.floor(y / gridSizeCiklus)];
                let jobbFelsoVektor = [(x / gridSizeCiklus) - Math.ceil(x / gridSizeCiklus), (y / gridSizeCiklus) - Math.floor(y / gridSizeCiklus)];
                let balAlsoVektor = [(x / gridSizeCiklus) - Math.floor(x / gridSizeCiklus), (y / gridSizeCiklus) - Math.ceil(y / gridSizeCiklus)];
                let jobbAlsoVektor = [(x / gridSizeCiklus) - Math.ceil(x / gridSizeCiklus), (y / gridSizeCiklus) - Math.ceil(y / gridSizeCiklus)];

                let konstansBalFelsoVektor = vektorok[Math.floor(y / gridSizeCiklus)%max][Math.floor(x / gridSizeCiklus)%max];
                let konstansJobbFelsoVektor = vektorok[Math.floor(y / gridSizeCiklus)%max][Math.ceil(x / gridSizeCiklus)%max];
                let konstansBalAlsoVektor = vektorok[Math.ceil(y / gridSizeCiklus)%max][Math.floor(x / gridSizeCiklus)%max];
                let konstansJobbAlsoVektor = vektorok[Math.ceil(y / gridSizeCiklus)%max][Math.ceil(x / gridSizeCiklus)%max];
                ertekek[y*max+x] += linearis_interpolacio(
                    linearis_interpolacio(skalar_szorzat(balFelsoVektor, konstansBalFelsoVektor), skalar_szorzat(jobbFelsoVektor, konstansJobbFelsoVektor), (x / gridSizeCiklus) - Math.floor(x / gridSizeCiklus)),
                    linearis_interpolacio(skalar_szorzat(balAlsoVektor, konstansBalAlsoVektor), skalar_szorzat(jobbAlsoVektor, konstansJobbAlsoVektor), (x / gridSizeCiklus) - Math.floor(x / gridSizeCiklus)),
                    (y / gridSizeCiklus) - Math.floor(y / gridSizeCiklus)
                ) * ciklusAmplitudum;
            }
        }

        osszAmplitudum += ciklusAmplitudum;
        ciklusAmplitudum /= erossegArany;
        frekvencia *= reszletessegArany;
        gridSizeCiklus = max / frekvencia;
    }
    for (let y = 0; y < max; y++) {
        for (let x = 0; x < max; x++) {
            ertekek[y*max+x] = ((ertekek[y*max+x] / osszAmplitudum) * zajMeret) + zajEltolas;
        }
    }
}
