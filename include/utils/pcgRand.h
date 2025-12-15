#ifndef RANDOMNUMBER_H
#define RANDOMNUMBER_H

#include <cstdint>

class pcgRand
{
private:
    uint64_t state_;
    void LCG();
    uint32_t RR(uint32_t x, unsigned r);

public:
    pcgRand(uint32_t seed);
    uint32_t random();
    float randomFloat();
};
#endif