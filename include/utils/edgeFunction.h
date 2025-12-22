#ifndef EDGE_FUNCTION_H
#define EDGE_FUNCTION_H

#include <cstdint>
#include "utils/fixedPoint.h"

namespace EdgeFunction
{
    struct EdgeFunction
    {
        Vertex *triangle_;
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
        int64_t stepTileX0, stepTileY0, stepTileX1, stepTileY1, stepTileX2, stepTileY2;

        inline int64_t edgeFunction(int32_t X, int32_t Y, int32_t dX, int32_t dY, int32_t x, int32_t y)
        {
            return ((int64_t)(x - X) * dY - (int64_t)(y - Y) * dX);
        }

        inline void setupEdgeFunctionTriArea(Vertex *triangle)
        {
            triangle_ = triangle;
            // Convert triangle vertices to fixed point integer (only x and y are needed for triangle area)
            v0x_ = FixedPoint::Float2Fix(triangle_[0].x);
            v0y_ = FixedPoint::Float2Fix(triangle_[0].y);
            v1x_ = FixedPoint::Float2Fix(triangle_[1].x);
            v1y_ = FixedPoint::Float2Fix(triangle_[1].y);
            v2x_ = FixedPoint::Float2Fix(triangle_[2].x);
            v2y_ = FixedPoint::Float2Fix(triangle_[2].y);

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

        inline void setupStepValues(int bbminx, int bbminy, int32_t inc, int32_t sqrAntialiasRec, int tileSize)
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

            stepTileX0 = stepRightOnePixel0_ * tileSize;
            stepTileY0 = stepDownOnePixel0_ * tileSize;
            stepTileX1 = stepRightOnePixel1_ * tileSize;
            stepTileY1 = stepDownOnePixel1_ * tileSize;
            stepTileX2 = stepRightOnePixel2_ * tileSize;
            stepTileY2 = stepDownOnePixel2_ * tileSize;

            w0Row_ = w0_;
            w1Row_ = w1_;
            w2Row_ = w2_;
        }

        inline void setTileStart(int tx, int ty, int32_t inc)
        {
            int32_t startX = FixedPoint::Int2Fix(tx) + inc;
            int32_t startY = FixedPoint::Int2Fix(ty) + inc;

            w0Row_ = edgeFunction(v1x_, v1y_, dX0_, dY0_, startX, startY);
            w1Row_ = edgeFunction(v2x_, v2y_, dX1_, dY1_, startX, startY);
            w2Row_ = edgeFunction(v0x_, v0y_, dX2_, dY2_, startX, startY);
        }

        inline void calculateTileCorners(int tx, int ty, int64_t corners[3][4])
        {
            // Top-Left (tx, ty)
            corners[0][0] = edgeFunction(v1x_, v1y_, dX0_, dY0_, FixedPoint::Int2Fix(tx), FixedPoint::Int2Fix(ty));
            corners[1][0] = edgeFunction(v2x_, v2y_, dX1_, dY1_, FixedPoint::Int2Fix(tx), FixedPoint::Int2Fix(ty));
            corners[2][0] = edgeFunction(v0x_, v0y_, dX2_, dY2_, FixedPoint::Int2Fix(tx), FixedPoint::Int2Fix(ty));
            // first edge
            corners[0][1] = corners[0][0] + stepTileX0;
            corners[0][2] = corners[0][0] + stepTileY0;
            corners[0][3] = corners[0][2] + stepTileX0;
            // second edge
            corners[1][1] = corners[1][0] + stepTileX1;
            corners[1][2] = corners[1][0] + stepTileY1;
            corners[1][3] = corners[1][2] + stepTileX1;
            // third edge
            corners[2][1] = corners[2][0] + stepTileX2;
            corners[2][2] = corners[2][0] + stepTileY2;
            corners[2][3] = corners[2][2] + stepTileX2;
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
            // the sign bit is one if the number is negative
            // if all three number is positive all of their sign bit is zero so in an OR operator the result's sign bit is also 0 and positive
            // if any of  the number is negative (their sign bit is 1) then the result's sign bit will also be 1 and will be negative
            return (w0Sub_ | w1Sub_ | w2Sub_) >= 0;
        }
    };
}

#endif
