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

file(GLOB_RECURSE TERRAIN_FILES
    "src/terrain/*.cpp"
)
file(GLOB_RECURSE EQUI_FILES
    "src/equirectangular/*.cpp"
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
add_executable(terrain ${ENGINE_CORE_FILES} ${TERRAIN_FILES} src/terrain/terrainBinding.cpp)
target_link_options(terrain PUBLIC ${COMMON_WASM_FLAGS} ${RELEASE_LINK_FLAGS})
target_compile_options(terrain PUBLIC ${RELEASE_COMPILE_FLAGS} ${COMMON_WASM_COMPILATION})

# debug
add_executable(terrain_debug ${ENGINE_CORE_FILES} ${TERRAIN_FILES} src/terrain/terrainBinding.cpp)
target_link_options(terrain_debug PUBLIC ${COMMON_WASM_FLAGS} ${DEBUG_LINK_FLAGS})
target_compile_options(terrain_debug PUBLIC ${DEBUG_COMPILE_FLAGS} ${COMMON_WASM_COMPILATION})

# ---------------------------------------------------------
# Test equirectangular
# ---------------------------------------------------------

# release
add_executable(equirectangular ${ENGINE_CORE_FILES} ${EQUI_FILES} src/equirectangular/equirectangularBinding.cpp)
target_link_options(equirectangular PUBLIC ${COMMON_WASM_FLAGS} ${RELEASE_LINK_FLAGS})
target_compile_options(equirectangular PUBLIC ${RELEASE_COMPILE_FLAGS} ${COMMON_WASM_COMPILATION})

# debug
add_executable(equirectangular_debug ${ENGINE_CORE_FILES} ${EQUI_FILES} src/equirectangular/equirectangularBinding.cpp)
target_link_options(equirectangular_debug PUBLIC ${COMMON_WASM_FLAGS} ${DEBUG_LINK_FLAGS})
target_compile_options(equirectangular_debug PUBLIC ${DEBUG_COMPILE_FLAGS} ${COMMON_WASM_COMPILATION})

if (COPYFILES)
    # ---------------------------------------------------------
    # Test terrain
    # ---------------------------------------------------------

    #release
    add_custom_command(TARGET terrain POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/terrain.js"
            "${CMAKE_SOURCE_DIR}/frontend/javascript/terrain.js"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/terrain.wasm"
            "${CMAKE_SOURCE_DIR}/frontend/javascript/terrain.wasm"

        COMMENT "Copy testTerrain to frontend/javascript/"
    )
    
    #debug
    add_custom_command(TARGET terrain_debug POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/terrain_debug.js"
            "${CMAKE_SOURCE_DIR}/frontend/javascript/terrain_debug.js"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/terrain_debug.wasm"
            "${CMAKE_SOURCE_DIR}/frontend/javascript/terrain_debug.wasm"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/terrain_debug.wasm.map"
            "${CMAKE_SOURCE_DIR}/frontend/javascript/terrain_debug.wasm.map"

        COMMENT "Copy testTerrain debug to frontend/javascript/"
    )
    
    # ---------------------------------------------------------
    # Test equirectangular
    # ---------------------------------------------------------

    #release
    add_custom_command(TARGET equirectangular POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/equirectangular.js"
            "${CMAKE_SOURCE_DIR}/frontend/javascript/equirectangular.js"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/equirectangular.wasm"
            "${CMAKE_SOURCE_DIR}/frontend/javascript/equirectangular.wasm"

        COMMENT "Copy testEquirectangular debug to frontend/javascript/"
    )

    #debug
    add_custom_command(TARGET equirectangular_debug POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/equirectangular_debug.js"
            "${CMAKE_SOURCE_DIR}/frontend/javascript/equirectangular_debug.js"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/equirectangular_debug.wasm"
            "${CMAKE_SOURCE_DIR}/frontend/javascript/equirectangular_debug.wasm"

        COMMAND ${CMAKE_COMMAND} -E copy_if_different 
            "${CMAKE_CURRENT_BINARY_DIR}/equirectangular_debug.wasm.map"
            "${CMAKE_SOURCE_DIR}/frontend/javascript/equirectangular_debug.wasm.map"

        COMMENT "Copy testEquirectangular debug to frontend/javascript/"
    )
endif()