import {Orientation} from "./Orientation";
import type {Point} from "./Point";

export const LAYOUT_POINTY = new Orientation(
    Math.sqrt(3), Math.sqrt(3) / 2, 0, 3 / 2,
    Math.sqrt(3) / 3, -1 / 3, 0, 2 / 3,
    0.5
);

export const LAYOUT_FLAT = new Orientation(
    3 / 2, 0, Math.sqrt(3) / 2, Math.sqrt(3),
    2 / 3, 0, -1 / 3, Math.sqrt(3) / 3,
    0
);

export class Layout {
    public readonly orientation;
    public readonly size: Point;
    public readonly origin: Point;

    constructor(orientation: Orientation, size: Point, origin: Point) {
        this.orientation = orientation;
        this.size = size;
        this.origin = origin;
    }
}
