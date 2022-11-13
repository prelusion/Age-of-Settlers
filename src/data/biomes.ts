import {CollectableType} from "./types/ResourceType";
import {BiomeType} from "./types/BiomeType";

export interface BiomeData {
    name: string;
    type: BiomeType;
    movementModifier: number;
    spawnChance: number;
    collectables: BiomeDataCollectables[];
}

export type BiomeDataCollectables = {
    type: CollectableType;
    quantity: [number, number];
    spawnChance: number;
    gatherModifier: number;
};

export default {
    [BiomeType.PLAINS]: {
        name: "Plains",
        type: BiomeType.PLAINS,
        movementModifier: 1,
        spawnChance: 40,
        collectables: [
            {
                type: CollectableType.BOAR,
                quantity: [10, 30],
                spawnChance: .2,
                gatherModifier: 1
            },
            {
                type: CollectableType.SHEEP,
                quantity: [20, 60],
                spawnChance: 1,
                gatherModifier: 1
            },
            {
                type: CollectableType.HEMP,
                quantity: [20, 40],
                spawnChance: .6,
                gatherModifier: 1
            },
            {
                type: CollectableType.BERRIES,
                quantity: [20, 50],
                spawnChance: .6,
                gatherModifier: 1
            }
        ]
    },
    [BiomeType.FOREST]: {
        name: "Forest",
        type: BiomeType.FOREST,
        movementModifier: .8,
        spawnChance: 20,
        collectables: [
            {
                type: CollectableType.OAKWOOD,
                quantity: [500, 1000],
                spawnChance: 1,
                gatherModifier: 1
            },
            {
                type: CollectableType.HEMP,
                quantity: [30, 50],
                spawnChance: .6,
                gatherModifier: .8
            },
            {
                type: CollectableType.BEAR,
                quantity: [5, 10],
                spawnChance: .1,
                gatherModifier: .8
            },
        ]
    },
    [BiomeType.MOUNTAIN]: {
        name: "Mountain",
        type: BiomeType.MOUNTAIN,
        movementModifier: .5,
        spawnChance: 10,
        collectables: [
            {
                type: CollectableType.STONE,
                quantity: [9999, 9999],
                spawnChance: 1,
                gatherModifier: 1
            }, {
                type: CollectableType.SULPHUR,
                quantity: [200, 800],
                spawnChance: .4,
                gatherModifier: 1
            }, {
                type: CollectableType.IRON,
                quantity: [200, 600],
                spawnChance: .6,
                gatherModifier: 1
            }, {
                type: CollectableType.GOAT,
                quantity: [300, 500],
                spawnChance: .4,
                gatherModifier: .5
            },
        ]
    },
    [BiomeType.WATER]: {
        name: "Water",
        type: BiomeType.WATER,
        movementModifier: 1,
        spawnChance: 10,
        collectables: [
            {
                type: CollectableType.FISH,
                quantity: [200, 800],
                spawnChance: 1,
                gatherModifier: 1
            }
        ]
    },

    /**
     * All biome data values underneath this comment are not correct yet.
     */
    [BiomeType.HILLS]: {
        name: "Hills",
        type: BiomeType.HILLS,
        movementModifier: 1,
        spawnChance: 10,
        collectables: [
            {
                type: CollectableType.STONE,
                quantity: [200, 800],
                spawnChance: 1,
                gatherModifier: 1
            }
        ]
    },
    [BiomeType.DARK_OAK_FOREST]: {
        name: "Dark Oak Forest",
        type: BiomeType.DARK_OAK_FOREST,
        movementModifier: 1,
        spawnChance: 10,
        collectables: [
            {
                type: CollectableType.DARKOAKWOOD,
                quantity: [200, 800],
                spawnChance: 1,
                gatherModifier: 1
            }
        ]
    },
    [BiomeType.MISTY_FOREST]: {
        name: "Misty Forest",
        type: BiomeType.MISTY_FOREST,
        movementModifier: 1,
        spawnChance: 10,
        collectables: [
            {
                type: CollectableType.OAKWOOD,
                quantity: [200, 800],
                spawnChance: 1,
                gatherModifier: 1
            }
        ]
    },
    [BiomeType.CAVE]: {
        name: "Cave",
        type: BiomeType.CAVE,
        movementModifier: 1,
        spawnChance: 10,
        collectables: [
            {
                type: CollectableType.STONE,
                quantity: [200, 800],
                spawnChance: 1,
                gatherModifier: 1
            }
        ]
    },
    [BiomeType.RIVER]: {
        name: "River",
        type: BiomeType.RIVER,
        movementModifier: 1,
        spawnChance: 10,
        collectables: [
            {
                type: CollectableType.FISH,
                quantity: [200, 800],
                spawnChance: 1,
                gatherModifier: 1
            }
        ]
    },
    [BiomeType.DESERT]: {
        name: "Desert",
        type: BiomeType.DESERT,
        movementModifier: 1,
        spawnChance: 10,
        collectables: [
            {
                type: CollectableType.GOAT,
                quantity: [200, 800],
                spawnChance: 1,
                gatherModifier: 1
            }
        ]
    },
    [BiomeType.OCEAN]: {
        name: "Ocean",
        type: BiomeType.OCEAN,
        movementModifier: 1,
        spawnChance: 10,
        collectables: [
            {
                type: CollectableType.FISH,
                quantity: [200, 800],
                spawnChance: 1,
                gatherModifier: 1
            }
        ]
    },
    [BiomeType.WASTELANDS]: {
        name: "Wastelands",
        type: BiomeType.WASTELANDS,
        movementModifier: 1,
        spawnChance: 10,
        collectables: [
            {
                type: CollectableType.FISH,
                quantity: [200, 800],
                spawnChance: 1,
                gatherModifier: 1
            }
        ]
    }
} as Record<BiomeType, BiomeData>
