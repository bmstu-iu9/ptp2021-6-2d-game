import * as geom from "./Geom";
import { AnimationState, SpriteAnimation } from "./SpriteAnimation";

export class Camera {
    public center : geom.Vector;
    public pos : geom.Vector;
    public scale : number;
}

export class Color {
    public r : number;
    public g : number;
    public b : number;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public toString() : string {
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    }
}
export enum Layer { // Индентификатор текстуры (тайл или персонаж)
    TileLayer, 
    EntityLayer,
    HudLayer
}
type hashimages = {
    [key: string]: HTMLImageElement ; // Хеш таблица с изображениями
};
interface queue { // Для правильной отрисовки слоев
	image?: HTMLImageElement,    
	pos?: geom.Vector,
    box?: geom.Vector,
    angle? : number,
    layer? : Layer,
}
interface bar_queue { // Для отрисовки Hp бара

    pos?: geom.Vector, 
    box?: geom.Vector, 
    percentage? : number, 
    frontColor : Color, 
    backColor? : Color, 
    marks?: number[],
}

export class Draw {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    private imagequeue : queue[] = []; // Очередь для изображений
    private hpqueue : bar_queue[] = []; // Очередь для hp бара
    public cam = new Camera();
    private spriteAnimations : SpriteAnimation[] = [];
    private static images : hashimages = {}; // Хеш таблица с изображениями
    constructor(canvas: HTMLCanvasElement, size: geom.Vector = null) {
        this.canvas = canvas;
        if (size) {
            canvas.width = size.x;
            canvas.height = size.y;
        }
        else {
            size = new geom.Vector();
            size.x = canvas.width;
            size.y = canvas.height;
        }
        this.ctx = canvas.getContext("2d");
        this.cam.scale = 1;
        this.cam.pos = size.mul(1 / 2);
        this.cam.center = size.mul(1 / 2);
    }
    public static loadImage(src: string): HTMLImageElement {
        if (this.images[src]) {
            return this.images[src]; // Извлекаем из хеш таблицы
        }
        let image = new Image();
        image.src = src;
        this.images[src] = image;
        return image;
    }
    // Преобразование координат
    private transform(pos: geom.Vector): geom.Vector { 
        let posNew = pos.clone();
        posNew = posNew.sub(this.cam.pos);
        posNew = posNew.mul(this.cam.scale);
        posNew = posNew.add(this.cam.center);
        return posNew;
    }
    // Обратное реобразование координат
    public transformBack(pos : geom.Vector) : geom.Vector {
        let posNew = pos.clone();
        posNew = posNew.sub(this.cam.center);
        posNew = posNew.mul(1 / this.cam.scale);
        posNew = posNew.add(this.cam.pos);
        return posNew;
    }
    // Функция для отрисовки изображения
    private drawimage(image: HTMLImageElement, pos: geom.Vector, box: geom.Vector, angle : number){ 
        let posNew = this.transform(pos);
        let boxNew = box.mul(this.cam.scale * 1.01);
        posNew = posNew.sub(boxNew.mul(1 / 2));
        this.ctx.imageSmoothingEnabled = false;
        if (angle%(2*Math.PI) == 0){
            this.ctx.drawImage(image, posNew.x, posNew.y, boxNew.x, boxNew.y); // Без поворота (Много ресурсов на поворот уходит(даже на 0))
        } else {
            var buffer = document.createElement('canvas'); // Поворот
            buffer.width = boxNew.x*2;
            buffer.height = boxNew.y*2;
            var bctx = buffer.getContext('2d');
            bctx.translate(boxNew.x, boxNew.y);
            bctx.rotate(angle);
            bctx.drawImage(image, 0, 0, boxNew.x, boxNew.y);
            this.ctx.drawImage(buffer, posNew.x, posNew.y);
        }
    }
    // Изображение (обработка)
    public image(image: HTMLImageElement, pos: geom.Vector, box: geom.Vector, angle : number,layer : Layer) {
        if (layer == 0) { // Отрисовка сразу
               this.drawimage(image,pos,box,angle);
        } else { // Отрисовка после сортировки
            let curqueue : queue = {image,pos,box,angle,layer};
            this.imagequeue.push(curqueue);
            
        }
    }
    // Обработка слоев изображения
    public getimage(){
        if (this.imagequeue.length > 0){ // Отрисовка изображений
            this.imagequeue.sort(function (a, b) { // Сортировка
                if (a.layer > b.layer)
                    return -1;
                if (a.layer < b.layer) 
                    return 1;
                if (a.pos.y > b.pos.y)
                    return -1;
                if (a.pos.y < b.pos.y)
                    return 1;
                return 0;
            });
            for (;this.imagequeue.length > 0;){
                let temp = this.imagequeue.pop(); //Извлечение
                this.drawimage(temp.image,temp.pos,temp.box,temp.angle)
            }
        }
        for (;this.hpqueue.length > 0;){ // Отрисовка hp бара
            let temp = this.hpqueue.pop();
            let pos = temp.pos;
            let box = temp.box; 
            let percentage = temp.percentage;
            let frontColor = temp.frontColor; 
            let backColor = temp.backColor;
            let marks = temp.marks;
            // hp бар
            let bar = box.clone();
            bar.x *= percentage;
            this.fillRect(pos, box,frontColor);
            let posNew = pos.clone();
            posNew.x -= (box.x - bar.x) / 2;
            this.fillRect(posNew, bar, backColor);
            // Деления
            bar.x = 2 / this.cam.scale;
            pos.x -= box.x / 2;
            for (var i = 0; i < marks.length ; i++){
                posNew = pos.clone();
                posNew.x += box.x * marks[i];
                this.fillRect(posNew, bar, frontColor);
            }
        }
    }
    // Заполненный прямоугольник
    public fillRect(pos: geom.Vector, box: geom.Vector, color: Color) {
        let posNew = this.transform(pos);
        let boxNew = box.mul(this.cam.scale);
        posNew = posNew.sub(boxNew.mul(1 / 2));
        this.ctx.fillStyle = color.toString(); // цвет заливки
        this.ctx.fillRect(posNew.x, posNew.y, boxNew.x, boxNew.y);
    }
    // Контур прямоугольника
    public strokeRect(pos: geom.Vector, box: geom.Vector, color: Color, lineWidth: number) { 
        let posNew = this.transform(pos);
        let boxNew = box.mul(this.cam.scale);
        posNew = posNew.sub(boxNew.mul(1 / 2)); // незаполненный прямоугольник
        this.ctx.strokeStyle = color.toString(); // цвет контура
        this.ctx.lineWidth = lineWidth * this.cam.scale; // ширина контура
        this.ctx.strokeRect(posNew.x, posNew.y, boxNew.x, boxNew.y);
    }
    // Заполненная окружность
    public fillCircle(pos: geom.Vector, radius: number, color: Color) { 
        let posNew = this.transform(pos);
        this.ctx.beginPath();
        this.ctx.arc(posNew.x, posNew.y, radius * this.cam.scale, 0, Math.PI * 2, false);
        this.ctx.fillStyle = color.toString(); // цвет заливки
        this.ctx.fill();
    }
    // Контур окружности
    public strokeCircle(pos: geom.Vector, radius: number, color: Color, lineWidth: number) { 
        let posNew = this.transform(pos);
        this.ctx.beginPath();
        this.ctx.arc(posNew.x, posNew.y, radius * this.cam.scale, 0, Math.PI * 2, false);
        this.ctx.lineWidth = lineWidth * this.cam.scale; // ширина контура
        this.ctx.strokeStyle = color.toString(); // цвет контура
        this.ctx.stroke();
    }
    // Заполненный многоугольник
    public fillPolygon(vertices: Array<geom.Vector>, color: Color) { 
        for (let i = 0; i < vertices.length; i++) {
            let posNew = this.transform(vertices[i]);
            this.ctx.lineTo(posNew.x, posNew.y);
        }
        this.ctx.fillStyle = color.toString(); // цвет заливки
        this.ctx.fill();
    }
    // Контур многоугольника
    public strokePolygon(vertices: Array<geom.Vector>, color: Color, lineWidth: number) { 
        for (let i = 0; i < vertices.length; i++) {
            let posNew = this.transform(vertices[i]);
            this.ctx.lineTo(posNew.x, posNew.y);
            this.ctx.lineWidth = lineWidth * this.cam.scale; //ширина контура
        }

        this.ctx.strokeStyle = color.toString(); // цвет контура
        this.ctx.stroke();
    }
    // Заполненный сектор
    public fillSector(pos: geom.Vector, radius: number, color: Color, startAngle: number, endAngle: number) { 
        let posNew = this.transform(pos);
        this.ctx.beginPath();
        this.ctx.arc(posNew.x, posNew.y, radius * this.cam.scale, startAngle, endAngle, false);
        this.ctx.fillStyle = color.toString(); // цвет заливки
        this.ctx.fill();
    }
    // Контур сектора
    public strokeSector(pos: geom.Vector, radius: number, color: Color, lineWidth: number, startAngle: number, endAngle: number) { 
        let posNew = this.transform(pos);
        this.ctx.beginPath();
        this.ctx.arc(posNew.x, posNew.y, radius * this.cam.scale, startAngle, endAngle, false);
        this.ctx.lineWidth = lineWidth * this.cam.scale;  // ширина контура
        this.ctx.strokeStyle = color.toString(); // цвет контура
        this.ctx.stroke();       
    }
    // Создание анимации
    public spriteAnimation(
        name : string, 
        framesNumber : number, 
        initialState : AnimationState, 
        finalState : AnimationState, 
        duration : number, 
        frameDuration : number) {

        let animation = new SpriteAnimation();
        animation.loadFrames(name, framesNumber);
        animation.initialState = initialState;
        animation.finalState = finalState;
        animation.duration = duration;
        animation.frameDuration = frameDuration;

        this.spriteAnimations.push(animation);
    }
    // Step
    public step() {
        // Обработка анимаций
        this.spriteAnimations.forEach(animation => animation.step());
        // Удаление отработавших анимаций
        for (let i = 0; i < this.spriteAnimations.length; i++) {
            if (this.spriteAnimations[i].isOver()) {
                this.spriteAnimations.splice(i, 1);
                i--;
            }
        }
        // Отрисовка
        this.spriteAnimations.forEach(animation => animation.display(this));
    }
    public clear() {
        this.ctx.clearRect(-1000, -1000, 10000, 10000);
    }
    // hp бар 
    public bar(pos: geom.Vector, box: geom.Vector, percentage : number, frontColor : Color, backColor : Color, marks: number[]){
        let queue : bar_queue = {pos,box,percentage,frontColor,backColor,marks};
        this.hpqueue.push(queue); // Добавляем в очередь на отрисовку

        
    }
}