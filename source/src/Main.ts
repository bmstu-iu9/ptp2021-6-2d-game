import * as geom from "./Geom";
import {Draw} from "./Draw";
import { Game } from "./Game";

let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
let draw = new Draw(canvas, new geom.Vector(640, 640));
Game.grids = new Map();
Game.loadMap("https://raw.githubusercontent.com/bmstu-iu9/ptp2021-6-2d-game/Dev/source/env/map.json", "map");

let game = new Game(draw);
game.make_person(game.make_body(new geom.Vector(0, 0), 1));
game.make_person(game.make_body(new geom.Vector(0, 0), 1));
game.mimic.takeControl(game.entities[0]);

let x = false;
function step() {
    if (Game.grids["map"] != undefined) {
        if (x == false) {
            console.log(Game.grids["map"]); 
            x = true;
        }
        draw.clear();
        game.step();
        game.display();
    }
}

setInterval(step, 20);