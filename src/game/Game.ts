import {World} from "./World";
import {Hex} from "../layout/Hex";
import type {ProceduralType} from "../data/types/ProceduralType";
import {ProceduralGenerator} from "../procedural/ProceduralGenerator";
import * as Util from "util";

export class Game {
    public static generateProceduralWorld(type: ProceduralType): World {
        console.log("Generating the world through the following procedural generation " + type)
        const world = new World();
        let worldGenerator = new ProceduralGenerator(type);
        let counter = 0;
        while (counter < worldGenerator.totalSize) {
            let test = false;

            let hex = world.getRandomAvailableHex();
            console.log(hex);
            if (hex === undefined) {
                break;
            }

            if(!this.isBorder(hex, worldGenerator)) {
                test = true;
            } else {
                world.blacklistHexagon(hex);
            }

            if (test) {
                counter++;
                let biome = worldGenerator.getBiome(hex, world);
                world.generateHexagon(hex, biome);
            }
        }

        return world;
    }


    public static isBorder(hex: Hex, p: ProceduralGenerator): boolean {
        if (
            Math.abs(hex.q) === Math.ceil(p.totalHeight/2) ||
            Math.abs(hex.s) === Math.floor(p.totalWidth/2)
        ) {
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
        game.generateHexagon(new Hex(0,  -1,  1));
        game.generateHexagon(new Hex(0,   1, -1));
        game.generateHexagon(new Hex(-1,  0,  1));
        game.generateHexagon(new Hex(1,   0, -1));
        game.generateHexagon(new Hex(-1,  1,  0));
        game.generateHexagon(new Hex(1,  -1,  0));
        // @formatter:on
    }

    public static giveAdjacentHexs(h: Hex): Hex[] {
        let adjacentCoordinates: Hex[] = [];
        // @formatter:off
        adjacentCoordinates.push(new Hex(h.q,      h.s - 1,  h.r + 1));
        adjacentCoordinates.push(new Hex(h.q,      h.s + 1,  h.r - 1));
        adjacentCoordinates.push(new Hex(h.q - 1,  h.s,      h.r + 1));
        adjacentCoordinates.push(new Hex(h.q + 1,  h.s,      h.r - 1));
        adjacentCoordinates.push(new Hex(h.q - 1,  h.s + 1,  h.r    ));
        adjacentCoordinates.push(new Hex(h.q + 1,  h.s - 1,  h.r    ));
        // @formatter:on
        return adjacentCoordinates;
    }

}
