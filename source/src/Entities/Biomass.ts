import { Game } from "../Game";
import { Projectile } from "./Projectile";
import { Body } from "./EntityAttributes/Body";
import * as geom from "./../Geom";
import { Animation } from "./EntityAttributes/Animation";
import { SpriteAnimation } from "../SpriteAnimation";
import { Draw, Layer } from "../Draw";

export class Biomass extends Projectile {
    private velLimit = 0.01; // Скорость при которой мы считаем, что остановились
    private spriteAnimation : SpriteAnimation;
    constructor(game : Game, body : Body, vel : geom.Vector) {
        super(game, body, vel);
        this.viscousFriction = 1;
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
}