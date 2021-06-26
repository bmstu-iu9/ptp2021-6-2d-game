define("Geom", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Vector = exports.eps = void 0;
    exports.eps = 1e-9;
    var Vector = (function () {
        function Vector(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Vector.prototype.add = function (a) {
            return new Vector(this.x + a.x, this.y + a.y);
        };
        Vector.prototype.sub = function (a) {
            return new Vector(this.x - a.x, this.y - a.y);
        };
        Vector.prototype.mul = function (a) {
            return new Vector(this.x * a, this.y * a);
        };
        Vector.prototype.abs = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vector.prototype.norm = function () {
            if (this.abs() < exports.eps) {
                return new Vector(0, 0);
            }
            return this.mul(1 / this.abs());
        };
        Vector.prototype.rotate = function (angle) {
            return new Vector(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
        };
        return Vector;
    }());
    exports.Vector = Vector;
});
define("Main", ["require", "exports", "Geom"], function (require, exports, geom) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var a = new geom.Vector(3, 4);
    var b = new geom.Vector(3, -4);
    console.log(a);
    console.log(b);
    console.log(a.add(b));
    console.log(a.sub(b));
    console.log(a.mul(2));
    console.log(a.abs());
    console.log(a.norm());
    console.log(a.rotate(Math.PI / 2));
});
define("Test", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Test = void 0;
    var Test = (function () {
        function Test() {
            this.a = 0;
            this.b = 1;
        }
        return Test;
    }());
    exports.Test = Test;
});
//# sourceMappingURL=build.js.map