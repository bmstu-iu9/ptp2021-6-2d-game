import * as bodyClass from "./Body"
import * as geom from "./Geom"

export class Person {
    public body : bodyClass.Body;
    
    constructor(body : bodyClass.Body) {
        this.body = body
    }
}