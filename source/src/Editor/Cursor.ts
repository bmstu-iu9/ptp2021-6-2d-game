import { Control } from "../Control";
import { Draw, Color } from "../Draw";
import { Entity } from "../Entities/Entity";
import { Body } from "../Entities/EntityAttributes/Body";
import { Monster } from "../Entities/Monster";
import { PersonMode } from "../Entities/Person";
import { Scientist } from "../Entities/Scientist";
import { Soldier } from "../Entities/Soldier";
import * as geom from "../Geom";
import { Level } from "../Level";
import { CollisionType, Tile } from "../Tile";

export enum Mode {
    Eraser = 0,
    Wall,
    Entity,
    Selector
  }

// Курсор для редактора уровней. Хранит в себе позицию и
// информацию о том, как должен вести себя в случае клика
export class Cursor {
    public level : Level;
    public draw : Draw;
    public pos = new geom.Vector();
    public gridPos = new geom.Vector();
    public mode = Mode.Wall;
    public tile = new Tile(CollisionType.Full);
    public entity = new Entity(null, new Body(new geom.Vector(0, 0), 1));
    public drawPreview : Draw;
    private mouseLeftButtonClicked = true;


    constructor(level : Level = null, draw : Draw = null) {
        this.level = level;
        this.draw = draw;
    }

    private setBlock() {
        this.level.Grid[this.gridPos.x][this.gridPos.y] = this.tile.clone();
    }

    private setEntity() {
        if (this.entity instanceof Soldier) {
            let pos = this.gridPos.add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1/2));
            this.level.Entities[this.level.Entities.length] = new Soldier(null, new Body(pos, 1), PersonMode.Fine);
        }
        if (this.entity instanceof Scientist) {
            let pos = this.gridPos.add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1/2));
            this.level.Entities[this.level.Entities.length] = new Scientist(null, new Body(pos, 1), PersonMode.Fine);
        }
        if (this.entity instanceof Monster) {
            let pos = this.gridPos.add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1/2));
            this.level.Entities[this.level.Entities.length] = new Monster(null, new Body(pos, 1));
        }
    }

    public step() {
        this.pos = this.draw.transformBack(Control.mousePos());
        this.gridPos = this.level.gridCoordinates(this.pos);
        if(Control.isMouseLeftPressed() && this.level.isInBounds(this.pos)) {
            switch(this.mode) {
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
            }
        }
        if (!Control.isMouseLeftPressed()) {
            this.mouseLeftButtonClicked = true;
        }
    }

    public display() {
        // Preview
        this.drawPreview.clear();
        switch (this.mode) {
            case Mode.Wall: {
                this.drawPreview.image(this.tile.image, new geom.Vector(25, 25), new geom.Vector(50, 50),0,0);
                break;
            }
            case Mode.Entity: {
                this.drawPreview.image(this.entity.animation.getDefaultImage(), new geom.Vector(25, 25), new geom.Vector(50, 50),0,0);
                break;
            }
        }
        // Cursor on grid
        if(this.level.isInBounds(this.pos))
            this.draw.strokeRect(
                this.gridPos.mul(this.level.tileSize).add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1/2)), 
                new geom.Vector(this.level.tileSize, this.level.tileSize), 
                new Color(0, 255, 0),
                0.1
            );
    }
}