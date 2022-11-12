import {Canvas} from "./util/Canvas";
import {World} from "./game/World";
import {Game} from "./game/Game";
import {Layout, LAYOUT_FLAT, LAYOUT_POINTY} from "./layout/Layout";
import {Point} from "./layout/Point";
import {ImageFactory} from "./util/ImageFactory";
import {ProceduralType} from "./data/types/ProceduralType";
import {BiomeType} from "./data/types/BiomeType";
import {BiomeHelper} from "./data/helper/BiomeHelper";

const imageFactory = new ImageFactory();
const canvas = new Canvas("canvas");
const map_random = new Canvas("map_random");
const map_small_biome = new Canvas("map_small_biome");
const map_big_biome = new Canvas("map_big_biome");
const map_single_biome = new Canvas("map_single_biome");
// const game = new World();

main();

function main() {
    if (!canvas.getCtx()) {
        alert("This browser does not support the game!");
        return;
    }

    Layout.setLayout(LAYOUT_POINTY, new Point(50, 50), new Point(2500, 2500));
    canvas.setCanvasColor(200, 0, 100);

    /** canvas */
    let world = Game.generateProceduralWorld(ProceduralType.BIG_BIOME);

    for (let hexagon of world.allOccupiedHexagons) {
        canvas.drawHex(hexagon, world.getBiomeFromHex(hexagon));
    }



    /** map_random */
    world = Game.generateProceduralWorld(ProceduralType.RANDOM);

    for (let hexagon of world.allOccupiedHexagons) {
        map_random.drawHex(hexagon, world.getBiomeFromHex(hexagon));
    }



    /** map_small_biome */
    world = Game.generateProceduralWorld(ProceduralType.SMALL_BIOME);

    for (let hexagon of world.allOccupiedHexagons) {
        map_small_biome.drawHex(hexagon, world.getBiomeFromHex(hexagon));
    }



    /** map_big_biome */
    world = Game.generateProceduralWorld(ProceduralType.BIG_BIOME);

    for (let hexagon of world.allOccupiedHexagons) {
        map_big_biome.drawHex(hexagon, world.getBiomeFromHex(hexagon));
    }



    /** map_single_biome */
    world = Game.generateProceduralWorld(ProceduralType.SINGLE_BIOME);

    for (let hexagon of world.allOccupiedHexagons) {
        map_single_biome.drawHex(hexagon, world.getBiomeFromHex(hexagon));
    }
}
