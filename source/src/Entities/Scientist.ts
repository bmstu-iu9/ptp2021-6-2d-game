import { Person, PersonMode } from "./Person";
import { Game } from "../Game";
import { Body } from "./EntityAttributes/Body";
import { Animation } from "./EntityAttributes/Animation";

export class Scientist extends Person {
    constructor(game : Game, body : Body, mode : PersonMode) {
        super(game, body, mode);
        this.animation = new Animation("Scientist",8);
        this.type = "Scientist";
    }
}