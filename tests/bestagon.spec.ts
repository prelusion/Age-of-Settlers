import {assert} from "chai";
import {Game} from "../src/game/Game";

describe("Game", function () {
    describe("Bestagons", function () {
        let game: Game;

        before(async function () {
            game = new Game();
            game.generateBestagon({x: 1, y: 0, z: -1});
            game.generateBestagon({x: 2, y: 0, z: -2});
            game.generateBestagon({x: 2, y: 1, z: -3});
        });

        it("After occupying bestagon get correct adjacent available bestagons back", function () {
            assert.isTrue(game.availableCoordinates.has(JSON.stringify({x: 1, y: -1, z: 0})));
            assert.isTrue(game.availableCoordinates.has(JSON.stringify({x: 2, y: -1, z: -1})));
            assert.isTrue(game.availableCoordinates.has(JSON.stringify({x: 3, y: -1, z: -2})));
            assert.isTrue(game.availableCoordinates.has(JSON.stringify({x: 3, y: 0, z: -3})));
            assert.isTrue(game.availableCoordinates.has(JSON.stringify({x: 3, y: 1, z: -4})));
            assert.isTrue(game.availableCoordinates.has(JSON.stringify({x: 2, y: 2, z: -4})));
            assert.isTrue(game.availableCoordinates.has(JSON.stringify({x: 1, y: 2, z: -3})));
            assert.isTrue(game.availableCoordinates.has(JSON.stringify({x: 1, y: 1, z: -2})));
            assert.isTrue(game.availableCoordinates.has(JSON.stringify({x: 0, y: 1, z: -1})));
            assert.isTrue(game.availableCoordinates.has(JSON.stringify({x: -1, y: 1, z: 0})));
            assert.isTrue(game.availableCoordinates.has(JSON.stringify({x: -1, y: 0, z: 1})));
            assert.isTrue(game.availableCoordinates.has(JSON.stringify({x: 0, y: -1, z: 1})));
            assert.isFalse(game.availableCoordinates.has(JSON.stringify({x: 0, y: 0, z: 0})));
            assert.isFalse(game.availableCoordinates.has(JSON.stringify({x: -2, y: 2, z: 0})));
        });

        it("After generating bestagons, those coordinates are occupied", function () {
            assert.isTrue(game.occupiedCoordinates.has(JSON.stringify({x: 0, y: 0, z: 0})));
            assert.isTrue(game.occupiedCoordinates.has(JSON.stringify({x: 1, y: 0, z: -1})));
            assert.isTrue(game.occupiedCoordinates.has(JSON.stringify({x: 2, y: 0, z: -2})));
            assert.isTrue(game.occupiedCoordinates.has(JSON.stringify({x: 2, y: 1, z: -3})));
            assert.isFalse(game.occupiedCoordinates.has(JSON.stringify({x: 3, y: 0, z: -3})));
            assert.isFalse(game.occupiedCoordinates.has(JSON.stringify({x: 3, y: 1, z: -4})));
            assert.isFalse(game.occupiedCoordinates.has(JSON.stringify({x: 2, y: 2, z: -4})));
        });

        it("Can't generate hexagon on occupiedCoordinates with", function () {

            assert.isTrue(game.coordinatesTaken({x: 0, y: 0, z: 0}));
            assert.isTrue(game.coordinatesTaken({x: 1, y: 0, z: -1}));
            assert.isTrue(game.coordinatesTaken({x: 2, y: 0, z: -2}));
            assert.isFalse(game.coordinatesTaken({x: 1, y: 2, z: -3}));
            assert.isFalse(game.coordinatesTaken({x: 1, y: 1, z: -2}));
            assert.isFalse(game.coordinatesTaken({x: 0, y: 1, z: -1}));
        });
    });
});
