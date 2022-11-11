import {Bestagon} from "../bestagon/Bestagon";
import {GameHelper} from "./GameHelper";
import {Hex} from "../Layout/Hex";

export interface BestagonData {
    bestagon: Bestagon,
}

export class Game {
    private map: BestagonData[];

    /**
     * This set is a Coordinates object. This is done to simply use the
     * Set features to check chosen bestagon locations if they're allowed to contain a new bestagon.
     */
    private readonly availableBestagons: Set<string>;
    private readonly occupiedBestagons: Set<string>;

    constructor() {
        this.map = [];

        let initial = Hex.Zero();

        this.availableBestagons = new Set([initial.toString()]);
        this.occupiedBestagons = new Set([initial.toString()]);

        this.generateBestagon(initial);
    }

    generateBestagon(hex: Hex) {
        if(this.coordinatesTaken(hex)) {
            return;
        }

        if(!this.bestagonConnected(hex)) {
            return;
        }

        this.map.push({
            bestagon: new Bestagon(hex),
        });
        this.blacklistBestagon(hex);
        this.whitelistBestagons(hex);
    }

    get bestagonCount() {
        return this.map.length;
    }

    get availableCoordinates() {
        return this.availableBestagons
    }

    get occupiedCoordinates() {
        return this.occupiedBestagons
    }

    validCoordinates(hex: Hex): boolean {
        return hex.q + hex.s + hex.r === 0;
    }

    blacklistBestagon(hex: Hex) {
        this.occupiedBestagons.add(hex.toString());
        this.availableBestagons.delete(hex.toString());
    }

    coordinatesTaken(hex: Hex): boolean {
        return this.map.some(b => b.bestagon.coords.equals(hex));
    }

    whitelistBestagons(hex: Hex) {
        let adjacentHexes = GameHelper.giveAdjacentBestagonCoordinates(hex);
        for (let adjacentHex of adjacentHexes) {
            let hexStr = adjacentHex.toString();
            if(!this.occupiedBestagons.has(hexStr)) {
                this.availableBestagons.add(hexStr);
            }
        }
    }

    bestagonConnected(hex: Hex): boolean {
        return this.availableBestagons.has(hex.toString());
    }
}
