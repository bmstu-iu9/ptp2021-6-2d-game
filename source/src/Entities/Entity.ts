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
    
    constructor(game : Game, body : Body) {
        this.game = game;
        this.body = body;
        this.animation = new Animation("igor",3); // создание анимации персонажа
    }

    public step() {
        let vel = this.body.velocity;
        if (!this.commands)
            return;
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

        // Восстанавливаем комманды
        this.commands = this.AIcommands;
    }
}