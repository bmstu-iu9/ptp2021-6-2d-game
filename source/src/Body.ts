import * as geom from "./Geom";
import { Game } from "./Game";

export class Body {
    public center : geom.Vector;
    public radius : number;
    public game : Game;

    constructor(center : geom.Vector, radius:number) {
        this.center = center;
        this.radius = radius;
    }

    // Checks if pos is in wall
    private check_wall(pos : geom.Vector) : boolean {
        let posRound = new geom.Vector(Math.floor(pos.x), Math.floor(pos.y));
        if (posRound.x < 0 || posRound.y < 0 || posRound.x >= this.game.grid.length || posRound.y >= this.game.grid[0].length)
            return false;
        return this.game.grid[posRound.x][posRound.y].colision > 0;
    }

    public move(a : geom.Vector) {
        let posNew = this.center.add(a);
        if (!this.check_wall(posNew))
            this.center = posNew;
    }
}