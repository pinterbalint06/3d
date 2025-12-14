#ifndef SHADER_H
#define SHADER_H

#include "../utils/mathUtils.h"
class distantLight;

namespace Shaders
{
    enum SHADINGMODE
    {
        PHONG = 0,
        GOURAUD = 1,
        FLAT = 2
    };
    
    struct FlatShader
    {
        float r_, g_, b_;

        inline void setupTriangle(float *faceNormal, float *vertNormals, int32_t *indices, int i,
                                  float *lightVec, float rGround, float gGround, float bGround, distantLight *sun,
                                  float z0Rec, float z1Rec, float z2Rec)
        {
            float dotProd = std::max(0.0f, MathUtils::dotProduct3D(faceNormal, lightVec));
            r_ = rGround * sun->getRedCalculated() * dotProd;
            g_ = gGround * sun->getGreenCalculated() * dotProd;
            b_ = bGround * sun->getBlueCalculated() * dotProd;
        }

        inline void shadePixel(float lambda0, float lambda1, float lambda2,
                               float zDepth, float *imageAntiBuffer, int imageIndex)
        {
            imageAntiBuffer[imageIndex] = r_;
            imageAntiBuffer[imageIndex + 1] = g_;
            imageAntiBuffer[imageIndex + 2] = b_;
        }
    };

    struct GouraudShader
    {
        float r0_, g0_, b0_;
        float r1_, g1_, b1_;
        float r2_, g2_, b2_;
        float z0Rec_, z1Rec_, z2Rec_;

        inline void setupTriangle(float *faceNormal, float *vertNormals, int32_t *indices, int i,
                                  float *lightVec, float rGround, float gGround, float bGround, distantLight *sun,
                                  float z0Rec, float z1Rec, float z2Rec)
        {
            float dotProd0 = std::max(0.0f, MathUtils::dotProduct3D(&vertNormals[indices[i] * 3], lightVec));
            float dotProd1 = std::max(0.0f, MathUtils::dotProduct3D(&vertNormals[indices[i + 1] * 3], lightVec));
            float dotProd2 = std::max(0.0f, MathUtils::dotProduct3D(&vertNormals[indices[i + 2] * 3], lightVec));

            r0_ = rGround * sun->getRedCalculated() * dotProd0;
            g0_ = gGround * sun->getGreenCalculated() * dotProd0;
            b0_ = bGround * sun->getBlueCalculated() * dotProd0;

            r1_ = rGround * sun->getRedCalculated() * dotProd1;
            g1_ = gGround * sun->getGreenCalculated() * dotProd1;
            b1_ = bGround * sun->getBlueCalculated() * dotProd1;

            r2_ = rGround * sun->getRedCalculated() * dotProd2;
            g2_ = gGround * sun->getGreenCalculated() * dotProd2;
            b2_ = bGround * sun->getBlueCalculated() * dotProd2;

            z0Rec_ = z0Rec;
            z1Rec_ = z1Rec;
            z2Rec_ = z2Rec;
        }

        inline void shadePixel(float lambda0, float lambda1, float lambda2,
                               float zDepth, float *imageAntiBuffer, int imageIndex)
        {
            // perspective correct interpolation
            imageAntiBuffer[imageIndex] = (lambda0 * r0_ * z0Rec_ + lambda1 * r1_ * z1Rec_ + lambda2 * r2_ * z2Rec_) * zDepth;
            imageAntiBuffer[imageIndex + 1] = (lambda0 * g0_ * z0Rec_ + lambda1 * g1_ * z1Rec_ + lambda2 * g2_ * z2Rec_) * zDepth;
            imageAntiBuffer[imageIndex + 2] = (lambda0 * b0_ * z0Rec_ + lambda1 * b1_ * z1Rec_ + lambda2 * b2_ * z2Rec_) * zDepth;
        }
    };

    struct PhongShader
    {
        float n0x_, n0y_, n0z_;
        float n1x_, n1y_, n1z_;
        float n2x_, n2y_, n2z_;
        float z0Rec_, z1Rec_, z2Rec_;
        float lx_, ly_, lz_;
        float rGround_, gGround_, bGround_;
        distantLight *pSun_;

        inline void setupTriangle(float *faceNormal, float *vertNormals, int32_t *indices, int i,
                                  float *lightVec, float rGround, float gGround, float bGround, distantLight *sun,
                                  float z0Rec, float z1Rec, float z2Rec)
        {
            pSun_ = sun;
            float *n0 = &vertNormals[indices[i] * 3];
            float *n1 = &vertNormals[indices[i + 1] * 3];
            float *n2 = &vertNormals[indices[i + 2] * 3];

            n0x_ = n0[0];
            n0y_ = n0[1];
            n0z_ = n0[2];

            n1x_ = n1[0];
            n1y_ = n1[1];
            n1z_ = n1[2];

            n2x_ = n2[0];
            n2y_ = n2[1];
            n2z_ = n2[2];

            lx_ = lightVec[0];
            ly_ = lightVec[1];
            lz_ = lightVec[2];

            z0Rec_ = z0Rec;
            z1Rec_ = z1Rec;
            z2Rec_ = z2Rec;

            rGround_ = rGround;
            gGround_ = gGround;
            bGround_ = bGround;
        }

        inline void shadePixel(float lambda0, float lambda1, float lambda2,
                               float zDepth, float *imageAntiBuffer, int imageIndex)
        {
            // perspective correct interpolation
            float nx = (lambda0 * n0x_ * z0Rec_ + lambda1 * n1x_ * z1Rec_ + lambda2 * n2x_ * z2Rec_) * zDepth;
            float ny = (lambda0 * n0y_ * z0Rec_ + lambda1 * n1y_ * z1Rec_ + lambda2 * n2y_ * z2Rec_) * zDepth;
            float nz = (lambda0 * n0z_ * z0Rec_ + lambda1 * n1z_ * z1Rec_ + lambda2 * n2z_ * z2Rec_) * zDepth;
            float normalLengthInv = 1.0f / std::sqrt(nx * nx + ny * ny + nz * nz);
            nx *= normalLengthInv;
            ny *= normalLengthInv;
            nz *= normalLengthInv;

            float dotProd = std::max(0.0f, nx * lx_ + ny * ly_ + nz * lz_);

            imageAntiBuffer[imageIndex] = rGround_ * pSun_->getRedCalculated() * dotProd;
            imageAntiBuffer[imageIndex + 1] = gGround_ * pSun_->getGreenCalculated() * dotProd;
            imageAntiBuffer[imageIndex + 2] = bGround_ * pSun_->getBlueCalculated() * dotProd;
        }
    };
}

#endif