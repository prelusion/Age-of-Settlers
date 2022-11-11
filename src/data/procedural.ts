
import {ProceduralType} from "./types/ProceduralType";

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
        maxBiomeSize: 1,
        minBiomeSize: 1,
        totalSize: 80,
        totalWidth: 20,
        totalHeight: 20,
    },
    [ProceduralType.SMALL_BIOME]: {
        name: "Small Biome",
        type: ProceduralType.SMALL_BIOME,
        maxBiomeSize: 9,
        minBiomeSize: 2,
        totalSize: 600,
        totalWidth: 20,
        totalHeight: 20,
    },
    [ProceduralType.BIG_BIOME]: {
        name: "Big Biome",
        type: ProceduralType.BIG_BIOME,
        maxBiomeSize: 30,
        minBiomeSize: 5,
        totalSize: 500,
        totalWidth: 40,
        totalHeight: 40,
    },
    [ProceduralType.SINGLE_BIOME]: {
        name: "Single Biome",
        type: ProceduralType.SINGLE_BIOME,
        maxBiomeSize: 999,
        minBiomeSize: 999,
        totalSize: 500,
        totalWidth: 40,
        totalHeight: 40,
    }
} as Record<ProceduralType, ProceduralData>
