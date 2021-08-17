import * as geom from "./Geom";
import * as aux from "./AuxLib";
import {Draw} from "./Draw";
import { Game } from "./Game";
import { Level } from "./Level";
import { Editor } from "./Editor";

aux.setEnvironment("https://raw.githubusercontent.com/bmstu-iu9/ptp2021-6-2d-game/master/source/env/"); //Эдгар, умоляю, перед сливанием приши основную ветку

let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
let draw = new Draw(canvas, new geom.Vector(640, 640));
draw.cam.scale = 0.4;
Game.levels = new Map();
Game.loadMap("map.json", "map");

let game = new Game(draw);
game.make_person(game.make_body(new geom.Vector(1, 0), 1));
game.make_person(game.make_body(new geom.Vector(2.5, 1), 1));
game.mimic.takeControl(game.entities[0]);

let x = false;
let t = 0;

// Флаг режима редактора уровней
let levelEditorMode = (document.getElementById("mode").innerHTML == "editor");

// В случае если режим игры
function step() {
    if (Game.levels["map"] != undefined) {
        t++;
        if (x == false) {
            //console.log(Game.grids["map"]);
            
            game.entities[1].myAI.goToPoint(new geom.Vector(1, 2.5));
            game.make_trigger(100000000, game.entities[1]);
            //console.log(Game.grids["map"].PathMatrix); 
            x = true;
        }
        if (t % 100 == 0) {
            console.log(game.entities[1].body.center, game.entities[1].myAI.Path);
            
        }
        draw.clear();
        game.step();
        game.display();
        //console.log(game.triggers[0].getCoordinates());
    }
}

// В случае если режим редактора
let editor = new Editor();
editor.setDraw(draw);
function editorStep() {
    editor.step();
    draw.clear();
    editor.display();
}

if (levelEditorMode)
    setInterval(editorStep, 20);
else
    setInterval(step, 20);
