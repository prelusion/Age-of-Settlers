import {ProceduralType} from "../data/types/ProceduralType";
import type {ProceduralData} from "./procedural";
import Procedural from "./procedural";
import {BiomeType} from "../data/types/BiomeType";
import {BiomeHelper} from "../data/helper/BiomeHelper";
import type {World} from "../game/World";
import type {Hex} from "../layout/Hex";
import {Random} from "../util/Random";
import {Obj} from "../util/TypeHint";
import {dd} from "../util/dd";

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

    public getNewBiomeType(hex: Hex, world: World): BiomeType {
        switch (this.type) {
            case ProceduralType.RANDOM:
                return this.getRandomBiomeType();
            case ProceduralType.BIG_BIOME:
            case ProceduralType.SMALL_BIOME:
                return this.getBiomeType(hex, world);
            case ProceduralType.SINGLE_BIOME:
                return this.getSingleBiomeType(world);
            default:
                return this.getRandomBiomeType();
        }
    }

    private getRandomBiomeType(): BiomeType {
        return BiomeHelper.getRandomBiomeType();
    }

    private getBiomeType(hex: Hex, world: World): BiomeType {
        // todo blacklist neighbouringBiomes
        let neighbouringBiomes: BiomeType;
        // hex.neighbours().map(neighbour => neighbouringBiomes.push(neighbour.biomeType))

        let biomeTypes = Random.shuffle(Obj.valuesOnly(BiomeType));
        let biomeType = BiomeHelper.getRandomBiomeType();
        // for (let t of biomeTypes) {
        //     let biomeSize = world.getBiomeSize(hex)
        //     if (biomeSize > this.minBiomeSize && biomeSize < this.maxBiomeSize) {
        //         biomeType = t;
        //         break;
        //     }
        // }

        return biomeType;
    }

    private getSingleBiomeType(world: World): BiomeType {
        return world.getFirstOccupiedHexagon().biomeType;
    }
}
