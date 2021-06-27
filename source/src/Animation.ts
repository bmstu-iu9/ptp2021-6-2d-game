import * as dr from "./Draw"

export class Animation {
    public current_state : HTMLImageElement;
    private stateMachine : HTMLImageElement [] = [];

    constructor() {
        this.current_state = dr.Draw.loadImage("textures/img.png");
    }
}