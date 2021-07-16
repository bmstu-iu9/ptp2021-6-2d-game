import * as geom from "../Geom";
import { Brain } from "./EntityAttributes/Brain";
import { Body } from "./EntityAttributes/Body";
import { Animation } from "./EntityAttributes/Animation";
import { Game } from "../Game";

export class Entity {
    public game : Game;
    public body : Body;
    public brain : Brain;
    public animation : Animation;
    public commands : Map<string, boolean>;
    
    constructor(game : Game, body : Body, brain : Brain) {
        this.game = game;
        this.brain = brain;
        this.body = body;
        this.animation = new Animation("igor",3); // создание анимации персонажа
    }

    public step() {
        let vel = this.body.velocity;
        if(this.commands["MoveUp"]) {
            this.body.move(new geom.Vector(0, -vel));
        }
        if(this.commands["MoveDown"]) {
            this.body.move(new geom.Vector(0, vel));
        }
        if(this.commands["MoveRight"]) {
            this.body.move(new geom.Vector(vel, 0));
        }
        if(this.commands["MoveLeft"]) {
            this.body.move(new geom.Vector(-vel, 0));
        }   
    }
}