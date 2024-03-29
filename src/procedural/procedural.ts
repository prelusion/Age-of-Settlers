
import {ProceduralType} from "../data/types/ProceduralType";

export interface ProceduralData {
    name: string;           // Name of the proceduralDataGenerator
    type: ProceduralType;   //
    maxBiomeSize: number;   // Maximum size of a generated biome
    minBiomeSize: number;   // Minimum size of a generated biome
    totalSize: number;      // Amount of hexagons that can be placed on a single map
    totalWidth: number;     // Amount of hexagons being able to go horizontally
    totalHeight: number;    // Amount of hexagons being able to go vertically
}

export default {
    [ProceduralType.RANDOM]: {
        name: "Random",
        type: ProceduralType.RANDOM,
        maxBiomeSize: 2,
        minBiomeSize: 1,
        totalSize: 100,
        totalWidth: 57,
        totalHeight: 38,
    },
    [ProceduralType.SMALL_BIOME]: {
        name: "Small Biome",
        type: ProceduralType.SMALL_BIOME,
        maxBiomeSize: 22,
        minBiomeSize: 10,
        totalSize: 100,
        totalWidth: 57,
        totalHeight: 38,
    },
    [ProceduralType.BIG_BIOME]: {
        name: "Big Biome",
        type: ProceduralType.BIG_BIOME,
        maxBiomeSize: 55,
        minBiomeSize: 20,
        totalSize: 600,
        totalWidth: 57,
        totalHeight: 38,
    },
    [ProceduralType.SINGLE_BIOME]: {
        name: "Single Biome",
        type: ProceduralType.SINGLE_BIOME,
        maxBiomeSize: 999,
        minBiomeSize: 999,
        totalSize: 300,
        totalWidth: 57,
        totalHeight: 38,
    }
} as Record<ProceduralType, ProceduralData>
