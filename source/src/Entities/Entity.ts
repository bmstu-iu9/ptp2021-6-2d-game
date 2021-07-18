import * as geom from "../Geom";
import { Body } from "./EntityAttributes/Body";
import { Animation } from "./EntityAttributes/Animation";
import { Game } from "../Game";

export class Entity {
    public game : Game;
    public body : Body;
    public animation : Animation;
    private AIcommands : Map<string, boolean> = null;
    public commands : Map<string, boolean> = null;
    private mod : string; //маркер состояния (переименовать по необходимости)
    
    constructor(game : Game, body : Body,mod : string) {
        this.game = game;
        this.body = body;
        this.animation = new Animation("igor",3); // создание анимации персонажа
        this.mod=mod; //Маркер состояния
    }

    public step() {
        let vel = this.body.velocity;
        if (!this.commands)
            //this.animation.step("stand",this.mod)
            return;
        if(this.commands["MoveUp"]) {
            this.animation.changedirection("top",this.mod)
            this.body.move(new geom.Vector(0, -vel));
        }
        if(this.commands["MoveDown"]) {
            this.animation.changedirection("down",this.mod)
            this.body.move(new geom.Vector(0, vel));
        }
        if(this.commands["MoveRight"]) {
            this.animation.changedirection("right",this.mod)
            this.body.move(new geom.Vector(vel, 0));
        }
        if(this.commands["MoveLeft"]) {
            this.animation.changedirection("left",this.mod)
            this.body.move(new geom.Vector(-vel, 0));
        }

        // Восстанавливаем комманды
        this.commands = this.AIcommands;
    }
}