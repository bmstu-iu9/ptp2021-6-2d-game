import { Person, PersonMode } from "./Person";
import { Game } from "../Game";
import { Body } from "./EntityAttributes/Body";

export class Soldier extends Person {
    constructor(game : Game, body : Body, mode : PersonMode) {
        super(game, body, mode);
    }

    public step() {
        super.step();
        if (this.commands.commands["shoot"]) {
            // выстрелить в направлении this.commands.pointer
        }
    }
}