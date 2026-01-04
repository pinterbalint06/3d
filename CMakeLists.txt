cmake_minimum_required(VERSION 3.10)

project(3DRendererForWeb)

# move files to frontend/js off by default
option(COPYFILES "Move output files to frontend/js directory" OFF)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# headers
include_directories(BEFORE ${CMAKE_SOURCE_DIR}/include)

# 1. core files
file(GLOB_RECURSE ENGINE_CORE_FILES
    "src/core/*.cpp"
    "src/utils/*.cpp"
)

# emscripten flags
set(COMMON_WASM_FLAGS
    -lembind
    -sINITIAL_MEMORY=268435456
    -sALLOW_MEMORY_GROWTH
    -msimd128
    -sENVIRONMENT=["web"]
    -sEXPORTED_RUNTIME_METHODS=["HEAPU8"]
    -sMAX_WEBGL_VERSION=2
    -sMIN_WEBGL_VERSION=2
    --embed-file ${CMAKE_SOURCE_DIR}/resources/shaders@shaders
)

set(COMMON_WASM_COMPILATION
    -msimd128
)
# ---------------------------------------------------------
# optimized
# ---------------------------------------------------------
set(RELEASE_COMPILE_FLAGS -O3 -flto)

set(RELEASE_LINK_FLAGS -flto -sFULL_ES2)
# ---------------------------------------------------------
# debug
# ---------------------------------------------------------
# for debug js runs in frontend/js source location is two directories back fro m there
set(DEBUG_COMPILE_FLAGS -g -gsource-map "SHELL:-fdebug-prefix-map=${CMAKE_SOURCE_DIR}=../../")
set(DEBUG_LINK_FLAGS -g -gsource-map "SHELL:-fdebug-prefix-map=${CMAKE_SOURCE_DIR}=../../")

# ---------------------------------------------------------
# Test terrain
# ---------------------------------------------------------

# release
add_executable(testTerrainWASM ${ENGINE_CORE_FILES} src/testTerrain.cpp)
target_link_options(testTerrainWASM PUBLIC ${COMMON_WASM_FLAGS} ${RELEASE_LINK_FLAGS})
target_compile_options(testTerrainWASM PUBLIC ${RELEASE_COMPILE_FLAGS} ${COMMON_WASM_COMPILATION})

# debug
add_executable(testTerrainWASM_debug ${ENGINE_CORE_FILES} src/testTerrain.cpp)
target_link_options(testTerrainWASM_debug PUBLIC ${COMMON_WASM_FLAGS} ${DEBUG_LINK_FLAGS})
target_compile_options(testTerrainWASM_debug PUBLIC ${DEBUG_COMPILE_FLAGS} ${COMMON_WASM_COMPILATION})

# ---------------------------------------------------------
# Test equirectangular
# ---------------------------------------------------------

# release
add_executable(testEquirectangularWASM ${ENGINE_CORE_FILES} src/testEquirectangular.cpp)
target_link_options(testEquirectangularWASM PUBLIC ${COMMON_WASM_FLAGS} ${RELEASE_LINK_FLAGS})
target_compile_options(testEquirectangularWASM PUBLIC ${RELEASE_COMPILE_FLAGS} ${COMMON_WASM_COMPILATION})

# debug
add_executable(testEquirectangularWASM_debug ${ENGINE_CORE_FILES} src/testEquirectangular.cpp)
target_link_options(testEquirectangularWASM_debug PUBLIC ${COMMON_WASM_FLAGS} ${DEBUG_LINK_FLAGS})
target_compile_options(testEquirectangularWASM_debug PUBLIC ${DEBUG_COMPILE_FLAGS} ${COMMON_WASM_COMPILATION})

# ---------------------------------------------------------
# Test WebGL
# ---------------------------------------------------------

# release
add_executable(testWebGLWASM ${ENGINE_CORE_FILES} src/testWebGL.cpp)
target_link_options(testWebGLWASM PUBLIC ${COMMON_WASM_FLAGS} ${RELEASE_LINK_FLAGS})
target_compile_options(testWebGLWASM PUBLIC ${RELEASE_COMPILE_FLAGS} ${COMMON_WASM_COMPILATION})

# debug
add_executable(testWebGLWASM_debug ${ENGINE_CORE_FILES} src/testWebGL.cpp)
target_link_options(testWebGLWASM_debug PUBLIC ${COMMON_WASM_FLAGS} ${DEBUG_LINK_FLAGS})
target_compile_options(testWebGLWASM_debug PUBLIC ${DEBUG_COMPILE_FLAGS} ${COMMON_WASM_COMPILATION})


if (COPYFILES)
    # ---------------------------------------------------------
    # Test terrain
    # ---------------------------------------------------------

    #release
    add_custom_command(TARGET testTerrainWASM POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testTerrainWASM.js"
            "${CMAKE_SOURCE_DIR}/frontend/js/testTerrainWASM.js"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testTerrainWASM.wasm"
            "${CMAKE_SOURCE_DIR}/frontend/js/testTerrainWASM.wasm"

        COMMENT "Copy testTerrain to frontend/js/"
    )
    
    #debug
    add_custom_command(TARGET testTerrainWASM_debug POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testTerrainWASM_debug.js"
            "${CMAKE_SOURCE_DIR}/frontend/js/testTerrainWASM_debug.js"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testTerrainWASM_debug.wasm"
            "${CMAKE_SOURCE_DIR}/frontend/js/testTerrainWASM_debug.wasm"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testTerrainWASM_debug.wasm.map"
            "${CMAKE_SOURCE_DIR}/frontend/js/testTerrainWASM_debug.wasm.map"

        COMMENT "Copy testTerrain debug to frontend/js/"
    )
    
    # ---------------------------------------------------------
    # Test equirectangular
    # ---------------------------------------------------------

    #release
    add_custom_command(TARGET testEquirectangularWASM POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testEquirectangularWASM.js"
            "${CMAKE_SOURCE_DIR}/frontend/js/testEquirectangularWASM.js"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testEquirectangularWASM.wasm"
            "${CMAKE_SOURCE_DIR}/frontend/js/testEquirectangularWASM.wasm"

        COMMENT "Copy testEquirectangular debug to frontend/js/"
    )

    #debug
    add_custom_command(TARGET testEquirectangularWASM_debug POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testEquirectangularWASM_debug.js"
            "${CMAKE_SOURCE_DIR}/frontend/js/testEquirectangularWASM_debug.js"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testEquirectangularWASM_debug.wasm"
            "${CMAKE_SOURCE_DIR}/frontend/js/testEquirectangularWASM_debug.wasm"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testEquirectangularWASM_debug.wasm.map"
            "${CMAKE_SOURCE_DIR}/frontend/js/testEquirectangularWASM_debug.wasm.map"

        COMMENT "Copy testEquirectangular debug to frontend/js/"
    )
    
    # ---------------------------------------------------------
    # Test webGL
    # ---------------------------------------------------------

    #release
    add_custom_command(TARGET testWebGLWASM POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testWebGLWASM.js"
            "${CMAKE_SOURCE_DIR}/frontend/js/testWebGLWASM.js"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testWebGLWASM.wasm"
            "${CMAKE_SOURCE_DIR}/frontend/js/testWebGLWASM.wasm"

        COMMENT "Copy testWebGL debug to frontend/js/"
    )

    #debug
    add_custom_command(TARGET testWebGLWASM_debug POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testWebGLWASM_debug.js"
            "${CMAKE_SOURCE_DIR}/frontend/js/testWebGLWASM_debug.js"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testWebGLWASM_debug.wasm"
            "${CMAKE_SOURCE_DIR}/frontend/js/testWebGLWASM_debug.wasm"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/testWebGLWASM_debug.wasm.map"
            "${CMAKE_SOURCE_DIR}/frontend/js/testWebGLWASM_debug.wasm.map"

        COMMENT "Copy testWebGL debug to frontend/js/"
    )
endif()