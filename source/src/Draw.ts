import * as geom from "./Geom";

export class Camera {
    public center : geom.Vector;
    public pos : geom.Vector;
    public scale : number;
}

export class Color {
    public r : number;
    public g : number;
    public b : number;

    constructor(r : number, g : number, b : number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
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
    public static loadImage(src : string) : HTMLImageElement {
        let image = new Image();
        image.src = src;
        return image;
    }
    private transform(pos : geom.Vector) : geom.Vector {
        let posNew = pos.clone();
        posNew = posNew.sub(this.cam.pos);
        posNew = posNew.mul(this.cam.scale);
        posNew = posNew.add(this.cam.center);
        return posNew;
    }
    public image(image : HTMLImageElement, pos : geom.Vector, box : geom.Vector, angle = 0) {
        let posNew = this.transform(pos);
        let boxNew = box.mul(this.cam.scale);
        posNew = posNew.sub(boxNew.mul(1 / 2));
        this.ctx.drawImage(image, posNew.x, posNew.y, boxNew.x, boxNew.y);
    }
    public fillRect(pos : geom.Vector, box : geom.Vector, color : Color) {
        let posNew = this.transform(pos);
        let boxNew = box.mul(this.cam.scale);
        posNew = posNew.sub(boxNew.mul(1 / 2));
        this.ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
        this.ctx.fillRect(posNew.x, posNew.y, boxNew.x, boxNew.y);
    }
    public strokeRect(pos : geom.Vector, box : geom.Vector, color : Color) {
        let posNew = this.transform(pos);
        let boxNew = box.mul(this.cam.scale);
        posNew = posNew.sub(boxNew.mul(1 / 2)); //незаполненный прямоугольник
        this.ctx.strokeStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
        this.ctx.strokeRect(posNew.x, posNew.y, boxNew.x, boxNew.y);
    }
    public fillCircle(pos : geom.Vector, radius : number, color : Color) { //заполненная окружность
        let posNew = this.transform(pos);
        this.ctx.beginPath ();
        this.ctx.arc (posNew.x,posNew.y,radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
        this.ctx.fill();
    }
    public strokeCircle(pos : geom.Vector, radius : number, color : Color) { //заполненная окружность
        let posNew = this.transform(pos);
        this.ctx.beginPath ();
        this.ctx.arc (posNew.x,posNew.y,radius, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.strokeStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
    }
    public clear() {
        this.ctx.clearRect(-1000, -1000, 10000, 10000);
    }
}