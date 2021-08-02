import { Person } from "./Person";
import { Game } from "../Game";
import { Body } from "./EntityAttributes/Body";

export class Scientist extends Person {
    constructor(game : Game, body : Body, mod : string) {
        super(game, body, mod);
    }
}