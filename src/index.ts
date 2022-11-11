import {Canvas} from "./util/Canvas";
import {Game} from "./game/Game";
import {GameHelper} from "./game/GameHelper";
import {Layout, LAYOUT_FLAT, LAYOUT_POINTY} from "./Layout/Layout";
import {LayoutHelper} from "./Layout/LayoutHelper";
import {Hex} from "./Layout/Hex";
import {Point} from "./Layout/Point";

const canvas = new Canvas();
const game = new Game();

main();

function main() {
    if (!canvas.getCtx()) {
        alert("This browser does not support the game!");
        return;
    }
    GameHelper.generateTinyGrid(game);

    setTimeout(() => {
        let layout = new Layout(LAYOUT_POINTY, new Point(50, 50), new Point(300, 300));

        canvas.setCanvasColor(100, 0, 200);
        for (let corner of LayoutHelper.polygonCorners(layout, new Hex(0, 0, 0))) {
            canvas.draw(corner.x, corner.y);
        }
        for (let corner of LayoutHelper.polygonCorners(layout, new Hex(0, -1, 1))) {
            canvas.draw(corner.x, corner.y);
        }
        canvas.setCanvasColor(100, 200, 40);
        for (let corner of LayoutHelper.polygonCorners(layout, new Hex(0, 1, -1))) {
            canvas.draw(corner.x, corner.y);
        }
        canvas.setCanvasColor(100, 0, 200);
        for (let corner of LayoutHelper.polygonCorners(layout, new Hex(-1, 0, 1))) {
            canvas.draw(corner.x, corner.y);
        }
        canvas.setCanvasColor(100, 200, 40);
        for (let corner of LayoutHelper.polygonCorners(layout, new Hex(1, 0, -1))) {
            canvas.draw(corner.x, corner.y);
        }
        for (let corner of LayoutHelper.polygonCorners(layout, new Hex(-1, 1, 0))) {
            canvas.draw(corner.x, corner.y);
        }
        canvas.setCanvasColor(60, 120, 200);
        for (let corner of LayoutHelper.polygonCorners(layout, new Hex(1, -1, 0))) {
            canvas.draw(corner.x, corner.y);
        }
    }, 1000)
}
