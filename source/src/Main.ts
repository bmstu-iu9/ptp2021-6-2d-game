import * as geom from "./Geom";
import {Draw} from "./Draw";
import { Game } from "./Game";
import { Level } from "./Level";

let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
let draw = new Draw(canvas, new geom.Vector(640, 640));
draw.cam.scale = 0.4;
Game.levels = new Map();
Game.loadMap("https://raw.githubusercontent.com/bmstu-iu9/ptp2021-6-2d-game/XY-fix/source/env/map.json", "map");

let game = new Game(draw);
game.make_person(game.make_body(new geom.Vector(1, 0), 1));
game.make_person(game.make_body(new geom.Vector(2.5, 1), 1));
game.mimic.takeControl(game.entities[0]);

let x = false;
let t = 0;
function step() {
    if (Game.levels["map"] != undefined) {
        t++;
        if (x == false) {
            //console.log(Game.levels["map"]);
            
            game.entities[1].myAI.goToPoint(new geom.Vector(1, 2.5));
            game.make_trigger(100000000, game.entities[1]);
            console.log(Game.levels["map"].PathMatrix); 
            x = true;
        }
        if (t % 100 == 0) {
            console.log(game.entities[1].body.center, game.entities[1].myAI.Path);
            for (let i = 0; i < game.entities[1].myAI.Path.length; i++) {
                console.log(game.entities[1].myAI.Path[i]);
                
            }
        }
        draw.clear();
        game.step();
        game.display();
        //console.log(game.triggers[0].getCoordinates());
    }
}

setInterval(step, 20);