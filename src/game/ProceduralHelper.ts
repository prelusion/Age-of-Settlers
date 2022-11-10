import {BiomeType} from "../biomes/BiomeType";
import biomes from "../data/biomes";
import {BiomeHelper} from "../data/helper/BiomeHelper";
import {Obj} from "../util/TypeHint";
import {Random} from "../util/Random";

export class ProceduralHelper {

    public static getProceduralBiome() {
        let allBiomeTypes = biomes;
        console.log(allBiomeTypes);
    }
}
