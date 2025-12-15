cmake_minimum_required(VERSION 3.10)

project(TerrainGameEngine)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

include_directories(BEFORE ${CMAKE_SOURCE_DIR}/include)

file(GLOB_RECURSE SOURCE_FILES
    "src/*.cpp"
    "src/core/*.cpp"
    "src/utils/*.cpp"
)

# -------------------------
# optimized
# -------------------------

add_executable(release ${SOURCE_FILES})

target_link_options(release PUBLIC
    -lembind
    -sINITIAL_MEMORY=268435456
    -sALLOW_MEMORY_GROWTH
    -msimd128
    -sFILESYSTEM=0
    -sENVIRONMENT=["web"]
)

target_compile_options(release PUBLIC
    -O3
    -flto
)

set_target_properties(release PROPERTIES
    OUTPUT_NAME "engine"
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}"
)

# -------------------------
# debug
# -------------------------

add_executable(debug ${SOURCE_FILES})

target_link_options(debug PUBLIC
    -lembind
    -sINITIAL_MEMORY=268435456
    -sALLOW_MEMORY_GROWTH
    -msimd128
    -sIMPORTED_MEMORY=1
)

target_compile_options(debug PUBLIC
    -g
)

# Set the output file name for the debug build
set_target_properties(debug PROPERTIES
    OUTPUT_NAME "engine_debug"
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}"
)