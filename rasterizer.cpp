#include <emscripten/emscripten.h>
#include <cstdint>
#include <stdlib.h>
#include <stddef.h>

extern "C"
{
    static float *pontok = NULL;
    static int pontokMeret = 0;
    static int32_t *indexek = NULL;
    static int indexekMeret = 0;
    static float *perlin = NULL;
    static int perlinMeret = 0;
    int meret;

    void meretBeallit(int meretKert)
    {
        meret = meretKert;
    }

    int allocatePontok(int szamokSzama)
    {
        // ha létezik felszabadítjuk
        if (pontok)
        {
            free(pontok);
        }

        // Memória lefoglalása a listának
        pontok = (float *)malloc(szamokSzama * sizeof(float));
        if (pontok)
        {
            pontokMeret = szamokSzama;
            return (int)pontok;
        }
        return 0;
    }

    int allocateIndexek(int indexekSzam)
    {
        // ha létezik felszabadítjuk
        if (indexek)
        {
            free(indexek);
        }

        // Memória lefoglalása a listának
        indexek = (int32_t *)malloc(indexekSzam * sizeof(int32_t));
        if (indexek)
        {
            indexekMeret = indexekSzam;
            return (int)indexek;
        }
        return 0;
    }

    int allocatePerlin(int perlinek)
    {
        // ha létezik felszabadítjuk
        if (perlin)
        {
            free(perlin);
        }

        // Memória lefoglalása a listának
        perlin = (float *)malloc(perlinek * sizeof(float));
        if (perlin)
        {
            perlinMeret = perlinek;
            return (int)perlin;
        }
        return 0;
    }

    void pontokKiszamolasa(int szorzo)
    {
        int i;
        for (int y = 0; y < meret; y++)
        {
            for (int x = 0; x < meret; x++)
            {
                i = (y * meret + x);
                pontok[i * 3] = x;
                pontok[i * 3 + 1] = perlin[i] * szorzo;
                pontok[i * 3 + 2] = -y;
            }
        }
    }

    void osszekotesekKiszamolasa()
    {
        int i;
        for (int y = 0; y < meret - 1; y++)
        {
            for (int x = 0; x < meret - 1; x++)
            {
                i = y * meret + x;
                // A három indexnek a pontjait (pontok[index] pontot ad meg) összekötjük háromszögekre
                // A négyzet
                indexek[i * 6] = i + 1;         // jobb felső pontja
                indexek[i * 6 + 1] = i + meret; // bal alsó pontja
                indexek[i * 6 + 2] = i;         // bal felső pontja

                indexek[i * 6 + 3] = i + 1;         // jobb felső pontja
                indexek[i * 6 + 4] = i + meret + 1; // jobb alsó pontja
                indexek[i * 6 + 5] = i + meret;     // bal alsó pontja
                // a négyzetet felosztottuk két háromszögre
            }
        }
    }
}