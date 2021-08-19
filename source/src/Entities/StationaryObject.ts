import { Entity } from "./Entity";
import { Game } from "../Game"
import { Body } from "./EntityAttributes/Body";

export class StationaryObject extends Entity {
    constructor(game : Game, body : Body) {
        super(game, body);
    }
}