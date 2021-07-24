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
    public image : string;
    
    constructor(colision : CollisionType = 0) {
        this.colision = colision;
        if (colision == 0) {
            this.image = "textures/Empty.png";
        }
        if (colision == 1) {
            this.image = "textures/CornerUL.png";
        }
        if (colision == 2) {
            this.image = "textures/CornerUR.png";
        }
        if (colision == 3) {
            this.image = "textures/CornerDL.png";
        }
        if (colision == 4) {
            this.image = "textures/CornerDR.png";
        }
        if (colision == 5) {
            this.image = "textures/Full.png";
        }
    }

    public setColision(colision : CollisionType) {
        this.colision = colision;
    }

    public setImage(image : string) {
        this.image = image;
    }
}