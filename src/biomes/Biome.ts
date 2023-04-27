import type {CollectableFields, CollectableNumberFields, IBiome} from "./IBiome";
import type {CollectableType} from "../data/types/ResourceType";
import type {Tickable} from "../game/Tickable";
import {Obj} from "../util/TypeHint";
import collectables from "../data/collectables";
import {BiomeHelper} from "../data/helper/BiomeHelper";
import biomes, {BiomeData} from "../data/biomes";
import type {BiomeType} from "../data/types/BiomeType";
import {Hexagon} from "../hexagon/Hexagon";
import {Hex} from "../layout/Hex";

export class Biome implements IBiome, Tickable {
    collectables: CollectableFields;
    name: string;
    type: BiomeType;
    private _tiles: Hexagon[]

    constructor(type: BiomeType) {
        this.type = type;

        this.name = this.biome.name;
        this.collectables = {}
        this._tiles = [];

        this.freshCollectables(type);
    }

    public tick(): void {
        // Todo: Decrease the collectables
        this._tiles.map(tile => tile.tick())
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

    public addTile(hex: Hex) {
        this._tiles.push(new Hexagon(hex, this.type));
    }

    public get tiles(): Hexagon[] {
        return this._tiles;
    }

    public set tiles(value: Hexagon[]) {
        this._tiles = value;
    }

    public getCollectableModifier(type: CollectableType): number {
        return biomes[this.type].collectables[type].gatherModifier;
    }

    public size(): number {
        return this._tiles.length;
    }
}
