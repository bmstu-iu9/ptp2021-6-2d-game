import * as geom from "./Geom";

export class Random {
    public static randomInt(a : number, b : number) : number {
        if (a < b)
            [a, b] = [b, a];
        a = Math.floor(a);
        b = Math.floor(b);
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }
  
    public static randomFloat(a : number, b : number) : number {
        if (a < b)
            [a, b] = [b, a];
        return Math.random() * (b - a) + a;
    }
  
    public static randomVector(a : geom.Vector, b : geom.Vector)  : geom.Vector {
        return new geom.Vector(
            Random.randomFloat(a.x, b.x),
            Random.randomFloat(a.y, b.y)
        );
    }
  
    public static randomSector(alpha : number, beta : number, lenMin : number, lenMax : number) : geom.Vector {
        let gamma = Random.randomFloat(alpha, beta);
        let len = Math.abs(Random.randomFloat(lenMin, lenMax));
        return geom.vectorFromAngle(gamma).mul(len);
    }
  }