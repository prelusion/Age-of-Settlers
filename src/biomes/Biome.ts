import type {CollectableFields, CollectableNumberFields, IBiome} from "./IBiome";
import type {BiomeType} from "./BiomeType";
import type {CollectableType} from "../resources/ResourceType";
import type {Tickable} from "../game/Tickable";
import {Obj} from "../util/TypeHint";
import collectables from "../data/collectables";
import {BiomeHelper} from "../data/helper/BiomeHelper";
import biomes, {BiomeData} from "../data/biomes";

export class Biome implements IBiome, Tickable {
    collectables: CollectableFields;
    name: string;
    type: BiomeType;

    constructor(type: BiomeType) {
        this.type = type;

        this.name = this.biome.name;
        this.collectables = {}

        this.freshCollectables(type);
    }

    public tick(): void {
        // Todo: Decrease the collectables
    }

    private freshCollectables(type: BiomeType): void {
        this.collectables = {}

        let collectables = biomes[type].collectables;

        for (let coll of collectables) {
            if (BiomeHelper.shouldCollSpawn(coll)) {
                this.setCollectableQuantity(
                    coll.type,
                    0,
                    BiomeHelper.randomCollQuantity(coll)
                );
            }
        }
    }

    private setCollectableQuantity(type: CollectableType, resource: number, entity: number): void {
        this.collectables[type] = {
            quantity: {
                resource: resource,
                entity: entity
            }
        }
    }

    private get biome(): BiomeData {
        return biomes[this.type];
    }

    public get collectableTypes(): CollectableType[] {
        return Obj.keys(this.collectables);
    }

    public get CollectablesRecoveryRates(): CollectableNumberFields {
        let recoveryRates: CollectableNumberFields = {};

        for (let type of this.collectableTypes) {
            recoveryRates[type] = collectables[type].recoveryRate;
        }
        return recoveryRates;
    }

    public getCollectableModifier(type: CollectableType): number {
        return biomes[this.type].collectables[type].gatherModifier;
    }
}
