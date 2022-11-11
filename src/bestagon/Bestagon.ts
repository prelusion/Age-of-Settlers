import type {Player} from "../player/Player";
import type {Tickable} from "../game/Tickable";
import type {Hex} from "../Layout/Hex";
import {Biome} from "../biomes/Biome";
import {BiomeHelper} from "../data/helper/BiomeHelper";

/**
 * https://www.redblobgames.com/grids/hexagons/#coordinates
 */
export class Bestagon implements Tickable {
    private hasPlayer: boolean;
    private inCombat: boolean;
    private readonly _hex: Hex;

    // Todo Add Building Type.
    private connectedBuildings: any[];
    private activeBy: Player[];
    private engagedBy: Player[];
    private biome: Biome;

    constructor(hex: Hex) {
        this.hasPlayer = false;
        this.inCombat = false;
        this.connectedBuildings = [];
        this.activeBy = [];
        this.engagedBy = [];
        this._hex = hex;

        this.biome = new Biome(BiomeHelper.getRandomBiomeType());
    }

    public tick(): void {
        // Todo: Handle active players taking resources from the biome

        this.biome.tick();
    }

    public get hex(): Hex {
        return this._hex;
    }
}
