import type {Coordinates, Game} from "./Game";

export class GameHelper {
    static generateTinyGrid(game: Game) {
        game.generateBestagon({x: 0, y: -1, z: 1});
        game.generateBestagon({x: 0, y: 1, z: -1});
        game.generateBestagon({x: -1, y: 0, z: 1});
        game.generateBestagon({x: 1, y: 0, z: -1});
        game.generateBestagon({x: -1, y: 1, z: 0});
        game.generateBestagon({x: 1, y: -1, z: 0});
    }

    static giveAdjacentBestagonCoordinates(c: {x: number, y: number, z: number}): Coordinates[] {
        let adjacentCoordinates: Coordinates[] = [];
        adjacentCoordinates.push({x: c.x,      y: c.y - 1,  z: c.z + 1});
        adjacentCoordinates.push({x: c.x,      y: c.y + 1,  z: c.z - 1});
        adjacentCoordinates.push({x: c.x - 1,  y: c.y,      z: c.z + 1});
        adjacentCoordinates.push({x: c.x + 1,  y: c.y,      z: c.z - 1});
        adjacentCoordinates.push({x: c.x - 1,  y: c.y + 1,  z: c.z    });
        adjacentCoordinates.push({x: c.x + 1,  y: c.y - 1,  z: c.z    });
        return adjacentCoordinates;
    }
}
