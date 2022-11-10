import type {Layout, Pointy} from "./Layout";
import type {Coordinates} from "../game/Game";

export class LayoutHelper {
    public static hexToPixel(layout: Layout, coords: Coordinates): Pointy {
        let orientation = layout.orientation;
        let x = orientation.f0 * coords.x + orientation.f1 * coords.y;
        let y = orientation.f2 * coords.x + orientation.f3 * coords.y;
        return {x: x + layout.origin.x, y: y + layout.origin.y}
    }

    public static PixelToHex(layout: Layout, point: Pointy) {
        let orientation = layout.orientation;
        point.x = (point.x - layout.origin.x) / layout.size.x
        point.y = (point.y - layout.origin.y) / layout.size.y
        let q = orientation.b0 * point.x + orientation.b1 * point.y;
        let r = orientation.b2 * point.x + orientation.b3 * point.y;
        return {q: q, r: r, s: -q - r};
    }

    public static hexCornerOffset(layout: Layout, corner: number): Pointy {
        let angle = 2.0 * Math.PI * (layout.orientation.startAngle + corner) / 6;
        return {x: layout.size.x * Math.cos(angle), y: layout.size.y * Math.sin(angle)}
    }

    public static polygonCorners(layout: Layout, coords: Coordinates): Pointy[] {
        let corners: Pointy[] = [];
        let center = LayoutHelper.hexToPixel(layout, coords);
        for (let i = 0; i < 6; i++) {
            let offset = this.hexCornerOffset(layout, i);
            corners.push({x: center.x + offset.x, y: center.y + offset.y});
        }

        return corners;
    }
}
