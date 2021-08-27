import { Entity } from "./Entity";
import * as geom from "./../Geom";
import { Game } from "../Game";
import { Body } from "./EntityAttributes/Body";

export class Projectile extends Entity {
    public vel = new geom.Vector();
    public viscousFriction = 0;
    public enableBouncing = false;

    constructor(game : Game, body : Body, vel : geom.Vector) {
        super(game, body);
        this.vel = vel;
    }

    public step() {
        this.body.move(this.vel.mul(Game.dt));
        if (this.body.isWallNear != 0 && this.enableBouncing) {
            if (this.body.isWallNear == 1 || this.body.isWallNear == 3) {
                this.vel.x = - this.vel.x;
            } else if (this.body.isWallNear == 2 || this.body.isWallNear == 4) {
                this.vel.y = - this.vel.y;
            }
        }
        this.vel = this.vel.sub(this.vel.mul(this.viscousFriction * Game.dt));
    }
}