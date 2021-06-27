import * as geom from "./Geom"
import * as dr from "./Draw"
import * as gameClass from "./Game"

let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
let draw = new dr.Draw(canvas, new geom.Vector(320, 320));
let game = new gameClass.Game(draw);
game.make_person(game.make_body(new geom.Vector(0, 0), 100));

function t() {
    console.log(1);
    draw.clear();
    game.step();
}

setInterval(t, 5);
/*
import * as gameClass from "./Game"

let game = new gameClass.Game();
let autoSaveInterval: number = setInterval(() => {
    game.step();
  }, 5000);
*/
