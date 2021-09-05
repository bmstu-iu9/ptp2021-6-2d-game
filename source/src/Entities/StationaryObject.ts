import { Entity } from "./Entity";
import { Game} from "../Game"
import { Body } from "./EntityAttributes/Body";
import { Draw, Layer } from "../Draw";
import * as geom from "../Geom";
import { Sounds } from "../Sounds";
import { AnimationState} from "../SpriteAnimation";


export class StationaryObject extends Entity {
    private sounds: Sounds;
    private draw: Draw;
    image: HTMLImageElement;
    constructor(game: Game, body: Body, type: string) {
        super(game, body);
        this.image = Draw.loadImage("textures/Corpses/" + type + ".png");
        this.sounds = new Sounds(1);
        this.sounds.play("dying");
    }
    public display(draw: Draw) {
        if (draw) {
            draw.image(this.image, this.body.center.sub(new geom.Vector(0, 0.5 - this.body.collisionBox.y / 2)), new geom.Vector(1, 1), 0, Layer.EntityLayer);
            this.draw = draw;
        }
    }
    public die() {
        this.hp = 0;
        this.alive = false;
        console.log("firrre")
        this.draw.spriteAnimation(
            "Explosion", 16,
            new AnimationState(this.body.center, new geom.Vector(2, 2), 0),
            new AnimationState(this.body.center, new geom.Vector(2, 2), 0),
            0.5, 0.5 / 3
        );
    }
}