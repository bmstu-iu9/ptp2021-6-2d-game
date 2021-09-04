import { Color, Draw } from "../Draw";
import { Vector } from "../Geom";

class GUIElement {
    constructor() { }
    public display(draw: Draw) { }
}

class GUIImage extends GUIElement {
    public pos: Vector;
    public image: HTMLImageElement;
    public box: Vector;

    constructor(pos: Vector, image: HTMLImageElement, box: Vector) {
        super();
        this.pos = pos;
        this.image = image;
        this.box = box;
    }

    public display(draw: Draw) {
        console.log("drawed");

        draw.drawimage(this.image, this.pos, this.box, 0, 1);
    }
}

class GUILine extends GUIElement {
    public begin: Vector;
    public end: Vector;
    public color: Color;

    constructor(begin: Vector, end: Vector, color: Color) {
        super();
        this.begin = begin;
        this.end = end;
        this.color = color;
    }

    public display(draw: Draw) {
        draw.line(this.begin, this.end, this.color, 2);
    }
}

export class EditorGUI {
    private static GUIelements: GUIElement[] = [];

    public static addImage(pos: Vector, image: HTMLImageElement, box: Vector) {
        return this.GUIelements[this.GUIelements.length] = new GUIImage(pos, image, box);
    }

    public static addLine(begin: Vector, end: Vector, color: Color) {
        return this.GUIelements[this.GUIelements.length] = new GUILine(begin, end, color);
    }

    public static display(draw: Draw) {
        console.log(this.GUIelements.length);

        for (let i = 0; i < this.GUIelements.length; i++) {
            this.GUIelements[i].display(draw);
        }

        this.GUIelements = [];
    }
}