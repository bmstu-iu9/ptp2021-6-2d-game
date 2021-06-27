import * as bodyClass from "./Body"
import * as geom from "./Geom"
import * as animationClass from "./Animation"

export class Person {
    public body : bodyClass.Body;
    public animation : animationClass.Animation;
    
    constructor(body : bodyClass.Body) {
        this.body = body;
        this.animation = new animationClass.Animation();
    }
}