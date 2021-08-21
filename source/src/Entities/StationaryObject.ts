import { Entity } from "./Entity";
import { Game } from "../Game"
import { Body } from "./EntityAttributes/Body";
import { Draw, Layer } from "../Draw";
import * as geom from "../Geom";

export class StationaryObject extends Entity {
    image : HTMLImageElement;
    constructor(game : Game, body : Body, type : string) {
        super(game, body);
        this.image = Draw.loadImage("textures/Corpses/" + type + ".png");
    }

    public display(draw : Draw) {
        draw.image(this.image, this.body.center, new geom.Vector(1, 1),0, Layer.EntityLayer);
    }
}