#include <emscripten/emscripten.h>
#include "utils/clipping.h"
#include "utils/mathUtils.h"
#include <algorithm>

namespace
{
    // w - x >= 0 Right plane
    // w + x >= 0 Left plane
    // w - y >= 0 Top plane
    // w + y >= 0 Bottom plane
    // w - z >= 0 Far plane
    // z >= 0 Near plane
    enum PlaneID
    {
        RIGHT_PLANE = 0,
        LEFT_PLANE = 1,
        TOP_PLANE = 2,
        BOTTOM_PLANE = 3,
        FAR_PLANE = 4,
        NEAR_PLANE = 5
    };

    // Cohen-Sutherland algorithm like outcodes
    const int INSIDE = 0b000000;
    const int LEFT = 0b0001;
    const int RIGHT = 0b0010;
    const int BOTTOM = 0b0100;
    const int TOP = 0b1000;
    const int NEAR = 0b10000;
    const int FAR = 0b100000;

    // Cohen-Sutherland like outcode calculation
    inline int computeOutCode(const float *p)
    {
        int code = INSIDE;
        // Is it outside
        // if yes set that bit to 1
        if ((p[3] - p[0]) < 0)
        {
            code |= RIGHT; // w - x < 0
        }
        if ((p[3] + p[0]) < 0)
        {
            code |= LEFT; // w + x < 0
        }
        if ((p[3] - p[1]) < 0)
        {
            code |= TOP; // w - y < 0
        }
        if ((p[3] + p[1]) < 0)
        {
            code |= BOTTOM; // w + y < 0
        }
        if ((p[3] - p[2]) < 0)
        {
            code |= FAR; // w - z < 0
        }
        if ((p[2]) < 0)
        {
            code |= NEAR; // z < 0
        }
        return code;
    }

    template <int P>
    inline float calculateDistance(const float *p)
    {
        float dist = 0.0f;

        if constexpr (P == RIGHT_PLANE)
            dist = p[3] - p[0]; /// w - x >= 0 Right plane
        else if constexpr (P == LEFT_PLANE)
            dist = p[3] + p[0]; /// w + x >= 0 Left plane
        else if constexpr (P == TOP_PLANE)
            dist = p[3] - p[1]; /// w - y >= 0 Top plane
        else if constexpr (P == BOTTOM_PLANE)
            dist = p[3] + p[1]; /// w + y >= 0 Bottom plane
        else if constexpr (P == FAR_PLANE)
            dist = p[3] - p[2]; /// w - z >= 0 Far plane
        else if constexpr (P == NEAR_PLANE)
            dist = p[2]; /// z >= 0 Near plane

        return dist;
    }

    template <int P>
    int clipAgainstSinglePlane(float *input, int inputSize, float *output)
    {
        int resultSize = 0;

        float *curr = input;                 /// current vertex
        float *prev = input + inputSize - 4; /// last vertex

        float prevDist = calculateDistance<P>(prev);

        for (int i = 0; i < inputSize; i += 4)
        {
            float dist = calculateDistance<P>(curr);

            if (dist >= 0)
            {
                if (prevDist < 0)
                {
                    // calculate intersection
                    float dDistance = prevDist * (1.0f / (prevDist - dist));
                    output[resultSize++] = MathUtils::interpolation(prev[0], curr[0], dDistance);
                    output[resultSize++] = MathUtils::interpolation(prev[1], curr[1], dDistance);
                    output[resultSize++] = MathUtils::interpolation(prev[2], curr[2], dDistance);
                    output[resultSize++] = MathUtils::interpolation(prev[3], curr[3], dDistance);
                }
                output[resultSize++] = curr[0];
                output[resultSize++] = curr[1];
                output[resultSize++] = curr[2];
                output[resultSize++] = curr[3];
            }
            else
            {
                if (prevDist >= 0)
                {
                    // calculate intersection
                    float dDistance = prevDist * (1.0f / (prevDist - dist));
                    output[resultSize++] = MathUtils::interpolation(prev[0], curr[0], dDistance);
                    output[resultSize++] = MathUtils::interpolation(prev[1], curr[1], dDistance);
                    output[resultSize++] = MathUtils::interpolation(prev[2], curr[2], dDistance);
                    output[resultSize++] = MathUtils::interpolation(prev[3], curr[3], dDistance);
                }
            }
            prev = curr;
            curr += 4;
            prevDist = dist;
        }
        return resultSize;
    }
}

Clipper::Clipper()
{
    clipped_ = (float *)calloc(36, sizeof(float));
    input_ = (float *)calloc(36, sizeof(float));
    clippedSize_ = 0;
    inputSize_ = 0;
}

Clipper::~Clipper()
{
    free(clipped_);
    free(input_);
}

void Clipper::SutherlandHodgman(const float *pont0, const float *pont1, const float *pont2)
{
    for (int i = 0; i < 4; i++)
    {
        clipped_[i] = pont0[i];
        clipped_[i + 4] = pont1[i];
        clipped_[i + 8] = pont2[i];
    }
    clippedSize_ = 12;
    std::swap(input_, clipped_);
    inputSize_ = clippedSize_;
    clippedSize_ = clipAgainstSinglePlane<RIGHT_PLANE>(input_, inputSize_, clipped_);
    if (clippedSize_ != 0)
    {
        std::swap(input_, clipped_);
        inputSize_ = clippedSize_;
        clippedSize_ = clipAgainstSinglePlane<LEFT_PLANE>(input_, inputSize_, clipped_);
        if (clippedSize_ != 0)
        {
            std::swap(input_, clipped_);
            inputSize_ = clippedSize_;
            clippedSize_ = clipAgainstSinglePlane<TOP_PLANE>(input_, inputSize_, clipped_);
            if (clippedSize_ != 0)
            {
                std::swap(input_, clipped_);
                inputSize_ = clippedSize_;
                clippedSize_ = clipAgainstSinglePlane<BOTTOM_PLANE>(input_, inputSize_, clipped_);
                if (clippedSize_ != 0)
                {
                    std::swap(input_, clipped_);
                    inputSize_ = clippedSize_;
                    clippedSize_ = clipAgainstSinglePlane<FAR_PLANE>(input_, inputSize_, clipped_);
                    if (clippedSize_ != 0)
                    {
                        std::swap(input_, clipped_);
                        inputSize_ = clippedSize_;
                        clippedSize_ = clipAgainstSinglePlane<NEAR_PLANE>(input_, inputSize_, clipped_);
                    }
                }
            }
        }
    }
}

void Clipper::clip(const float *pont0, const float *pont1, const float *pont2)
{
    int code0 = computeOutCode(pont0);
    int code1 = computeOutCode(pont1);
    int code2 = computeOutCode(pont2);

    // if code0 & code1 & code2 is true then all of their bits are 1 that means all of the vertices are outside
    // -> trivial reject
    if (code0 & code1 & code2)
    {
        clippedSize_ = 0;
        return;
    }
    else
    {
        // if code0 | code1 | code2 is 0 then all off their bits are 0 that means no vertice was outside
        // -> trivial accept
        if (code0 | code1 | code2 == 0)
        {
            for (int i = 0; i < 4; i++)
            {
                clipped_[i] = pont0[i];
                clipped_[i + 4] = pont1[i];
                clipped_[i + 8] = pont2[i];
            }
            clippedSize_ = 12;
        }
        else
        {
            // there were vertices inside and vertices outside the triangle has to be clipped
            SutherlandHodgman(pont0, pont1, pont2);
        }
    }
}