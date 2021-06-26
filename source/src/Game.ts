import * as bodyClass from "./Body"
import * as geom from "./Geom"
import * as personClass from "./Person"
import * as controlClass from "./Control"

export class Game {
    private person = new personClass.Person(new bodyClass.Body(new geom.Vector(0, 0), 1));

    constructor() {
        controlClass.Control.init()
    }

    public step() {
        console.log(controlClass.Control.isKeyDown(controlClass.Keys.UpArrow));
        if (controlClass.Control.isKeyDown(controlClass.Keys.UpArrow))
            this.person.body.move(new geom.Vector(1, 0));
        console.log(this.person.body.center)
    }
}