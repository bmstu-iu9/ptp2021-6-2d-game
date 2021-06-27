import { Keys } from "./Control";
import * as dr from "./Draw"

export enum ColisionType {
    Empty = 0,
    CornerUL,
    CornerUR,
    CornerDL,
    CornerDR,
    Full
}

export class Tile {
    public colision = ColisionType.Empty;
    public image : HTMLImageElement;
    
    constructor(colision : ColisionType) {
        this.colision = colision;
        if (colision == 0) {
            this.image = dr.Draw.loadImage("textures/Empty.png");
        }
        if (colision == 1) {
            this.image = dr.Draw.loadImage("textures/CornerUL.png");
        }
        if (colision == 2) {
            this.image = dr.Draw.loadImage("textures/CornerUR.png");
        }
        if (colision == 3) {
            this.image = dr.Draw.loadImage("textures/CornerDL.png");
        }
        if (colision == 4) {
            this.image = dr.Draw.loadImage("textures/CornerDR.png");
        }
        if (colision == 5) {
            this.image = dr.Draw.loadImage("textures/Full.png");
        }
    }

    public setColision(colision : ColisionType) {
        this.colision = colision;
    }

    public setImage(image : HTMLImageElement) {
        this.image = image;
    }
}