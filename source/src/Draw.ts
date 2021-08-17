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
    private transform(pos : geom.Vector) : geom.Vector { //преобразование координат
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
    public fillRect(pos : geom.Vector, box : geom.Vector, color : Color) { //заполненный прямоугольник
        let posNew = this.transform(pos);
        let boxNew = box.mul(this.cam.scale);
        posNew = posNew.sub(boxNew.mul(1 / 2));
        this.ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")"; //цвет заливки
        this.ctx.fillRect(posNew.x, posNew.y, boxNew.x, boxNew.y);
    }
    public strokeRect(pos : geom.Vector, box : geom.Vector, color : Color,lineWidth : number) { //контур прямоугольника
        let posNew = this.transform(pos);
        let boxNew = box.mul(this.cam.scale);
        posNew = posNew.sub(boxNew.mul(1 / 2)); //незаполненный прямоугольник
        this.ctx.strokeStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")"; //цвет контура
        this.ctx.strokeRect(posNew.x, posNew.y, boxNew.x, boxNew.y);
        this.ctx.lineWidth = lineWidth/this.cam.scale; //ширина контура
    }
    public fillCircle(pos : geom.Vector, radius : number, color : Color) { //заполненная окружность
        let posNew = this.transform(pos);
        this.ctx.beginPath ();
        this.ctx.arc (posNew.x,posNew.y,radius/this.cam.scale, 0, Math.PI * 2, false);
        this.ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")"; //цвет заливки
        this.ctx.fill();
    }
    public strokeCircle(pos : geom.Vector, radius : number, color : Color,lineWidth : number) { //контур окружности
        let posNew = this.transform(pos);
        this.ctx.beginPath ();
        this.ctx.arc (posNew.x,posNew.y,radius/this.cam.scale, 0, Math.PI * 2, false);
        this.ctx.lineWidth = lineWidth/this.cam.scale; //ширина контура
        this.ctx.stroke();
        this.ctx.strokeStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")"; //цвет контура
    }
    public fillPolygon(vertices : Array<geom.Vector>, color : Color) { //заполненный многоугольник
        for (let i = 0; i < vertices.length; i++) {
            let posNew = this.transform(vertices[i]);
            this.ctx.lineTo(posNew.x,posNew.y);
        }
        this.ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")"; //цвет заливки
        this.ctx.fill();
    }
    public strokePolygon(vertices : Array<geom.Vector>, color : Color,lineWidth : number ) { //контур многоугольника
        for (let i = 0; i < vertices.length; i++) {
            let posNew = this.transform(vertices[i]);
            this.ctx.lineTo(posNew.x,posNew.y);
            this.ctx.lineWidth = lineWidth/this.cam.scale; //ширина контура
        }

        this.ctx.strokeStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")"; //цвет контура
        this.ctx.stroke();
    }
    public fillSector(pos : geom.Vector, radius : number, color : Color,startAngle : number,endAngle : number) { //заполненный сектор
        let posNew = this.transform(pos);
        this.ctx.beginPath ();
        this.ctx.arc (posNew.x,posNew.y,radius/this.cam.scale, startAngle, endAngle , false);
        this.ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")"; //цвет заливки
        this.ctx.fill();
    }
    public strokeSector(pos : geom.Vector, radius : number, color : Color,lineWidth : number,startAngle : number,endAngle : number) { //контур сектора
        let posNew = this.transform(pos);
        this.ctx.beginPath ();
        this.ctx.arc (posNew.x,posNew.y,radius/this.cam.scale, startAngle, endAngle, false);
        this.ctx.lineWidth = lineWidth/this.cam.scale;  //ширина контура
        this.ctx.stroke();
        this.ctx.strokeStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")"; //цвет контура
    }
    public clear() {
        this.ctx.clearRect(-1000, -1000, 10000, 10000);
    }
}