import { Control } from "./Control";
import { Draw } from "./Draw";
import { Level } from "./Level";
import * as geom from "./Geom";
import { Cursor, Mode } from "./Editor/Cursor";
import { CollisionType, Tile } from "./Tile";
import { Soldier } from "./Entities/Soldier";
import { Entity } from "./Entities/Entity";
import { Body } from "./Entities/EntityAttributes/Body";

export class Editor {
    private mousePrev : geom.Vector;
    private level = new Level(new geom.Vector(10, 10));
    private cursor = new Cursor(this.level);
    private draw : Draw;

    constructor() {
        this.mousePrev = Control.mousePos();
        this.initHTML();
    }

    private createTileButton(src : string, collision : CollisionType, type: string) {
        let button = document.createElement("img");
        button.src = src;
        button.className = "tileButton";
        let palette = document.getElementById("palette" + type);
        palette.appendChild(button);
        let applyTile = () => { this.cursor.mode = Mode.Wall; this.cursor.tile = new Tile(collision, button)}
        button.onclick = applyTile;
    }

    private createEntityButton(entityType : string, type: string) {
        let button = document.createElement("img");
        if (entityType == "Soldier") {
            button.src = "Soldier/stand_fine_0.png";
        }
        if (entityType == "Scientist") {
            button.src = "Scientist/stand_fine_0.png";
        }
        if (entityType == "Monster") {
            button.src = "Monster/stand_fine_0.png";
        }
        button.className = "entityButton";
        let palette = document.getElementById("palette" + type);
        palette.appendChild(button);
        let applyEntity = () => { this.cursor.mode = Mode.Entity; this.cursor.entity = new Entity(null, new Body(new geom.Vector(0, 0), 1)); }
        button.onclick = applyEntity;
    }

    // Инициализирует взаимодействие с HTML
    private initHTML() {
        // Обработка кнопок
        let generate = () => {this.level.serialize()}
        document.getElementById("generate").onclick = generate;

        // Создание кнопок для тайлов
        for (let i = 0; i < 47; i++)
            this.createTileButton("textures/tiles/ceilings/ceiling" + i + ".png", CollisionType.Full, "");
        for (let i = 0; i < 64; i++)
            this.createTileButton("textures/tiles/walls/wall" + i + ".png", CollisionType.Full, "2");
        for (let i = 0; i < 76; i++)
            this.createTileButton("textures/tiles/floors/floor" + i + ".png", CollisionType.Empty, "3");

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