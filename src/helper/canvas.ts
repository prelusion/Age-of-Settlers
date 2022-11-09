export class Canvas {
    ctx: CanvasRenderingContext2D;

    constructor() {
        this.ctx = getCanvasIfSupported();
        this.setCanvasColor(200, 0, 0);
        this.draw();
    }

    getCtx() {
        return this.ctx;
    }

    setCanvasColor(r: number, g: number, b: number) {
        this.ctx.fillStyle = "rgb("+r+","+g+","+b+")";

    }

    draw() {
    //    Todo draw something on canvas.
        this.ctx.fillRect(50, 50, 10, 10);
    }
}

function getCanvasIfSupported(): CanvasRenderingContext2D {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    // @ts-ignore
    return canvas.getContext("2d");
}
