import {assert} from "chai";
import {Game} from "../src/game/Game";
import {Hex} from "../src/Layout/Hex";

describe("Game", function () {
    describe("Bestagons", function () {
        let game: Game;

        before(async function () {
            game = new Game();
            game.generateBestagon(new Hex(1, 0, -1));
            game.generateBestagon(new Hex(2, 0, -2));
            game.generateBestagon(new Hex(2, 1, -3));
        });

        it("After occupying bestagon get correct adjacent available bestagons back", function () {
            assert.isTrue(game.availableCoordinates.has(new Hex(1, -1, 0).toString()));
            assert.isTrue(game.availableCoordinates.has(new Hex(2, -1, -1).toString()));
            assert.isTrue(game.availableCoordinates.has(new Hex(3, -1, -2).toString()));
            assert.isTrue(game.availableCoordinates.has(new Hex(3, 0, -3).toString()));
            assert.isTrue(game.availableCoordinates.has(new Hex(3, 1, -4).toString()));
            assert.isTrue(game.availableCoordinates.has(new Hex(2, 2, -4).toString()));
            assert.isTrue(game.availableCoordinates.has(new Hex(1, 2, -3).toString()));
            assert.isTrue(game.availableCoordinates.has(new Hex(1, 1, -2).toString()));
            assert.isTrue(game.availableCoordinates.has(new Hex(0, 1, -1).toString()));
            assert.isTrue(game.availableCoordinates.has(new Hex(-1, 1, 0).toString()));
            assert.isTrue(game.availableCoordinates.has(new Hex(-1, 0, 1).toString()));
            assert.isTrue(game.availableCoordinates.has(new Hex(0, -1, 1).toString()));
            assert.isFalse(game.availableCoordinates.has(new Hex(0, 0, 0).toString()));
            assert.isFalse(game.availableCoordinates.has(new Hex(-2, 2, 0).toString()));
        });

        it("After generating bestagons, those coordinates are occupied", function () {
            assert.isTrue(game.occupiedCoordinates.has(new Hex(0, 0, 0).toString()));
            assert.isTrue(game.occupiedCoordinates.has(new Hex(1, 0, -1).toString()));
            assert.isTrue(game.occupiedCoordinates.has(new Hex(2, 0, -2).toString()));
            assert.isTrue(game.occupiedCoordinates.has(new Hex(2, 1, -3).toString()));
            assert.isFalse(game.occupiedCoordinates.has(new Hex(3, 0, -3).toString()));
            assert.isFalse(game.occupiedCoordinates.has(new Hex(3, 1, -4).toString()));
            assert.isFalse(game.occupiedCoordinates.has(new Hex(2, 2, -4).toString()));
        });

        it("Can't generate hexagon on occupiedCoordinates with", function () {
            assert.isTrue(game.coordinatesTaken(new Hex(0, 0, 0)));
            assert.isTrue(game.coordinatesTaken(new Hex(1, 0, -1)));
            assert.isTrue(game.coordinatesTaken(new Hex(2, 0, -2)));
            assert.isFalse(game.coordinatesTaken(new Hex(1, 2, -3)));
            assert.isFalse(game.coordinatesTaken(new Hex(1, 1, -2)));
            assert.isFalse(game.coordinatesTaken(new Hex(0, 1, -1)));
        });
    });
});
