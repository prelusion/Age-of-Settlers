import {ProceduralType} from "../data/types/ProceduralType";
import type {ProceduralData} from "../data/procedural";
import Procedural from "../data/procedural";
import {BiomeType} from "../data/types/BiomeType";
import {BiomeHelper} from "../data/helper/BiomeHelper";
import type {World} from "../game/World";
import type {Hex} from "../layout/Hex";
import {Random} from "../util/Random";

export class ProceduralGenerator implements ProceduralData {
    name: string;
    type: ProceduralType;
    maxBiomeSize: number;
    minBiomeSize: number;
    totalHeight: number;
    totalSize: number;
    totalWidth: number;

    constructor(type: ProceduralType) {
        this.name = Procedural[type].name;
        this.type = Procedural[type].type;
        this.maxBiomeSize = Procedural[type].maxBiomeSize;
        this.minBiomeSize = Procedural[type].minBiomeSize;
        this.totalHeight = Procedural[type].totalHeight;
        this.totalSize = Procedural[type].totalSize;
        this.totalWidth = Procedural[type].totalWidth;
    }

    public getBiome(hex: Hex, world: World): BiomeType {
        switch (this.type) {
            case ProceduralType.RANDOM:
                return this.getRandomBiome();
            case ProceduralType.BIG_BIOME:
            case ProceduralType.SMALL_BIOME:
                return this.getBetweenSizeBiome(hex, world);
            case ProceduralType.SINGLE_BIOME:
                return this.getSingleBiome(world);
            default:
                return this.getRandomBiome();
        }
    }

    private getRandomBiome(): BiomeType {
        return BiomeHelper.getRandomBiomeType();
    }

    private getBetweenSizeBiome(hex: Hex, world: World): BiomeType {
        let alreadyCheckBiomes: Hex[] = [];

        let types = Random.shuffle(Object.keys(BiomeType));
        console.log(types);
        let type = BiomeHelper.getRandomBiomeType();
        for (let t of types) {
            let biomeSize = world.checkBiomeSizeOfHex(hex, t as BiomeType, alreadyCheckBiomes)
            if (biomeSize > this.minBiomeSize && biomeSize < this.maxBiomeSize) {
                type = t;
                break;
            }
        }

        return type;

    }
    private getSingleBiome(world: World): BiomeType {
        return world.getAOccupiedHexagon().biome.type;
    }
}
