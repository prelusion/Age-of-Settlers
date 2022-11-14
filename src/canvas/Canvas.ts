import type {Hex} from "../layout/Hex";
import {LayoutHelper} from "../layout/LayoutHelper";
import type {BiomeType} from "../data/types/BiomeType";
import {ImageFactory} from "../util/ImageFactory";
import {Point} from "../layout/Point";

export class Canvas {
    private readonly _ctx: CanvasRenderingContext2D;

    constructor(id: string) {
        this._ctx = getCanvasIfSupported(id);
        this._ctx.globalCompositeOperation="screen";
        this._ctx.textAlign = "center"
        this._ctx.font = "bold 30px";
        // this.draw();
    }

    get ctx() {
        return this._ctx;
    }

    setCanvasConfig(r: number, g: number, b: number) {
        this.ctx.globalCompositeOperation="color-burn";
        this.ctx.textAlign = "center"
        this.ctx.font = "bold 13px Arial";
        this.ctx.fillStyle = "rgb("+r+","+g+","+b+")";
    }

    setCanvasColor(r: number, g: number, b: number) {
        this.ctx.fillStyle = "rgb("+r+","+g+","+b+")";
    }

    draw(x: number, y: number, size: number = 3) {
        //    Todo draw something on canvas.
        this.ctx.fillRect(x, y, size, size);
        // this.ctx.fillRect(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2, 50, 50);
    }

    public clearCanvas() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    public drawHex(hex: Hex, biome: BiomeType, order: number, debug: boolean) {
        this.ctx.beginPath();
        let corner: Point = Point.Zero();
        let offset = LayoutHelper.hexCornerOffset(0);
        for (corner of LayoutHelper.polygonCorners(hex)) {
            this.ctx.lineTo(corner.x, corner.y);
        }
        if (debug) {
            this.setCanvasConfig(255, 0, 255);
            this.ctx.fillText(hex.q === 0 ? "q" : hex.q + "", corner.x-offset.x-15, corner.y, 200)
            this.ctx.fillText(hex.r === 0 ? "r" : hex.r + "", corner.x-offset.x+27, corner.y+offset.y, 200)
            this.ctx.fillText(hex.s === 0 ? "s" : hex.s + "", corner.x-offset.x-15, corner.y+offset.y+28, 200)
            this.setCanvasConfig(0, 0, 0);
            this.ctx.fillText(order + "", corner.x-offset.x, corner.y+offset.y, 200)
        }

        this.ctx.fillStyle = this.ctx.createPattern(ImageFactory.singleton().getImage(biome), "repeat") as CanvasPattern
        this.ctx.fill();
    }
}

function getCanvasIfSupported(id: string = "canvas"): CanvasRenderingContext2D {
    let canvas = document.getElementById(id) as HTMLCanvasElement;
    // @ts-ignore
    return canvas.getContext("2d");
}
