// |------------------|
// | GLOBAL VARIABLES |
// |------------------|

let terrainEngine;
const canvasId = "canvas";
const meret = 256;

// |------------------------------|
// | MAIN LOOP AND INITIALIZATION |
// |------------------------------|

document.addEventListener("DOMContentLoaded", function () {
    if (Module.calledRun) {
        // If webassembly is ready initialize
        initModule();
    } else {
        // Else set a callback function
        Module.onRuntimeInitialized = initModule;
    }
});

function initModule() {
    // Initialize the terrainEngine
    terrainEngine = new Module.TerrainEngine(canvasId, meret);
    terrainEngine.setCanvasSize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", function () {
        terrainEngine.setCanvasSize(this.window.innerWidth, this.window.innerHeight);
    });
    mainLoop();
}

function mainLoop() {
    terrainEngine.render();
    requestAnimationFrame(mainLoop);
}