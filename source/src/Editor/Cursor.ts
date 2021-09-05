import { Control } from "../Control";
import { Draw, Color } from "../Draw";
import { Entity } from "../Entities/Entity";
import { Body } from "../Entities/EntityAttributes/Body";
import { Monster } from "../Entities/Monster";
import { Person, PersonMode } from "../Entities/Person";
import { Scientist } from "../Entities/Scientist";
import { Soldier } from "../Entities/Soldier";
import * as geom from "../Geom";
import { Level } from "../Level";
import { CollisionType, Tile } from "../Tile";
import { BehaviorModel } from "../BehaviorModel";
import * as aux from "../AuxLib";
import { ListOfPads } from "./ListOfPads";
import { url } from "inspector";

export enum ToolType {
    GoToPoint,
    Waiting,
    Pursuit
}

export enum Mode {
    Eraser = 0,
    Wall,
    Entity,
    Selector,
    PosPicking,
    Light
  }

// Курсор для редактора уровней. Хранит в себе позицию и
// информацию о том, как должен вести себя в случае клика
export class Cursor {
    public level: Level;
    public draw: Draw;
    public pos = new geom.Vector();
    public gridPos = new geom.Vector();
    public tile = new Tile(CollisionType.Full);
    public entity = new Entity(null, new Body(new geom.Vector(0, 0), 1));
    public selectedEntity : Entity = null;
    public drawPreview : Draw;
    private mode = Mode.Wall;
    private mouseLeftButtonClicked = true;
    private entityLocations: Map<any, number> = new Map();

    constructor(level: Level = null, draw: Draw = null) {
        this.level = level;
        this.draw = draw;
    }

    private setBlock() {
        console.log(this.tile);
        let tileLight = this.level.Grid[this.gridPos.x][this.gridPos.y].light;
        this.level.Grid[this.gridPos.x][this.gridPos.y] = this.tile.clone();
        this.level.Grid[this.gridPos.x][this.gridPos.y].light = tileLight;
        console.log(this.level.Grid[this.gridPos.x][this.gridPos.y]);
    }

    private setEntity() {
        let currentLocation = this.level.Entities.length;
        if (this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)] != null) {
            currentLocation = this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)];
        }
        this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)] = currentLocation;
        if (this.entity instanceof Soldier) {
            let pos = this.gridPos.add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1 / 2));
            this.level.Entities[currentLocation] = new Soldier(null, new Body(pos, 1), PersonMode.Fine);
        }
        if (this.entity instanceof Scientist) {
            let pos = this.gridPos.add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1 / 2));
            this.level.Entities[currentLocation] = new Scientist(null, new Body(pos, 1), PersonMode.Fine);
        }
        if (this.entity instanceof Monster) {
            let pos = this.gridPos.add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1 / 2));
            this.level.Entities[currentLocation] = new Monster(null, new Body(pos, 1));
        }
    }

    public setLight() {
        this.level.makeLightSource(this.gridPos, 10);
        this.level.generateLighting();
    }

    public changeMode(mode : Mode) {
        this.mode = mode;
        switch (mode) {
            case Mode.Eraser: {
                document.getElementById("gameCanvas")["style"].cursor = "url(textures/Editor/Cursors/eraser.png) 9 21, auto";
                this.selectedEntity = null;
                break;
            }
            case Mode.Entity: {
                this.selectedEntity = null;
                document.getElementById("gameCanvas")["style"].cursor = "url(textures/Editor/Cursors/adding.png) 15 15, auto";
                break;
            }
            case Mode.Wall: {
                this.selectedEntity = null;
                document.getElementById("gameCanvas")["style"].cursor = "url(textures/Editor/Cursors/adding.png) 15 15, auto";
                break;
            }
            case Mode.PosPicking: {
                document.getElementById("gameCanvas")["style"].cursor = "url(textures/Editor/Cursors/flag.png) 2 25, auto";
                break;
            }
            case Mode.Selector: {
                document.getElementById("gameCanvas")["style"].cursor = "default";
                break;
            }
            case Mode.Light: {
                this.selectedEntity = null;
                break;
            }
        }
    }

    public step() {
        this.pos = this.draw.transformBack(Control.mousePos());
        this.gridPos = this.level.gridCoordinates(this.pos);
        if(Control.isMouseLeftPressed() && this.level.isInBounds(this.pos)) {
            switch(this.mode) {
                case Mode.Eraser: {
                    if (this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)] != null) {
                        console.log(this.level.Entities);
                        this.level.Entities.splice(this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)], 1);
                        for (let j = 0; j < this.level.Entities.length; j++) {
                            let gridCord = this.level.gridCoordinates(this.level.Entities[j].body.center);
                            this.entityLocations[JSON.stringify(gridCord, aux.replacer)] = j;
                        }
                        console.log(this.level.Entities);
                        this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)] = null;
                    }
                    break;
                }
                case Mode.Wall: {
                    this.setBlock();
                    break;
                }
                case Mode.Entity: {
                    if (this.mouseLeftButtonClicked) {
                        this.setEntity();
                        this.mouseLeftButtonClicked = false;
                    }
                    break;
                }
                case Mode.Selector: {
                    if (this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)] != null) {
                        this.selectedEntity = this.level.Entities[this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)]];
                        if (this.selectedEntity instanceof Person) {
                            ListOfPads.compileBehaviorModel(this.selectedEntity.behaviorModel);
                            ListOfPads.entityPos = this.selectedEntity.body.center;
                        }
                    }
                    break;
                }
                case Mode.PosPicking: {
                    let fixedPos = new geom.Vector(new Number(new Number(this.pos.x).toFixed(2)).valueOf(),
                        new Number(new Number(this.pos.y).toFixed(2)).valueOf());
                    ListOfPads.choosePoint(fixedPos);
                    this.changeMode(Mode.Selector);
                    break;
                }
                case Mode.Light: {
                    this.setLight();
                    break;
                }
            }
        }
        if (!Control.isMouseLeftPressed()) {
            this.mouseLeftButtonClicked = true;
        }
    }

    public display() {
        this.drawPreview.attachToCanvas();
        // Preview
        this.drawPreview.clear();
        switch (this.mode) {
            case Mode.Wall: {
                //console.log(this.tile)
                this.drawPreview.image(this.tile.image, new geom.Vector(25, 25), new geom.Vector(50, 50), 0, 0);
                if (this.tile.sub_image) {
                    this.drawPreview.image(this.tile.sub_image, new geom.Vector(25, 25), new geom.Vector(50, 50), 0, 0);
                }
                break;
            }
            case Mode.Entity: {
                this.drawPreview.image(this.entity.animation.getDefaultImage(), new geom.Vector(25, 25), new geom.Vector(50, 50), 0, 0);
                break;
            }
        }
        // Cursor on grid
        if (this.level.isInBounds(this.pos))
            this.draw.strokeRect(
                this.gridPos.mul(this.level.tileSize).add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1 / 2)),
                new geom.Vector(this.level.tileSize, this.level.tileSize),
                new Color(0, 255, 0),
                0.1
            );
    }
}