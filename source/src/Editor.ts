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

    // Двигает камеру в соответствии с движениями мышки
    private moveCamera() {
        // Сохраняем екущие координаты мыши
        let mouseCoords = Control.mousePos().clone();

        // Двигаем камеру
        this.draw.cam.scale *= Math.pow(1.001, -Control.wheelDelta());
        if (Control.isMouseRightPressed()) {
            let delta = mouseCoords.sub(this.mousePrev);
            this.draw.cam.pos = this.draw.cam.pos.sub(delta.mul(1 / this.draw.cam.scale));
        }

        // Сохраняем предыдущие координаты мыши
        this.mousePrev = mouseCoords.clone();
    }

    public step() {
        this.moveCamera();
    }

    public display() {
        this.level.display(this.draw, true);
    }
}