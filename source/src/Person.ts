import * as geom from "./Geom";
import { Body } from "./Body";
import { Animation } from "./Animation";

export class Person {
    public body : Body;
    public animation : Animation;
    
    constructor(body : Body) {
        this.body = body;
        this.animation = new Animation();
    }
}