import {Hexagon} from "../hexagon/Hexagon";
import {Game} from "./Game";
import {Hex} from "../layout/Hex";
import {Random} from "../util/Random";
import type {BiomeType} from "../data/types/BiomeType";
import {BiomeHelper} from "../data/helper/BiomeHelper";

export interface HexagonData {
    hexagon: Hexagon,
}

export class World {
    private map: HexagonData[];

    /**
     * This set is a Hex object. This is done to simply use the
     * Set features to check chosen bestagon locations if they're allowed to contain a new bestagon.
     */
    private readonly availableHexagons: Set<string>;
    private readonly occupiedHexagons: Set<string>;

    constructor() {
        this.map = [];

        let initial = Hex.Zero();

        this.availableHexagons = new Set([initial.toString()]);
        this.occupiedHexagons = new Set([initial.toString()]);

        this.generateHexagon(initial);
    }

    generateHexagon(hex: Hex, biome: BiomeType = BiomeHelper.getRandomBiomeType()) {
        if(this.hexTaken(hex)) {
            return;
        }

        if(!this.hexagonConnected(hex)) {
            return;
        }

        this.map.push({
            hexagon: new Hexagon(hex, biome),
        });
        this.blacklistHexagon(hex);
        this.whitelistHexagons(hex);
    }

    get hexagonCount() {
        return this.map.length;
    }

    get allAvailableHex() {
        return this.availableHexagons
    }

    get allOccupiedHex() {
        return this.occupiedHexagons
    }

    get allOccupiedHexagons(): Hex[] {
        return this.map.map(hex => {return hex.hexagon.hex});
    }

    getRandomAvailableHex(): Hex {
        return Hex.FromHexString(Random.arrayValueAsString(Array.from(this.availableHexagons)));
    }

    getAOccupiedHexagon(): Hexagon {
        return this.map[0].hexagon;
    }

    validHex(hex: Hex): boolean {
        return hex.q + hex.s + hex.r === 0;
    }

    blacklistHexagon(hex: Hex) {
        this.occupiedHexagons.add(hex.toString());
        this.availableHexagons.delete(hex.toString());
    }

    hexTaken(hex: Hex): boolean {
        return this.map.some(d => d.hexagon.hex.equals(hex));
    }

    whitelistHexagons(hex: Hex) {
        let adjacentHexes = Game.giveAdjacentHexs(hex);
        for (let adjacentHex of adjacentHexes) {
            let hexStr = adjacentHex.toString();
            if(!this.occupiedHexagons.has(hexStr)) {
                this.availableHexagons.add(hexStr);
            }
        }
    }

    hexagonConnected(hex: Hex): boolean {
        return this.availableHexagons.has(hex.toString());
    }

    // TODO: Make more efficient like saving this number in every hexagon how big (OR) which other hexagons are in the same biome. (Could do cool tricks with that if it's efficient code).
    checkBiomeSizeOfHex(hex: Hex, biome: BiomeType, alreadyCheckBiomes: Hex[] = []): number {
        let adjacentHexagons = Game.giveAdjacentHexs(hex);
        let biomeSize = 0;
        this.map.map((d) => {
            if(!alreadyCheckBiomes.includes(d.hexagon.hex)) {
                if(d.hexagon.biome.type !== biome) {
                    alreadyCheckBiomes.push(d.hexagon.hex);
                }
                if(adjacentHexagons.includes(d.hexagon.hex) && d.hexagon.biome.type === biome) {
                    biomeSize += 1;
                    alreadyCheckBiomes.push(d.hexagon.hex);
                    this.checkBiomeSizeOfHex(d.hexagon.hex, biome, alreadyCheckBiomes);
                }
            }
        });

        return biomeSize;
    }

    getBiomeFromHex(hex: Hex): BiomeType {
        let h = this.map.find((d) => {
            if(d.hexagon.hex.equals(hex)) {
                return hex;
            };
        });

        if(!h) {
            console.log("Given hex is not yet used in the map");
            return BiomeHelper.getRandomBiomeType()
        }
        return h.hexagon.biome.type;
    }
}
