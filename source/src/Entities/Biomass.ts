import { Game } from "../Game";
import { Projectile } from "./Projectile";
import { Body } from "./EntityAttributes/Body";
import * as geom from "./../Geom";
import { Animation } from "./EntityAttributes/Animation";
import { SpriteAnimation } from "../SpriteAnimation";
import { Draw, Layer } from "../Draw";
import { Entity } from "./Entity";
import { Corpse } from "./Corpse";

export class Biomass extends Projectile {
    private velLimit = 0.01; // Скорость при которой мы считаем, что остановились
    private spriteAnimation : SpriteAnimation;
    public baseEntity : Entity;
    public alive = true;
    constructor(game : Game, body : Body, vel : geom.Vector) {
        super(game, body, vel);
        this.viscousFriction = 10;
        this.vel = this.vel.mul(this.viscousFriction);
        this.spriteAnimation = new SpriteAnimation();
        this.spriteAnimation.loadFrames("Biomass", 3);
        this.spriteAnimation.duration = 1000;
        this.spriteAnimation.frameDuration = 0.1;
    }
    public step() {
        super.step();
        this.spriteAnimation.step();
    }
    public display(draw : Draw) {
        draw.image(this.spriteAnimation.getCurrentFrame(), this.body.center, new geom.Vector(1, 1), 0, Layer.EntityLayer);
    }
    public haveStopped() : boolean {
        return this.vel.abs() < this.velLimit;
    }
    public checkTarget() : Entity {
        let target = null;
        for (let entity of this.game.entities) {
            if (entity instanceof Projectile || entity instanceof Corpse  || entity == this.baseEntity)
                continue;
            if (geom.dist(this.body.center, entity.body.center) < 1) {
                target = entity;
            }
        }
        return target;
    }
}