import { Entity } from "./Entity";
import { Game } from "../Game"
import { Body } from "./EntityAttributes/Body";
import * as geom from "../Geom";

export class Person extends Entity {
    constructor(game : Game, body : Body, mod : string) {
        super(game, body, mod);
    }
    public step() {
        let x = 0;
        let y = 0;
        let vel = this.body.velocity;
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
        this.changedirection(x,y);
        super.step();
    }
}