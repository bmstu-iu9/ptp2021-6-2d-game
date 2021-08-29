import * as geom from "./Geom";

export class Random {

    public static randomInt(a : number, b : number) : number {
        if (a > b) {
            [a, b] = [b, a];
        }
        a = Math.ceil(a);
        b = Math.floor(b);
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }
  
    public static randomFloat(a : number, b : number) : number {
        if (a > b) {
          [a, b] = [b, a];
        }
        return Math.random() * (b - a) + a;
    }
  
    public static randomVector(a : geom.Vector, b : geom.Vector)  : geom.Vector {
        let x = 0;
        let y = 0;
        x = Random.randomFloat(a.x, b.x);
        y = Random.randomFloat(a.y, b.y);
        return new geom.Vector(x, y);
    }
  
    public static randomSector(alpha : number, beta : number, lenMin : number, lenMax : number) : geom.Vector {
        let gamma = 0;
        let y = 0;
        gamma = Random.randomFloat(alpha, beta);
        y = Math.abs(Random.randomFloat(lenMin, lenMax));
        let e = geom.vectorFromAngle(gamma);
        e = e.mul(y);
        return e;
    }
  }