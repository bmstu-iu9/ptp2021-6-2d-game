import { Color } from "./Draw";
import { Game } from "./Game";
import { Vector } from "./Geom";

class Point {
    public place : Vector;
    public color : Color;
    constructor(place : Vector, color : Color) {
        this.place = place;
        this.color = color;
    }

    public drawPoint(game : Game) {
        let box = new Vector(0.1, 0.1);
        game.draw.fillRect(this.place, box, this.color);
    }
}

export class Debug {
    private static points : Point[] = [];

    public static addPoint(place : Vector, color : Color) {
        return this.points[this.points.length] =  new Point(place, color);
    }

    public static clear() {
        this.points = [];
    }

    public static drawPoints(game : Game) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].drawPoint(game);
        }        
    }
}
