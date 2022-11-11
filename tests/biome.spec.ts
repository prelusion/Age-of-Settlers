import {Biome} from "../src/biomes/Biome";
import {BiomeType} from "../src/biomes/BiomeType";
import {assert} from "chai";
import {CollectableType} from "../src/resources/ResourceType";
import {BiomeHelper} from "../src/data/helper/BiomeHelper";
import biomes from "../src/data/biomes";

describe("Biome", function () {

    describe("Forest Generation", function () {
        let biome: Biome;

        before(async function () {
            biome = new Biome(BiomeType.FOREST);
        });

        it("Name of the biome should be Forest", function () {
            assert.equal("Forest", biome.name);
        });

        it("Forest biome should contain OakWood", function () {
            assert.exists(biome.collectables[CollectableType.OAKWOOD])
        });

        it("Forest biome should have generated all CollectableTypes after 100times the spawnRate chance ", function () {
            let collectableTypes = BiomeHelper.getCollectablesOfBiomeType(biome.type);
            let collectedTypes = new Set();

            let a = 0;
            for (let type in collectableTypes) {
                for (let i = 100; BiomeHelper.getSpawnChanceOfType(biome.type, type) * 99 < i; i--) {
                    if (BiomeHelper.shouldCollSpawn(biomes[biome.type].collectables[type])) {
                        collectedTypes.add(CollectableType[collectableTypes[type]]);
                    }
                }
            }


            assert.isTrue(collectedTypes.has("OAKWOOD"));
            assert.isTrue(collectedTypes.has("BEAR"));
            assert.isTrue(collectedTypes.has("HEMP"));
        });
    });
});
