import * as geom from "./Geom"
import * as dr from "./Draw"
import * as gameClass from "./Game"

let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
let draw = new dr.Draw(canvas, new geom.Vector(320, 320));
let game = new gameClass.Game(draw);
game.make_person(game.make_body(new geom.Vector(0, 0), 100));

function t() {
    draw.clear();
    game.step();
    game.display();
}

setInterval(t, 5);