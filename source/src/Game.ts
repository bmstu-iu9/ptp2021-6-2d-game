import * as bodyClass from "./Body"
import * as geom from "./Geom"
import * as personClass from "./Person"
import * as controlClass from "./Control"
import * as dr from "./Draw"
import * as tileClass from "./Tile"

export class Game {
    private tile_size = 50
    private draw : dr.Draw;
    private bodies : bodyClass.Body [] = [];
    private people : personClass.Person [] = [];
    private map : tileClass.Tile [][] = [[]];

    constructor(draw : dr.Draw) {
        controlClass.Control.init();
        this.draw = draw;
        //this.map[0][0].setColision(tileClass.ColisionType.Full);
        //this.map[1][1].setColision(tileClass.ColisionType.CornerUL);
        //this.map[0][1].setColision(tileClass.ColisionType.Full);
        //this.map[1][0].setColision(tileClass.ColisionType.Full);
    }

    public make_body(coordinates : geom.Vector, radius : number) : bodyClass.Body {
        return this.bodies[this.bodies.length] = new bodyClass.Body(coordinates, radius);
    }

    public make_person(body : bodyClass.Body) {
        return this.people[this.people.length] = new personClass.Person(body);
    }

    public step() {
        //for (let i = 0; i < this.map.length; i++) {
        //    for (let j = 0; j < this.map[i].length; j++) {
        //        this.draw.image(this.map[i][j].image,
        //             new geom.Vector(this.tile_size * i, this.tile_size * j), new geom.Vector(this.tile_size, this.tile_size));
        //    }
        //}
        for (let i = 0; i < this.people.length; i++) {
            this.draw.image(this.people[i].animation.current_state, this.people[i].body.center, new geom.Vector(100, 100));
        }
        if (this.people.length != 0) {
            if(controlClass.Control.isKeyDown(controlClass.Keys.UpArrow)) {
                this.people[0].body.move(new geom.Vector(0, -1));
            }
            if(controlClass.Control.isKeyDown(controlClass.Keys.DownArrow)) {
                this.people[0].body.move(new geom.Vector(0, 1));
            }
            if(controlClass.Control.isKeyDown(controlClass.Keys.RightArrow)) {
                this.people[0].body.move(new geom.Vector(1, 0));
            }
            if(controlClass.Control.isKeyDown(controlClass.Keys.LeftArrow)) {
                this.people[0].body.move(new geom.Vector(-1, 0));
            }
        }
    }
}