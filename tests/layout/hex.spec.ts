import {Hex} from "../../src/layout/Hex";
import {assert} from "chai";

describe("Hex", function () {
    describe("Neighbours", function () {
        it("Hex.neighbours are all surrounding tiles", function () {
            let hex = new Hex(0, -2, 2).neighbours();

            assert.isTrue(new Hex(+1, -2, +1).equals(hex[0]));
            assert.isTrue(new Hex(+1, -3, +2).equals(hex[1]));
            assert.isTrue(new Hex( 0, -3, +3).equals(hex[2]));
            assert.isTrue(new Hex(-1, -2, +3).equals(hex[3]));
            assert.isTrue(new Hex(-1, -1, +2).equals(hex[4]));
            assert.isTrue(new Hex( 0, -1, +1).equals(hex[5]));
        });
    });
});
