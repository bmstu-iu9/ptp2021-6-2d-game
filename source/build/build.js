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
        Vector.prototype.clone = function () {
            return new Vector(this.x, this.y);
        };
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
<<<<<<< HEAD
define("Draw", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Draw = exports.Camera = void 0;
    var Camera = (function () {
        function Camera() {
        }
        return Camera;
    }());
    exports.Camera = Camera;
    var Draw = (function () {
        function Draw(canvas, size) {
            this.cam = new Camera();
            this.canvas = canvas;
            canvas.width = size.x;
            canvas.height = size.y;
            this.ctx = canvas.getContext("2d");
            this.cam.scale = 1;
            this.cam.pos = size.mul(1 / 2);
            this.cam.center = size.mul(1 / 2);
        }
        Draw.prototype.loadImage = function (src) {
            var image = new Image();
            image.src = src;
            return image;
        };
        Draw.prototype.image = function (image, pos, box, angle) {
            if (angle === void 0) { angle = 0; }
            var posNew = pos.clone();
            posNew = posNew.sub(this.cam.pos);
            posNew = posNew.mul(this.cam.scale);
            posNew = posNew.add(this.cam.center);
            var boxNew = box.mul(this.cam.scale);
            posNew = posNew.sub(boxNew.mul(1 / 2));
            this.ctx.drawImage(image, posNew.x, posNew.y, boxNew.x, boxNew.y);
        };
        return Draw;
    }());
    exports.Draw = Draw;
});
define("Main", ["require", "exports", "Geom", "Draw"], function (require, exports, geom, dr) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var canvas = document.getElementById('gameCanvas');
    var draw = new dr.Draw(canvas, new geom.Vector(320, 320));
    var img = draw.loadImage("textures/img.png");
    function t() {
        console.log(1);
        draw.image(img, new geom.Vector(0, 0), new geom.Vector(100, 100));
    }
    setInterval(t, 2000);
=======
define("Body", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Body = void 0;
    var Body = (function () {
        function Body(center, radius) {
            this.center = center;
            this.radius = radius;
        }
        Body.prototype.move = function (a) {
            this.center = this.center.add(a);
        };
        return Body;
    }());
    exports.Body = Body;
});
define("Control", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Control = exports.Keys = void 0;
    var Keys;
    (function (Keys) {
        Keys[Keys["LeftArrow"] = 37] = "LeftArrow";
        Keys[Keys["UpArrow"] = 38] = "UpArrow";
        Keys[Keys["RightArrow"] = 39] = "RightArrow";
        Keys[Keys["DownArrow"] = 40] = "DownArrow";
    })(Keys = exports.Keys || (exports.Keys = {}));
    var Control = (function () {
        function Control() {
        }
        Control.init = function () {
            for (var i = 0; i < 256; i++) {
                Control._keys[i] = false;
            }
            window.addEventListener("keydown", Control.onKeyDown);
            window.addEventListener("keyup", Control.onKeyUp);
        };
        Control.isKeyDown = function (key) {
            return Control._keys[key];
        };
        Control.onKeyDown = function (event) {
            Control._keys[event.keyCode] = true;
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        Control.onKeyUp = function (event) {
            Control._keys[event.keyCode] = false;
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        Control._keys = [];
        return Control;
    }());
    exports.Control = Control;
});
define("Person", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Person = void 0;
    var Person = (function () {
        function Person(body) {
            this.body = body;
        }
        return Person;
    }());
    exports.Person = Person;
});
define("Game", ["require", "exports", "Body", "Geom", "Person", "Control"], function (require, exports, bodyClass, geom, personClass, controlClass) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    var Game = (function () {
        function Game() {
            this.person = new personClass.Person(new bodyClass.Body(new geom.Vector(0, 0), 1));
            controlClass.Control.init();
        }
        Game.prototype.step = function () {
            console.log(controlClass.Control.isKeyDown(controlClass.Keys.UpArrow));
            if (controlClass.Control.isKeyDown(controlClass.Keys.UpArrow))
                this.person.body.move(new geom.Vector(1, 0));
            console.log(this.person.body.center);
        };
        return Game;
    }());
    exports.Game = Game;
});
define("Main", ["require", "exports", "Game"], function (require, exports, gameClass) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var game = new gameClass.Game();
    var autoSaveInterval = setInterval(function () {
        game.step();
    }, 5000);
>>>>>>> c39b934d3b17be1ec570df5cbf55e0f2533e5a97
});
define("Tile", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tile = exports.ColisionType = void 0;
    var ColisionType;
    (function (ColisionType) {
        ColisionType[ColisionType["Empty"] = 0] = "Empty";
        ColisionType[ColisionType["CornerUL"] = 1] = "CornerUL";
        ColisionType[ColisionType["CornerUR"] = 2] = "CornerUR";
        ColisionType[ColisionType["CornerDL"] = 3] = "CornerDL";
        ColisionType[ColisionType["CornerDR"] = 4] = "CornerDR";
        ColisionType[ColisionType["Full"] = 5] = "Full";
    })(ColisionType = exports.ColisionType || (exports.ColisionType = {}));
    var Tile = (function () {
        function Tile(colision) {
            this.colision = ColisionType.Empty;
            this.colision = colision;
        }
        return Tile;
    }());
    exports.Tile = Tile;
});
//# sourceMappingURL=build.js.map