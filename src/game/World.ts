import {Hexagon} from "../hexagon/Hexagon";
import {Hex} from "../layout/Hex";
import {BiomeHelper} from "../data/helper/BiomeHelper";
import {nestedArraySet} from "../util/Array";
import {Random} from "../util/Random";
import {Biome} from "../biomes/Biome";
import {ProceduralGenerator} from "../procedural/ProceduralGenerator";
import {BiomeType} from "../data/types/BiomeType";

export enum HexState {
    OCCUPIED,
    ADJACENT,
    NONE,
}

export class World {
    private map: Biome[];

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

    generateHexagon(hex: Hex) {
        if (this.isOccupied(hex)) {
            throw Error(`Tried to generate Hexagon on occupied tile. ${hex}`)
        }
        let biome = new Biome(BiomeHelper.getRandomBiomeType());
        biome.addTile(hex);
        this.map.push(biome);
        this.setHexState(hex, HexState.OCCUPIED);
        this.setAdjacentHexStates(hex);

    }

    generateHexagonIntoBiome(hex: Hex, biome: Biome) {
        biome.addTile(hex);
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
        //  todo check if this is correct.
        let hexagon: Hexagon | undefined = undefined;
        this.map.map((biome) => {
            biome.tiles.map(h => {
                if (h.hex.equals(hex)) {
                    hexagon = h;
                    return;
                }
            })
        });
        return hexagon;
    }

    public setHexState(hex: Hex, state: HexState): void {
        nestedArraySet(this.hexState, hex.coordinates(), state);
    }

    get hexagonCount() {
        let hexCount = 0;
        this.map.map(b => hexCount += b.tiles.length);
        return hexCount;
    }

    get hexagons(): Hex[] {
        let hex: Hex[] = [];
        this.map.map(biome => {
            return biome.tiles.map(h => hex.push(h.hex));
        });
        return hex;
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

    generateBiome(worldGenerator: ProceduralGenerator) {
        let hex = this.getRandomHex(HexState.ADJACENT);
        if (hex === undefined) {
            return;
        }

        let biomeType = worldGenerator.getNewBiomeType(hex, this);
        let biome = new Biome(biomeType)
        biome.addTile(hex);

        let availableHexagons = hex.neighbours();
        let newBiomeSize = Math.floor(Math.random() * (worldGenerator.maxBiomeSize - worldGenerator.minBiomeSize + 1)) + worldGenerator.minBiomeSize

        while (biome.size() < newBiomeSize) {
            let index = Math.floor(Math.random()*availableHexagons.length);
            let hex = availableHexagons[index];
            availableHexagons.splice(index, 1);

            if (hex === undefined) {
                break;
            }

            if (this.atBorder(hex, worldGenerator)) {
                this.setHexState(hex, HexState.OCCUPIED)
                continue;
            }

            if (this.isOccupied(hex)) {
                continue;
            }

            availableHexagons.push(...hex.neighbours());
            this.generateHexagonIntoBiome(hex, biome);
        }

        this.map.push(biome);
    }

    fillAllAdjacentTiles(biomeType: BiomeType) {
        let adjacentHex: Hex[] = [];
        this.map.map(b => {
            b.tiles.map(h => {
                h.hex.neighbours().map(h => {
                    if (this.getHexState(h) === HexState.ADJACENT) {
                        adjacentHex.push(h)
                    }
                });
            })
        });

        let ocean = new Biome(biomeType);
        this.map.push(ocean);
        adjacentHex.map(h => {
            this.generateHexagonIntoBiome(h, ocean);
        });

    }

    getRandomHex(state: HexState | null = null): Hex {
        return Random.choice(this.hexStateFlattened(state));
    }

    getFirstOccupiedHexagon(): Hexagon {
        return this.map[0].tiles[0];
    }

    // TODO: Make more efficient like saving this number in every hexagon how big
    //  (OR) which other hexagons are in the same biome.
    //  (Could do cool tricks with that if it's efficient code).
    // getBiomeSize(hex: Hex, biome: BiomeType, alreadyCheckBiomes: Hex[] = []): number {
    //     let adjacentHexagons = hex.neighbours();
    //     let biomeSize = 0;
    //     this.map.map((d) => {
    //         if (!alreadyCheckBiomes.includes(d.hexagon.hex)) {
    //             if (d.hexagon.biome.type !== biome) {
    //                 alreadyCheckBiomes.push(d.hexagon.hex);
    //             }
    //             if (adjacentHexagons.includes(d.hexagon.hex) && d.hexagon.biome.type === biome) {
    //                 biomeSize += 1;
    //                 alreadyCheckBiomes.push(d.hexagon.hex);
    //                 this.checkBiomeSizeOfHex(d.hexagon.hex, biome, alreadyCheckBiomes);
    //             }
    //         }
    //     });
    //
    //     return biomeSize;
    // }

    getBiomeTypeFromHex(hex: Hex): BiomeType {
        return this.getBiomeFromHex(hex)?.type ?? BiomeHelper.getRandomBiomeType();
    }

    getBiomeFromHex(hex: Hex): Biome | undefined {
        let biome: Biome | undefined;
        this.map.map(b => {
            b.tiles.map(h => {
                if (h.hex.equals(hex)) {
                    biome = b;
                }
            })
        })
        return biome;
    }

    getBiomeSize(hex: Hex): number {
        return this.getBiomeFromHex(hex)?.tiles.length ?? 0;
    }


    public atBorder(hex: Hex, p: ProceduralGenerator): boolean {
        if (Hex.distanceFromZeroW(hex) > p.totalWidth / 2 || Hex.distanceFromZeroH(hex) > p.totalHeight / 2) {
            return true;
        }
        return false;
    }
}
