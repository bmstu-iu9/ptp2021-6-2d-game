import { Person, PersonMode } from "./Person";
import { Game } from "../Game";
import { Body } from "./EntityAttributes/Body";

export class Scientist extends Person {
    constructor(game : Game, body : Body, mode : PersonMode) {
        super(game, body, mode);
    }
}