import type {Player} from "../player/Player";
import type {Tickable} from "../game/Tickable";
import {Biome} from "../biomes/Biome";
import {BiomeHelper} from "../data/helper/BiomeHelper";
import type {Coordinates} from "../game/Game";

/**
 * https://www.redblobgames.com/grids/hexagons/#coordinates
 */

export class Bestagon implements Tickable {
    private hasPlayer: boolean;
    private inCombat: boolean;
    private coordinates: Coordinates;

    // Todo Add Building Type.
    private connectedBuildings: any[];
    private activeBy: Player[];
    private engagedBy: Player[];
    private biome: Biome;

    constructor(coords: Coordinates) {
        this.hasPlayer = false;
        this.inCombat = false;
        this.connectedBuildings = [];
        this.activeBy = [];
        this.engagedBy = [];
        this.coordinates = coords;

        this.biome = new Biome(BiomeHelper.getRandomBiomeType());
    }

    public tick(): void {
        // Todo: Handle active players taking resources from the biome

        this.biome.tick();
    }

    public get coords(): Coordinates {
        return this.coordinates;
    }
}
