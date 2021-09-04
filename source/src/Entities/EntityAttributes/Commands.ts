import { Vector } from "../../Geom";

export class Commands {
    public active: Map<string, boolean>;
    public pointer: Vector;

    constructor() {
        this.active = new Map();
        this.pointer = new Vector();
    }
}