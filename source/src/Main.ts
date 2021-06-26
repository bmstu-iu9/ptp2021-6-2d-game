import { Test } from "./Test"
import * as geom from "ts-2d-geometry"

let a = new geom.Vector(1, 2);
let b = new geom.Vector(3, 4);
let c = a.plus(b);
console.log(a, b, c);