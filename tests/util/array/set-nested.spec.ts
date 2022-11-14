import {assert} from "chai";
import {nestedArraySet} from "../../../src/util/Array";

describe("Array Functions", function () {
    describe("Function: arraySetNested(...)", function () {
        let array: number[][][];

        before(() => {
            array = [];
        });

        it("should set values as expected", function () {
            let expected: number[][][] = [];
            expected[0] = [];
            expected[0][1] = [];
            expected[0][1][1] = 4;
            expected[0][2] = [];
            expected[0][2][4] = 7;

            nestedArraySet(array, [0, 1, 1], 4);
            nestedArraySet(array, [0, 2, 4], 7);
            assert.deepEqual(array, expected);

            // Use filter to remove all falsy entries (like <empty slot>)
            assert.lengthOf(array.filter(e => e), 1);
            assert.lengthOf(array[0].filter(e => e), 2);
            assert.lengthOf(array[0][1].filter(e => e), 1);
            assert.lengthOf(array[0][2].filter(e => e), 1);
            assert.equal(array[0][1][1], 4);
            assert.equal(array[0][2][4], 7);
        });

        it("should overwrite existing property", function () { // fix 2022-11-12
            nestedArraySet(array, [0, 1, 1], 3);
            assert.equal(array[0][1][1], 3);

            nestedArraySet(array, [0, 1, 1], 4);
            assert.equal(array[0][1][1], 4);
        });
    });
});
