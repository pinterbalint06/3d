#include <emscripten/emscripten.h>
#include <cstdint>
#include <stdlib.h>
#include <stddef.h>

extern "C"
{
    static float *pontok = NULL;
    static int pontokMeret = 0;
    static float *indexek = NULL;
    static int indexekMeret = 0;
    static float *perlin = NULL;
    static int perlinMeret = 0;

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
        indexek = (float *)malloc(indexekSzam * sizeof(float));
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
}