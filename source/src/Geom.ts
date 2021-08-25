export let eps = 1e-4;

export class Vector {
    public x : number;
    public y : number;
    
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public isEqual(a : Vector) {
        if (Math.abs(a.x - this.x) < eps && Math.abs(a.y - this.y) < eps) {
            return true;
        }
        return false;
    }

    public clone() : Vector {
        return new Vector(this.x, this.y);
    }

    public add(a : Vector) : Vector {
        return new Vector(this.x + a.x, this.y + a.y);
    }

    public sub(a : Vector) : Vector {
        return new Vector(this.x - a.x, this.y - a.y);
    }

    public mul(a : number) : Vector {
        return new Vector(this.x * a, this.y * a);
    }

    public abs() : number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public norm() : Vector {
        if (this.abs() < eps) {
            return new Vector(0, 0);
        } 
        return this.mul(1 / this.abs());
    }

    public getAngle(a : Vector) : number {
        let scalar = this.x * a.x + this.y * a.y;
        return Math.acos(scalar / this.abs() / a.abs());
    }

    public rotate(angle : number) : Vector {
        return new Vector(this.x * Math.cos(angle) - this.y * Math.sin(angle),
        this.x * Math.sin(angle) + this.y * Math.cos(angle));
    }

    public dot(v : Vector) : number {
        return this.x * v.x + this.y * v.y;
    }
}

export function vectorFromAngle(angle : number) : Vector {
    return new Vector(Math.sin(angle), Math.cos(angle));
}