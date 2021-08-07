import { Entity } from "./Entity";
import { Game } from "../Game"
import { Body } from "./EntityAttributes/Body";
import * as geom from "../Geom";
import { Debug } from "../Debug";
import { Color } from "../Draw";

export class Person extends Entity {
    public viewRadius : number;
    public viewingAngle : number;
    public direction : geom.Vector;
    public alertLvl : number;

    constructor(game : Game, body : Body, mod : string) {
        super(game, body, mod);
        this.viewRadius = 3;
        this.viewingAngle = Math.PI / 4;
        this.direction = new geom.Vector(1, 0);
        this.alertLvl = 0; 
    }

    public upAlertLvl() {
        // Возможно нужны еще манипуляции (тревога по карте и т.д.)
        this.alertLvl++;
    }

    public checkTriggers() {
        let center = this.body.center;
        for (let i = 0; i < this.game.triggers.length; i++) {
            
            let triggerCoordinate = this.game.triggers[i].getCoordinates();
            Debug.addPoint(triggerCoordinate, new Color(0, 0, 255));
            let triggerVector = triggerCoordinate.sub(center);
            if (Math.abs(this.direction.getAngle(triggerVector)) < this.viewingAngle / 2) {
                if (triggerVector.abs() <= this.viewRadius && !this.game.triggers[i].isEntityTriggered(this)) {
                    this.upAlertLvl();
                    this.game.triggers[i].entityTriggered(this);
                }
            }
        }
    }

    public step() {
        let x = 0;
        let y = 0;
        let vel = this.body.velocity;
        //console.log("alertLvl:", this.alertLvl);
        
        if (!this.commands)
            return;
        if(this.commands["MoveUp"]) {
            y++;
            this.body.move(new geom.Vector(0, -vel));
        }
        if(this.commands["MoveDown"]) {
            y--;
            this.body.move(new geom.Vector(0, vel));
        }
        if(this.commands["MoveRight"]) {
            x++;
            this.body.move(new geom.Vector(vel, 0));
        }
        if(this.commands["MoveLeft"]) {
            x--;
            this.body.move(new geom.Vector(-vel, 0));
        }
        this.changedirection(x, y);
        this.checkTriggers();
        this.direction = new geom.Vector(x, y);
        super.step();
    }
}