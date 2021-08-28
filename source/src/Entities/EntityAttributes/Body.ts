import * as geom from "./../../Geom";
import { Game } from "./../../Game";
import {Tile, CollisionType} from "./../../Tile";

export enum Direction{
    Right = 1,
    Up,
    Left,
    Down,
}

export class Body {
    public center : geom.Vector; // центр коллизии объекта
    public radius : number; // радиус объекта, сейчас используется только в mimic, для того чтобы перехватывать управление
    public game : Game;
    public velocity = 0.05; // скорость объекта
    public collisionBox = new geom.Vector(0.5, 0.3);
    public isWallNear = 0; 
    private collisions = 0; // Счётчик коллизий

    constructor(center : geom.Vector, radius:number) {
        this.center = center;
        this.radius = radius;
    }

    // функция передвижения с коллизионной проверкой, возвращает было ли касание со стеной
    public move(delta : geom.Vector) : boolean {
        let touched = false;
        let delta1 = delta.add(this.collisionBox.mul(1 / 2));
        let collisionDR = this.game.check_wall(this.center.add(delta1));
        let collisionDL = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(-this.collisionBox.x, 0))));
        let collisionUL = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(-this.collisionBox.x, -this.collisionBox.y))));
        let collisionUR = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(0, -this.collisionBox.y))));
        if (collisionDL == CollisionType.Full || collisionUR == CollisionType.Full || collisionDR == CollisionType.Full || collisionDL == CollisionType.Full) {
            if (collisionDR == CollisionType.Full) {
                let collisionRW = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(0, -delta.y))));
                if (collisionRW == CollisionType.Full) {
                    this.isWallNear = 1;//right wall
                } else {
                    this.isWallNear = 4;//down wall
                }
            } else if (collisionDL == CollisionType.Full) {
                let collisionLW = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(-this.collisionBox.x, -delta.y))));
                if (collisionLW == CollisionType.Full) {
                    this.isWallNear = 3;//left wall
                } else {
                    this.isWallNear = 4;//down wall
                }
            } else if (collisionUL == CollisionType.Full) {
                let collisonLW = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(-this.collisionBox.x, -(this.collisionBox.y + delta.y)))));
                if (collisonLW == CollisionType.Full) {
                    this.isWallNear = 3;
                } else {
                    this.isWallNear = 2;
                }
            } else {
                let collisonRW = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(0, -(this.collisionBox.y + delta.y)))));
                if (collisonRW == CollisionType.Full) {
                    this.isWallNear = 1;
                } else {
                    this.isWallNear = 2;
                }
            }
            delta = new geom.Vector();
            touched = true;
            console.log("boba %d", this.isWallNear);
        } else if (collisionDL != CollisionType.Empty){
            let norm : geom.Vector;
            if (collisionDL == CollisionType.CornerDL) norm = new geom.Vector(1, -1);
            if (collisionDL == CollisionType.CornerDR) norm = new geom.Vector(-1, -1);
            if (collisionDL == CollisionType.CornerUL) norm = new geom.Vector(1, 1);
            if (collisionDL == CollisionType.CornerUR) norm = new geom.Vector(-1, 1);
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