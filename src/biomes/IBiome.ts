import type {BiomeType} from "./BiomeType";
import type {CollectableType} from "../resources/ResourceType";

export type CollectableFields = Partial<Record<CollectableType, { quantity: CollectableQuantity }>>;
export type CollectableNumberFields = Partial<Record<CollectableType, number>>;

export interface CollectableQuantity {
    resource: number;
    entity: number;
}

export interface IBiome {
    name: string;
    type: BiomeType;
    collectables: CollectableFields;
}
