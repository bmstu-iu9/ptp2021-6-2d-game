import { Vector } from "../../Geom";

export class Commands {
    public commands : Map<string, boolean>;
    public pointer : Vector;

    constructor() {
        this.commands = new Map();
        this.pointer = new Vector();
    }
}