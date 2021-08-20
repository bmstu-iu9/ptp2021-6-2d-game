import { Entity } from "./Entity";
import { Game } from "../Game"
import { Body } from "./EntityAttributes/Body";
import { StationaryObject } from "./StationaryObject";

export class Corpse extends StationaryObject {
    constructor(game : Game, body : Body, type : string) {
        super(game, body, type);
    }
}