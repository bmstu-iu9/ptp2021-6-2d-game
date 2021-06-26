import * as geom from "./Geom"

let a = new geom.Vector(3, 4);
let b = new geom.Vector(3, -4);
console.log(a);
console.log(b);
console.log(a.add(b));
console.log(a.sub(b));
console.log(a.mul(2));
console.log(a.abs());
console.log(a.norm());
console.log(a.rotate(Math.PI / 2));