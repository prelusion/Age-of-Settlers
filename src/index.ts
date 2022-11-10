import {Canvas} from "./util/Canvas";
import {Game} from "./game/Game";
import {GameHelper} from "./game/GameHelper";
import {Layout} from "./Layout/Layout";
import {LayoutHelper} from "./Layout/LayoutHelper";
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
    let layout = new Layout({x: 50, y: 50}, {x: 500, y: 500});

    canvas.setCanvasColor(100, 0, 200);
    for (let corner of LayoutHelper.polygonCorners(layout, {x:0,y:0,z:0})) {
      canvas.draw(corner.x, corner.y);
    }

    for (let corner of LayoutHelper.polygonCorners(layout, {x:0,y:-1,z:1})) {
      canvas.draw(corner.x+50, corner.y+100);
    }
    canvas.setCanvasColor(100, 200, 40);
    for (let corner of LayoutHelper.polygonCorners(layout, {x:0,y:1,z:-1})) {
      canvas.draw(corner.x-50, corner.y+100);
    }
    canvas.setCanvasColor(100, 0, 200);
    for (let corner of LayoutHelper.polygonCorners(layout, {x:-1,y:0,z:1})) {
      canvas.draw(corner.x-50, corner.y-100);
    }
    canvas.setCanvasColor(100, 200, 40);
    for (let corner of LayoutHelper.polygonCorners(layout, {x:1,y:0,z:-1})) {
      canvas.draw(corner.x+50, corner.y-100);
    }
    for (let corner of LayoutHelper.polygonCorners(layout, {x:-1,y:1,z:0})) {
      canvas.draw(corner.x-100, corner.y);
    }
    canvas.setCanvasColor(60, 120, 200);
    for (let corner of LayoutHelper.polygonCorners(layout, {x:1,y:-1,z:0})) {
      canvas.draw(corner.x+100, corner.y);
    }



  }, 1000)



}
