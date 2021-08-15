import { Control } from "./Control";
import { Draw } from "./Draw";
import { Level } from "./Level";
import * as geom from "./Geom";

export class Editor {
    private mousePrev : geom.Vector;
    public level : Level;
    public draw : Draw;

    constructor() {
        this.mousePrev = Control.mousePos();
    }

    public step() {
        // Mouse now
        let mouseCoords = Control.mousePos().clone();

        // Cam management
        this.draw.cam.scale *= Math.pow(1.001, -Control.wheelDelta());
        if (Control.isMousePressed()) {
            let delta = mouseCoords.sub(this.mousePrev);
            this.draw.cam.pos = this.draw.cam.pos.sub(delta.mul(1 / this.draw.cam.scale));
        }

        // Restore mouse
        this.mousePrev = mouseCoords.clone();
    }

    public display() {
        this.level.display(this.draw, true);
    }
}