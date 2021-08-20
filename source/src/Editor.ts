import { Control } from "./Control";
import { Draw } from "./Draw";
import { Level } from "./Level";
import * as geom from "./Geom";
import { Cursor, Mode } from "./Editor/Cursor";
import { CollisionType, Tile } from "./Tile";

export class Editor {
    private mousePrev : geom.Vector;
    private level = new Level(new geom.Vector(10, 10));
    private cursor = new Cursor(this.level);
    private draw : Draw;

    constructor() {
        this.mousePrev = Control.mousePos();
        this.initHTML();
    }

    private createTileButton(src : string, collision : CollisionType) {
        let button = document.createElement("img");
        button.src = src;
        button.className = "tileButton";
        let palette = document.getElementById("palette");
        palette.appendChild(button);
        let applyTile = () => {this.cursor.tile = new Tile(collision, button)}
        button.onclick = applyTile;
    }

    // Инициализирует взаимодействие с HTML
    private initHTML() {
        // Обработка кнопок
        let generate = () => {this.level.serialize()}
        document.getElementById("generate").onclick = generate;

        // Создание кнопок для тайлов
        for (let i = 0; i < 3; i++)
            this.createTileButton("textures/tiles/ceiling" + i + ".png", CollisionType.Full);
        for (let i = 0; i < 2; i++)
            this.createTileButton("textures/tiles/wall" + i + ".png", CollisionType.Full);
            for (let i = 0; i < 2; i++)
            this.createTileButton("textures/tiles/floor" + i + ".png", CollisionType.Empty);

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