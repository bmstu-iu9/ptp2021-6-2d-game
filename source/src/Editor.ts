import { Control } from "./Control";
import { Draw } from "./Draw";
import { Level } from "./Level";
import * as geom from "./Geom";
import { Cursor, Mode, ToolType } from "./Editor/Cursor";
import { CollisionType, Tile } from "./Tile";
import { Entity } from "./Entities/Entity";
import { Body } from "./Entities/EntityAttributes/Body";
import { Soldier } from "./Entities/Soldier";
import { Scientist } from "./Entities/Scientist";
import { Person, PersonMode } from "./Entities/Person";
import { Monster } from "./Entities/Monster";
import { Animation } from "./Entities/EntityAttributes/Animation";
import { getMilliCount } from "./AuxLib";
import { BehaviorModel, Instruction } from "./BehaviorModel";
import { ListOfPads } from "./Editor/ListOfPads";
import { EditorGUI } from "./Editor/EditorGUI";

export class Editor {
    private mousePrev: geom.Vector;
    private level = new Level(new geom.Vector(10, 10));
    private cursor = new Cursor(this.level);
    public draw: Draw;
    private showCollisionGrid = false;
    private hideGrid = false;
    constructor() {
        this.mousePrev = Control.mousePos();
        this.initHTML();
    }

    private palette1_bitmap: number[] = [0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        1, 0, 1, 0, 0,
        0, 0, 0, 1, 0,
        1, 1, 1, 0, 1,
        0, 1, 1, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0];
    private palette2_bitmap: number[] = [0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        1, 1, 1, 1, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        1, 1, 1, 1, 1,
        0, 0, 0, 0, 0,
        1, 1, 1, 1, 1,
        1, 1, 1, 1, 0,
        0, 0, 0, 0, 0,
        1, 1, 1, 1];
    private palette3_bitmap: number[] = [0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        1, 1, 1, 1, 1,
        1, 0, 1, 1, 1,
        1, 1, 1, 0, 0,
        0];

    private isTileSubImage(idPalette: number): boolean {
        switch (idPalette) {
            case 1: {
                return true;
            }
            case 2: {
                return true;
            }
            case 3: {
                return false;
            }
        }
        return false;
    }

    private createTileButton(src: string, collision: CollisionType, type: string) {
        let button = document.createElement("img");
        button.src = src;
        button.className = "tileButton";
        let palette = document.getElementById("palette" + type);
        palette.appendChild(button);
        let applyTile = () => {
            this.cursor.changeMode(Mode.Wall);

            if (type.length > 0) {
                let prep = new Number(type);
                if (this.isTileSubImage(prep.valueOf())) {
                    if (this.cursor.tile.image) {
                        this.cursor.tile.setSubImage(button);
                        this.cursor.tile.colision = 5;
                    }
                } else {
                    this.cursor.tile = new Tile(collision);
                    this.cursor.tile.setImage(button);
                }
            } else {
                if (this.isTileSubImage(1)) {
                    if (this.cursor.tile.image) {
                        this.cursor.tile.setSubImage(button);
                        this.cursor.tile.colision = 5;
                    }
                } else {
                    this.cursor.tile = new Tile(collision);
                    this.cursor.tile.setImage(button);
                }
            }
        }
        button.onclick = applyTile;
    }

    private createEntityButton(entityType: string, type: string) {
        let button = document.createElement("img");
        if (entityType == "Soldier") {
            let applyEntity = () => {
                this.cursor.changeMode(Mode.Entity);
                this.cursor.entity = new Soldier(null, new Body(new geom.Vector(0, 0), 1), PersonMode.Fine);
                this.cursor.entity.animation = new Animation("Soldier", 8);
            }
            button.onclick = applyEntity;
            button.src = "textures/Soldier/stand_fine_0.png";
        }
        if (entityType == "Scientist") {
            let applyEntity = () => {
                this.cursor.changeMode(Mode.Entity);
                this.cursor.entity = new Scientist(null, new Body(new geom.Vector(0, 0), 1), PersonMode.Fine);
                this.cursor.entity.animation = new Animation("Scientist", 8);
            }
            button.onclick = applyEntity;
            button.src = "textures/Scientist/stand_fine_0.png";
        }
        if (entityType == "Monster") {
            let applyEntity = () => {
                this.cursor.changeMode(Mode.Entity);
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

    private createToolButton(toolType: ToolType, type: string) {
        let button = document.createElement("img");
        button.className = "toolButton";
        let src = "";
        switch (toolType) {
            case ToolType.GoToPoint: {
                src = "textures/Editor/arrow.png";
                break;
            }
            case ToolType.Waiting: {
                src = "textures/Editor/waiting.png";
                break;
            }
            case ToolType.Pursuit: {
                src = "textures/Editor/pursuit.png";
                break;
            }
        }
        button.src = src;
        let palette = document.getElementById("palette" + type);
        palette.appendChild(button);
        let applyTool = () => {
            this.cursor.changeMode(Mode.Selector);
            console.log(this.cursor.selectedEntity);

            if (this.cursor.selectedEntity != null) {
                if (this.cursor.selectedEntity instanceof Person) {
                    if (this.cursor.selectedEntity.behaviorModel == undefined) {
                        this.cursor.selectedEntity.behaviorModel = new BehaviorModel(null);
                    }
                    let behaviorModel = this.cursor.selectedEntity.behaviorModel;
                    console.log(behaviorModel);

                    //ListOfPads.compileBehaviorModel(behaviorModel);
                    if (behaviorModel.instructions[ListOfPads.instructionType] == undefined) {
                        behaviorModel.instructions[ListOfPads.instructionType] = new Instruction();

                    }
                    if (behaviorModel.instructions.get("JSONkeys") == undefined) {
                        behaviorModel.instructions.set("JSONkeys", ["normal", "panic"]);
                    }
                    switch (toolType) {
                        case ToolType.GoToPoint: {
                            console.log("well");
                            behaviorModel.instructions[ListOfPads.instructionType].addGoingToPoint(new geom.Vector(0, 0));
                            break;
                        }
                        case ToolType.Waiting: {
                            behaviorModel.instructions[ListOfPads.instructionType].addWaiting(1000);
                            break;
                        }
                        case ToolType.Pursuit: {
                            behaviorModel.instructions[ListOfPads.instructionType].addPursuit();
                            break;
                        }
                    }
                    let pad = ListOfPads.createBehaviorPad(src, toolType);
                    ListOfPads.updateInstructionCopy();
                    //console.log(behaviorModel, behaviorModel.instructions.);

                }
            }
        }
        button.onclick = applyTool;
    }

    private createCursorButton(cursorType: Mode, type: string) {
        let button = document.createElement("img");
        button.className = "cursorButton";
        if (cursorType == Mode.Eraser) {
            button.src = "textures/Editor/Cursors/eraser1.png";
        }
        if (cursorType == Mode.Selector) {
            button.src = "textures/Editor/Cursors/cursor_old.png";
        }
        let palette = document.getElementById("palette" + type);
            palette.appendChild(button);
            let applyCursor = () => {
                this.cursor.changeMode(cursorType);
            }
            button.onclick = applyCursor;
    }

    // Инициализирует взаимодействие с HTML
    private initHTML() {
        ListOfPads.init(this.cursor);
        // Обработка кнопок
        let generate = () => { this.level.serialize(); }
        document.getElementById("generate").onclick = generate;
        let showcollision = () => {
            this.showCollisionGrid = !this.showCollisionGrid;
            let b = document.getElementById("button_col");
            if (b["style"].backgroundColor == "lime") {
                b["style"].backgroundColor = "red";
            } else {
                b["style"].backgroundColor = "lime";
            }
        }
        document.getElementById("showcolision").onclick = showcollision;
        let hidegrid = () => {
            this.hideGrid = !this.hideGrid;
            let b = document.getElementById("button_grid");
            if (b["style"].backgroundColor == "red") {
                b["style"].backgroundColor = "lime";
            } else {
                b["style"].backgroundColor = "red";
            }
        }
        document.getElementById("hidegrid").onclick = hidegrid;
        // Создание кнопок для тайлов
        for (let i = 0; i < 69; i++)
            this.createTileButton("textures/tiles/ceilings/ceiling" + i + ".png", CollisionType.Full, "");
        for (let i = 0; i < 64; i++)
            this.createTileButton("textures/tiles/walls/wall" + i + ".png", CollisionType.Full, "2");
        for (let i = 0; i < 76; i++)
            this.createTileButton("textures/tiles/floors/floor" + i + ".png", CollisionType.Empty, "3");

        this.createEntityButton("Scientist", "4");
        this.createEntityButton("Soldier", "4");
        this.createEntityButton("Monster", "4");

        this.createToolButton(ToolType.GoToPoint, "5");
        this.createToolButton(ToolType.Waiting, "5");
        this.createToolButton(ToolType.Pursuit, "5");

        this.createCursorButton(Mode.Eraser, "7");
        this.createCursorButton(Mode.Selector, "7");
        // Окно превью
        this.cursor.drawPreview = new Draw(
            document.getElementById("preview") as HTMLCanvasElement,
            new geom.Vector(50, 50));

        let pal_standart_h = Math.round((window.innerHeight - 30) / 3);

        document.getElementById("palette")["style"].height = Math.round((window.innerHeight - 30) / 3) - 50 + "px";
        document.getElementById("palette2")["style"].height = Math.round((window.innerHeight - 30) / 3) - 37 + "px";
        document.getElementById("palette3")["style"].height = Math.round((window.innerHeight - 30) / 3) - 37 + "px";

        document.getElementById("palette4")["style"].height = Math.round(window.innerHeight / 3) - 40 + "px";
        document.getElementById("palette5")["style"].height = Math.round(window.innerHeight / 3) - 40 + "px";
        document.getElementById("palette6")["style"].height = 2 * Math.round(window.innerHeight / 3) - 35 + "px";
        document.getElementById("palette7")["style"].height = Math.round((window.innerHeight - 30) / 3) - 40 + "px";

        document.getElementById("palette")["style"].top = "24px";
        document.getElementById("palette2")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";
        document.getElementById("palette3")["style"].top = 2 * Math.round(window.innerHeight / 3) + "px";
        document.getElementById("palette4")["style"].top = 2 * Math.round(window.innerHeight / 3) + "px";
        document.getElementById("palette5")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";
        document.getElementById("palette6")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";
        document.getElementById("palette7")["style"].top = "24px";


        document.getElementById("w7")["style"].top = "0px";
        document.getElementById("w6")["style"].top = Math.round(window.innerHeight / 3) - 20 + "px";
        document.getElementById("w5")["style"].top = Math.round(window.innerHeight / 3) - 20 + "px";
        document.getElementById("w4")["style"].top = 2 * Math.round(window.innerHeight / 3) - 25 + "px";
        document.getElementById("w3")["style"].top = 2 * Math.round(window.innerHeight / 3) - 25 + "px";
        document.getElementById("w2")["style"].top = Math.round(window.innerHeight / 3) - 20 + "px";
        document.getElementById("w1")["style"].top = "0px"

        document.getElementById("normalMode")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";
        document.getElementById("panicMode")["style"].top = Math.round(window.innerHeight / 3) + 30 + "px";

        //document.getElementById("normalMode")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";

        /*document.getElementById("button_col")["style"].top = "0px";
        document.getElementById("button_col")["style"].left = document.getElementById("gameCanvas").clientWidth + 15 + "px";
        
        document.getElementById("button_grid")["style"].top = "25px";
        document.getElementById("button_grid")["style"].left = document.getElementById("gameCanvas").clientWidth + 15 + "px";
        
        document.getElementById("preview")["style"].top = "50px";
        document.getElementById("preview")["style"].left = document.getElementById("gameCanvas").clientWidth + 15 + "px";

        document.getElementById("generate")["style"].top = "112px";
        document.getElementById("generate")["style"].left = document.getElementById("gameCanvas").clientWidth + 15 + "px";*/

        document.getElementById("prev_menu")["style"].left = window.innerHeight + 20 + "px";


        let normal = () => {
            if (ListOfPads.instructionType == "normal") {
                return;
            }
            ListOfPads.instructionType = "normal";
            if (this.cursor.selectedEntity != null && this.cursor.selectedEntity instanceof Person) {
                console.log(this.cursor.selectedEntity.behaviorModel);
                ListOfPads.compileBehaviorModel(this.cursor.selectedEntity.behaviorModel);
            }
            let normalButton = document.getElementById("normalMode") as HTMLObjectElement;
            normalButton.classList.remove('selected');
            let panicButton = document.getElementById("panicMode") as HTMLObjectElement;
            panicButton.classList.add("selected");
            ListOfPads.updateInstructionCopy();
        };

        document.getElementById("normalMode").onclick = normal;

        let panic = () => {
            if (ListOfPads.instructionType == "panic") {
                return;
            }
            ListOfPads.instructionType = "panic";
            if (this.cursor.selectedEntity != null && this.cursor.selectedEntity instanceof Person) {
                console.log(this.cursor.selectedEntity.behaviorModel);
                ListOfPads.compileBehaviorModel(this.cursor.selectedEntity.behaviorModel);
            }
            let panicButton = document.getElementById("panicMode") as HTMLObjectElement;
            panicButton.classList.remove('selected');
            let normalButton = document.getElementById("normalMode") as HTMLObjectElement;
            normalButton.classList.add("selected");
            ListOfPads.updateInstructionCopy();
        };

        document.getElementById("panicMode").onclick = panic;

        normal();
        /*console.log(window.innerHeight)
        console.log(window.outerHeight)*/
    }

    private isInCanvas(mouseCoords: geom.Vector): boolean {
        if (document.getElementById("gameCanvas").clientLeft <= mouseCoords.x
            && mouseCoords.x <= document.getElementById("gameCanvas")["height"]
            && document.getElementById("gameCanvas").clientTop <= mouseCoords.y
            && mouseCoords.y <= document.getElementById("gameCanvas")["width"]) {
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
        //ListOfPads.clear();
        this.moveCamera();
        this.cursor.step();
    }

    public display() {
        if (this.hideGrid) {
            this.level.display(this.draw, false);
        } else {
            this.level.display(this.draw, true);
        }
        if (this.showCollisionGrid == true) {
            this.level.displayColisionGrid(this.draw);
        }
        this.cursor.display();
        for (let i = 0; i < this.level.Entities.length; i++) {
            this.draw.drawimage(this.level.Entities[i].animation.getDefaultImage(),
                this.level.Entities[i].body.center, new geom.Vector(this.level.tileSize, this.level.tileSize), 0, 1);
        }

        ListOfPads.GUIstep();
        EditorGUI.display(this.draw);
    }
}