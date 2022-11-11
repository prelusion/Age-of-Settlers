import type {BiomeType} from "../data/types/BiomeType";
import type {CollectableType} from "../data/types/ResourceType";

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
