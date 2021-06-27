import * as geom from "./Geom";
import {Draw} from "./Draw";
import { Game } from "./Game";

let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
let draw = new Draw(canvas, new geom.Vector(640, 640));
let game = new Game(draw);
game.make_person(game.make_body(new geom.Vector(0, 0), 100));

function t() {
    draw.clear();
    game.step();
    game.display();
}

setInterval(t, 5);