import {HexState, World} from "./World";
import {Hex} from "../layout/Hex";
import type {ProceduralType} from "../data/types/ProceduralType";
import {ProceduralGenerator} from "../procedural/ProceduralGenerator";
import {dd} from "../util/dd";
import {Biome} from "../biomes/Biome";
import {BiomeType} from "../data/types/BiomeType";

export class Game {
    public static generateProceduralWorld(type: ProceduralType): World {
        console.log("Generating the world through the following procedural generation " + type)

        const world = new World();
        let worldGenerator = new ProceduralGenerator(type);

        while (world.hexagonCount < worldGenerator.totalSize) {
            world.generateBiome(worldGenerator);
        }
        world.fillAllAdjacentTiles(BiomeType.WATER);
        world.fillAllAdjacentTiles(BiomeType.WATER);
        world.fillAllAdjacentTiles(BiomeType.WATER);

        return world;
    }

    /**
     * for testing purposes only.
     * @param game
     */
    public static generateTinyGrid(game: World) {
        // @formatter:off
        game.generateHexagon(new Hex(0,1,-1));
        game.generateHexagon(new Hex(0,-1,1));
        game.generateHexagon(new Hex(-1,1,0));
        game.generateHexagon(new Hex(1,-1,0));
        game.generateHexagon(new Hex(-1,0,1));
        game.generateHexagon(new Hex(1,0,-1));
        // @formatter:on
    }

    public static giveAdjacentHexs(h: Hex): Hex[] {
        let adjacentCoordinates: Hex[] = [];
        // @formatter:off
        adjacentCoordinates.push(new Hex(h.q,h.r + 1,h.s - 1));
        adjacentCoordinates.push(new Hex(h.q,h.r - 1,h.s + 1));
        adjacentCoordinates.push(new Hex(h.q - 1,h.r + 1,h.s));
        adjacentCoordinates.push(new Hex(h.q + 1,h.r - 1,h.s));
        adjacentCoordinates.push(new Hex(h.q - 1,h.r,h.s + 1));
        adjacentCoordinates.push(new Hex(h.q + 1,h.r,h.s - 1));
        // @formatter:on
        return adjacentCoordinates;
    }

}
