import type {Player} from "../player/Player";
import type {Tickable} from "../game/Tickable";
import type {Hex} from "../layout/Hex";
import {Biome} from "../biomes/Biome";
import {BiomeHelper} from "../data/helper/BiomeHelper";
import type {BiomeType} from "../data/types/BiomeType";

/**
 * https://www.redblobgames.com/grids/hexagons/#coordinates
 */
export class Hexagon implements Tickable {
    private hasPlayer: boolean;
    private inCombat: boolean;
    private readonly _hex: Hex;

    // Todo Add Building Type.
    private connectedBuildings: any[];
    private activeBy: Player[];
    private engagedBy: Player[];
    private readonly _biome: Biome;

    constructor(hex: Hex, biome: BiomeType) {
        this.hasPlayer = false;
        this.inCombat = false;
        this.connectedBuildings = [];
        this.activeBy = [];
        this.engagedBy = [];
        this._hex = hex;

        this._biome = new Biome(biome);
    }

    public tick(): void {
        // Todo: Handle active players taking resources from the biome

        this.biome.tick();
    }

    public get hex(): Hex {
        return this._hex;
    }

    public get biome(): Biome {
        return this._biome;
    }
}
