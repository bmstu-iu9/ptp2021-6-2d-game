import * as geom from "../Geom";
import { Body } from "./EntityAttributes/Body";
import { Animation } from "./EntityAttributes/Animation";
import { AI } from "./EntityAttributes/AI";
import { Game } from "../Game";

export class Entity {
    public game : Game;
    public body : Body;
    public animation : Animation;
    public myAI : AI;
    public commands : Map<string, boolean> = null;
    private mod : string; //маркер состояния (переименовать по необходимости)
    
    constructor(game : Game, body : Body, mod : string) {
        this.game = game;
        this.body = body;
        this.myAI = new AI(game, body);
        this.animation = new Animation("igor",3); // создание анимации персонажа
        this.mod=mod; //Маркер состояния
    }
    public changedirection(x : number,y : number){
        if(x==0 && y == 0) {
            this.animation.changedirection("stand",this.mod)
        }
        if(x==1 && y == 0) {
            this.animation.changedirection("right",this.mod)
        }
        if(x==-1 && y == 0) {
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
        let x = 0;
        let y = 0;
        let vel = this.body.velocity;
        if (!this.commands)
            return;
        if(this.commands["MoveUp"]) {
            y++;
            this.body.move(new geom.Vector(0, -vel));
        }
        if(this.commands["MoveDown"]) {
            y--;
            this.body.move(new geom.Vector(0, vel));
        }
        if(this.commands["MoveRight"]) {
            x++;
            this.body.move(new geom.Vector(vel, 0));
        }
        if(this.commands["MoveLeft"]) {
            x--;
            this.body.move(new geom.Vector(-vel, 0));
        }
        this.changedirection(x,y);
        this.myAI.step();
        // Восстанавливаем комманды
        this.commands = this.myAI.commands;
    }
}