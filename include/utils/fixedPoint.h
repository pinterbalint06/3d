#ifndef FIXED_POINT_H
#define FIXED_POINT_H
#define FIX_BITS 10
#define FIX_ONE (1 << FIX_BITS)
#define FIX64 (1 << (FIX_BITS * 2))

#include <cstdint>

namespace FixedPoint
{
    inline int32_t Float2Fix(float num)
    {
        return (int32_t)((num)*FIX_ONE);
    }

    inline int32_t Int2Fix(int num)
    {
        return (int32_t)((num)*FIX_ONE);
    }
}

#endif