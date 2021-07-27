var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        Vector.prototype.dot = function (v) {
            return this.x * v.x + this.y * v.y;
        };
        return Vector;
    }());
    exports.Vector = Vector;
});
define("Control", ["require", "exports", "Geom"], function (require, exports, geom) {
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
        Control.readTextFile = function (path) {
            return __awaiter(this, void 0, void 0, function () {
                var response, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, fetch(path)];
                        case 1:
                            response = _a.sent();
                            return [4, response.text()];
                        case 2:
                            text = _a.sent();
                            return [2, text];
                    }
                });
            });
        };
        Control.loadConfig = function (path) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.readTextFile(path)
                                .then(function (result) { return result.split("\n"); })
                                .then(function (file) {
                                var type;
                                for (var i = 0; i < file.length; i++) {
                                    var currentString = file[i].split(" ");
                                    type = currentString[0];
                                    for (var j = 1; j < currentString.length; j++) {
                                        var currentKey = parseInt(currentString[j]);
                                        if (Control.keyMapping[currentKey] == undefined) {
                                            Control.keyMapping[currentKey] = [];
                                        }
                                        Control.keyMapping[currentKey][Control.keyMapping[currentKey].length] = type;
                                    }
                                    Control.commands[type] = false;
                                    Control.commandsCounter[type] = 0;
                                }
                            })];
                        case 1:
                            result = _a.sent();
                            return [2];
                    }
                });
            });
        };
        Control.init = function () {
            for (var i = 0; i < 256; i++) {
                Control._keys[i] = false;
            }
            window.addEventListener("keydown", Control.onKeyDown);
            window.addEventListener("keyup", Control.onKeyUp);
            window.addEventListener("click", Control.onClick);
            console.log("lets do it!!");
            Control.keyMapping = new Map();
            Control.commandsCounter = new Map();
            Control.commands = new Map();
            Control.loadConfig("https://raw.githubusercontent.com/bmstu-iu9/ptp2021-6-2d-game/master/source/env/keys.conf");
            console.log("Done!!", Control.keyMapping);
            console.log(Control.commands["MoveUp"]);
            console.log(Control.commands);
        };
        Control.isKeyDown = function (key) {
            return Control._keys[key];
        };
        Control.isMouseClicked = function () {
            return Control.clicked;
        };
        Control.lastMouseCoordinates = function () {
            Control.clicked = false;
            return Control.mouseCoordinates;
        };
        Control.onKeyDown = function (event) {
            if (Control.keyMapping != undefined && Control._keys[event.keyCode] == false) {
                console.log(event.key, Control.keyMapping, Control.keyMapping[event.keyCode]);
                if (Control.keyMapping[event.keyCode] == undefined) {
                    Control.keyMapping[event.keyCode] = [];
                }
                for (var i = 0; i < Control.keyMapping[event.keyCode].length; i++) {
                    var currentCommand = Control.keyMapping[event.keyCode][i];
                    Control.commandsCounter[currentCommand]++;
                    Control.commands[currentCommand] = (Control.commandsCounter[currentCommand] != 0);
                    console.log(currentCommand, Control.commandsCounter[currentCommand], Control.commands[currentCommand]);
                }
            }
            Control._keys[event.keyCode] = true;
            console.log(event.key);
            console.log(Control.commandsCounter);
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        Control.onKeyUp = function (event) {
            if (Control.keyMapping != undefined && Control._keys[event.keyCode] == true) {
                if (Control.keyMapping[event.keyCode] == undefined) {
                    Control.keyMapping[event.keyCode] = [];
                }
                for (var i = 0; i < Control.keyMapping[event.keyCode].length; i++) {
                    var currentCommand = Control.keyMapping[event.keyCode][i];
                    Control.commandsCounter[currentCommand]--;
                    Control.commands[currentCommand] = (Control.commandsCounter[currentCommand] != 0);
                }
            }
            Control._keys[event.keyCode] = false;
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        Control.onClick = function (event) {
            Control.clicked = true;
            Control.mouseCoordinates = new geom.Vector(event.x, event.y);
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        Control._keys = [];
        Control.clicked = false;
        Control.mouseCoordinates = new geom.Vector(0, 0);
        return Control;
    }());
    exports.Control = Control;
});
define("Draw", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Draw = exports.Color = exports.Camera = void 0;
    var Camera = (function () {
        function Camera() {
        }
        return Camera;
    }());
    exports.Camera = Camera;
    var Color = (function () {
        function Color(r, g, b) {
            this.r = r;
            this.g = g;
            this.b = b;
        }
        return Color;
    }());
    exports.Color = Color;
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
        Draw.prototype.transform = function (pos) {
            var posNew = pos.clone();
            posNew = posNew.sub(this.cam.pos);
            posNew = posNew.mul(this.cam.scale);
            posNew = posNew.add(this.cam.center);
            return posNew;
        };
        Draw.prototype.image = function (image, pos, box, angle) {
            if (angle === void 0) { angle = 0; }
            var posNew = this.transform(pos);
            var boxNew = box.mul(this.cam.scale);
            posNew = posNew.sub(boxNew.mul(1 / 2));
            this.ctx.drawImage(image, posNew.x, posNew.y, boxNew.x, boxNew.y);
        };
        Draw.prototype.fillRect = function (pos, box, color) {
            var posNew = this.transform(pos);
            var boxNew = box.mul(this.cam.scale);
            posNew = posNew.sub(boxNew.mul(1 / 2));
            this.ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
            this.ctx.fillRect(posNew.x, posNew.y, boxNew.x, boxNew.y);
        };
        Draw.prototype.clear = function () {
            this.ctx.clearRect(-1000, -1000, 10000, 10000);
        };
        return Draw;
    }());
    exports.Draw = Draw;
});
define("Tile", ["require", "exports", "Draw"], function (require, exports, Draw_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tile = exports.CollisionType = void 0;
    var CollisionType;
    (function (CollisionType) {
        CollisionType[CollisionType["Empty"] = 0] = "Empty";
        CollisionType[CollisionType["CornerUL"] = 1] = "CornerUL";
        CollisionType[CollisionType["CornerUR"] = 2] = "CornerUR";
        CollisionType[CollisionType["CornerDL"] = 3] = "CornerDL";
        CollisionType[CollisionType["CornerDR"] = 4] = "CornerDR";
        CollisionType[CollisionType["Full"] = 5] = "Full";
    })(CollisionType = exports.CollisionType || (exports.CollisionType = {}));
    var Tile = (function () {
        function Tile(colision) {
            if (colision === void 0) { colision = 0; }
            this.colision = CollisionType.Empty;
            this.colision = colision;
            if (colision == 0) {
                this.image = Draw_1.Draw.loadImage("textures/Empty.png");
            }
            if (colision == 1) {
                this.image = Draw_1.Draw.loadImage("textures/CornerUL.png");
            }
            if (colision == 2) {
                this.image = Draw_1.Draw.loadImage("textures/CornerUR.png");
            }
            if (colision == 3) {
                this.image = Draw_1.Draw.loadImage("textures/CornerDL.png");
            }
            if (colision == 4) {
                this.image = Draw_1.Draw.loadImage("textures/CornerDR.png");
            }
            if (colision == 5) {
                this.image = Draw_1.Draw.loadImage("textures/Full.png");
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
define("Entities/EntityAttributes/Body", ["require", "exports", "Geom", "Tile"], function (require, exports, geom, Tile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Body = void 0;
    var Body = (function () {
        function Body(center, radius) {
            this.velocity = 0.01;
            this.center = center;
            this.radius = radius;
        }
        Body.prototype.move = function (delta) {
            var collision = this.game.check_wall(this.center.add(delta));
            if (collision == Tile_1.CollisionType.Full)
                delta = new geom.Vector();
            else if (collision != Tile_1.CollisionType.Empty) {
                var norm = void 0;
                if (collision == Tile_1.CollisionType.CornerDL)
                    norm = new geom.Vector(1, -1);
                if (collision == Tile_1.CollisionType.CornerDR)
                    norm = new geom.Vector(-1, -1);
                if (collision == Tile_1.CollisionType.CornerUL)
                    norm = new geom.Vector(1, 1);
                if (collision == Tile_1.CollisionType.CornerUR)
                    norm = new geom.Vector(-1, 1);
                delta = delta.sub(norm.mul(delta.dot(norm) / norm.dot(norm))).add(norm.mul(1 / 10000));
            }
            var posNew = this.center.add(delta);
            this.center = posNew;
        };
        return Body;
    }());
    exports.Body = Body;
});
define("Entities/EntityAttributes/Animation", ["require", "exports", "Draw"], function (require, exports, Draw_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Animation = void 0;
    var Animation = (function () {
        function Animation(person, states) {
            this.stateMachine = [];
            this.counter = 0;
            this.name = person;
            this.states = states;
            this.current_state = Draw_2.Draw.loadImage("textures/" + this.name + "/right_fine_" + this.counter % this.states + ".png");
            this.mode = "fine";
            this.direction = "right";
        }
        Animation.prototype.changedirection = function (string, mode) {
            this.direction = string;
            this.mode = mode;
        };
        Animation.prototype.step = function () {
            this.counter++;
            var frame = this.counter % this.states;
            this.current_state = Draw_2.Draw.loadImage("textures/" +
                this.name + "/" +
                this.direction + "_" +
                this.mode + "_" +
                frame + ".png");
            this.direction = "stand";
        };
        return Animation;
    }());
    exports.Animation = Animation;
});
define("Entities/Entity", ["require", "exports", "Geom", "Entities/EntityAttributes/Animation"], function (require, exports, geom, Animation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Entity = void 0;
    var Entity = (function () {
        function Entity(game, body, mod) {
            this.AIcommands = null;
            this.commands = null;
            this.game = game;
            this.body = body;
            this.animation = new Animation_1.Animation("igor", 3);
            this.mod = mod;
        }
        Entity.prototype.changedirection = function (x, y) {
            if (x == 0 && y == 0) {
                this.animation.changedirection("stand", this.mod);
            }
            if (x == 1 && y == 0) {
                this.animation.changedirection("right", this.mod);
            }
            if (x == -1 && y == 0) {
                this.animation.changedirection("left", this.mod);
            }
            if (x == 0 && y == 1) {
                this.animation.changedirection("top", this.mod);
            }
            if (x == 0 && y == -1) {
                this.animation.changedirection("down", this.mod);
            }
        };
        Entity.prototype.step = function () {
            var x = 0;
            var y = 0;
            var vel = this.body.velocity;
            if (!this.commands)
                return;
            if (this.commands["MoveUp"]) {
                y++;
                this.body.move(new geom.Vector(0, -vel));
            }
            if (this.commands["MoveDown"]) {
                y--;
                this.body.move(new geom.Vector(0, vel));
            }
            if (this.commands["MoveRight"]) {
                x++;
                this.body.move(new geom.Vector(vel, 0));
            }
            if (this.commands["MoveLeft"]) {
                x--;
                this.body.move(new geom.Vector(-vel, 0));
            }
            this.changedirection(x, y);
            this.commands = this.AIcommands;
        };
        return Entity;
    }());
    exports.Entity = Entity;
});
define("Mimic", ["require", "exports", "Geom", "Control"], function (require, exports, geom, Control_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Mimic = void 0;
    var Mimic = (function () {
        function Mimic(game) {
            this.controlledEntity = null;
            this.infectionRadius = 100;
            this.game = game;
        }
        Mimic.prototype.takeControl = function (entity) {
            console.log("biba", entity);
            this.controlledEntity = entity;
        };
        Mimic.prototype.step = function () {
            this.controlledEntity.commands = Control_1.Control.commands;
            if (Control_1.Control.isMouseClicked()) {
                var coords = new geom.Vector(Control_1.Control.lastMouseCoordinates().x / this.game.draw.cam.scale, Control_1.Control.lastMouseCoordinates().y / this.game.draw.cam.scale);
                coords = coords.sub(this.game.draw.cam.center.mul(1.0 / this.game.draw.cam.scale));
                for (var i = 0; i < this.game.entities.length; i++) {
                    var target = this.game.entities[i];
                    var centerDistance = this.controlledEntity.body.center.sub(target.body.center).abs();
                    var mouseDistance = target.body.center.sub(coords).abs();
                    if ((centerDistance < this.infectionRadius) &&
                        (mouseDistance < target.body.radius) &&
                        (this.controlledEntity != target)) {
                        this.takeControl(target);
                        break;
                    }
                }
            }
        };
        return Mimic;
    }());
    exports.Mimic = Mimic;
});
define("Game", ["require", "exports", "Geom", "Entities/EntityAttributes/Body", "Entities/Entity", "Control", "Tile", "Mimic"], function (require, exports, geom, Body_1, Entity_1, Control_2, Tile_2, Mimic_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = exports.MimicMap = void 0;
    function replacer(key, value) {
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()),
            };
        }
        else {
            return value;
        }
    }
    function reviver(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (value.dataType === 'Map') {
                return new Map(value.value);
            }
        }
        return value;
    }
    var MimicMap = (function () {
        function MimicMap() {
        }
        return MimicMap;
    }());
    exports.MimicMap = MimicMap;
    var Game = (function () {
        function Game(draw) {
            this.tileSize = 1;
            this.bodies = [];
            this.entities = [];
            this.currentGridName = "map";
            this.playerID = 0;
            console.log("im here!!");
            Control_2.Control.init();
            this.draw = draw;
            this.mimic = new Mimic_1.Mimic(this);
        }
        Game.readTextFile = function (path) {
            return __awaiter(this, void 0, void 0, function () {
                var response, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, fetch(path)];
                        case 1:
                            response = _a.sent();
                            return [4, response.text()];
                        case 2:
                            text = _a.sent();
                            return [2, text];
                    }
                });
            });
        };
        Game.loadMap = function (path, name) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.readTextFile(path)
                                .then(function (result) {
                                console.log(result);
                                var grid = JSON.parse(result, reviver);
                                _this.grids[name] = grid;
                            })];
                        case 1:
                            result = _a.sent();
                            return [2];
                    }
                });
            });
        };
        Game.prototype.make_body = function (coordinates, radius) {
            var body = new Body_1.Body(coordinates, radius);
            body.game = this;
            return this.bodies[this.bodies.length] = body;
        };
        Game.prototype.make_person = function (body) {
            return this.entities[this.entities.length] = new Entity_1.Entity(this, body, "fine");
        };
        Game.prototype.step = function () {
            this.mimic.step();
            this.entities.forEach(function (entity) { return entity.animation.step(); });
            this.entities.forEach(function (entity) { return entity.step(); });
        };
        Game.prototype.check_wall = function (pos) {
            var posRound = new geom.Vector(Math.floor(pos.x / this.tileSize), Math.floor(pos.y / this.tileSize));
            if (posRound.x < 0 || posRound.y < 0 ||
                posRound.x >= Game.grids[this.currentGridName].Grid.length ||
                posRound.y >= Game.grids[this.currentGridName].Grid[0].length)
                return 0;
            var collisionType = Game.grids[this.currentGridName].Grid[posRound.x][posRound.y].colision;
            var posIn = pos.sub(posRound.mul(this.tileSize)).mul(1 / this.tileSize);
            if (collisionType == Tile_2.CollisionType.Full ||
                collisionType == Tile_2.CollisionType.CornerUR && posIn.y < posIn.x ||
                collisionType == Tile_2.CollisionType.CornerDL && posIn.y > posIn.x ||
                collisionType == Tile_2.CollisionType.CornerDR && posIn.y > 1 - posIn.x ||
                collisionType == Tile_2.CollisionType.CornerUL && posIn.y < 1 - posIn.x)
                return collisionType;
            return Tile_2.CollisionType.Empty;
        };
        Game.prototype.display = function () {
            this.draw.cam.pos = new geom.Vector(0, 0);
            this.draw.cam.scale = 100;
            for (var i = 0; i < Game.grids[this.currentGridName].Grid.length; i++) {
                for (var j = 0; j < Game.grids[this.currentGridName].Grid.length; j++) {
                    var size = new geom.Vector(this.tileSize, this.tileSize);
                    this.draw.image(Game.grids[this.currentGridName].Grid[i][j].image, (new geom.Vector(this.tileSize * j, this.tileSize * i)).add(size.mul(1 / 2)), size);
                }
            }
            for (var i = 0; i < this.entities.length; i++) {
                this.draw.image(this.entities[i].animation.current_state, this.entities[i].body.center, new geom.Vector(1, 1));
            }
        };
        return Game;
    }());
    exports.Game = Game;
});
define("Main", ["require", "exports", "Geom", "Draw", "Game"], function (require, exports, geom, Draw_3, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var canvas = document.getElementById('gameCanvas');
    var draw = new Draw_3.Draw(canvas, new geom.Vector(640, 640));
    Game_1.Game.grids = new Map();
    Game_1.Game.loadMap("https://raw.githubusercontent.com/bmstu-iu9/ptp2021-6-2d-game/Dev/source/env/map.json", "map");
    var game = new Game_1.Game(draw);
    game.make_person(game.make_body(new geom.Vector(0, 0), 1));
    game.make_person(game.make_body(new geom.Vector(0, 0), 1));
    game.mimic.takeControl(game.entities[0]);
    var x = false;
    function step() {
        if (Game_1.Game.grids["map"] != undefined) {
            if (x == false) {
                console.log(Game_1.Game.grids["map"]);
                x = true;
            }
            draw.clear();
            game.step();
            game.display();
        }
    }
    setInterval(step, 20);
});
define("Entities/EntityAttributes/AI", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AI = void 0;
    var AI = (function () {
        function AI(game, personID, commands) {
            this.game = game;
            this.personID = personID;
            this.commands = commands;
        }
        AI.prototype.go = function (point) {
            if (this.body.center.x < point.x) {
                this.commands["MoveRight"] = true;
            }
            else {
                this.commands["MoveRight"] = false;
            }
            if (this.body.center.x > point.x) {
                this.commands["MoveLeft"] = true;
            }
            else {
                this.commands["MoveLeft"] = false;
            }
            if (this.body.center.y < point.y) {
                this.commands["MoveDown"] = true;
            }
            else {
                this.commands["MoveDown"] = false;
            }
            if (this.body.center.y > point.y) {
                this.commands["MoveUp"] = true;
            }
            else {
                this.commands["MoveUp"] = false;
            }
        };
        AI.prototype.goToPoint = function (point) {
        };
        return AI;
    }());
    exports.AI = AI;
});
//# sourceMappingURL=build.js.map