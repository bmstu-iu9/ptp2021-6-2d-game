import { Person, PersonMode } from "./Person";
import { Game } from "../Game";
import { Body } from "./EntityAttributes/Body";
import { Animation } from "./EntityAttributes/Animation";

export class Monster extends Person {
    constructor(game: Game, body: Body) {
        super(game, body, PersonMode.Fine);
        this.animation = new Animation("Monster", 8);
        this.hpThresholdCorrupted = this.hpThresholdDying = 0;
        this.viewRadius = -1; // Костыль чтобы awareness не работало
    }
}