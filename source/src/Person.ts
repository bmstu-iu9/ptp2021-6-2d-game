import * as geom from "./Geom";
import { Brain } from "./Brain";
import { Body } from "./Body";
import { Animation } from "./Animation";

export class Person {
    public body : Body;
    public brain : Brain;
    public animation : Animation;
    
    constructor(body : Body, brain : Brain) {
        this.brain = brain;
        this.body = body;
        this.animation = new Animation("igor",3); // создание персонажа
        this.animation.unitmnimik(true); //включить режим мнимика
    }
}