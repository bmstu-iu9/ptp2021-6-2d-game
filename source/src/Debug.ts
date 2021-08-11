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
        let box = [new Vector (75,50 ),new Vector (100, 75),new Vector (100, 25)];
        game.draw.fillPolygon(box, this.color);
    }
}

export class Debug {
    private static points : Point[] = [];

    public static addPoint(place : Vector, color : Color) {
        return this.points[this.points.length] =  new Point(place, color);
    }

    public static drawPoints(game : Game) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].drawPoint(game);
        }
        this.points = [];
    }
}