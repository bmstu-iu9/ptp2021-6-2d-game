import * as geom from "../Geom";
import { Body } from "./EntityAttributes/Body";
import { Animation } from "./EntityAttributes/Animation";
import { AI } from "./EntityAttributes/AI";
import { Game } from "../Game";
import { Commands } from "./EntityAttributes/Commands";

export class Entity {
    public game : Game;
    public body : Body;
    public animation : Animation;
    public entityID : number;
    public myAI : AI;
    public commands : Commands = null;
    
    constructor(game : Game, body : Body) {
        this.game = game;
        this.body = body;
        this.myAI = new AI(game, body);
        this.animation = new Animation("Scientist",8); // создание анимации персонажа
        this.commands = this.myAI.commands;
    }
    public step() {        
        if (!this.commands)
            return;
        this.myAI.step();
        // Восстанавливаем комманды
        this.commands = this.myAI.commands;
    }
}
