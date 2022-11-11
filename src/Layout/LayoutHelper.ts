import type {Layout} from "./Layout";
import {Hex} from "./Hex";
import {Point} from "./Point";

export class LayoutHelper {
    public static hexToPixel(layout: Layout, hex: Hex): Point {
        let o = layout.orientation;
        let x = (o.f0 * hex.q + o.f1 * hex.r) * layout.size.x;
        let y = (o.f2 * hex.q + o.f3 * hex.r) * layout.size.y;
        return new Point(x + layout.origin.x, y + layout.origin.y);
    }

    public static PixelToHex(layout: Layout, point: Point): Hex {
        let orientation = layout.orientation;
        let p = new Point(
            (point.x - layout.origin.x) / layout.size.x,
            (point.y - layout.origin.y) / layout.size.y
        );
        let q = orientation.b0 * p.x + orientation.b1 * p.y;
        let r = orientation.b2 * p.x + orientation.b3 * p.y;
        return new Hex(q, r, -q - r);
    }

    public static hexCornerOffset(layout: Layout, corner: number): Point {
        let angle = 2.0 * Math.PI * (layout.orientation.startAngle + corner) / 6;
        return new Point(layout.size.x * Math.cos(angle), layout.size.y * Math.sin(angle));
    }

    public static polygonCorners(layout: Layout, hex: Hex): Point[] {
        let corners: Point[] = [];
        let center = LayoutHelper.hexToPixel(layout, hex);
        for (let i = 0; i < 6; i++) {
            let offset = this.hexCornerOffset(layout, i);
            corners.push(new Point(center.x + offset.x, center.y + offset.y));
        }
        return corners;
    }
}
