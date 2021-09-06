import { Entity } from "./Entity";
import { Game} from "../Game"
import { Body } from "./EntityAttributes/Body";
import { Draw, Layer } from "../Draw";
import * as geom from "../Geom";
import { Sounds } from "../Sounds";
import { AnimationState} from "../SpriteAnimation";


export class StationaryObject extends Entity {
    protected sounds: Sounds;
    protected draw: Draw;
    image: HTMLImageElement;
    constructor(game: Game, body: Body, type: string, category = "Objects") {
        super(game, body);
        this.image = Draw.loadImage("textures/" + category + "/" + type + ".png");
    }
    public display(draw: Draw) {
        if (draw) {
            draw.image(this.image, this.body.center.sub(new geom.Vector(0, 0.5 - this.body.collisionBox.y / 2)), new geom.Vector(1, 1), 0, Layer.EntityLayer);
            this.draw = draw;
        }
    }
    public die() {
        super.die();
        this.draw.spriteAnimation(
            "Explosion", 16,
            new AnimationState(this.body.center, new geom.Vector(2, 2), 0),
            new AnimationState(this.body.center, new geom.Vector(2, 2), 0),
            0.4, 0.4 / 16
        );
    }
}