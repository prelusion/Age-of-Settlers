import {HexState, World} from "../src/game/World";
import {Hex} from "../src/layout/Hex";
import {assert} from "chai";

describe("Game", function () {
    describe("Bestagons", function () {
        let world: World;

        before(() => {
            world = new World(); // Generates Hex(0,0,0)
            world.generateHexagon(new Hex(1, -1, 0));
            world.generateHexagon(new Hex(2, -2, 0));
            world.generateHexagon(new Hex(2, -3, 1));
        });

        it("After occupying bestagon get correct adjacent available bestagons back", function () {
            assert.lengthOf(world.hexStateFlattened(HexState.ADJACENT), 12);
            assert.lengthOf(world.hexStateFlattened(HexState.OCCUPIED), 4);

            // Test all adjacent (12) tiles
            assert.isTrue(world.isAdjacent(new Hex(1, 0, -1)));
            assert.isTrue(world.isAdjacent(new Hex(2, -1, -1)));
            assert.isTrue(world.isAdjacent(new Hex(3, -2, -1)));
            assert.isTrue(world.isAdjacent(new Hex(3, -3, 0)));
            assert.isTrue(world.isAdjacent(new Hex(3, -4, 1)));
            assert.isTrue(world.isAdjacent(new Hex(2, -4, 2)));
            assert.isTrue(world.isAdjacent(new Hex(1, -3, 2)));
            assert.isTrue(world.isAdjacent(new Hex(1, -2, 1)));
            assert.isTrue(world.isAdjacent(new Hex(0, -1, 1)));
            assert.isTrue(world.isAdjacent(new Hex(-1, 0, 1)));
            assert.isTrue(world.isAdjacent(new Hex(-1, 1, 0)));
            assert.isTrue(world.isAdjacent(new Hex(0, 1, -1)));

            // Check if the tile is occupied
            assert.isFalse(world.isAdjacent(new Hex(0, 0, 0)));
            assert.isTrue(world.isOccupied(new Hex(0, 0, 0)));

            assert.isFalse(world.isAdjacent(new Hex(-2, 0, 2)));
            assert.isFalse(world.isOccupied(new Hex(-2, 0, 2)));
        });
    });
});
