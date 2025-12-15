# Lokalizációs készségfejlesztő alkalmazás
## Buildelés

### 1. Követelmények

- **CMake** (minimum 3.10-es verzió (https://cmake.org/download/))
- **Emscripten** SDK (https://emscripten.org/docs/getting_started/downloads.html)

### 2. Lépések

1.  **Build könyvtár létrehozása:**
    Hozzon létre egy build nevű könyvtárat

    ```bash
    mkdir build
    cd build/
    ```

2.  **A build konfigurálása**
    Futtassa a "emcmake cmake"-et a build könyvtárból a projekt konfigurálásához.

    ```bash
    emcmake cmake ..
    ```

3.  **Buildelés**
    A konfigurálás után futtassa a build parancsot.

    ##### A. **Release** build
    A Release build teljesetmínyre optimalizált.
    ```bash
    cmake --build . --target release
    ```
    ##### B. **Debug** build
    A Debug buildben egyszerűbb megtalálni a hibákat.
    ```bash
    cmake --build . --target debug
    ```
    ##### C. **Mindkettő** buildelése
    Mindkét verzót buildeli.
    ```bash
    cmake --build .
    ```
