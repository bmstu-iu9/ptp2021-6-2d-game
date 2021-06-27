import * as geom from "./Geom";
import {Body} from "./Body";
import {Person} from "./Person";
import {Control, Keys} from "./Control";
import {Draw} from "./Draw";
import { Tile, ColisionType } from "./Tile";

export class Game {
    private tile_size = 50
    private draw : Draw;
    private bodies : Body [] = [];
    private people : Person [] = [];
    private map : Tile [][] = [];

    constructor(draw : Draw) {
        Control.init();
        this.draw = draw;

        let sizeX = 10;
        let sizeY = 10;
        for (let x = 0; x < sizeX; x++) {
            this.map[x] = [];
        }

        this.map[0][0] = new Tile(ColisionType.Full);
        this.map[1][1] = new Tile(ColisionType.CornerUL);
        this.map[0][1] = new Tile(ColisionType.Full);
        this.map[1][0] = new Tile(ColisionType.Full);
    }

    public make_body(coordinates : geom.Vector, radius : number) : Body {
        return this.bodies[this.bodies.length] = new Body(coordinates, radius);
    }

    public make_person(body : Body) {
        return this.people[this.people.length] = new Person(body);
    }

    public step() {
        if (this.people.length != 0) {
            if(Control.isKeyDown(Keys.UpArrow)) {
                this.people[0].body.move(new geom.Vector(0, -1));
            }
            if(Control.isKeyDown(Keys.DownArrow)) {
                this.people[0].body.move(new geom.Vector(0, 1));
            }
            if(Control.isKeyDown(Keys.RightArrow)) {
                this.people[0].body.move(new geom.Vector(1, 0));
            }
            if(Control.isKeyDown(Keys.LeftArrow)) {
                this.people[0].body.move(new geom.Vector(-1, 0));
            }
        }
    }

    public display() {
        // People
        for (let i = 0; i < this.people.length; i++) {
            this.draw.image(this.people[i].animation.current_state, this.people[i].body.center, new geom.Vector(100, 100));
        }

        // Tiles
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                this.draw.image(this.map[i][j].image,
                    new geom.Vector(this.tile_size * i, this.tile_size * j), new geom.Vector(this.tile_size, this.tile_size));
            }
        }
        for (let i = 0; i < this.people.length; i++) {
            this.draw.image(this.people[i].animation.current_state, this.people[i].body.center, new geom.Vector(100, 100));
        }
    }
}