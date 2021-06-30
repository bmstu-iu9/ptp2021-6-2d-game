import * as geom from "./Geom";
import { Game } from "./Game";
import {Tile, CollisionType} from "./Tile";

export class Body {
    public center : geom.Vector;
    public radius : number;
    public game : Game;

    constructor(center : geom.Vector, radius:number) {
        this.center = center;
        this.radius = radius;
    }
    
    public move(a : geom.Vector) {
        let posNew = this.center.add(a);
        if (!this.game.check_wall(posNew))
            this.center = posNew;
    }
}