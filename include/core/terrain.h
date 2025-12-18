#ifndef TERRAIN_H
#define TERRAIN_H

class Mesh;

class Terrain
{
private:
    float *perlinHeightMap_;
    int size_;
    float spacing_;
    // Perlin parameters
    float lacunarity_, persistence_, frequency_, heightMultiplier_;
    int octaves_, seed_;

    Mesh *mesh_ = nullptr;
    float *perlinValues_ = nullptr;

    void cleanup();
    void buildTerrain();

public:
    Terrain(int size);
    ~Terrain();

    void regenerate();

    // getters
    Mesh *getMesh() const { return mesh_; }
    int getSize() { return size_; }

    // setters
    void setLacunarity(float lacunarity) { lacunarity_ = lacunarity; }
    void setPersistence(float persistence) { persistence_ = persistence; }
    void setFrequency(float frequency) { frequency_ = frequency; }
    void setHeightMultiplier(float heightMultiplier) { heightMultiplier_ = heightMultiplier; }
    void setOctaves(int octaves) { octaves_ = octaves; }
    void setSeed(int seed) { seed_ = seed; }
    void setSize(int size);
    void setSpacing(float spacing);
};

#endif