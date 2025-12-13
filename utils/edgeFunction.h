#ifndef EDGE_FUNCTION_H
#define EDGE_FUNCTION_H

#include <cstdint>
#include "fixedPoint.h"

namespace EdgeFunction
{
    struct EdgeFunction
    {
        float *triangle_;
        float triArea_;
        float dX0_, dY0_;
        float dX1_, dY1_;
        float dX2_, dY2_;
        int32_t v0x_, v0y_;
        int32_t v1x_, v1y_;
        int32_t v2x_, v2y_;
        int64_t w0_, w1_, w2_;
        int64_t w0Row_, w1Row_, w2Row_;
        int64_t w0Col_, w1Col_, w2Col_;
        int64_t w0SubRow_, w1SubRow_, w2SubRow_;
        int64_t w0Sub_, w1Sub_, w2Sub_;
        int64_t stepRightOnePixel0_, stepRightOnePixel1_, stepRightOnePixel2_;
        int64_t stepDownOnePixel0_, stepDownOnePixel1_, stepDownOnePixel2_;
        int64_t stepRightOneSubPixel0_, stepRightOneSubPixel1_, stepRightOneSubPixel2_;
        int64_t stepDownOneSubPixel0_, stepDownOneSubPixel1_, stepDownOneSubPixel2_;

        inline int64_t edgeFunction(int32_t X, int32_t Y, int32_t dX, int32_t dY, int32_t x, int32_t y)
        {
            return ((int64_t)(x - X) * dY - (int64_t)(y - Y) * dX);
        }

        inline void setupEdgeFunctionTriArea(float *triangle)
        {
            triangle_ = triangle;
            // Convert triangle vertices to fixed point integer (only x and y are needed for triangle area)
            v0x_ = FixedPoint::Float2Fix(triangle_[0]);
            v0y_ = FixedPoint::Float2Fix(triangle_[1]);
            v1x_ = FixedPoint::Float2Fix(triangle_[3]);
            v1y_ = FixedPoint::Float2Fix(triangle_[4]);
            v2x_ = FixedPoint::Float2Fix(triangle_[6]);
            v2y_ = FixedPoint::Float2Fix(triangle_[7]);

            // calculate parameters of edge function
            dX0_ = v2x_ - v1x_;
            dY0_ = v2y_ - v1y_;

            dX1_ = v0x_ - v2x_;
            dY1_ = v0y_ - v2y_;

            dX2_ = v1x_ - v0x_;
            dY2_ = v1y_ - v0y_;

            // gives back area * 2 but w0, w1, w2 is also * 2 so it will cancel out
            triArea_ = edgeFunction(
                v0x_, v0y_,
                dX2_,
                dY2_,
                v2x_, v2y_);
        }

        inline void setupStepValues(int bbminx, int bbminy, int32_t inc, int32_t sqrAntialiasRec)
        {
            // first pixel's center
            int32_t startX = FixedPoint::Int2Fix(bbminx) + inc;
            int32_t startY = FixedPoint::Int2Fix(bbminy) + inc;

            // Edge functions
            w0_ = edgeFunction(v1x_, v1y_, dX0_, dY0_, startX, startY);
            w1_ = edgeFunction(v2x_, v2y_, dX1_, dY1_, startX, startY);
            w2_ = edgeFunction(v0x_, v0y_, dX2_, dY2_, startX, startY);

            // E(x+ 1,y) = E(x,y) + dY
            // dY Q21.10 so * FIX_ONE dY becomes Q42.20
            stepRightOnePixel0_ = (int64_t)dY0_ * FIX_ONE;
            stepRightOnePixel1_ = (int64_t)dY1_ * FIX_ONE;
            stepRightOnePixel2_ = (int64_t)dY2_ * FIX_ONE;

            // E(x,y+ 1) = E(x,y) −dX
            // dX Q21.10 so * FIX_ONE dX becomes Q42.20
            stepDownOnePixel0_ = (int64_t)(-dX0_) * FIX_ONE;
            stepDownOnePixel1_ = (int64_t)(-dX1_) * FIX_ONE;
            stepDownOnePixel2_ = (int64_t)(-dX2_) * FIX_ONE;

            // step right by the subpixel's width
            // step one pixel * small pixel width
            // Q42.20 * Q21.10 would be Q32.30 so we have to >> FIX_BITS
            stepRightOneSubPixel0_ = (stepRightOnePixel0_ * sqrAntialiasRec) >> FIX_BITS;
            stepRightOneSubPixel1_ = (stepRightOnePixel1_ * sqrAntialiasRec) >> FIX_BITS;
            stepRightOneSubPixel2_ = (stepRightOnePixel2_ * sqrAntialiasRec) >> FIX_BITS;

            // step down by the subpixel's height
            // step one pixel * small pixel height
            // Q42.20 * Q21.10 would be Q32.30 so we have to >> FIX_BITS
            stepDownOneSubPixel0_ = (stepDownOnePixel0_ * sqrAntialiasRec) >> FIX_BITS;
            stepDownOneSubPixel1_ = (stepDownOnePixel1_ * sqrAntialiasRec) >> FIX_BITS;
            stepDownOneSubPixel2_ = (stepDownOnePixel2_ * sqrAntialiasRec) >> FIX_BITS;

            w0Row_ = w0_;
            w1Row_ = w1_;
            w2Row_ = w2_;
        }

        inline void backToRowStart()
        {
            w0Col_ = w0Row_;
            w1Col_ = w1Row_;
            w2Col_ = w2Row_;
        }

        inline void backToColStart()
        {
            w0SubRow_ = w0Col_;
            w1SubRow_ = w1Col_;
            w2SubRow_ = w2Col_;
        }

        inline void backToSubRowStart()
        {
            w0Sub_ = w0SubRow_;
            w1Sub_ = w1SubRow_;
            w2Sub_ = w2SubRow_;
        }

        inline void oneSubColRight()
        {
            // step one subpixel to the right
            w0Sub_ += stepRightOneSubPixel0_;
            w1Sub_ += stepRightOneSubPixel1_;
            w2Sub_ += stepRightOneSubPixel2_;
        }

        inline void oneSubRowDown()
        {
            // step down one subpixel
            w0SubRow_ += stepDownOneSubPixel0_;
            w1SubRow_ += stepDownOneSubPixel1_;
            w2SubRow_ += stepDownOneSubPixel2_;
        }

        inline void oneColRight()
        {
            // step one pixel to the right
            w0Col_ += stepRightOnePixel0_;
            w1Col_ += stepRightOnePixel1_;
            w2Col_ += stepRightOnePixel2_;
        }

        inline void oneRowDown()
        {
            // step down one pixel
            w0Row_ += stepDownOnePixel0_;
            w1Row_ += stepDownOnePixel1_;
            w2Row_ += stepDownOnePixel2_;
        }

        inline bool isInside()
        {
            return (w0Sub_ | w1Sub_ | w2Sub_) >= 0;
        }
    };
}

#endif
