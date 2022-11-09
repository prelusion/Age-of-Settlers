import {Canvas} from "./helper/canvas";
const canvas = new Canvas();

main();
function main() {
  if (!canvas.getCtx()) {
    alert("This browser does not support the game!");
    return;
  }

}
