import * as geom from "./Geom";
import * as aux from "./AuxLib";
import { Draw } from "./Draw";
import { Game } from "./Game";
import { Level, LightSource } from "./Level";
import { Editor } from "./Editor";
import { Instruction } from "./BehaviorModel";
import { Person } from "./Entities/Person";
import { Scientist } from "./Entities/Scientist";
import { Behavior } from "./Entities/Person";
import { Ray } from "./RayCasting";
import { Verify } from "crypto";

aux.setEnvironment("https://raw.githubusercontent.com/bmstu-iu9/ptp2021-6-2d-game/master/source/env/"); // Если с Гита
//aux.setEnvironment("http://127.0.0.1:8000/"); // Если локальный сервер

// Флаг режима редактора уровней
let levelEditorMode = (document.getElementById("mode").innerHTML == "editor");
aux.setEditorMode(levelEditorMode);
let canvas: HTMLCanvasElement = document.getElementById('gameCanvas') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let draw = new Draw(canvas);
draw.cam.scale = 10;
let game = new Game(draw);
game.levels = new Map();
Game.currentGame = game;
Game.loadMap("map.json", "map");
game.makeSoldier(new geom.Vector(1, 1));
game.mimic.takeControl(game.entities[0]);
let x = false;
let t = 0;

// В случае если режим игры
function step() {
    if (game.levels["map"] != undefined) {
        t++;
        if (x == false) {
            console.log(game.levels["map"]);
            x = true;
        }
        if (t % 100 == 0) {
            //------------------------------------------------------------------
            //                   Костыль для полного освещения
            //------------------------------------------------------------------
            // for (let i = 0; i < game.levels["map"].Grid.length; i++) {
            //     for (let j = 0; j < game.levels["map"].Grid[i].length; j++) {
            //         game.levels["map"].makeLightSource(new geom.Vector(i, j), 10);
            //     }
            // }
            //------------------------------------------------------------------
        }
        draw.clear();
        game.step();
        game.display();
    }
}
if (levelEditorMode) {
    // В случае если режим редактора
    let editor = new Editor();
    editor.setDraw(draw);
    editor.draw.resize(new geom.Vector(window.innerHeight - 30, window.innerHeight - 30));
    let editorStep = function () {
        editor.step();
        draw.clear();
        editor.display();
    }
    setInterval(editorStep, 20);
}
else
    setInterval(step, Game.dt * 1000);