import { Control } from "./Control";
import { Draw } from "./Draw";
import { Level } from "./Level";
import * as geom from "./Geom";
import { Cursor, Mode } from "./Editor/Cursor";
import { CollisionType, Tile } from "./Tile";
import { Entity } from "./Entities/Entity";
import { Body } from "./Entities/EntityAttributes/Body";
import { Soldier } from "./Entities/Soldier";
import { Scientist } from "./Entities/Scientist";
import { PersonMode } from "./Entities/Person";
import { Monster } from "./Entities/Monster";
import { Animation } from "./Entities/EntityAttributes/Animation";
import { getMilliCount } from "./AuxLib";

export class Editor {
    private mousePrev: geom.Vector;
    private level = new Level(new geom.Vector(10, 10));
    private cursor = new Cursor(this.level);
    private draw: Draw;

    constructor() {
        this.mousePrev = Control.mousePos();
        this.initHTML();
    }

    private createTileButton(src: string, collision: CollisionType, type: string) {
        let button = document.createElement("img");
        button.src = src;
        button.className = "tileButton";
        let palette = document.getElementById("palette" + type);
        palette.appendChild(button);
        let applyTile = () => { this.cursor.mode = Mode.Wall;
            this.cursor.tile = new Tile(collision, button) }
        button.onclick = applyTile;
    }

    private createEntityButton(entityType: string, type: string) {
        let button = document.createElement("img");
        if (entityType == "Soldier") {
            let applyEntity = () => {
                this.cursor.mode = Mode.Entity;
                this.cursor.entity = new Soldier(null, new Body(new geom.Vector(0, 0), 1), PersonMode.Fine);
                this.cursor.entity.animation = new Animation("Soldier", 8);
            }
            button.onclick = applyEntity;
            button.src = "textures/Soldier/stand_fine_0.png";
        }
        if (entityType == "Scientist") {
            let applyEntity = () => {
                this.cursor.mode = Mode.Entity;
                this.cursor.entity = new Scientist(null, new Body(new geom.Vector(0, 0), 1), PersonMode.Fine);
                this.cursor.entity.animation = new Animation("Scientist", 8);
            }
            button.onclick = applyEntity;
            button.src = "textures/Scientist/stand_fine_0.png";
        }
        if (entityType == "Monster") {
            let applyEntity = () => {
                this.cursor.mode = Mode.Entity;
                this.cursor.entity = new Monster(null, new Body(new geom.Vector(0, 0), 1));
                this.cursor.entity.animation = new Animation("Monster", 8);
            }
            button.onclick = applyEntity;
            button.src = "textures/Monster/stand_fine_0.png";
        }
        button.className = "entityButton";
        let palette = document.getElementById("palette" + type);
        console.log(button);

        palette.appendChild(button);
    }

    private createToolButton(src : string, type : string) {
        
    }

    // Инициализирует взаимодействие с HTML
    private initHTML() {
        // Обработка кнопок
        var progress = <HTMLInputElement>document.getElementById("progressbar");
        let generate = () => { this.level.serialize(); }
        document.getElementById("generate").onclick = generate;

        // Создание кнопок для тайлов
        for (let i = 0; i < 47; i++)
            this.createTileButton("textures/tiles/ceilings/ceiling" + i + ".png", CollisionType.Full, "");
        for (let i = 0; i < 64; i++)
            this.createTileButton("textures/tiles/walls/wall" + i + ".png", CollisionType.Full, "2");
        for (let i = 0; i < 76; i++)
            this.createTileButton("textures/tiles/floors/floor" + i + ".png", CollisionType.Empty, "3");

        this.createEntityButton("Scientist", "4");
        this.createEntityButton("Soldier", "4");
        this.createEntityButton("Monster", "4");
        // Окно превью
        this.cursor.drawPreview = new Draw(
            document.getElementById("preview") as HTMLCanvasElement,
            new geom.Vector(50, 50));

        document.getElementById("gameCanvas")["style"].height = window.innerHeight - 30 + "px";
        document.getElementById("gameCanvas")["style"].width = document.getElementById("gameCanvas").clientHeight + "px"

        document.getElementById("palette")["style"].height = Math.round(window.innerHeight / 3) - 20 + "px";
        document.getElementById("palette2")["style"].height = Math.round(window.innerHeight / 3) - 20 + "px";
        document.getElementById("palette3")["style"].height = Math.round(window.innerHeight / 3) - 20 + "px";
        document.getElementById("palette4")["style"].height = Math.round(window.innerHeight / 3) - 20 + "px";
        document.getElementById("palette5")["style"].height = Math.round(window.innerHeight / 3) - 20 + "px";

        document.getElementById("palette")["style"].top = "10px";
        document.getElementById("palette2")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";
        document.getElementById("palette3")["style"].top = 2 * Math.round(window.innerHeight / 3) + "px";
        document.getElementById("palette4")["style"].top = 2 * Math.round(window.innerHeight / 3) + "px";
        document.getElementById("palette5")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";

        document.getElementById("preview")["style"].top = "0px";
        document.getElementById("preview")["style"].left = document.getElementById("gameCanvas").clientWidth + 12 + "px";

        document.getElementById("generate")["style"].top = "62px";
        document.getElementById("generate")["style"].left = document.getElementById("gameCanvas").clientWidth + 12 + "px";

        /*console.log(window.innerHeight)
        console.log(window.outerHeight)*/
    }

    private isInCanvas(mouseCoords: geom.Vector): boolean {
        if (document.getElementById("gameCanvas").clientLeft <= mouseCoords.x && mouseCoords.x <= document.getElementById("gameCanvas")["height"] && document.getElementById("gameCanvas").clientTop <= mouseCoords.y && mouseCoords.y <= document.getElementById("gameCanvas")["width"]) {
            return true;
        }
        return false;
    }

    // Двигает камеру в соответствии с движениями мышки
    private moveCamera() {
        // Сохраняем текущие координаты мыши
        let mouseCoords = Control.mousePos().clone();

        // Двигаем камеру
        // console.log(document.getElementById("gameCanvas").clientTop)
        if (this.isInCanvas(mouseCoords)) {
            this.draw.cam.scale *= Math.pow(1.001, -Control.wheelDelta());
        } else {
            Control.clearWheelDelta();
        }
        if (Control.isMouseRightPressed() && this.isInCanvas(mouseCoords)) {
            let delta = mouseCoords.sub(this.mousePrev);
            this.draw.cam.pos = this.draw.cam.pos.sub(delta.mul(1 / this.draw.cam.scale));
        }

        // Сохраняем предыдущие координаты мыши
        this.mousePrev = mouseCoords.clone();
    }

    public setDraw(draw: Draw) {
        this.draw = draw;
        this.cursor.draw = this.draw;
    }

    public step() {
        this.moveCamera();
        this.cursor.step();
    }

    public display() {
        this.level.display(this.draw, true);
        console.log(this.level.Entities.length);
        
        for (let i = 0; i < this.level.Entities.length; i++) {
            this.draw.drawimage(this.level.Entities[i].animation.getDefaultImage(),
             this.level.Entities[i].body.center, new geom.Vector(this.level.tileSize, this.level.tileSize), 0);
        }
        this.cursor.display();
    }
}