import type {Tickable} from "../game/Tickable";
import type {Hex} from "../layout/Hex";
import {Biome} from "../biomes/Biome";
import type {BiomeType} from "../data/types/BiomeType";
import {Player} from "../player/Player";

/**
 * This class handles all actions within a single hexagon. Coordinates are handled by the Hex (.hex) object.
 *
 * > Hexagon is the BESTAGON!  -- CGP Grey
 *
 * https://www.redblobgames.com/grids/hexagons/#coordinates
 */
export class Hexagon implements Tickable {
    private readonly _hex: Hex;
    private readonly _biome: Biome;

    // Currently unused
    private readonly _hasPlayer: boolean;
    private readonly _inCombat: boolean;
    private readonly _connectedBuildings: any[];
    private readonly _activeBy: Player[];
    private readonly _engagedBy: Player[];

    constructor(hex: Hex, biome: BiomeType) {
        this._hasPlayer = false;
        this._inCombat = false;
        this._connectedBuildings = [];
        this._activeBy = [];
        this._engagedBy = [];

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
    public get hasPlayer(): boolean {
        return this._hasPlayer
    }
    public get inCombat(): boolean {
        return this._inCombat
    }
    public get connectedBuildings(): any[] {
        return this._connectedBuildings
    }
    public get activeBy(): Player[] {
        return this._activeBy
    }
    public get engagedBy(): Player[] {
        return this._engagedBy
    }
}
