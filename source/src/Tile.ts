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

    constructor(colision : ColisionType) {
        this.colision = colision;
    }
}