import {Canvas} from "./util/Canvas";
import {Game} from "./game/Game";
import {GameHelper} from "./game/GameHelper";
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
    console.log(game.bestagonCount)
    console.log(game.availableCoordinates)
    console.log(game.occupiedCoordinates)
    game.generateBestagon({x: 1, y: 1, z: -2});
  }, 1000)


}
