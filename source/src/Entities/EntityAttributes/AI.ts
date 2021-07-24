import * as geom from "../../Geom";
import { Body } from "./Body";
import { Game } from "../../Game";

export class AI {
    private body : Body;
    public Path : geom.Vector[];
    public game : Game; 
    public personID : number;
    public commands : Map<string, boolean>;

    constructor(game : Game, personID : number, commands : Map<string, boolean>) {
        this.game = game;
        this.personID = personID;
        this.commands = commands;
    }

    private go(point : geom.Vector) {
        if (this.body.center.x < point.x) {
            this.commands["MoveRight"] = true;
        }
        else {
            this.commands["MoveRight"] = false;
        }
        if (this.body.center.x > point.x) {
            this.commands["MoveLeft"] = true;
        }
        else {
            this.commands["MoveLeft"] = false;
        }
        if (this.body.center.y < point.y) {
            this.commands["MoveDown"] = true;
        }
        else {
            this.commands["MoveDown"] = false;
        }
        if (this.body.center.y > point.y) {
            this.commands["MoveUp"] = true;
        }
        else {
            this.commands["MoveUp"] = false;
        }
    }

    public goToPoint(point : geom.Vector) {
        // TODO: Сделать перемещение к точке на карте, согласно матрице предков и сетке, вшитых в карту
    }
}