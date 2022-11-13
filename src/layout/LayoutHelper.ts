import {Layout} from "./Layout";
import {Hex} from "./Hex";
import {Point} from "./Point";

export class LayoutHelper {
    public static hexToPixel(hex: Hex): Point {
        let o = Layout.orientation;
        let x = (o.f0 * hex.q + o.f1 * hex.r) * Layout.size.x;
        let y = (o.f2 * hex.q + o.f3 * hex.r) * Layout.size.y;
        return new Point(x + Layout.origin.x, y + Layout.origin.y);
    }

    public static PixelToHex(point: Point): Hex {
        let orientation = Layout.orientation;
        let p = new Point(
            (point.x - Layout.origin.x) / Layout.size.x,
            (point.y - Layout.origin.y) / Layout.size.y
        );
        let q = Math.round(orientation.b0 * p.x + orientation.b1 * p.y);
        let r = Math.round(orientation.b2 * p.x + orientation.b3 * p.y);
        return new Hex(q, r, -q - r);
    }

    public static hexCornerOffset(corner: number): Point {
        let angle = 2.0 * Math.PI * (Layout.orientation.startAngle + corner) / 6;
        return new Point(Layout.size.x * Math.cos(angle), Layout.size.y * Math.sin(angle));
    }

    public static polygonCorners(hex: Hex): Point[] {
        let corners: Point[] = [];
        let center = LayoutHelper.hexToPixel(hex);
        for (let i = 0; i < 6; i++) {
            let offset = this.hexCornerOffset(i);
            corners.push(new Point(center.x + offset.x, center.y + offset.y));
        }
        return corners;
    }
}
