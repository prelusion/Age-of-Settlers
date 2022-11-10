import {CollectableType, ResourceType} from "../resources/ResourceType";

export interface CollectableData {
    name: string;
    type: CollectableType;
    recoveryRate: number;
    resources: CollectableDataResource
}

export type CollectableDataResource = Array<{
    type: ResourceType;
    quantity: number;
    gatherRate: number;
}>;

// Todo: If this has red lines, it is because not all collectables have been implemented here yet 🙃
export default {
    [CollectableType.SHEEP]: {
        name: "Sheep",
        type: CollectableType.SHEEP,
        recoveryRate: 10,
        resources: [
            {
                type: ResourceType.FOOD,
                quantity: 400,
                gatherRate: 20,
            },
            {
                type: ResourceType.CLOTH,
                quantity: 200,
                gatherRate: 20,
            }
        ]
    },
    [CollectableType.OAKWOOD]: {
        name: "Tree",
        type: CollectableType.OAKWOOD,
        recoveryRate: 20,
        resources: [
            {
                type: ResourceType.WOOD,
                quantity: 400,
                gatherRate: 50,
            },
        ]
    },
    [CollectableType.STONE]: {
        name: "Stone Ore",
        type: CollectableType.STONE,
        recoveryRate: 0,
        resources: [
            {
                type: ResourceType.STONE,
                quantity: 800,
                gatherRate: 30,
            },
        ]
    },
} as Record<CollectableType, CollectableData>
