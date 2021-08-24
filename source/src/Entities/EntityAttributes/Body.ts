import * as geom from "./../../Geom";
import { Game } from "./../../Game";
import {Tile, CollisionType} from "./../../Tile";

export class Body {
    public center : geom.Vector; // центр коллизии объекта
    public radius : number; // радиус объекта, сейчас используется только в mimic, для того чтобы перехватывать управление
    public game : Game;
    public velocity = 0.05; // скорость объекта
    public height = 0.3; // высота прямоугольника коллизии
    public width = 0.5; // ширина прямоугольника коллизии

    constructor(center : geom.Vector, radius:number) {
        this.center = center;
        this.radius = radius;
    }

    // функция передвижения с коллизионной проверкой    
    public move(delta : geom.Vector) {
        let delta1 = delta.add(new geom.Vector(this.width / 2, this.height / 2));
        let collisionUR = this.game.check_wall(this.center.add(delta1));
        let collisionUL = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(-this.width, 0))));
        let collisionDL = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(-this.width, -this.height))));
        let collisionDR = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(0, -this.height))));
        if (collisionUL == CollisionType.Full || collisionUR == CollisionType.Full || collisionDR == CollisionType.Full || collisionDL == CollisionType.Full)
            delta = new geom.Vector();
        else if (collisionUL != CollisionType.Empty){
            let norm : geom.Vector;
            if (collisionUL == CollisionType.CornerDL) norm = new geom.Vector(1, -1);
            if (collisionUL == CollisionType.CornerDR) norm = new geom.Vector(-1, -1);
            if (collisionUL == CollisionType.CornerUL) norm = new geom.Vector(1, 1);
            if (collisionUL == CollisionType.CornerUR) norm = new geom.Vector(-1, 1);
            delta = delta.sub(norm.mul(delta.dot(norm) / norm.dot(norm))).add(norm.mul(1/10000));
        }
        let posNew = this.center.add(delta);
        this.center = posNew;
    }
}