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
        Draw.loadImage = function (src) {
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
        Draw.prototype.clear = function () {
            this.ctx.clearRect(-1000, -1000, 10000, 10000);
        };
        return Draw;
    }());
    exports.Draw = Draw;
});
define("Animation", ["require", "exports", "Draw"], function (require, exports, dr) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Animation = void 0;
    var Animation = (function () {
        function Animation() {
            this.stateMachine = [];
            this.current_state = dr.Draw.loadImage("textures/img.png");
        }
        return Animation;
    }());
    exports.Animation = Animation;
});
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
define("Person", ["require", "exports", "Animation"], function (require, exports, animationClass) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Person = void 0;
    var Person = (function () {
        function Person(body) {
            this.body = body;
            this.animation = new animationClass.Animation();
        }
        return Person;
    }());
    exports.Person = Person;
});
define("Tile", ["require", "exports", "Draw"], function (require, exports, dr) {
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
            if (colision == 0) {
                this.image = dr.Draw.loadImage("textures/Empty.png");
            }
            if (colision == 1) {
                this.image = dr.Draw.loadImage("textures/CornerUL.png");
            }
            if (colision == 2) {
                this.image = dr.Draw.loadImage("textures/CornerUR.png");
            }
            if (colision == 3) {
                this.image = dr.Draw.loadImage("textures/CornerDL.png");
            }
            if (colision == 4) {
                this.image = dr.Draw.loadImage("textures/CornerDR.png");
            }
            if (colision == 5) {
                this.image = dr.Draw.loadImage("textures/Full.png");
            }
        }
        Tile.prototype.setColision = function (colision) {
            this.colision = colision;
        };
        Tile.prototype.setImage = function (image) {
            this.image = image;
        };
        return Tile;
    }());
    exports.Tile = Tile;
});
define("Game", ["require", "exports", "Body", "Geom", "Person", "Control", "Tile"], function (require, exports, bodyClass, geom, personClass, controlClass, tileClass) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    var Game = (function () {
        function Game(draw) {
            this.tile_size = 50;
            this.bodies = [];
            this.people = [];
            this.map = [];
            controlClass.Control.init();
            this.draw = draw;
            var sizeX = 10;
            var sizeY = 10;
            for (var x = 0; x < sizeX; x++) {
                this.map[x] = [];
            }
            this.map[0][0] = new tileClass.Tile(tileClass.ColisionType.Full);
            this.map[1][1] = new tileClass.Tile(tileClass.ColisionType.CornerUL);
            this.map[0][1] = new tileClass.Tile(tileClass.ColisionType.Full);
            this.map[1][0] = new tileClass.Tile(tileClass.ColisionType.Full);
        }
        Game.prototype.make_body = function (coordinates, radius) {
            return this.bodies[this.bodies.length] = new bodyClass.Body(coordinates, radius);
        };
        Game.prototype.make_person = function (body) {
            return this.people[this.people.length] = new personClass.Person(body);
        };
        Game.prototype.step = function () {
            for (var i = 0; i < this.map.length; i++) {
                for (var j = 0; j < this.map[i].length; j++) {
                    this.draw.image(this.map[i][j].image, new geom.Vector(this.tile_size * i, this.tile_size * j), new geom.Vector(this.tile_size, this.tile_size));
                }
            }
            for (var i = 0; i < this.people.length; i++) {
                this.draw.image(this.people[i].animation.current_state, this.people[i].body.center, new geom.Vector(100, 100));
            }
            if (this.people.length != 0) {
                if (controlClass.Control.isKeyDown(controlClass.Keys.UpArrow)) {
                    this.people[0].body.move(new geom.Vector(0, -1));
                }
                if (controlClass.Control.isKeyDown(controlClass.Keys.DownArrow)) {
                    this.people[0].body.move(new geom.Vector(0, 1));
                }
                if (controlClass.Control.isKeyDown(controlClass.Keys.RightArrow)) {
                    this.people[0].body.move(new geom.Vector(1, 0));
                }
                if (controlClass.Control.isKeyDown(controlClass.Keys.LeftArrow)) {
                    this.people[0].body.move(new geom.Vector(-1, 0));
                }
            }
        };
        return Game;
    }());
    exports.Game = Game;
});
define("Main", ["require", "exports", "Geom", "Draw", "Game"], function (require, exports, geom, dr, gameClass) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var canvas = document.getElementById('gameCanvas');
    var draw = new dr.Draw(canvas, new geom.Vector(320, 320));
    var game = new gameClass.Game(draw);
    game.make_person(game.make_body(new geom.Vector(0, 0), 100));
    function t() {
        console.log(1);
        draw.clear();
        game.step();
    }
    setInterval(t, 5);
});
//# sourceMappingURL=build.js.map