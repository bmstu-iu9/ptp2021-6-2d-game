import { Person, PersonMode } from "./Person";
import { Game } from "../Game";
import { Body } from "./EntityAttributes/Body";
import { Animation } from "./EntityAttributes/Animation";
import { Draw } from "../Draw";

export class Scientist extends Person {
    constructor(game: Game, body: Body, mode: PersonMode) {
        super(game, body, mode);
        this.animation = new Animation("Scientist", 8);
        this.type = "Scientist";
    }
    public display(draw: Draw) {
        this.displayAwareness(draw);
        super.display(draw);
    }
}