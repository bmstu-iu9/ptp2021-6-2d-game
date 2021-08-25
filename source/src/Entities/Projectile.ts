import { Entity } from "./Entity";
import * as geom from "./../Geom";
import { Game } from "../Game";
import { Body } from "./EntityAttributes/Body";

export class Projectile extends Entity {
    public vel = new geom.Vector();
    public viscousFriction = 0;

    constructor(game : Game, body : Body, vel : geom.Vector) {
        super(game, body);
        this.vel = vel;
    }

    public step() {
        this.body.move(this.vel.mul(Game.dt));
        this.vel = this.vel.sub(this.vel.mul(this.viscousFriction * Game.dt));
    }
}