import * as geom from "./../../Geom";
import { Game } from "./../../Game";
import {Tile, CollisionType} from "./../../Tile";

export class Body {
    public center : geom.Vector; // центр коллизии объекта
    public radius : number; // радиус объекта, сейчас используется только в mimic, для того чтобы перехватывать управление
    public game : Game;
    public velocity = 0.05; // скорость объекта
    public collisionBox = new geom.Vector(0.5, 0.3);
    private collisions = 0; // Счётчик коллизий

    constructor(center : geom.Vector, radius:number) {
        this.center = center;
        this.radius = radius;
    }

    // функция передвижения с коллизионной проверкой, возвращает было ли касание со стеной
    public move(delta : geom.Vector) : boolean {
        let touched = false;
        let delta1 = delta.add(this.collisionBox.mul(1 / 2));
        let collisionUR = this.game.check_wall(this.center.add(delta1));
        let collisionUL = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(-this.collisionBox.x, 0))));
        let collisionDL = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(-this.collisionBox.x, -this.collisionBox.y))));
        let collisionDR = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(0, -this.collisionBox.y))));
        if (collisionUL == CollisionType.Full || collisionUR == CollisionType.Full || collisionDR == CollisionType.Full || collisionDL == CollisionType.Full) {
            delta = new geom.Vector();
            touched = true;
        }
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
        if (touched)
            this.collisions++;
        return touched;
    }

    public getCollisionsNumber() {
        return this.collisions;
    }
}