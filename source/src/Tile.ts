import { Keys } from "./Control";
import { Draw } from "./Draw";

export enum CollisionType {
    Empty = 0,
    CornerUL,
    CornerUR,
    CornerDL,
    CornerDR,
    Full
}

export class Tile {
    public colision = CollisionType.Empty;
    public image : HTMLImageElement;
    
    constructor(colision : CollisionType = 0, image : HTMLImageElement = null) {
        this.colision = colision;
        if (image) {
            this.image = image;
            return;
        }
        if (colision == 0) {
            this.image = Draw.loadImage("textures/Empty.png");
        }
        if (colision == 1) {
            this.image = Draw.loadImage("textures/CornerUL.png");
        }
        if (colision == 2) {
            this.image = Draw.loadImage("textures/CornerUR.png");
        }
        if (colision == 3) {
            this.image = Draw.loadImage("textures/CornerDL.png");
        }
        if (colision == 4) {
            this.image = Draw.loadImage("textures/CornerDR.png");
        }
        if (colision == 5) {
            this.image = Draw.loadImage("textures/Full.png");
        }
    }

    public setColision(colision : CollisionType) {
        this.colision = colision;
    }

    public setImage(image : HTMLImageElement) {
        this.image = image;
    }

    public clone() : Tile {
        return new Tile(this.colision, this.image);
    }
}