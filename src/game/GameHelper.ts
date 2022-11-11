import type {Game} from "./Game";
import {Hex} from "../Layout/Hex";

export class GameHelper {
    // @formatter:off
    static generateTinyGrid(game: Game) {
        game.generateBestagon(new Hex(0,  -1,  1));
        game.generateBestagon(new Hex(0,   1, -1));
        game.generateBestagon(new Hex(-1,  0,  1));
        game.generateBestagon(new Hex(1,   0, -1));
        game.generateBestagon(new Hex(-1,  1,  0));
        game.generateBestagon(new Hex(1,  -1,  0));
    }
    // @formatter:on

    // @formatter:off
    static giveAdjacentBestagonCoordinates(c: Hex): Hex[] {
        let adjacentCoordinates: Hex[] = [];
        adjacentCoordinates.push(new Hex(c.q,      c.s - 1,  c.r + 1));
        adjacentCoordinates.push(new Hex(c.q,      c.s + 1,  c.r - 1));
        adjacentCoordinates.push(new Hex(c.q - 1,  c.s,      c.r + 1));
        adjacentCoordinates.push(new Hex(c.q + 1,  c.s,      c.r - 1));
        adjacentCoordinates.push(new Hex(c.q - 1,  c.s + 1,  c.r    ));
        adjacentCoordinates.push(new Hex(c.q + 1,  c.s - 1,  c.r    ));
        return adjacentCoordinates;
    }
    // @formatter:on
}
