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

//aux.setEnvironment("https://raw.githubusercontent.com/bmstu-iu9/ptp2021-6-2d-game/master/source/env/"); // Если с Гита
aux.setEnvironment("http://127.0.0.1:4500/"); // Если локальный сервер

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
        //Ray.wallIntersection(game.mimic.controlledEntity.body.center, new geom.Vector(0, 0), game);
        if (x == false) {
            // console.log(game.entities[1]);

            // let person = game.entities[1] as Scientist;
            // person.behaviorModel.changeCurrentInstruction("normal"); 
            // console.log(Game.levels["map"]);

            //game.entities[1].myAI.goToPoint(new geom.Vector(1, 2.5));
            //game.makeTrigger(100000000, game.entities[1]);

            console.log(game.levels["map"]);
            //Ray.pointGenerator(game.mimic.controlledEntity.body.center, new geom.Vector(0, 0));
            x = true;
        }
        if (t % 100 == 0) {
            console.log(game.entities);
            //console.log(game.entities[1].body.center, game.entities[1].myAI.Path);
            //for (let i = 0; i < game.entities[1].myAI.Path.length; i++) {
            //    console.log(game.entities[1].myAI.Path[i]);
            //    
            //}
        }
        draw.clear();
        game.step();
        game.display();
        //console.log(game.triggers[0].getCoordinates());
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
