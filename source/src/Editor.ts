import { Control } from "./Control";
import { Draw } from "./Draw";
import { Level } from "./Level";
import * as geom from "./Geom";
import { Cursor, Mode } from "./Editor/Cursor";
import { CollisionType } from "./Tile";

export class Editor {
    private mousePrev : geom.Vector;
    private level = new Level(new geom.Vector(10, 10));
    private cursor = new Cursor(this.level);
    private draw : Draw;

    constructor() {
        this.mousePrev = Control.mousePos();
        this.initHTML();
    }

    // Инициализирует взаимодействие с HTML
    private initHTML() {
        // Обработка кнопок
        let emptyMode = () => {this.cursor.collisionType = CollisionType.Empty}
        let fullMode = () => {this.cursor.collisionType = CollisionType.Full}
        let ulMode = () => {this.cursor.collisionType = CollisionType.CornerUL}
        let urMode = () => {this.cursor.collisionType = CollisionType.CornerUR}
        let dlMode = () => {this.cursor.collisionType = CollisionType.CornerDL}
        let drMode = () => {this.cursor.collisionType = CollisionType.CornerDR}
        document.getElementById("empty").onclick = emptyMode;
        document.getElementById("full").onclick = fullMode;
        document.getElementById("ul").onclick = ulMode;
        document.getElementById("ur").onclick = urMode;
        document.getElementById("dl").onclick = dlMode;
        document.getElementById("dr").onclick = drMode;
        // Окно превью
        this.cursor.drawPreview = new Draw(
            document.getElementById("preview") as HTMLCanvasElement, 
            new geom.Vector(50, 50));
    }

    // Двигает камеру в соответствии с движениями мышки
    private moveCamera() {
        // Сохраняем текущие координаты мыши
        let mouseCoords = Control.mousePos().clone();

        // Двигаем камеру
        this.draw.cam.scale *= Math.pow(1.001, -Control.wheelDelta());
        if (Control.isMouseRightPressed()) {
            let delta = mouseCoords.sub(this.mousePrev);
            this.draw.cam.pos = this.draw.cam.pos.sub(delta.mul(1 / this.draw.cam.scale));
        }

        // Сохраняем предыдущие координаты мыши
        this.mousePrev = mouseCoords.clone();
    }

    public setDraw(draw : Draw) {
        this.draw = draw;
        this.cursor.draw = this.draw;
    }

    public step() {
        this.moveCamera();
        this.cursor.step();
    }

    public display() {
        this.level.display(this.draw, true);
        this.cursor.display();
    }
}