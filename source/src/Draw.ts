import * as geom from "./Geom"

export class Camera {
    public center : geom.Vector;
    public pos : geom.Vector;
    public scale : number;
}

export class Draw {
    public canvas : HTMLCanvasElement;
    public ctx : CanvasRenderingContext2D;
    public cam = new Camera();
    constructor(canvas : HTMLCanvasElement, size : geom.Vector) {
        this.canvas = canvas;
        canvas.width = size.x;
        canvas.height = size.y;
        this.ctx = canvas.getContext("2d");
        this.cam.scale = 1;
        this.cam.pos = size.mul(1 / 2);
        this.cam.center = size.mul(1 / 2);
    }
    public loadImage(src : string) : HTMLImageElement {
        let image = new Image();
        image.src = src;
        return image;
    }
    public image(image : HTMLImageElement, pos : geom.Vector, box : geom.Vector, angle = 0) {
        let posNew = pos.clone();
        posNew = posNew.sub(this.cam.pos);
        posNew = posNew.mul(this.cam.scale);
        posNew = posNew.add(this.cam.center);
        let boxNew = box.mul(this.cam.scale);
        posNew = posNew.sub(boxNew.mul(1 / 2));
        this.ctx.drawImage(image, posNew.x, posNew.y, boxNew.x, boxNew.y);
    }
}