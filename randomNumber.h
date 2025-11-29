#ifndef RANDOMNUMBER_H
#define RANDOMNUMBER_H

#include <cstdint>

class pcgRand
{
private:
    static uint64_t state;
    void LCG()
    {
        // Linear congruential generator
        // MMIX Donald Knuth's random parameters
        // a = 6364136223846793005=7^5, multiplier
        // c = 1442695040888963407, increment
        // m = 18446744073709552000=2^64, modulus. A uint64_t maximális száma 2^64-1, ha ezen túlmegy akkor visszaáll 0-ra így ez lányegében egy % 2^64.
        state = (6364136223846793005 * state + 1442695040888963407);
    }
    uint32_t RR(uint32_t x, unsigned r)
    {
        // (x >> r) eltoljuk k bittel jobbra az alap szamot (0101 >> 2 = 0010)
        // (x << (32 - k)) az elozo lepesnel jobbra "leesett" biteket eltolja bal vegere (0101 << 30 = 01 (0 30db))
        // majd ezt a ket szamot vagy muvelettel osszerakjuk
        // lenyegeben a jobbra "leesett" biteket "forgattuk at" a bal oldalara
        return x >> r | x << (32 - r);
    }

public:
    uint32_t random()
    {
        uint64_t x = state;
        unsigned count = (unsigned)(x >> 59);
        LCG();

        // xorshift
        // shift - >> 18n - jobb bit shiftelünk 18-al (18-al eltoljuk a bitet jobbra ami "túlmegy" azt elvetjük)
        // xor - ^ - az eredeti szam bitjein es az uj shiftelt szam bitjein xor (kizaro vagy) muveletet vegzunk
        x ^= x >> 18;
        // kivalasszuk a kozepso 32 bitet
        // eltoljuk 27bittel jobbra a jobb oldali gyenge minosegu random biteket így elvetjuk
        return RR((uint32_t)(x >> 27), count);
    }

    float randomFloat()
    {
        // 32 bites elojel nelkuli maximum erteke 2^32-1=4,294,967,295
        // (maximum ertek+1)-el osztjuk a random szamot igy mindig [0;1[ intervallumba esik
        // 32-bit unsigned max + 1
        return random() / 4294967296.0f;
    }

    void pcgRandInit(uint64_t seed)
    {
        state = seed;
        LCG();
    }
};
#endif