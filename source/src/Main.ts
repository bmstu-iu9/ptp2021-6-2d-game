import * as geom from "./Geom";
import * as aux from "./AuxLib";
import {Draw} from "./Draw";
import { Game } from "./Game";
import { Level } from "./Level";
import { Editor } from "./Editor";
import { Instruction } from "./BehaviorModel";
import { Behavior } from "./Entities/Person";

aux.setEnvironment("https://raw.githubusercontent.com/bmstu-iu9/ptp2021-6-2d-game/master/source/env/"); // Если с Гита
//aux.setEnvironment("http://127.0.0.1:4500"); // Если локальный сервер

let canvas:HTMLCanvasElement = document.getElementById('gameCanvas') as HTMLCanvasElement;
        canvas.width=window.innerWidth ;
        canvas.height = window.innerHeight;
let draw = new Draw(canvas);
draw.cam.scale = 0.4;
Game.levels = new Map();
Game.loadMap("map.json", "map");

let game = new Game(draw);
game.makeSoldier(new geom.Vector(1, 1));
let soldier = game.makeSoldier(new geom.Vector(2.5, 1));
soldier.behaviorModel.instructions[Behavior.Normal] = new Instruction();
soldier.behaviorModel.instructions[Behavior.Normal].addGoingToPoint(new geom.Vector(1, 1));
soldier.behaviorModel.instructions[Behavior.Normal].addGoingToPoint(new geom.Vector(6, 1));
soldier.behaviorModel.instructions[Behavior.Panic] = new Instruction();
soldier.behaviorModel.instructions[Behavior.Panic].addPursuit();
soldier.behaviorModel.changeCurrentInstruction(Behavior.Normal);

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
            //console.log(Game.levels["map"]);
            
            game.entities[1].myAI.goToPoint(new geom.Vector(1, 2.5));
            console.log(Game.levels["map"].PathMatrix); 
            x = true;
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
    let editorStep = function () {
        editor.step();
        draw.clear();
        editor.display();
    }
    setInterval(editorStep, 20);
}
else
    setInterval(step, Game.dt * 1000);
