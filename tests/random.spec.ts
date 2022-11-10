import {Random} from "../src/util/Random";
import {assert} from "chai";
import {BiomeType} from "../src/biomes/BiomeType";
import type {BiomeData} from "../src/data/biomes";

describe("Random", function () {

    describe("functions", function () {
        it("Chance function should work correctly", function () {
            let counter = 0;
            for (let i = 0; i < 100; i++) {
                if(Random.chance(.1)) {
                    counter++;
                }
            }
            assert.isBelow(counter, 18);
            assert.isAbove(counter, 2);
            counter = 0;

            for (let i = 0; i < 20; i++) {
                if(Random.chance(.5)) {
                    counter++;
                }
            }
            assert.isBelow(counter, 15);
            assert.isAbove(counter, 5);
        });


        it("Random number inbetween numbers should be fair", function () {
            let min = 40;
            let max = 120;
            let average = (min+max)/2;
            let sum = 0;
            let set = new Set<number>();

            for (let i = 0; i < (average)*20; i++) {
                let num = Random.numberLH(min, max);
                sum += num;
                set.add(num);
            }
            let averageResult = sum/(average*20);

            let result = Array.from(set).sort((a, b) => {
                return a - b;
            });

            let expected = [];
            for (let i = min; i < max + 1; i++) {
                expected.push(i);
            }

            assert.isAbove((averageResult), ((min+max)/2) - 2)
            assert.isBelow((averageResult), ((min+max)/2) + 2)
            assert.isTrue(result.join(",") === expected.join(","));
        });
    });
});
