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

export class Editor {
    private mousePrev: geom.Vector;
    private level = new Level(new geom.Vector(10, 10));
    private cursor = new Cursor(this.level);
    private draw: Draw;
    private amountOfPads = 0;

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
        let applyTile = () => {
            this.cursor.mode = Mode.Wall;
            this.cursor.tile = new Tile(collision, button)
        }
        button.onclick = applyTile;
    }

    private createBehaviorPad(src : string, text : string) {
        console.log("im here!!!!!!!");
        let pad = document.createElement("li");
        pad.className = "behaviorPad";

        let icon = document.createElement("img") as HTMLImageElement;
        let label = document.createElement("p");
        let exitButton = document.createElement("img") as HTMLImageElement;

        icon.className = "behaviorPad_icon";
        icon.src = src;
        label.className = "behaviorPad_label";

        label.id = "padLabel_" + this.amountOfPads;
        label.innerHTML = text;

        exitButton.className = "behaviorPad_exitButton";
        exitButton.src = "textures/Editor/cross.ico"
        let deleteDiv = () => { this.deleteBehaviorPad(exitButton) }
        exitButton.onclick = deleteDiv;

        pad.draggable = true;
        icon.draggable = false;
        label.draggable = false;
        exitButton.draggable = false;
        pad.appendChild(icon);
        pad.appendChild(label);
        pad.appendChild(exitButton);

        pad.addEventListener(`dragover`, (evt) => {
            evt.preventDefault();
        });

        //let palette = document.getElementById("palette6");

        document.getElementById("mainListPads").append(pad)
        //palette.appendChild(pad);
        this.amountOfPads += 1;

        return pad;
    }

    private deleteBehaviorPad(exitButton: HTMLImageElement) {
        exitButton.parentElement.remove()
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
            this.cursor.mode = Mode.Selector;
            console.log(this.cursor.selectedEntity);
            
            if (this.cursor.selectedEntity != null) {
                if (this.cursor.selectedEntity instanceof Person) {
                    if (this.cursor.selectedEntity.behaviorModel == undefined) {
                        this.cursor.selectedEntity.behaviorModel = new BehaviorModel(null);
                    }
                    let behaviorModel = this.cursor.selectedEntity.behaviorModel;
                    console.log(behaviorModel);
                    
                    this.cursor.compileBehaviorModel(behaviorModel);
                    let instructionType = "default";
                    if (behaviorModel.instructions[instructionType] == undefined) {
                        behaviorModel.instructions[instructionType] = new Instruction();
                    }
                    switch (toolType) {
                        case ToolType.GoToPoint: {
                            console.log("well");
                            behaviorModel.instructions[instructionType].addGoingToPoint(new geom.Vector(0, 0));
                            let pad = this.createBehaviorPad(src, "Going to (0, 0)");
                            break;
                        }
                        case ToolType.Waiting: {
                            behaviorModel.instructions[instructionType].addWaiting(1000);
                            let pad = this.createBehaviorPad(src, "Waiting (1000)");
                            break;
                        }
                        case ToolType.Pursuit: {
                            behaviorModel.instructions[instructionType].addPursuit();
                            let pad = this.createBehaviorPad(src, "Pursuit");
                            break;
                        }
                    }
                }
            }
        }
        button.onclick = applyTool;
    }

    // Инициализирует взаимодействие с HTML
    private initHTML() {
        // Обработка кнопок
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

        this.createToolButton(ToolType.GoToPoint, "5");
        this.createToolButton(ToolType.Waiting, "5");
        this.createToolButton(ToolType.Pursuit, "5");
        // Окно превью
        this.cursor.drawPreview = new Draw(
            document.getElementById("preview") as HTMLCanvasElement,
            new geom.Vector(50, 50));

        document.getElementById("gameCanvas")["style"].height = window.innerHeight - 30 + "px";
        document.getElementById("gameCanvas")["style"].width = document.getElementById("gameCanvas").clientHeight + "px"

        document.getElementById("palette")["style"].height = Math.round(window.innerHeight / 3) - 20 + "px";
        document.getElementById("palette2")["style"].height = Math.round(window.innerHeight / 3) - 20 + "px";
        document.getElementById("palette3")["style"].height = Math.round(window.innerHeight / 3) - 20 + "px";

        document.getElementById("palette4")["style"].height = Math.round(window.innerHeight / 3) - 14 + "px";
        document.getElementById("palette5")["style"].height = Math.round(window.innerHeight / 3) - 14 + "px";
        document.getElementById("palette6")["style"].height = 2 * Math.round(window.innerHeight / 3) - 40 + "px";

        document.getElementById("palette")["style"].top = "10px";
        document.getElementById("palette2")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";
        document.getElementById("palette3")["style"].top = 2 * Math.round(window.innerHeight / 3) + "px";
        document.getElementById("palette4")["style"].top = 2 * Math.round(window.innerHeight / 3) + "px";
        document.getElementById("palette5")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";
        document.getElementById("palette6")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";

        document.getElementById("preview")["style"].top = "0px";
        document.getElementById("preview")["style"].left = document.getElementById("gameCanvas").clientWidth + 12 + "px";

        document.getElementById("generate")["style"].top = "62px";
        document.getElementById("generate")["style"].left = document.getElementById("gameCanvas").clientWidth + 12 + "px";

        /*console.log(window.innerHeight)
        console.log(window.outerHeight)*/

        const listOfPads = document.querySelector(`.listOfPads`) as HTMLObjectElement;
        listOfPads.addEventListener('dragstart', (evt) => {
            let x = evt.target as HTMLObjectElement;
            x.classList.add('selected')
        });

        listOfPads.addEventListener('dragend', (evt) => {
            let x = evt.target as HTMLObjectElement;
            x.classList.remove('selected')
        });

        listOfPads.addEventListener(`dragover`, (evt) => {
            evt.preventDefault();
            const activeElement = listOfPads.querySelector(`.selected`);
            const currentElement = evt.target as HTMLObjectElement;
            const isMoveable = activeElement !== currentElement &&
                currentElement.classList.contains(`behaviorPad`);

            if (!isMoveable) {
                return;
            }

            const nextElement = (currentElement === activeElement.nextElementSibling) ?
                currentElement.nextElementSibling :
                currentElement;

            listOfPads.insertBefore(activeElement, nextElement);
        });

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