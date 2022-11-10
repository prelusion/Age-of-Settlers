import {Bestagon} from "../bestagon/Bestagon";
import {GameHelper} from "./GameHelper";

export interface BestagonData {
    bestagon: Bestagon,
}

export interface Coordinates {
    x: number;
    y: number;
    z: number;
}

export class Game {
    private map: BestagonData[];
    /**
     * This set is a JSON.stringified Coordinates object. This is done to simply use the
     * Set features to check chosen bestagon locations if they're allowed to contain a new bestagon.
     */
    private availableBestagons: Set<string>;
    private occupiedBestagons: Set<string>;

    constructor() {
        this.map = [];
        this.availableBestagons = new Set([JSON.stringify({x: 0, y: 0, z: 0})]);
        this.occupiedBestagons = new Set([JSON.stringify({x: 0, y: 0, z: 0})]);
        this.generateBestagon();
    }

    generateBestagon(coords: Coordinates = {x: 0, y: 0, z: 0}) {
        if(this.coordinatesTaken(coords)) {
            console.log("TAKEN!")
            return;
        }

        if(!this.bestagonConnected(coords)) {
            console.log("NOT CONNECTED!")
            return;
        }

        this.map.push({
            bestagon: new Bestagon(coords),
        });
        this.blacklistBestagon(coords);
        this.whitelistBestagons(coords);
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


    blacklistBestagon(coords: Coordinates) {
        this.occupiedBestagons.add(JSON.stringify(coords));
        this.availableBestagons.delete(JSON.stringify(coords));
    }

    coordinatesTaken(coords: Coordinates): boolean {
        return this.map.some(b => JSON.stringify(b.bestagon.coords) === JSON.stringify(coords));
    }

    whitelistBestagons(coords: Coordinates) {
        let adjacentCoordinates = GameHelper.giveAdjacentBestagonCoordinates(coords);
        for (let cObj of adjacentCoordinates) {
            let cStr = JSON.stringify(cObj);
            if(!this.occupiedBestagons.has(cStr)) {
                this.availableBestagons.add(cStr);
            }
        }
    }

    bestagonConnected(coords: Coordinates): boolean {
        if(!this.availableBestagons.has(JSON.stringify(coords))) {
            return false;
        }
        return true;
    }
}
