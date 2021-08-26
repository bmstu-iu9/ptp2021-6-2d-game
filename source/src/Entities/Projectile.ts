import { Entity } from "./Entity";
import * as geom from "./../Geom";
import { Game } from "../Game";
import { Body } from "./EntityAttributes/Body";
import { SpriteAnimation } from "../SpriteAnimation";
import { Draw, Layer } from "../Draw";

export class Projectile extends Entity {
    public vel = new geom.Vector();
    public viscousFriction = 0;
    public spriteAnimation : SpriteAnimation;
    public shouldBeKilledByWall = false; // Должен ли убиваться при ударе об стену

    constructor(game : Game, body : Body, vel : geom.Vector) {
        super(game, body);
        this.vel = vel;
    }

    public loadSpriteAnimation(name : string, frames : number) {
        this.spriteAnimation = new SpriteAnimation();
        this.spriteAnimation.loadFrames(name, frames);
        this.spriteAnimation.duration = 1000;
        this.spriteAnimation.frameDuration = 0.1;
    }
    
    public step() {
        this.body.move(this.vel.mul(Game.dt));
        this.vel = this.vel.sub(this.vel.mul(this.viscousFriction * Game.dt));
        this.spriteAnimation.step();
    }

    public display(draw : Draw) {
        draw.image(this.spriteAnimation.getCurrentFrame(), this.body.center, new geom.Vector(this.body.radius, this.body.radius), 0, Layer.EntityLayer);
    }
}