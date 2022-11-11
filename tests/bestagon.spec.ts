import {assert} from "chai";
import {World} from "../src/game/World";
import {Hex} from "../src/layout/Hex";

describe("Game", function () {
    describe("Bestagons", function () {
        let game: World;

        before(async function () {
            game = new World();
            game.generateHexagon(new Hex(1, 0, -1));
            game.generateHexagon(new Hex(2, 0, -2));
            game.generateHexagon(new Hex(2, 1, -3));
        });

        it("After occupying bestagon get correct adjacent available bestagons back", function () {
            assert.isTrue(game.allAvailableHex.has(new Hex(1, -1, 0).toString()));
            assert.isTrue(game.allAvailableHex.has(new Hex(2, -1, -1).toString()));
            assert.isTrue(game.allAvailableHex.has(new Hex(3, -1, -2).toString()));
            assert.isTrue(game.allAvailableHex.has(new Hex(3, 0, -3).toString()));
            assert.isTrue(game.allAvailableHex.has(new Hex(3, 1, -4).toString()));
            assert.isTrue(game.allAvailableHex.has(new Hex(2, 2, -4).toString()));
            assert.isTrue(game.allAvailableHex.has(new Hex(1, 2, -3).toString()));
            assert.isTrue(game.allAvailableHex.has(new Hex(1, 1, -2).toString()));
            assert.isTrue(game.allAvailableHex.has(new Hex(0, 1, -1).toString()));
            assert.isTrue(game.allAvailableHex.has(new Hex(-1, 1, 0).toString()));
            assert.isTrue(game.allAvailableHex.has(new Hex(-1, 0, 1).toString()));
            assert.isTrue(game.allAvailableHex.has(new Hex(0, -1, 1).toString()));
            assert.isFalse(game.allAvailableHex.has(new Hex(0, 0, 0).toString()));
            assert.isFalse(game.allAvailableHex.has(new Hex(-2, 2, 0).toString()));
        });

        it("After generating bestagons, those coordinates are occupied", function () {
            assert.isTrue(game.allOccupiedHex.has(new Hex(0, 0, 0).toString()));
            assert.isTrue(game.allOccupiedHex.has(new Hex(1, 0, -1).toString()));
            assert.isTrue(game.allOccupiedHex.has(new Hex(2, 0, -2).toString()));
            assert.isTrue(game.allOccupiedHex.has(new Hex(2, 1, -3).toString()));
            assert.isFalse(game.allOccupiedHex.has(new Hex(3, 0, -3).toString()));
            assert.isFalse(game.allOccupiedHex.has(new Hex(3, 1, -4).toString()));
            assert.isFalse(game.allOccupiedHex.has(new Hex(2, 2, -4).toString()));
        });

        it("Can't generate hexagon on occupiedCoordinates with", function () {
            assert.isTrue(game.hexTaken(new Hex(0, 0, 0)));
            assert.isTrue(game.hexTaken(new Hex(1, 0, -1)));
            assert.isTrue(game.hexTaken(new Hex(2, 0, -2)));
            assert.isFalse(game.hexTaken(new Hex(1, 2, -3)));
            assert.isFalse(game.hexTaken(new Hex(1, 1, -2)));
            assert.isFalse(game.hexTaken(new Hex(0, 1, -1)));
        });
    });
});
