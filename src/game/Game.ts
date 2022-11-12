import {HexState, World} from "./World";
import {Hex} from "../layout/Hex";
import type {ProceduralType} from "../data/types/ProceduralType";
import {ProceduralGenerator} from "../procedural/ProceduralGenerator";

export class Game {
    public static generateProceduralWorld(type: ProceduralType): World {
        console.log("Generating the world through the following procedural generation " + type)

        const world = new World();
        let worldGenerator = new ProceduralGenerator(type);

        while (world.hexagonCount < worldGenerator.totalSize) {
            let hex = world.getRandomHex(HexState.ADJACENT);
            if (hex === undefined) {
                break;
            }

            if (Game.isBorder(hex, worldGenerator)) {
                world.setHexState(hex, HexState.OCCUPIED)
                continue;
            }

            let biome = worldGenerator.getBiome(hex, world);
            world.generateHexagon(hex, biome);
        }

        return world;
    }

    public static isBorder(hex: Hex, p: ProceduralGenerator): boolean {
        if (Hex.distanceFromZeroW(hex) > p.totalWidth / 2 || Hex.distanceFromZeroH(hex) > p.totalHeight / 2) {
            return true;
        }
        return false;
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
