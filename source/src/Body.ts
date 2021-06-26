import * as geom from "./Geom"

export class Body {
    public center : geom.Vector;
    public radius : number;

    constructor(center : geom.Vector, radius:number) {
        this.center = center;
        this.radius = radius;
    }

    public move(a : geom.Vector) {
        // TODO: colision check
        this.center = this.center.add(a);
    }
}