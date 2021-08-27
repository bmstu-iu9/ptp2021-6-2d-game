import { Person, PersonMode } from "./Person";
import { Game } from "../Game";
import { Body } from "./EntityAttributes/Body";
import { Animation } from "./EntityAttributes/Animation";
import { Weapon } from "./EntityAttributes/Weapon";
import { Color, Draw } from "../Draw";
import * as geom from "../Geom";

export class Soldier extends Person {
    public weapon = new Weapon(this);

    constructor(game : Game, body : Body, mode : PersonMode) {
        super(game, body, mode);
        this.animation = new Animation("Soldier",8);
        this.type = "Soldier";
    }

    public step() {
        if (this.commands.commands["shoot"]) {
            // выстрелить в направлении this.commands.pointer
            console.log("aa");
            this.weapon.shoot(this.commands.pointer);
        }
        this.weapon.step();
        super.step();
    }

    public display(draw : Draw) {
        super.display(draw);
        this.weapon.display(draw);
    }
}