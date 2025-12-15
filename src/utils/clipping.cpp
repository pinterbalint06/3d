#include <emscripten/emscripten.h>
#include "utils/clipping.h"
#include "utils/mathUtils.h"

// w - x >= 0 Right plane
// w + x >= 0 Left plane
// w - y >= 0 Top plane
// w + y >= 0 Bottom plane
// w - z >= 0 Far plane
// z >= 0 Near plane

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

void Clipper::clip(float *pont0, float *pont1, float *pont2)
{
    for (int i = 0; i < 4; i++)
    {
        clipped_[i] = pont0[i];
        clipped_[i + 4] = pont1[i];
        clipped_[i + 8] = pont2[i];
    }
    clippedSize_ = 12;
    int k = 0;
    while (k < 6 && clippedSize_ > 0)
    {
        float *temp;
        inputSize_ = clippedSize_;
        temp = input_;
        input_ = clipped_;
        clipped_ = temp;
        clippedSize_ = clipAgainstSinglePlane(input_, clipped_, k);
        k++;
    }
}

int Clipper::clipAgainstSinglePlane(float *input, float *result, int planeInd)
{
    int resultSize = 0;
    for (int i = 0; i < inputSize_; i += 4)
    {
        int prevInd = (i - 4 + inputSize_) % inputSize_;
        float distance, prevDistance;
        switch (planeInd)
        {
        case 0:
            distance = input[i + 3] - input[i];                 // w - x
            prevDistance = input[prevInd + 3] - input[prevInd]; // w - x
            break;
        case 1:
            distance = input[i + 3] + input[i];                 // w + x
            prevDistance = input[prevInd + 3] + input[prevInd]; // w + x
            break;
        case 2:
            distance = input[i + 3] - input[i + 1];                 // w - y
            prevDistance = input[prevInd + 3] - input[prevInd + 1]; // w - y
            break;
        case 3:
            distance = input[i + 3] + input[i + 1];                 // w + y
            prevDistance = input[prevInd + 3] + input[prevInd + 1]; // w + y
            break;
        case 4:
            distance = input[i + 3] - input[i + 2];                 // w - z
            prevDistance = input[prevInd + 3] - input[prevInd + 2]; // w - z
            break;
        case 5:
            distance = input[i + 2];           // z
            prevDistance = input[prevInd + 2]; // z
            break;
        default:
            distance = input[i + 3] - input[i];                 // w - x
            prevDistance = input[prevInd + 3] - input[prevInd]; // w - x
            break;
        }
        if (distance >= 0)
        {
            if (prevDistance < 0)
            {
                // calculate intersection
                float dDistance = prevDistance / (prevDistance - distance);
                result[resultSize++] = MathUtils::interpolation(input[prevInd], input[i], dDistance);
                result[resultSize++] = MathUtils::interpolation(input[prevInd + 1], input[i + 1], dDistance);
                result[resultSize++] = MathUtils::interpolation(input[prevInd + 2], input[i + 2], dDistance);
                result[resultSize++] = MathUtils::interpolation(input[prevInd + 3], input[i + 3], dDistance);
            }
            result[resultSize++] = input[i];
            result[resultSize++] = input[i + 1];
            result[resultSize++] = input[i + 2];
            result[resultSize++] = input[i + 3];
        }
        else
        {
            if (prevDistance >= 0)
            {
                // calculate intersection
                float dDistance = prevDistance / (prevDistance - distance);
                result[resultSize++] = MathUtils::interpolation(input[prevInd], input[i], dDistance);
                result[resultSize++] = MathUtils::interpolation(input[prevInd + 1], input[i + 1], dDistance);
                result[resultSize++] = MathUtils::interpolation(input[prevInd + 2], input[i + 2], dDistance);
                result[resultSize++] = MathUtils::interpolation(input[prevInd + 3], input[i + 3], dDistance);
            }
        }
    }
    return resultSize;
}