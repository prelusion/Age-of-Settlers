import type {Hex} from "../layout/Hex";
import {LayoutHelper} from "../layout/LayoutHelper";
import type {BiomeType} from "../data/types/BiomeType";
import {Layout} from "../layout/Layout";
import {ImageFactory} from "./ImageFactory";

export class Canvas {
    ctx: CanvasRenderingContext2D;

    constructor(id: string) {
        this.ctx = getCanvasIfSupported(id);
        this.setCanvasColor(200, 0, 0);
        // this.draw();
    }

    getCtx() {
        return this.ctx;
    }

    setCanvasColor(r: number, g: number, b: number) {
        this.ctx.fillStyle = "rgb("+r+","+g+","+b+")";
    }

    draw(x: number, y: number, size: number = 3) {
    //    Todo draw something on canvas.
        this.ctx.fillRect(x, y, size, size);
        // this.ctx.fillRect(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2, 50, 50);
    }

    public drawHex(hex: Hex, biome: BiomeType) {
        this.ctx.beginPath();
        for (let corner of LayoutHelper.polygonCorners(hex)) {
            this.ctx.lineTo(corner.x, corner.y);
            /** Coords on Hexa debugging **/
            // this.ctx.fillText(hex.toString(), corner.x, corner.y, 200)
        }
        this.ctx.fillStyle = this.ctx.createPattern(ImageFactory.singleton().getImage(biome), "repeat") as CanvasPattern
        this.ctx.fill();
    }

}

function getCanvasIfSupported(id: string = "canvas"): CanvasRenderingContext2D {
    console.log(id);
    let canvas = document.getElementById(id) as HTMLCanvasElement;
    // @ts-ignore
    return canvas.getContext("2d");
}
