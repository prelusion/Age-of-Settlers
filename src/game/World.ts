import {Hexagon} from "../hexagon/Hexagon";
import {Hex} from "../layout/Hex";
import type {BiomeType} from "../data/types/BiomeType";
import {BiomeHelper} from "../data/helper/BiomeHelper";
import {nestedArraySet} from "../util/Array";
import {Random} from "../util/Random";

export interface HexagonData {
    hexagon: Hexagon,
}

export enum HexState {
    OCCUPIED,
    ADJACENT,
    NONE,
}

export class World {
    private map: HexagonData[];

    /**
     * This set is a Hex object. This is done to simply use the
     * Set features to check chosen bestagon locations if they're allowed to contain a new bestagon.
     */
    private readonly hexState: HexState[][][];

    constructor() {
        this.map = [];
        this.hexState = [[[]]];

        let initial = Hex.Zero();
        this.generateHexagon(initial);
    }

    generateHexagon(hex: Hex, biome: BiomeType = BiomeHelper.getRandomBiomeType()) {
        if (this.isOccupied(hex)) {
            throw Error(`Tried to generate Hexagon on occupied tile. ${hex}`)
        }

        this.map.push({hexagon: new Hexagon(hex, biome)});
        this.setHexState(hex, HexState.OCCUPIED);
        this.setAdjacentHexStates(hex);
    }

    public isAdjacent(hex: Hex): boolean {
        return this.hexHasState(hex, HexState.ADJACENT);
    }

    public isOccupied(hex: Hex): boolean {
        return this.hexHasState(hex, HexState.OCCUPIED);
    }

    public hexHasState(hex: Hex, state: HexState): boolean {
        return this.getHexState(hex) === state;
    }

    public getHexState(hex: Hex): HexState {
        return this.hexState?.[hex.q]?.[hex.r]?.[hex.s] ?? HexState.NONE;
    }

    public setAdjacentHexStates(hex: Hex, state: HexState = HexState.ADJACENT) {
        let neighbours = hex.neighbours();
        for (let neighbour of neighbours) {
            if (!this.isOccupied(neighbour)) {
                this.setHexState(neighbour, state);
            }
        }
    }

    /**
     * Returns first Hexagon (0, 0, 0) if given hex isn't found.
     * @param hex
     */
    public getHexagonFromHex(hex: Hex): Hexagon | undefined {
        return this.map.find((h) => {
            if (h.hexagon.hex.equals(hex)) {
                return h.hexagon
            }
        })?.hexagon;
    }

    public setHexState(hex: Hex, state: HexState): void {
        nestedArraySet(this.hexState, hex.coordinates(), state);
    }

    get hexagonCount() {
        return this.map.length;
    }

    get allOccupiedHexagons(): Hex[] {
        return this.map.map(hex => {
            return hex.hexagon.hex
        });
    }

    /**
     * Todo: Performance improvements? If this is called often...
     *   Maybe shuffle this flattened array and return the next index each time it is requested
     *   Until the underlying array is changed?
     *   OR:
     *   Random.choice on each key layer
     */
    public hexStateFlattened(state: HexState | null = null): Hex[] {
        let hexes = [];
        for (let q of Object.keys(this.hexState)) {
            let qi = parseInt(q);
            for (let r of Object.keys(this.hexState[qi])) {
                let ri = parseInt(r);
                for (let s of Object.keys(this.hexState[qi][ri])) {
                    let si = parseInt(s);

                    if (state === null || this.hexState[qi][ri][si] === state) {
                        hexes.push(new Hex(qi, ri, si));
                    }
                }
            }
        }
        return hexes;
    }

    getRandomHex(state: HexState | null = null): Hex {
        return Random.choice(this.hexStateFlattened(state));
    }

    getFirstOccupiedHexagon(): Hexagon {
        return this.map[0].hexagon;
    }

    // TODO: Make more efficient like saving this number in every hexagon how big
    //  (OR) which other hexagons are in the same biome.
    //  (Could do cool tricks with that if it's efficient code).
    checkBiomeSizeOfHex(hex: Hex, biome: BiomeType, alreadyCheckBiomes: Hex[] = []): number {
        let adjacentHexagons = hex.neighbours();
        let biomeSize = 0;
        this.map.map((d) => {
            if (!alreadyCheckBiomes.includes(d.hexagon.hex)) {
                if (d.hexagon.biome.type !== biome) {
                    alreadyCheckBiomes.push(d.hexagon.hex);
                }
                if (adjacentHexagons.includes(d.hexagon.hex) && d.hexagon.biome.type === biome) {
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
            if (d.hexagon.hex.equals(hex)) {
                return hex;
            }
        });

        if (!h) {
            console.log("Given hex is not yet used in the map");
            return BiomeHelper.getRandomBiomeType()
        }
        return h.hexagon.biome.type;
    }
}
