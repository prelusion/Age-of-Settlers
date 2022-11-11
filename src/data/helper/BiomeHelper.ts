import type {BiomeDataCollectables} from "../biomes";
import biomes from "../biomes";
import {Random} from "../../util/Random";
import type {CollectableType} from "../../resources/ResourceType";
import type {BiomeType} from "../../biomes/BiomeType";
import {Obj} from "../../util/TypeHint";

export class BiomeHelper {
    public static shouldCollSpawn(coll: BiomeDataCollectables): boolean {
        return Random.chance(coll.spawnChance);
    }

    public static randomCollQuantity(coll: BiomeDataCollectables): number {
        return Random.numberLH(...coll.quantity);
    }

    // Todo, adjust still to be given gatherrate with gatherModifier.
    public static modifyGatherRate(coll: BiomeDataCollectables): number {
        return coll.gatherModifier;
    }

    public static getCollectablesOfBiomeType(type: BiomeType): CollectableType[] {
        return biomes[type].collectables.map(c => c.type);
    }

    public static getSpawnChanceOfType(type: BiomeType, collIndex: any) {
        return biomes[type].collectables[collIndex].spawnChance;
    }

    public static getRandomBiomeType(): BiomeType {
        return biomes[Random.number(Obj.keys(biomes).length - 1) as BiomeType].type;
    }
}
