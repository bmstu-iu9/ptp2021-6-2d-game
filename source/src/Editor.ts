import { Draw } from "./Draw";
import { Level } from "./Level";

export class Editor {
    public level : Level;
    public draw : Draw;

    public step() {

    }

    public display() {
        this.level.display(this.draw, true);
    }
}