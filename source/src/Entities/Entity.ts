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
    public myAI : AI;
    public commands : Commands = null;
    private mod : string; //маркер состояния (переименовать по необходимости)
    
    constructor(game : Game, body : Body, mod : string) {
        this.game = game;
        this.body = body;
        this.myAI = new AI(game, body);
        this.animation = new Animation("igor",3); // создание анимации персонажа
        this.mod=mod; //Маркер состояния
        this.commands = this.myAI.commands;
    }
    public changedirection(x : number,y : number){
        if(x==0 && y == 0) {
            this.animation.changedirection("stand",this.mod)
        }
        if(x==1) {
            this.animation.changedirection("right",this.mod)
        }
        if(x==-1) {
            this.animation.changedirection("left",this.mod)
        }
        if(x==0 && y == 1) {
            this.animation.changedirection("top",this.mod)
        }
        if(x==0 && y == -1) {
            this.animation.changedirection("down",this.mod)
        }
    }
    public step() {
        if (!this.commands)
            return;
        this.myAI.step();
        // Восстанавливаем комманды
        this.commands = this.myAI.commands;
    }
}