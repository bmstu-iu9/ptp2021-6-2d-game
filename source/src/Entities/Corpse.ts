import { Entity } from "./Entity";
import { Game } from "../Game"
import { Body } from "./EntityAttributes/Body";
import { StationaryObject } from "./StationaryObject";
import { Draw } from "../Draw";
import { Sounds } from "../Sounds";
import * as geom from "../Geom";
import { AnimationState } from "../SpriteAnimation";

export class Corpse extends StationaryObject {
    constructor(game: Game, body: Body, type: string) {
        super(game, body, type, "Corpses");
        this.sounds = new Sounds(1);
        this.sounds.play("dying");
    }
    public die() {
        super.die();
        this.draw.spriteAnimation(
            "Explosion", 16,
            new AnimationState(this.body.center, new geom.Vector(2, 2), 0),
            new AnimationState(this.body.center, new geom.Vector(2, 2), 0),
            0.5, 0.5 / 3
        );
    }
}