import * as geom from "./Geom"
import * as dr from "./Draw"

let canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
let draw = new dr.Draw(canvas, new geom.Vector(320, 320));
let img = draw.loadImage("textures/img.png");

function t() {
    console.log(1);
    draw.image(img, new geom.Vector(0, 0), new geom.Vector(100, 100));
}

setInterval(t, 2000);