import {Orientation} from "./Orientation";

export interface Pointy {
    x: number,
    y: number
}

export class Layout {
    public layoutPointy = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0,
        Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5)
    public layoutFlat = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0,
        Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
    public orientation = this.layoutFlat;
    public size: Pointy;
    public origin: Pointy;

    constructor(size: Pointy, origin: Pointy) {
        this.size = size;
        this.origin = origin;
    }
}
