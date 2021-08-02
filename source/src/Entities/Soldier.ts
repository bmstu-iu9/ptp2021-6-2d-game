import { Person } from "./Person";
import { Game } from "../Game";
import { Body } from "./EntityAttributes/Body";

export class Soldier extends Person {
    constructor(game : Game, body : Body, mod : string) {
        super(game, body, mod);
    }

    public step() {
        super.step();
        if (this.commands.commands["shoot"]) {
            // выстрелить в направлении this.commands.pointer
        }
    }
}