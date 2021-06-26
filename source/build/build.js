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
define("Main", ["require", "exports", "ts-2d-geometry"], function (require, exports, geom) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var a = new geom.Vector(1, 2);
    var b = new geom.Vector(3, 4);
    var c = a.plus(b);
    console.log(a, b, c);
});
//# sourceMappingURL=build.js.map