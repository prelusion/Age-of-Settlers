import {Canvas} from "./canvas/Canvas";
import {Game} from "./game/Game";
import {Layout, LAYOUT_POINTY} from "./layout/Layout";
import {Point} from "./layout/Point";
import {ImageFactory} from "./util/ImageFactory";
import {ProceduralType} from "./data/types/ProceduralType";
import type {World} from "./game/World";
import $ from "jquery";

export const canvas = new Canvas("canvas");

ImageFactory.singleton().initialize();
let worldRandom = Game.generateProceduralWorld(ProceduralType.BIG_BIOME);
let worldBigBiome = Game.generateProceduralWorld(ProceduralType.RANDOM);
let worldSmallBiome = Game.generateProceduralWorld(ProceduralType.SMALL_BIOME);
let worldSingleBiome = Game.generateProceduralWorld(ProceduralType.SINGLE_BIOME);

export let world: World = worldRandom;
export let debug: boolean = false;
export const selectedHexagon = $('#selected_hexagon');

main();
function main() {
    if (!canvas.getCtx()) {
        alert("This browser does not support the game!");
        return;
    }

    Layout.setLayout(LAYOUT_POINTY, new Point(50, 50), new Point(2500, 1500));
    drawWorld()
}

export function drawWorld() {
    canvas.clearCanvas();
    let counter = 0;
    for (let hexagon of world.allOccupiedHexagons) {
        canvas.drawHex(hexagon, world.getBiomeFromHex(hexagon), counter++, debug);
    }
}


/**
 * Side/top bar interactions
 */
$("#debug").get()[0].addEventListener("click", (e) => {selectedHexagon.hide(); debugMode($("#debug").get()[0]); drawWorld()})
$("#map_random").get()[0].addEventListener("click", () => {world = worldRandom; selectedProcedure($("#map_random").get()[0]); drawWorld()})
$("#map_small_biome").get()[0].addEventListener("click", () => {world = worldSmallBiome; selectedProcedure($("#map_small_biome").get()[0]); drawWorld()})
$("#map_big_biome").get()[0].addEventListener("click", () => {world = worldBigBiome; selectedProcedure($("#map_big_biome").get()[0]); drawWorld()})
$("#map_single_biome").get()[0].addEventListener("click", () => {world = worldSingleBiome; selectedProcedure($("#map_single_biome").get()[0]); drawWorld()})
function debugMode(selectedElement: HTMLElement) {
    debug = !debug;
    if(debug) {
        $(selectedElement).addClass("debug-selected");
    } else {
        $(selectedElement).remove("debug-selected");
    }
}
function selectedProcedure(selectedElement: HTMLElement) {
    $(".selected-procedure").map((i, ele) => {
        $(ele).removeClass("selected-procedure");
    })
    $(selectedElement).addClass("selected-procedure");
}


