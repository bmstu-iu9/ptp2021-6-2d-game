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
define("Animation", ["require", "exports", "Draw"], function (require, exports, Draw_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Animation = void 0;
    var Animation = (function () {
        function Animation() {
            this.stateMachine = [];
            this.current_state = Draw_1.Draw.loadImage("textures/img.png");
        }
        return Animation;
    }());
    exports.Animation = Animation;
});
define("Person", ["require", "exports", "Animation"], function (require, exports, Animation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Person = void 0;
    var Person = (function () {
        function Person(body) {
            this.body = body;
            this.animation = new Animation_1.Animation();
        }
        return Person;
    }());
    exports.Person = Person;
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
define("Tile", ["require", "exports", "Draw"], function (require, exports, Draw_2) {
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
            if (colision === void 0) { colision = 0; }
            this.colision = ColisionType.Empty;
            this.colision = colision;
            if (colision == 0) {
                this.image = Draw_2.Draw.loadImage("textures/Empty.png");
            }
            if (colision == 1) {
                this.image = Draw_2.Draw.loadImage("textures/CornerUL.png");
            }
            if (colision == 2) {
                this.image = Draw_2.Draw.loadImage("textures/CornerUR.png");
            }
            if (colision == 3) {
                this.image = Draw_2.Draw.loadImage("textures/CornerDL.png");
            }
            if (colision == 4) {
                this.image = Draw_2.Draw.loadImage("textures/Cornerpng");
            }
            if (colision == 5) {
                this.image = Draw_2.Draw.loadImage("textures/Full.png");
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
define("Game", ["require", "exports", "Geom", "Body", "Person", "Control", "Tile"], function (require, exports, geom, Body_1, Person_1, Control_1, Tile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    var Game = (function () {
        function Game(draw) {
            this.tile_size = 1;
            this.bodies = [];
            this.people = [];
            this.grid = [];
            Control_1.Control.init();
            this.draw = draw;
            var sizeX = 10;
            var sizeY = 10;
            for (var x = 0; x < sizeX; x++) {
                this.grid[x] = [];
                for (var y = 0; y < sizeY; y++) {
                    this.grid[x][y] = new Tile_1.Tile();
                }
            }
            this.grid[0][0] = new Tile_1.Tile(Tile_1.ColisionType.Full);
            this.grid[1][1] = new Tile_1.Tile(Tile_1.ColisionType.CornerUL);
            this.grid[0][1] = new Tile_1.Tile(Tile_1.ColisionType.Full);
            this.grid[1][0] = new Tile_1.Tile(Tile_1.ColisionType.Full);
        }
        Game.prototype.make_body = function (coordinates, radius) {
            var body = new Body_1.Body(coordinates, radius);
            body.game = this;
            return this.bodies[this.bodies.length] = body;
        };
        Game.prototype.make_person = function (body) {
            return this.people[this.people.length] = new Person_1.Person(body);
        };
        Game.prototype.step = function () {
            if (this.people.length != 0) {
                var vel = 0.01;
                if (Control_1.Control.isKeyDown(Control_1.Keys.UpArrow)) {
                    this.people[0].body.move(new geom.Vector(0, -vel));
                }
                if (Control_1.Control.isKeyDown(Control_1.Keys.DownArrow)) {
                    this.people[0].body.move(new geom.Vector(0, vel));
                }
                if (Control_1.Control.isKeyDown(Control_1.Keys.RightArrow)) {
                    this.people[0].body.move(new geom.Vector(vel, 0));
                }
                if (Control_1.Control.isKeyDown(Control_1.Keys.LeftArrow)) {
                    this.people[0].body.move(new geom.Vector(-vel, 0));
                }
            }
        };
        Game.prototype.display = function () {
            this.draw.cam.pos = new geom.Vector(0, 0);
            this.draw.cam.scale = 100;
            for (var i = 0; i < this.grid.length; i++) {
                for (var j = 0; j < this.grid[i].length; j++) {
                    var size = new geom.Vector(this.tile_size, this.tile_size);
                    this.draw.image(this.grid[i][j].image, (new geom.Vector(this.tile_size * i, this.tile_size * j)).add(size.mul(1 / 2)), size);
                }
            }
            for (var i = 0; i < this.people.length; i++) {
                this.draw.image(this.people[i].animation.current_state, this.people[i].body.center, new geom.Vector(1, 1));
            }
        };
        return Game;
    }());
    exports.Game = Game;
});
define("Body", ["require", "exports", "Geom"], function (require, exports, geom) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Body = void 0;
    var Body = (function () {
        function Body(center, radius) {
            this.center = center;
            this.radius = radius;
        }
        Body.prototype.check_wall = function (pos) {
            var posRound = new geom.Vector(Math.floor(pos.x), Math.floor(pos.y));
            if (posRound.x < 0 || posRound.y < 0 || posRound.x >= this.game.grid.length || posRound.y >= this.game.grid[0].length)
                return false;
            return this.game.grid[posRound.x][posRound.y].colision > 0;
        };
        Body.prototype.move = function (a) {
            var posNew = this.center.add(a);
            if (!this.check_wall(posNew))
                this.center = posNew;
        };
        return Body;
    }());
    exports.Body = Body;
});
define("Main", ["require", "exports", "Geom", "Draw", "Game"], function (require, exports, geom, Draw_3, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var canvas = document.getElementById('gameCanvas');
    var draw = new Draw_3.Draw(canvas, new geom.Vector(640, 640));
    var game = new Game_1.Game(draw);
    game.make_person(game.make_body(new geom.Vector(0, 0), 100));
    function t() {
        draw.clear();
        game.step();
        game.display();
    }
    setInterval(t, 5);
});
//# sourceMappingURL=build.js.map