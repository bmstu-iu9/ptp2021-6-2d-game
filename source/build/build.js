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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("Geom", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dist = exports.vectorFromAngle = exports.vectorComparison = exports.Vector = exports.eps = void 0;
    exports.eps = 1e-4;
    var Vector = (function () {
        function Vector(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Vector.prototype.isEqual = function (a) {
            if (Math.abs(a.x - this.x) < exports.eps && Math.abs(a.y - this.y) < exports.eps) {
                return true;
            }
            return false;
        };
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
        Vector.prototype.getAngle = function (a) {
            var scalar = this.x * a.x + this.y * a.y;
            return Math.acos(scalar / this.abs() / a.abs());
        };
        Vector.prototype.rotate = function (angle) {
            return new Vector(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
        };
        Vector.prototype.dot = function (v) {
            return this.x * v.x + this.y * v.y;
        };
        Vector.prototype.angle = function () {
            return Math.atan2(this.y, this.x);
        };
        return Vector;
    }());
    exports.Vector = Vector;
    function vectorComparison(vec1, vec2) {
        if (vec1.x - vec2.x > -exports.eps && vec1.x - vec2.x < exports.eps) {
            if (vec1.y - vec2.y > -exports.eps && vec1.y - vec2.y < exports.eps) {
                return 0;
            }
            if (vec1.y < vec2.y) {
                return -1;
            }
            else {
                return 1;
            }
        }
        if (vec1.x < vec2.x) {
            return -1;
        }
        else {
            return 1;
        }
    }
    exports.vectorComparison = vectorComparison;
    function vectorFromAngle(angle) {
        return new Vector(Math.cos(angle), Math.sin(angle));
    }
    exports.vectorFromAngle = vectorFromAngle;
    function dist(a, b) {
        return a.sub(b).abs();
    }
    exports.dist = dist;
});
define("Entities/EntityAttributes/Commands", ["require", "exports", "Geom"], function (require, exports, Geom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Commands = void 0;
    var Commands = (function () {
        function Commands() {
            this.active = new Map();
            this.pointer = new Geom_1.Vector();
        }
        return Commands;
    }());
    exports.Commands = Commands;
});
define("Control", ["require", "exports", "Geom", "AuxLib", "Entities/EntityAttributes/Commands"], function (require, exports, geom, aux, Commands_1) {
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
                var result, vals, i, j;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(localStorage.getItem("commands") == undefined)) return [3, 2];
                            return [4, this.readTextFile(aux.environment + path)
                                    .then(function (result) {
                                    Control.keyMapping = JSON.parse(result, aux.reviver);
                                    localStorage.setItem("commands", result);
                                })
                                    .then(function (result) {
                                    var vals = Array.from(Control.keyMapping.values());
                                    for (var i = 0; i < vals.length; i++) {
                                        for (var j = 0; j < vals[i].length; j++) {
                                            Control.commands.active[vals[i][j]] = false;
                                            Control.commandsCounter[vals[i][j]] = 0;
                                        }
                                    }
                                })];
                        case 1:
                            result = _a.sent();
                            return [3, 3];
                        case 2:
                            Control.keyMapping = JSON.parse(localStorage.getItem("commands"), aux.reviver);
                            vals = Array.from(Control.keyMapping.values());
                            for (i = 0; i < vals.length; i++) {
                                for (j = 0; j < vals[i].length; j++) {
                                    Control.commands.active[vals[i][j]] = false;
                                    Control.commandsCounter[vals[i][j]] = 0;
                                }
                            }
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        Control.init = function () {
            for (var i = 0; i < 256; i++) {
                Control._keys[i] = false;
            }
            var canvas = document.getElementById("gameCanvas");
            if (!aux.editorMode) {
                window.addEventListener("keydown", Control.onKeyDown);
                window.addEventListener("keyup", Control.onKeyUp);
            }
            canvas.addEventListener("click", Control.onClick);
            window.addEventListener("wheel", Control.onWheel);
            window.addEventListener("mousemove", Control.onMouseMove);
            window.addEventListener("mousedown", Control.onMouseDown);
            window.addEventListener("mouseup", Control.onMouseUp);
            window.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
            Control.keyMapping = new Map();
            Control.commandsCounter = new Map();
            Control.commands = new Commands_1.Commands();
            Control.loadConfig("keys.json");
        };
        Control.isKeyDown = function (key) {
            return Control._keys[key];
        };
        Control.isMouseClicked = function () {
            return Control.clicked;
        };
        Control.lastMouseCoordinates = function () {
            Control.clicked = false;
            return Control.commands.pointer.clone();
        };
        Control.wheelDelta = function () {
            var delta = this.mouseWheelDelta;
            this.mouseWheelDelta = 0;
            return delta;
        };
        Control.clearWheelDelta = function () {
            this.mouseWheelDelta = 0;
        };
        Control.mousePos = function () {
            var canvas = document.getElementById("gameCanvas");
            return this.currentMousePos.sub(new geom.Vector(canvas.offsetLeft, canvas.offsetTop));
        };
        Control.isMouseLeftPressed = function () {
            return Control.mouseLeftPressed;
        };
        Control.isMouseRightPressed = function () {
            return Control.mouseRightPressed;
        };
        Control.onKeyDown = function (event) {
            if (Control.keyMapping != undefined && Control._keys[event.keyCode] == false) {
                if (Control.keyMapping.get(event.keyCode) == undefined) {
                    Control.keyMapping.set(event.keyCode, []);
                }
                for (var i = 0; i < Control.keyMapping.get(event.keyCode).length; i++) {
                    var currentCommand = Control.keyMapping.get(event.keyCode)[i];
                    Control.commandsCounter[currentCommand]++;
                    Control.commands.active[currentCommand] = (Control.commandsCounter[currentCommand] != 0);
                }
            }
            Control._keys[event.keyCode] = true;
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        Control.onKeyUp = function (event) {
            if (Control.keyMapping != undefined && Control._keys[event.keyCode] == true) {
                if (Control.keyMapping.get(event.keyCode) == undefined) {
                    Control.keyMapping.set(event.keyCode, []);
                }
                for (var i = 0; i < Control.keyMapping.get(event.keyCode).length; i++) {
                    var currentCommand = Control.keyMapping.get(event.keyCode)[i];
                    Control.commandsCounter[currentCommand]--;
                    Control.commands.active[currentCommand] = (Control.commandsCounter[currentCommand] != 0);
                }
            }
            Control._keys[event.keyCode] = false;
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        Control.onClick = function (event) {
            Control.clicked = true;
            Control.commands.pointer = new geom.Vector(event.x, event.y);
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        Control.onMouseDown = function (event) {
            if (event.button == 0)
                Control.mouseLeftPressed = true;
            if (event.button == 2)
                Control.mouseRightPressed = true;
            return false;
        };
        Control.onMouseUp = function (event) {
            if (event.button == 0)
                Control.mouseLeftPressed = false;
            if (event.button == 2)
                Control.mouseRightPressed = false;
            return false;
        };
        Control.onWheel = function (event) {
            Control.mouseWheelDelta = event.deltaY;
            return false;
        };
        Control.onMouseMove = function (event) {
            Control.currentMousePos = new geom.Vector(event.x, event.y);
            return false;
        };
        Control._keys = [];
        Control.clicked = false;
        Control.mouseLeftPressed = false;
        Control.mouseRightPressed = false;
        Control.currentMousePos = new geom.Vector();
        Control.mouseWheelDelta = 0;
        return Control;
    }());
    exports.Control = Control;
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
        function Tile(colision, image, sub_image) {
            if (colision === void 0) { colision = 0; }
            if (image === void 0) { image = null; }
            if (sub_image === void 0) { sub_image = null; }
            this.colision = CollisionType.Empty;
            this.light = 0;
            this.colision = colision;
            if (colision == 0) {
                this.image = Draw_1.Draw.loadImage("textures/tiles/Empty.png");
            }
            if (colision == 1) {
                this.image = Draw_1.Draw.loadImage("textures/tiles/CornerUL.png");
            }
            if (colision == 2) {
                this.image = Draw_1.Draw.loadImage("textures/tiles/CornerUR.png");
            }
            if (colision == 3) {
                this.image = Draw_1.Draw.loadImage("textures/tiles/CornerDL.png");
            }
            if (colision == 4) {
                this.image = Draw_1.Draw.loadImage("textures/tiles/CornerDR.png");
            }
            if (colision == 5) {
                this.image = Draw_1.Draw.loadImage("textures/tiles/Full.png");
            }
            if (image) {
                this.image = image;
            }
            if (sub_image) {
                this.sub_image = sub_image;
            }
        }
        Tile.prototype.setColision = function (colision) {
            this.colision = colision;
        };
        Tile.prototype.setImage = function (image) {
            this.image = image;
        };
        Tile.prototype.setSubImage = function (sub_image) {
            this.sub_image = sub_image;
        };
        Tile.prototype.clone = function () {
            return new Tile(this.colision, this.image, this.sub_image);
        };
        return Tile;
    }());
    exports.Tile = Tile;
});
define("Entities/EntityAttributes/Body", ["require", "exports", "Geom", "Tile"], function (require, exports, geom, Tile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Body = exports.Direction = void 0;
    var Direction;
    (function (Direction) {
        Direction[Direction["Right"] = 1] = "Right";
        Direction[Direction["Up"] = 2] = "Up";
        Direction[Direction["Left"] = 3] = "Left";
        Direction[Direction["Down"] = 4] = "Down";
    })(Direction = exports.Direction || (exports.Direction = {}));
    var Body = (function () {
        function Body(center, radius) {
            this.velocity = 0.05;
            this.collisionBox = new geom.Vector(0.5, 0.3);
            this.isWallNear = 0;
            this.collisions = 0;
            this.center = center;
            this.radius = radius;
        }
        Body.prototype.move = function (delta) {
            var touched = false;
            var delta1 = delta.add(this.collisionBox.mul(1 / 2));
            var collisionDR = this.game.checkWall(this.center.add(delta1));
            var collisionDL = this.game.checkWall(this.center.add(delta1.add(new geom.Vector(-this.collisionBox.x, 0))));
            var collisionUL = this.game.checkWall(this.center.add(delta1.add(new geom.Vector(-this.collisionBox.x, -this.collisionBox.y))));
            var collisionUR = this.game.checkWall(this.center.add(delta1.add(new geom.Vector(0, -this.collisionBox.y))));
            if (collisionDL == Tile_1.CollisionType.Full || collisionUR == Tile_1.CollisionType.Full || collisionDR == Tile_1.CollisionType.Full || collisionDL == Tile_1.CollisionType.Full) {
                if (collisionDR == Tile_1.CollisionType.Full) {
                    var collisionRW = this.game.checkWall(this.center.add(delta1.add(new geom.Vector(0, -delta.y))));
                    if (collisionRW == Tile_1.CollisionType.Full) {
                        this.isWallNear = 1;
                    }
                    else {
                        this.isWallNear = 4;
                    }
                }
                else if (collisionDL == Tile_1.CollisionType.Full) {
                    var collisionLW = this.game.checkWall(this.center.add(delta1.add(new geom.Vector(-this.collisionBox.x, -delta.y))));
                    if (collisionLW == Tile_1.CollisionType.Full) {
                        this.isWallNear = 3;
                    }
                    else {
                        this.isWallNear = 4;
                    }
                }
                else if (collisionUL == Tile_1.CollisionType.Full) {
                    var collisonLW = this.game.checkWall(this.center.add(delta1.add(new geom.Vector(-this.collisionBox.x, -(this.collisionBox.y + delta.y)))));
                    if (collisonLW == Tile_1.CollisionType.Full) {
                        this.isWallNear = 3;
                    }
                    else {
                        this.isWallNear = 2;
                    }
                }
                else {
                    var collisonRW = this.game.checkWall(this.center.add(delta1.add(new geom.Vector(0, -(this.collisionBox.y + delta.y)))));
                    if (collisonRW == Tile_1.CollisionType.Full) {
                        this.isWallNear = 1;
                    }
                    else {
                        this.isWallNear = 2;
                    }
                }
                delta = new geom.Vector();
                touched = true;
            }
            else if (collisionDL != Tile_1.CollisionType.Empty) {
                var norm = void 0;
                if (collisionDL == Tile_1.CollisionType.CornerDL)
                    norm = new geom.Vector(1, -1);
                if (collisionDL == Tile_1.CollisionType.CornerDR)
                    norm = new geom.Vector(-1, -1);
                if (collisionDL == Tile_1.CollisionType.CornerUL)
                    norm = new geom.Vector(1, 1);
                if (collisionDL == Tile_1.CollisionType.CornerUR)
                    norm = new geom.Vector(-1, 1);
                delta = delta.sub(norm.mul(delta.dot(norm) / norm.dot(norm))).add(norm.mul(1 / 10000));
            }
            var posNew = this.center.add(delta);
            this.center = posNew;
            if (touched)
                this.collisions++;
            return touched;
        };
        Body.prototype.getCollisionsNumber = function () {
            return this.collisions;
        };
        return Body;
    }());
    exports.Body = Body;
});
define("Entities/EntityAttributes/Animation", ["require", "exports", "Draw", "AuxLib"], function (require, exports, Draw_2, aux) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Animation = void 0;
    var Animation = (function () {
        function Animation(person, states) {
            this.counter = 0;
            this.cycles = aux.getMilliCount() / 75;
            this.name = person;
            this.states = states;
            this.current_state = Draw_2.Draw.loadImage("textures/" + this.name + "/right_fine_" + this.counter % this.states + ".png");
            this.mode = "fine";
            this.direction = "right";
            this.Imageloader();
        }
        Animation.prototype.Imageloader = function () {
            return __awaiter(this, void 0, void 0, function () {
                var direction, mods, _a, mods_1, mod, _b, direction_1, direct, _i;
                return __generator(this, function (_c) {
                    direction = ["top", "down", "left", "right", "stand"];
                    if (this.name == "Monster") {
                        mods = ["fine"];
                    }
                    else {
                        mods = ["corrupted", "dying", "fine"];
                    }
                    for (_a = 0, mods_1 = mods; _a < mods_1.length; _a++) {
                        mod = mods_1[_a];
                        for (_b = 0, direction_1 = direction; _b < direction_1.length; _b++) {
                            direct = direction_1[_b];
                            for (_i = 0; _i < this.states; _i++) {
                                this.getImage("textures/" +
                                    this.name + "/" +
                                    direct + "_" +
                                    mod + "_" +
                                    _i + ".png");
                            }
                        }
                    }
                    return [2];
                });
            });
        };
        Animation.prototype.getImage = function (current) {
            return Draw_2.Draw.loadImage(current);
        };
        Animation.prototype.changedirection = function (string, mode) {
            this.direction = string;
            this.mode = mode;
        };
        Animation.prototype.getDefaultImage = function () {
            return this.getImage("textures/" +
                this.name + "/" + "stand_fine_0.png");
        };
        Animation.prototype.step = function () {
            if (aux.getMilliCount() / 75 > this.cycles) {
                this.cycles = aux.getMilliCount() / 75 + 1;
                this.counter++;
            }
            var frame = this.counter % this.states;
            this.current_state = this.getImage("textures/" +
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
define("Queue", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Queue = void 0;
    var Queue = (function () {
        function Queue() {
            this.data = [];
            this.pos = 0;
        }
        Queue.prototype.push = function (elem) {
            this.data.push(elem);
        };
        Queue.prototype.pop = function () {
            this.pos++;
            return this.data[this.pos - 1];
        };
        Queue.prototype.length = function () {
            return this.data.length - this.pos;
        };
        return Queue;
    }());
    exports.Queue = Queue;
});
define("Editor/PathGenerator", ["require", "exports", "Geom", "Queue", "Tile", "AuxLib"], function (require, exports, Geom_2, Queue_1, Tile_2, aux) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PathGenerator = void 0;
    var PathGenerator = (function () {
        function PathGenerator() {
        }
        PathGenerator.fillTile = function (collisionMesh, tileInfo, place) {
            switch (tileInfo.colision) {
                case Tile_2.CollisionType.CornerDL: {
                    var k = -2;
                    for (var i = -1; i <= 1; i++) {
                        k++;
                        for (var j = -1; j <= k; j++) {
                            collisionMesh[place.x + i][place.y + j] = true;
                        }
                    }
                    break;
                }
                case Tile_2.CollisionType.CornerDR: {
                    var k = 2;
                    for (var i = -1; i <= 1; i++) {
                        k--;
                        for (var j = 1; j >= k; j--) {
                            collisionMesh[place.x + i][place.y + j] = true;
                        }
                    }
                    break;
                }
                case Tile_2.CollisionType.CornerUL: {
                    var k = 2;
                    for (var i = -1; i <= 1; i++) {
                        k--;
                        for (var j = -1; j <= k; j++) {
                            collisionMesh[place.x + i][place.y + j] = true;
                        }
                    }
                    break;
                }
                case Tile_2.CollisionType.CornerUR: {
                    var k = -2;
                    for (var i = -1; i <= 1; i++) {
                        k++;
                        for (var j = 1; j >= k; j--) {
                            collisionMesh[place.x + i][place.y + j] = true;
                        }
                    }
                    break;
                }
                case Tile_2.CollisionType.Full: {
                    for (var i = -1; i <= 1; i++) {
                        for (var j = -1; j <= 1; j++) {
                            collisionMesh[place.x + i][place.y + j] = true;
                        }
                    }
                    break;
                }
            }
        };
        PathGenerator.findNearestWays = function (collisionMesh, place, was) {
            var vertices = [];
            for (var i = -1; i <= 1; i++) {
                if (place.x + i < 0 || place.x + i >= collisionMesh.length || i == 0) {
                    continue;
                }
                if (collisionMesh[place.x + i][place.y] == false && !was[JSON.stringify(new Geom_2.Vector(place.x + i, place.y))]) {
                    vertices.push(new Geom_2.Vector(place.x + i, place.y));
                }
            }
            for (var i = -1; i <= 1; i++) {
                if (place.y + i < 0 || place.y + i >= collisionMesh[place.x].length || i == 0) {
                    continue;
                }
                if (collisionMesh[place.x][place.y + i] == false && !was[JSON.stringify(new Geom_2.Vector(place.x, place.y + i))]) {
                    vertices.push(new Geom_2.Vector(place.x, place.y + i));
                }
            }
            for (var i = -1; i <= 1; i++) {
                if (place.x + i < 0 || place.x + i >= collisionMesh.length) {
                    continue;
                }
                for (var j = -1; j <= 1; j++) {
                    if (i == 0 || j == 0) {
                        continue;
                    }
                    if (place.y + j < 0 || place.y + j >= collisionMesh[place.x + i].length) {
                        continue;
                    }
                    if (collisionMesh[place.x + i][place.y + j] == false && was[JSON.stringify(new Geom_2.Vector(place.x + i, place.y + j))] == false) {
                        vertices.push(new Geom_2.Vector(place.x + i, place.y + j));
                    }
                }
            }
            return vertices;
        };
        PathGenerator.bfsPathsFinder = function (collisionMesh) {
            var path = new Map();
            for (var i = 0; i < collisionMesh.length; i++) {
                for (var j = 0; j < collisionMesh[i].length; j++) {
                    var queue = new Queue_1.Queue();
                    var was = new Map;
                    var curPlace = new Geom_2.Vector(i, j);
                    queue.push(curPlace);
                    was[JSON.stringify(curPlace)] = true;
                    while (queue.length() != 0) {
                        var top_1 = queue.pop();
                        var vertices = this.findNearestWays(collisionMesh, top_1, was);
                        for (var k = 0; k < vertices.length; k++) {
                            if (path.get(aux.vectorStringify(vertices[k])) == undefined) {
                                path.set(aux.vectorStringify(vertices[k]), new Map());
                            }
                            path.get(aux.vectorStringify(vertices[k])).set(aux.vectorStringify(curPlace), top_1.sub(vertices[k]));
                            was[JSON.stringify(vertices[k])] = true;
                            queue.push(vertices[k]);
                        }
                    }
                }
            }
            return path;
        };
        PathGenerator.generateMatrix = function (MimicMap) {
            var collisionMap = MimicMap.Grid;
            var collisionMesh;
            var distance = new Map();
            collisionMesh = [];
            collisionMesh[0] = [];
            collisionMesh[0][0] = false;
            for (var j = 0; j < collisionMap[0].length; j++) {
                collisionMesh[0][j * 2 + 1] = false;
                collisionMesh[0][j * 2 + 2] = false;
            }
            for (var i = 0; i < collisionMap.length; i++) {
                collisionMesh[i * 2 + 1] = [];
                collisionMesh[i * 2 + 1][0] = false;
                collisionMesh[i * 2 + 2] = [];
                collisionMesh[i * 2 + 2][0] = false;
                for (var j = 0; j < collisionMap[i].length; j++) {
                    collisionMesh[i * 2 + 1][j * 2 + 1] = false;
                    collisionMesh[i * 2 + 1][j * 2 + 2] = false;
                    collisionMesh[i * 2 + 2][j * 2 + 1] = false;
                    collisionMesh[i * 2 + 2][j * 2 + 2] = false;
                }
            }
            for (var i = 0; i < collisionMap.length; i++) {
                for (var j = 0; j < collisionMap[i].length; j++) {
                    console.log(i, j, collisionMap[i][j], i * 2 + 1, j * 2 + 1);
                    this.fillTile(collisionMesh, collisionMap[i][j], new Geom_2.Vector(j * 2 + 1, i * 2 + 1));
                }
            }
            for (var i = 0; i < collisionMesh.length; i++) {
                var x = "";
                for (var j = 0; j < collisionMesh[i].length; j++) {
                    if (collisionMesh[i][j]) {
                        x += "1";
                    }
                    else {
                        x += "0";
                    }
                }
                console.log(x);
            }
            var correctPath = this.bfsPathsFinder(collisionMesh);
            MimicMap.PathMatrix = correctPath;
            MimicMap.CollisionMesh = collisionMesh;
        };
        return PathGenerator;
    }());
    exports.PathGenerator = PathGenerator;
});
define("Debug", ["require", "exports", "Geom"], function (require, exports, Geom_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Debug = void 0;
    var Point = (function () {
        function Point(place, color) {
            this.place = place;
            this.color = color;
        }
        Point.prototype.drawPoint = function (game) {
            var box = new Geom_3.Vector(0.1, 0.1);
            game.draw.fillRect(this.place, box, this.color);
        };
        return Point;
    }());
    var Debug = (function () {
        function Debug() {
        }
        Debug.addPoint = function (place, color) {
            return this.points[this.points.length] = new Point(place, color);
        };
        Debug.clear = function () {
            this.points = [];
        };
        Debug.drawPoints = function (game) {
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].drawPoint(game);
            }
        };
        Debug.points = [];
        return Debug;
    }());
    exports.Debug = Debug;
});
define("BehaviorModel", ["require", "exports", "Geom"], function (require, exports, Geom_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BehaviorModel = exports.Instruction = exports.Operations = void 0;
    var Operations;
    (function (Operations) {
        Operations[Operations["goToPoint"] = 0] = "goToPoint";
        Operations[Operations["wait"] = 1] = "wait";
        Operations[Operations["pursuit"] = 2] = "pursuit";
    })(Operations = exports.Operations || (exports.Operations = {}));
    var Instruction = (function () {
        function Instruction() {
            this.operations = [];
            this.operationsData = [];
        }
        Instruction.prototype.addGoingToPoint = function (point) {
            var place = this.operations.length;
            this.operations[place] = Operations.goToPoint;
            this.operationsData[place] = point;
        };
        Instruction.prototype.addWaiting = function (milliseconds) {
            var place = this.operations.length;
            this.operations[place] = Operations.wait;
            this.operationsData[place] = milliseconds;
        };
        Instruction.prototype.addPursuit = function () {
            var place = this.operations.length;
            this.operations[place] = Operations.pursuit;
        };
        Instruction.prototype.clone = function () {
            var copy = new Instruction();
            for (var i = 0; i < this.operations.length; i++) {
                switch (this.operations[i]) {
                    case Operations.goToPoint: {
                        copy.addGoingToPoint(this.operationsData[i].clone());
                        break;
                    }
                    case Operations.pursuit: {
                        copy.addPursuit();
                        break;
                    }
                    case Operations.wait: {
                        copy.addWaiting(this.operationsData[i]);
                        break;
                    }
                }
            }
            return copy;
        };
        return Instruction;
    }());
    exports.Instruction = Instruction;
    var BehaviorModel = (function () {
        function BehaviorModel(myAI) {
            this.operationNum = 0;
            this.instructions = new Map();
            this.myAI = myAI;
            this.instructions = new Map;
        }
        BehaviorModel.prototype.changeCurrentInstruction = function (newInstruction, refresh) {
            if (refresh === void 0) { refresh = false; }
            if (this.currentInstruction == newInstruction && !refresh)
                return;
            this.operationNum = 0;
            this.myAI.Path = [];
            this.myAI.wait(0);
            this.currentInstruction = newInstruction;
        };
        BehaviorModel.prototype.refreshInstruction = function () {
            this.changeCurrentInstruction(this.currentInstruction, true);
        };
        BehaviorModel.prototype.getCurrentInstruction = function () {
            return this.currentInstruction + "";
        };
        BehaviorModel.prototype.step = function () {
            if (this.myAI.Path.length == 0 && this.myAI.getWaitingTime() < Geom_4.eps && this.instructions.get(this.currentInstruction)) {
                console.log("here?");
                this.operationNum++;
                this.operationNum %= this.instructions.get(this.currentInstruction).operations.length;
                var operation = this.instructions.get(this.currentInstruction).operations[this.operationNum];
                var data = this.instructions.get(this.currentInstruction).operationsData[this.operationNum];
                switch (operation) {
                    case Operations.goToPoint: {
                        this.myAI.goToPoint(data);
                        break;
                    }
                    case Operations.wait: {
                        this.myAI.wait(data);
                        break;
                    }
                    case Operations.pursuit: {
                        this.myAI.pursuit();
                        break;
                    }
                }
            }
        };
        return BehaviorModel;
    }());
    exports.BehaviorModel = BehaviorModel;
});
define("Entities/Monster", ["require", "exports", "Entities/Person", "Game", "Entities/EntityAttributes/Animation"], function (require, exports, Person_1, Game_1, Animation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Monster = void 0;
    var Monster = (function (_super) {
        __extends(Monster, _super);
        function Monster(game, body) {
            var _this = _super.call(this, game, body, Person_1.PersonMode.Fine) || this;
            _this.animation = new Animation_1.Animation("Monster", 8);
            _this.hpThresholdCorrupted = _this.hpThresholdDying = 0;
            _this.viewRadius = -1;
            return _this;
        }
        Monster.prototype.step = function () {
            this.game.makeTrigger(this, 10, Game_1.Game.dt);
            _super.prototype.step.call(this);
        };
        return Monster;
    }(Person_1.Person));
    exports.Monster = Monster;
});
define("Sounds", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sounds = void 0;
    var Sounds = (function () {
        function Sounds(volume) {
            this.currentstate = false;
            this.current_sound = new Audio('./sounds/alarm.mp3');
            this.current_sound.volume = volume;
            this.time = 0;
        }
        Sounds.prototype.changestatus = function (track, volume) {
            if (volume === void 0) { volume = 1; }
            console.log(this.currentstate);
            if (this.currentstate == false) {
                this.currentstate = true;
                this.playcontinuously(track, volume);
            }
            else {
                this.currentstate = false;
                this.stop();
            }
        };
        Sounds.prototype.stop = function () {
            this.current_sound.pause();
        };
        Sounds.prototype.playcontinuously = function (track, volume) {
            if (volume === void 0) { volume = 1; }
            this.current_sound = new Audio('./sounds/' + track + '.mp3');
            this.current_sound.volume = volume;
            this.current_sound.play();
            this.current_sound.addEventListener("ended", function () {
                this.play();
            });
        };
        Sounds.prototype.play = function (track, volume) {
            if (volume === void 0) { volume = 1; }
            if (this.time == this.current_sound.currentTime)
                this.current_sound = new Audio('./sounds/' + track + '.mp3');
            this.current_sound.volume = volume;
            this.current_sound.play();
            this.time = this.current_sound.currentTime;
        };
        Sounds.prototype.playimposition = function (track, volume) {
            if (volume === void 0) { volume = 1; }
            this.current_sound = new Audio('./sounds/' + track + '.mp3');
            this.current_sound.volume = volume;
            this.current_sound.play();
        };
        return Sounds;
    }());
    exports.Sounds = Sounds;
});
define("Entities/StationaryObject", ["require", "exports", "Entities/Entity", "Draw", "Geom", "SpriteAnimation"], function (require, exports, Entity_1, Draw_3, geom, SpriteAnimation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StationaryObject = void 0;
    var StationaryObject = (function (_super) {
        __extends(StationaryObject, _super);
        function StationaryObject(game, body, type, category) {
            if (category === void 0) { category = "Objects"; }
            var _this = _super.call(this, game, body) || this;
            _this.image = Draw_3.Draw.loadImage("textures/" + category + "/" + type + ".png");
            return _this;
        }
        StationaryObject.prototype.display = function (draw) {
            if (draw) {
                draw.image(this.image, this.body.center.sub(new geom.Vector(0, 0.5 - this.body.collisionBox.y / 2)), new geom.Vector(1, 1), 0, Draw_3.Layer.EntityLayer);
                this.draw = draw;
            }
        };
        StationaryObject.prototype.die = function () {
            _super.prototype.die.call(this);
            this.draw.spriteAnimation("Explosion", 16, new SpriteAnimation_1.AnimationState(this.body.center, new geom.Vector(2, 2), 0), new SpriteAnimation_1.AnimationState(this.body.center, new geom.Vector(2, 2), 0), 0.4, 0.4 / 16);
        };
        return StationaryObject;
    }(Entity_1.Entity));
    exports.StationaryObject = StationaryObject;
});
define("Entities/Corpse", ["require", "exports", "Entities/StationaryObject", "Sounds"], function (require, exports, StationaryObject_1, Sounds_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Corpse = void 0;
    var Corpse = (function (_super) {
        __extends(Corpse, _super);
        function Corpse(game, body, type) {
            var _this = _super.call(this, game, body, type, "Corpses") || this;
            _this.sounds = new Sounds_1.Sounds(1);
            _this.sounds.play("dying");
            return _this;
        }
        return Corpse;
    }(StationaryObject_1.StationaryObject));
    exports.Corpse = Corpse;
});
define("Entities/Projectiles/Projectile", ["require", "exports", "Entities/Entity", "Geom", "Game", "SpriteAnimation", "Draw"], function (require, exports, Entity_2, geom, Game_2, SpriteAnimation_2, Draw_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Projectile = void 0;
    var Projectile = (function (_super) {
        __extends(Projectile, _super);
        function Projectile(game, body, vel) {
            var _this = _super.call(this, game, body) || this;
            _this.velLimit = 1;
            _this.vel = new geom.Vector();
            _this.viscousFriction = 0;
            _this.shouldBeKilledByWall = false;
            _this.enableBouncing = false;
            _this.vel = vel;
            return _this;
        }
        Projectile.prototype.loadSpriteAnimation = function (name, frames) {
            this.spriteAnimation = new SpriteAnimation_2.SpriteAnimation();
            this.spriteAnimation.loadFrames(name, frames);
            this.spriteAnimation.duration = 1000;
            this.spriteAnimation.frameDuration = 0.1;
        };
        Projectile.prototype.hasStopped = function () {
            return this.vel.abs() < this.velLimit;
        };
        Projectile.prototype.step = function () {
            this.body.move(this.vel.mul(Game_2.Game.dt));
            if (this.body.isWallNear != 0 && this.enableBouncing) {
                if ((this.body.isWallNear == 1 && this.vel.x > 0) ||
                    (this.body.isWallNear == 3 && this.vel.x < 0)) {
                    this.vel.x = -this.vel.x;
                }
                if ((this.body.isWallNear == 2 && this.vel.y < 0) ||
                    (this.body.isWallNear == 4 && this.vel.y > 0)) {
                    this.vel.y = -this.vel.y;
                }
            }
            this.vel = this.vel.sub(this.vel.mul(this.viscousFriction * Game_2.Game.dt));
            this.spriteAnimation.step();
        };
        Projectile.prototype.display = function (draw) {
            draw.image(this.spriteAnimation.getCurrentFrame(), this.body.center, new geom.Vector(this.body.radius, this.body.radius), 0, Draw_4.Layer.EntityLayer);
        };
        return Projectile;
    }(Entity_2.Entity));
    exports.Projectile = Projectile;
});
define("Entities/Projectiles/Biomass", ["require", "exports", "Entities/Projectiles/Projectile", "Geom", "Entities/Corpse"], function (require, exports, Projectile_1, geom, Corpse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Biomass = void 0;
    var Biomass = (function (_super) {
        __extends(Biomass, _super);
        function Biomass(game, body, vel) {
            var _this = _super.call(this, game, body, vel) || this;
            _this.viscousFriction = 10;
            _this.vel = _this.vel.mul(_this.viscousFriction);
            _this.loadSpriteAnimation("Biomass", 3);
            _this.enableBouncing = true;
            return _this;
        }
        Biomass.prototype.checkTarget = function () {
            var target = null;
            for (var _i = 0, _a = this.game.entities; _i < _a.length; _i++) {
                var entity = _a[_i];
                if (entity instanceof Projectile_1.Projectile || entity instanceof Corpse_1.Corpse || entity == this.baseEntity)
                    continue;
                if (geom.dist(this.body.center, entity.body.center) < 1) {
                    target = entity;
                }
            }
            return target;
        };
        return Biomass;
    }(Projectile_1.Projectile));
    exports.Biomass = Biomass;
});
define("Mimic", ["require", "exports", "Game", "Geom", "Control", "Entities/Person", "Entities/Monster", "Draw", "SpriteAnimation", "Entities/Projectiles/Biomass", "Sounds"], function (require, exports, Game_3, geom, Control_1, Person_2, Monster_1, Draw_5, SpriteAnimation_3, Biomass_1, Sounds_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Mimic = exports.Aim = void 0;
    var Aim = (function () {
        function Aim() {
            this.vel = 0;
            this.charge = 0;
            this.chargeMax = 5;
            this.chargingTime = 1;
            this.dir = new geom.Vector();
        }
        Aim.prototype.step = function () {
            var coords = this.mimic.game.draw.transformBack(Control_1.Control.mousePos());
            this.dir = coords.sub(this.mimic.controlledEntity.body.center).norm();
            if (Control_1.Control.isMouseLeftPressed()) {
                if (this.charge < this.chargeMax) {
                    this.charge += Game_3.Game.dt * this.chargeMax / this.chargingTime;
                }
            }
            else
                this.charge = 0;
        };
        Aim.prototype.getVel = function () {
            return this.dir.mul(this.charge);
        };
        return Aim;
    }());
    exports.Aim = Aim;
    var Mimic = (function () {
        function Mimic(game) {
            this.controlledEntity = null;
            this.infectionRadius = 100;
            this.aim = new Aim();
            this.game = game;
            this.aim.mimic = this;
            this.sounds = new Sounds_2.Sounds(1);
        }
        Mimic.prototype.takeControl = function (entity) {
            if (this.controlledEntity) {
                this.sounds.playimposition("alarm");
                this.game.draw.spriteAnimation("MimicTransfer", 3, new SpriteAnimation_3.AnimationState(this.controlledEntity.body.center, new geom.Vector(0.3, 0.3), 0), new SpriteAnimation_3.AnimationState(entity.body.center, new geom.Vector(0.3, 0.3), 0), 0.2, 0.2 / 3);
                this.game.draw.spriteAnimation("Blood", 6, new SpriteAnimation_3.AnimationState(entity.body.center, new geom.Vector(1, 1), 0), new SpriteAnimation_3.AnimationState(entity.body.center, new geom.Vector(1, 1), 0), 0.5, 0.5 / 6);
                if (this.controlledEntity instanceof Monster_1.Monster) {
                    if (this.controlledEntity) {
                        var cur = this.controlledEntity;
                        if (cur)
                            cur.sound.stop();
                    }
                    this.game.draw.spriteAnimation("MonsterDisappearance", 8, new SpriteAnimation_3.AnimationState(this.controlledEntity.body.center, new geom.Vector(1, 1), 0), new SpriteAnimation_3.AnimationState(this.controlledEntity.body.center, new geom.Vector(1, 1), 0), 0.4, 0.4 / 8);
                }
                if (this.controlledEntity instanceof Person_2.Person) {
                    this.controlledEntity.stunTime = 1;
                    this.controlledEntity.behaviorModel.refreshInstruction();
                }
            }
            if (this.controlledEntity instanceof Monster_1.Monster ||
                (this.controlledEntity instanceof Person_2.Person) &&
                    this.controlledEntity.mode == Person_2.PersonMode.Dying) {
                this.controlledEntity.die();
            }
            this.controlledEntity = entity;
        };
        Mimic.prototype.escape = function () {
            var monster = this.game.makeMonster(this.controlledEntity.body.center);
            this.controlledEntity = monster;
        };
        Mimic.prototype.ejectBiomass = function (vel) {
            var biomass = this.game.makeBiomass(this.controlledEntity.body.center, vel);
            biomass.baseEntity = this.controlledEntity;
            this.takeControl(biomass);
        };
        Mimic.prototype.isDead = function () {
            return this.controlledEntity instanceof Monster_1.Monster && !this.controlledEntity.alive;
        };
        Mimic.prototype.step = function () {
            Control_1.Control.commands.active["shoot"] = Control_1.Control.isMouseRightPressed();
            Control_1.Control.commands.pointer = this.game.draw.transformBack(Control_1.Control.mousePos()).sub(this.controlledEntity.body.center);
            this.controlledEntity.commands = Control_1.Control.commands;
            if ((this.controlledEntity instanceof Person_2.Person) && !(this.controlledEntity instanceof Monster_1.Monster)) {
                var person = this.controlledEntity;
                person.hp -= Game_3.Game.dt;
                if (person.hp < 0) {
                    this.escape();
                }
            }
            if (!Control_1.Control.isMouseLeftPressed() && this.aim.charge && !(this.controlledEntity instanceof Biomass_1.Biomass)) {
                var biomass = this.ejectBiomass(this.aim.getVel());
            }
            if (this.controlledEntity instanceof Biomass_1.Biomass) {
                var target = this.controlledEntity.checkTarget();
                if (target) {
                    this.controlledEntity.alive = false;
                    this.takeControl(target);
                }
                else if (this.controlledEntity.hasStopped()) {
                    this.controlledEntity.alive = false;
                    this.escape();
                }
            }
            this.aim.step();
        };
        Mimic.prototype.display = function (draw) {
            if (this.aim.charge) {
                var numberOfArrows = 5;
                var dist = this.aim.charge / numberOfArrows;
                for (var i = 1; i < numberOfArrows; i++) {
                    var pos = this.controlledEntity.body.center.add(this.aim.dir.mul(dist * i));
                    var arrow = Draw_5.Draw.loadImage("textures/HudElements/arrow.png");
                    draw.image(arrow, pos, new geom.Vector(1, 1), this.aim.dir.angle(), Draw_5.Layer.HudLayer);
                }
            }
        };
        return Mimic;
    }());
    exports.Mimic = Mimic;
});
define("RayCasting", ["require", "exports", "AuxLib", "Debug", "Draw", "Geom"], function (require, exports, AuxLib_1, Debug_1, Draw_6, Geom_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ray = void 0;
    var Ray = (function () {
        function Ray() {
        }
        Ray.isBetween = function (begin, middle, end) {
            return ((begin + Geom_5.eps > middle && middle + Geom_5.eps > end) ||
                (begin - Geom_5.eps < middle && middle - Geom_5.eps < end));
        };
        Ray.pointGenerator = function (begin, end) {
            var angle = end.sub(begin).angle();
            var stepVec = new Geom_5.Vector(Math.cos(angle), Math.sin(angle));
            var xPoints = [];
            xPoints[0] = begin.clone();
            if (!this.isBetween(-Geom_5.eps, stepVec.x, Geom_5.eps)) {
                if (stepVec.x < 0) {
                    xPoints[1] = new Geom_5.Vector(Math.floor(begin.x), 0);
                    xPoints[1] = begin.add(stepVec.mul((xPoints[1].x - begin.x) / stepVec.x));
                }
                else {
                    xPoints[1] = new Geom_5.Vector(Math.ceil(begin.x), 0);
                    xPoints[1] = begin.add(stepVec.mul((xPoints[1].x - begin.x) / stepVec.x));
                }
            }
            else {
                xPoints[1] = end.clone();
            }
            var yPoints = [];
            yPoints[0] = begin.clone();
            if (!this.isBetween(-Geom_5.eps, stepVec.y, Geom_5.eps)) {
                if (stepVec.y < 0) {
                    yPoints[1] = new Geom_5.Vector(0, Math.floor(begin.y));
                    yPoints[1] = begin.add(stepVec.mul((yPoints[1].y - begin.y) / stepVec.y));
                }
                else {
                    yPoints[1] = new Geom_5.Vector(0, Math.ceil(begin.y));
                    yPoints[1] = begin.add(stepVec.mul((yPoints[1].y - begin.y) / stepVec.y));
                }
            }
            else {
                yPoints[1] = end.clone();
            }
            for (var i = 1; this.isBetween(begin.x, xPoints[i].x, end.x); i++) {
                if (this.isBetween(-Geom_5.eps, stepVec.x, Geom_5.eps)) {
                    break;
                }
                if (stepVec.x < 0) {
                    xPoints[i + 1] = xPoints[i].add(new Geom_5.Vector(-1, 0));
                    xPoints[i + 1] = begin.add(stepVec.mul((xPoints[i + 1].x - begin.x) / stepVec.x));
                }
                else {
                    xPoints[i + 1] = xPoints[i].add(new Geom_5.Vector(1, 0));
                    xPoints[i + 1] = begin.add(stepVec.mul((xPoints[i + 1].x - begin.x) / stepVec.x));
                }
            }
            xPoints[xPoints.length - 1] = end.clone();
            for (var i = 1; this.isBetween(begin.y, yPoints[i].y, end.y); i++) {
                if (this.isBetween(-Geom_5.eps, stepVec.y, Geom_5.eps)) {
                    break;
                }
                if (stepVec.y < 0) {
                    yPoints[i + 1] = yPoints[i].add(new Geom_5.Vector(0, -1));
                    yPoints[i + 1] = begin.add(stepVec.mul((yPoints[i + 1].y - begin.y) / stepVec.y));
                }
                else {
                    yPoints[i + 1] = yPoints[i].add(new Geom_5.Vector(0, 1));
                    yPoints[i + 1] = begin.add(stepVec.mul((yPoints[i + 1].y - begin.y) / stepVec.y));
                }
            }
            yPoints[yPoints.length - 1] = end.clone();
            var points = AuxLib_1.mergeArray(xPoints, yPoints, Geom_5.vectorComparison);
            return points;
        };
        Ray.wallIntersection = function (begin, end, game) {
            var points = Ray.pointGenerator(begin, end);
            var midPoints = [];
            for (var i = 1; i < points.length; i++) {
                midPoints[midPoints.length] = (points[i - 1].add(points[i])).mul(1 / 2);
            }
            for (var i = 0; i < midPoints.length; i++) {
                Debug_1.Debug.addPoint(midPoints[i], new Draw_6.Color(256, 0, 0));
            }
            var answer = false;
            for (var i = 0; i < midPoints.length; i++) {
                if (game.checkWall(midPoints[i])) {
                    if (answer == false || points[i].sub(begin).abs() < answer.sub(begin).abs())
                        answer = points[i];
                    if (answer == false || points[i + 1].sub(begin).abs() < answer.sub(begin).abs())
                        answer = points[i + 1];
                }
            }
            if (answer instanceof Geom_5.Vector) {
                Debug_1.Debug.addPoint(answer, new Draw_6.Color(255, 100, 255));
            }
            return answer;
        };
        return Ray;
    }());
    exports.Ray = Ray;
});
define("Entities/Person", ["require", "exports", "Entities/Entity", "Game", "Geom", "Debug", "Draw", "BehaviorModel", "SpriteAnimation", "RayCasting", "Sounds"], function (require, exports, Entity_3, Game_4, geom, Debug_2, Draw_7, BehaviorModel_1, SpriteAnimation_4, RayCasting_1, Sounds_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Person = exports.Behavior = exports.PersonMode = void 0;
    var PersonMode;
    (function (PersonMode) {
        PersonMode[PersonMode["Fine"] = 0] = "Fine";
        PersonMode[PersonMode["Corrupted"] = 1] = "Corrupted";
        PersonMode[PersonMode["Dying"] = 2] = "Dying";
    })(PersonMode = exports.PersonMode || (exports.PersonMode = {}));
    var Behavior;
    (function (Behavior) {
        Behavior["Normal"] = "normal";
        Behavior["Panic"] = "panic";
    })(Behavior = exports.Behavior || (exports.Behavior = {}));
    var Person = (function (_super) {
        __extends(Person, _super);
        function Person(game, body, mode) {
            var _this = _super.call(this, game, body) || this;
            _this.viewRadius = 3;
            _this.awareness = 0;
            _this.awarenessThreshold = 10;
            _this.awarenessOverflow = 15;
            _this.hpThresholdCorrupted = 10;
            _this.hpThresholdDying = 5;
            _this.stunTime = 0;
            _this.type = null;
            _this.sound = new Sounds_3.Sounds(0.9);
            _this.mode = mode;
            _this.viewRadius = 5;
            _this.viewingAngle = Math.PI / 4;
            _this.direction = new geom.Vector(1, 0);
            _this.behaviorModel = new BehaviorModel_1.BehaviorModel(_this.myAI);
            _this.setModeTimings(10, 5, 5);
            _this.sound.playcontinuously("step", 1);
            _this.sound.current_sound.muted = true;
            if (game) {
                game.soundsarr.push(_this.sound);
            }
            return _this;
        }
        Person.prototype.setModeTimings = function (fine, corrupted, dying) {
            this.hpThresholdDying = dying;
            this.hpThresholdCorrupted = dying + corrupted;
            this.hpMax = dying + corrupted + fine;
            this.hp = this.hpMax;
        };
        Person.prototype.die = function () {
            if (this.type && this.alive)
                this.game.makeCorpse(this.body.center, this.type);
            _super.prototype.die.call(this);
        };
        Person.prototype.isPointVisible = function (pos) {
            return (geom.dist(this.body.center, pos) <= this.viewRadius
                && !RayCasting_1.Ray.wallIntersection(this.body.center, pos, this.game));
        };
        Person.prototype.checkTriggers = function () {
            var center = this.body.center;
            for (var i = 0; i < this.game.triggers.length; i++) {
                var trigger = this.game.triggers[i];
                var triggerCoordinate = this.game.triggers[i].getCoordinates();
                Debug_2.Debug.addPoint(triggerCoordinate, new Draw_7.Color(0, 0, 255));
                var triggerVector = triggerCoordinate.sub(center);
                if (this.isPointVisible(triggerCoordinate)) {
                    if (this.game.mimic.controlledEntity.entityID == this.game.triggers[i].boundEntity.entityID) {
                        this.game.ghost = this.game.mimic.controlledEntity.body.center;
                    }
                    if (!this.game.triggers[i].isEntityTriggered(this)) {
                        this.awareness += this.game.triggers[i].power;
                        this.game.triggers[i].entityTriggered(this);
                        this.game.draw.spriteAnimation("Awareness", 1, new SpriteAnimation_4.AnimationState(this.body.center.add(new geom.Vector(0, -1)), new geom.Vector(0.5, 0.5), 0), new SpriteAnimation_4.AnimationState(this.body.center.add(new geom.Vector(0, -1.5)), new geom.Vector(2, 2), 0, 0), 0.5, 1);
                    }
                }
            }
            for (var _i = 0, _a = this.game.entities; _i < _a.length; _i++) {
                var entity = _a[_i];
                if (entity == this ||
                    !(entity instanceof Person) ||
                    !this.isPointVisible(entity.body.center))
                    continue;
                if (entity instanceof Person && entity.hp < entity.hpThresholdCorrupted)
                    this.awareness += 2 * Game_4.Game.dt;
                if (entity instanceof Person && entity.awareness > this.awareness)
                    this.awareness = entity.awareness;
            }
        };
        Person.prototype.modeToString = function () {
            switch (this.mode) {
                case PersonMode.Fine:
                    return "fine";
                case PersonMode.Corrupted:
                    return "corrupted";
                case PersonMode.Dying:
                    return "dying";
            }
        };
        Person.prototype.changedirection = function (x, y) {
            var currentdist = this.body.center.sub(this.game.mimic.controlledEntity.body.center);
            var dist = Math.sqrt(Math.pow(currentdist.x, 2) + Math.pow(currentdist.y, 2));
            var volume = 1 / dist;
            if (volume > 1)
                volume = 1;
            this.sound.current_sound.volume = volume;
            if (x == 0 && y == 0) {
                this.animation.changedirection("stand", this.modeToString());
                this.sound.current_sound.muted = true;
            }
            if (x == 1) {
                this.animation.changedirection("right", this.modeToString());
                this.sound.current_sound.muted = false;
            }
            if (x == -1) {
                this.animation.changedirection("left", this.modeToString());
                this.sound.current_sound.muted = false;
            }
            if (x == 0 && y == 1) {
                this.animation.changedirection("top", this.modeToString());
                this.sound.current_sound.muted = false;
            }
            if (x == 0 && y == -1) {
                this.animation.changedirection("down", this.modeToString());
                this.sound.current_sound.muted = false;
            }
        };
        Person.prototype.updateMode = function () {
            if (this.hp < 0) {
                this.die();
            }
            else if (this.hp < this.hpThresholdDying)
                this.mode = PersonMode.Dying;
            else if (this.hp < this.hpThresholdCorrupted)
                this.mode = PersonMode.Corrupted;
            else
                this.mode = PersonMode.Fine;
        };
        Person.prototype.stop = function () {
            this.myAI.commands.active["MoveUp"] = false;
            this.myAI.commands.active["MoveDown"] = false;
            this.myAI.commands.active["MoveLeft"] = false;
            this.myAI.commands.active["MoveRight"] = false;
            console.log("stop");
        };
        Person.prototype.move = function () {
            var x = 0;
            var y = 0;
            var vel = this.body.velocity;
            if (!this.commands)
                return;
            if (this.commands.active["MoveUp"]) {
                y++;
                this.body.move(new geom.Vector(0, -vel));
            }
            if (this.commands.active["MoveDown"]) {
                y--;
                this.body.move(new geom.Vector(0, vel));
            }
            if (this.commands.active["MoveRight"]) {
                x++;
                this.body.move(new geom.Vector(vel, 0));
            }
            if (this.commands.active["MoveLeft"]) {
                x--;
                this.body.move(new geom.Vector(-vel, 0));
            }
            this.changedirection(x, y);
            this.direction = new geom.Vector(x, y);
        };
        Person.prototype.step = function () {
            this.move();
            if (this.awareness >= this.awarenessThreshold) {
                if (this.behaviorModel.getCurrentInstruction() == Behavior.Normal || this.awareness > this.awarenessOverflow)
                    this.awareness = this.awarenessOverflow;
                this.behaviorModel.changeCurrentInstruction(Behavior.Panic);
            }
            if (this.awareness < this.awarenessThreshold) {
                this.behaviorModel.changeCurrentInstruction(Behavior.Normal);
            }
            if (this.awareness < 0) {
                this.awareness = 0;
            }
            this.awareness -= Game_4.Game.dt * 0.5;
            this.updateMode();
            if (this.stunTime <= 0) {
                this.checkTriggers();
                this.behaviorModel.step();
            }
            else
                this.stop();
            this.stunTime -= Game_4.Game.dt;
            _super.prototype.step.call(this);
        };
        Person.prototype.displayAwareness = function (draw) {
            draw.bar(this.body.center.clone().add(new geom.Vector(0, -0.9)), new geom.Vector(1, 0.1), this.awareness / this.awarenessThreshold, new Draw_7.Color(25, 25, 25), new Draw_7.Color(25, 150, 255), []);
        };
        Person.prototype.display = function (draw) {
            _super.prototype.display.call(this, draw);
            draw.bar(this.body.center.clone().add(new geom.Vector(0, -1)), new geom.Vector(1, 0.1), this.hp / this.hpMax, new Draw_7.Color(25, 25, 25), new Draw_7.Color(25, 255, 25), [this.hpThresholdCorrupted / this.hpMax, this.hpThresholdDying / this.hpMax]);
        };
        return Person;
    }(Entity_3.Entity));
    exports.Person = Person;
});
define("Random", ["require", "exports", "Geom"], function (require, exports, geom) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Random = void 0;
    var Random = (function () {
        function Random() {
        }
        Random.randomInt = function (a, b) {
            var _a;
            if (a > b) {
                _a = [b, a], a = _a[0], b = _a[1];
            }
            a = Math.ceil(a);
            b = Math.floor(b);
            return Math.floor(Math.random() * (b - a + 1)) + a;
        };
        Random.randomFloat = function (a, b) {
            var _a;
            if (a > b) {
                _a = [b, a], a = _a[0], b = _a[1];
            }
            return Math.random() * (b - a) + a;
        };
        Random.randomVector = function (a, b) {
            var x = 0;
            var y = 0;
            x = Random.randomFloat(a.x, b.x);
            y = Random.randomFloat(a.y, b.y);
            return new geom.Vector(x, y);
        };
        Random.randomSector = function (alpha, beta, lenMin, lenMax) {
            var gamma = 0;
            var y = 0;
            gamma = Random.randomFloat(alpha, beta);
            y = Math.abs(Random.randomFloat(lenMin, lenMax));
            var e = geom.vectorFromAngle(gamma);
            e = e.mul(y);
            return e;
        };
        return Random;
    }());
    exports.Random = Random;
});
define("Entities/Projectiles/CombatProjectile", ["require", "exports", "Game", "Entities/Projectiles/Projectile", "Geom", "Draw"], function (require, exports, Game_5, Projectile_2, geom, Draw_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CombatProjectile = void 0;
    var CombatProjectile = (function (_super) {
        __extends(CombatProjectile, _super);
        function CombatProjectile(game, body, vel) {
            var _this = _super.call(this, game, body, vel) || this;
            _this.damage = 0.1;
            _this.remainingTime = 0;
            _this.lifetime = 0;
            _this.loadSpriteAnimation("Flame", 3);
            return _this;
        }
        CombatProjectile.prototype.setLifetime = function (lifetime) {
            this.lifetime = this.remainingTime = lifetime;
        };
        CombatProjectile.prototype.step = function () {
            this.remainingTime -= Game_5.Game.dt;
            if (this.remainingTime <= 0 ||
                this.shouldBeKilledByWall && this.body.getCollisionsNumber())
                this.alive = false;
            for (var _i = 0, _a = this.game.entities; _i < _a.length; _i++) {
                var entity = _a[_i];
                if (entity instanceof Projectile_2.Projectile ||
                    entity == this.baseEntity ||
                    geom.dist(this.body.center, entity.body.center) > this.body.radius)
                    continue;
                entity.hp -= this.damage;
                this.alive = false;
            }
            _super.prototype.step.call(this);
        };
        CombatProjectile.prototype.display = function (draw) {
            draw.image(this.spriteAnimation.getCurrentFrame(), this.body.center, new geom.Vector(this.body.radius, this.body.radius), 0, Draw_8.Layer.EntityLayer, 0.5 * this.remainingTime / this.lifetime);
        };
        return CombatProjectile;
    }(Projectile_2.Projectile));
    exports.CombatProjectile = CombatProjectile;
});
define("Entities/EntityAttributes/Weapon", ["require", "exports", "Game", "Entities/EntityAttributes/Body", "Geom", "Random", "Entities/Projectiles/CombatProjectile", "Draw"], function (require, exports, Game_6, Body_1, geom, Random_1, CombatProjectile_1, Draw_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Weapon = void 0;
    var Weapon = (function () {
        function Weapon(owner) {
            this.magazineCapacity = 50;
            this.magazineCooldown = 2;
            this.projectilesInMagazine = this.magazineCapacity;
            this.cooldown = 0.02;
            this.timeToCooldown = 0;
            this.scatter = 0.2;
            this.projectilesInOneShot = 5;
            this.projectileVel = 10;
            this.projectileAnimationName = "Flame";
            this.projectileAnimationFrames = 3;
            this.range = 5;
            this.isMagazineRecharging = false;
            this.owner = owner;
        }
        Weapon.prototype.rechargeClip = function () {
            this.timeToCooldown = this.magazineCooldown;
            this.isMagazineRecharging = true;
        };
        Weapon.prototype.createProjectile = function (dir) {
            dir = dir.norm();
            dir = geom.vectorFromAngle(dir.angle() + Random_1.Random.randomFloat(-this.scatter, this.scatter));
            var body = new Body_1.Body(this.owner.body.center, 0.4);
            body.game = this.owner.game;
            var projectile = new CombatProjectile_1.CombatProjectile(this.owner.game, body, dir.norm().mul(this.projectileVel));
            projectile.entityID = this.owner.game.entities.length;
            projectile.loadSpriteAnimation(this.projectileAnimationName, this.projectileAnimationFrames);
            projectile.shouldBeKilledByWall = true;
            projectile.setLifetime(this.range / this.projectileVel);
            projectile.baseEntity = this.owner;
            this.owner.game.entities.push(projectile);
        };
        Weapon.prototype.shoot = function (dir) {
            if (this.isMagazineRecharging) {
                return;
            }
            if (this.projectilesInMagazine <= 0) {
                this.rechargeClip();
                return;
            }
            if (this.timeToCooldown > 0) {
                return;
            }
            for (var i = 0; i < this.projectilesInOneShot; i++)
                this.createProjectile(dir);
            this.projectilesInMagazine--;
            this.timeToCooldown = this.cooldown;
            if (this.projectilesInMagazine <= 0)
                this.rechargeClip();
        };
        Weapon.prototype.step = function () {
            this.timeToCooldown -= Game_6.Game.dt;
            if (this.timeToCooldown <= 0 && this.isMagazineRecharging) {
                this.isMagazineRecharging = false;
                this.projectilesInMagazine = this.magazineCapacity;
            }
        };
        Weapon.prototype.display = function (draw) {
            var color = new Draw_9.Color(255, 50, 50);
            if (this.projectilesInMagazine <= 0) {
                draw.bar(this.owner.body.center.clone().add(new geom.Vector(0, -1.1)), new geom.Vector(1, 0.1), 1 - this.timeToCooldown / this.magazineCooldown, new Draw_9.Color(25, 25, 25), color.setAlpha(0.5), []);
            }
            else {
                draw.bar(this.owner.body.center.clone().add(new geom.Vector(0, -1.1)), new geom.Vector(1, 0.1), this.projectilesInMagazine / this.magazineCapacity, new Draw_9.Color(25, 25, 25), color, []);
            }
        };
        return Weapon;
    }());
    exports.Weapon = Weapon;
});
define("Entities/Soldier", ["require", "exports", "Entities/Person", "Entities/EntityAttributes/Animation", "Entities/EntityAttributes/Weapon", "Geom", "Entities/Monster", "Sounds"], function (require, exports, Person_3, Animation_2, Weapon_1, geom, Monster_2, Sounds_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Soldier = void 0;
    var Soldier = (function (_super) {
        __extends(Soldier, _super);
        function Soldier(game, body, mode) {
            var _this = _super.call(this, game, body, mode) || this;
            _this.weapon = new Weapon_1.Weapon(_this);
            _this.soundweapon = new Sounds_4.Sounds(1);
            _this.animation = new Animation_2.Animation("Soldier", 8);
            _this.type = "Soldier";
            _this.soundweapon.playcontinuously("firemashine", 1);
            _this.soundweapon.current_sound.muted = true;
            if (_this.game)
                _this.game.soundsarr.push(_this.soundweapon);
            return _this;
        }
        Soldier.prototype.step = function () {
            this.myAI.commands.active["shoot"] = false;
            for (var _i = 0, _a = this.game.entities; _i < _a.length; _i++) {
                var entity = _a[_i];
                if (entity instanceof Monster_2.Monster) {
                    if (geom.dist(entity.body.center, this.body.center) < this.weapon.range / 2)
                        this.stop();
                    if (geom.dist(entity.body.center, this.body.center) < this.weapon.range)
                        this.myAI.commands.active["shoot"] = true;
                    this.myAI.commands.pointer = entity.body.center.sub(this.body.center);
                }
            }
            if (this.commands.active["shoot"]) {
                this.soundweapon.current_sound.muted = false;
                this.weapon.shoot(this.commands.pointer);
            }
            else {
                this.soundweapon.current_sound.muted = true;
            }
            this.weapon.step();
            _super.prototype.step.call(this);
        };
        Soldier.prototype.die = function () {
            _super.prototype.die.call(this);
            this.soundweapon.current_sound.muted = true;
        };
        Soldier.prototype.display = function (draw) {
            _super.prototype.display.call(this, draw);
            this.displayAwareness(draw);
            this.weapon.display(draw);
        };
        return Soldier;
    }(Person_3.Person));
    exports.Soldier = Soldier;
});
define("Entities/Scientist", ["require", "exports", "Entities/Person", "Entities/EntityAttributes/Animation"], function (require, exports, Person_4, Animation_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scientist = void 0;
    var Scientist = (function (_super) {
        __extends(Scientist, _super);
        function Scientist(game, body, mode) {
            var _this = _super.call(this, game, body, mode) || this;
            _this.animation = new Animation_3.Animation("Scientist", 8);
            _this.type = "Scientist";
            return _this;
        }
        Scientist.prototype.display = function (draw) {
            this.displayAwareness(draw);
            _super.prototype.display.call(this, draw);
        };
        return Scientist;
    }(Person_4.Person));
    exports.Scientist = Scientist;
});
define("Level", ["require", "exports", "Tile", "Geom", "Draw", "Editor/PathGenerator", "Entities/Soldier", "Entities/Scientist", "Entities/Monster", "Entities/StationaryObject", "BehaviorModel", "AuxLib", "Queue", "Random", "Game"], function (require, exports, Tile_3, geom, Draw_10, PathGenerator_1, Soldier_1, Scientist_1, Monster_3, StationaryObject_2, BehaviorModel_2, aux, Queue_2, Random_2, Game_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Level = exports.LightSource = exports.LevelJSON = void 0;
    function replacer(key, value) {
        if (value instanceof Map) {
            var val = void 0;
            if (value.get("JSONkeys") != undefined) {
                var keys = value.get("JSONkeys");
                console.log("JSONkeys", keys);
                var remapping = new Map();
                for (var i = 0; i < keys.length; i++) {
                    remapping.set(keys[i], value[keys[i]]);
                }
                val = Array.from(remapping.entries());
            }
            else {
                val = Array.from(value.entries());
            }
            console.log(val);
            return {
                dataType: 'Map',
                value: val,
            };
        }
        if (value instanceof HTMLImageElement) {
            var name_1 = value.src;
            var nameSplit = name_1.split("/");
            var lastSplit = nameSplit[nameSplit.length - 1];
            return {
                dataType: 'HTMLImageElement',
                value: lastSplit
            };
        }
        if (value instanceof geom.Vector) {
            return {
                dataType: 'Vector',
                x: value.x,
                y: value.y
            };
        }
        if (value instanceof Soldier_1.Soldier) {
            return {
                dataType: 'Soldier',
                center: value.body.center,
                behaviorModel: value.behaviorModel
            };
        }
        if (value instanceof Scientist_1.Scientist) {
            return {
                dataType: 'Scientist',
                center: value.body.center,
                behaviorModel: value.behaviorModel
            };
        }
        if (value instanceof Monster_3.Monster) {
            return {
                dataType: 'Monster',
                center: value.body.center
            };
        }
        if (value instanceof StationaryObject_2.StationaryObject) {
            return {
                dataType: 'StationaryObject',
                center: value.body.center,
            };
        }
        if (value instanceof BehaviorModel_2.BehaviorModel) {
            return {
                dataType: 'BehaviorModel',
                instructions: value.instructions
            };
        }
        if (value instanceof BehaviorModel_2.Instruction) {
            return {
                dataType: 'Instruction',
                operations: value.operations,
                operationsData: value.operationsData
            };
        }
        if (value instanceof LightSource) {
            return {
                dataType: 'LightSource',
                pos: value.pos,
                power: value.power
            };
        }
        return value;
    }
    var LevelJSON = (function () {
        function LevelJSON() {
        }
        return LevelJSON;
    }());
    exports.LevelJSON = LevelJSON;
    var LightSource = (function () {
        function LightSource(pos, power) {
            this.enableFlickering = true;
            this.time = 0;
            this.amplitude = 0.1;
            this.frequency = 1;
            this.offPeriod = 5;
            this.offTiming = 0.04;
            this.timeOff = 0;
            this.offCount = 0;
            this.pos = pos;
            this.basePower = this.power = power;
            this.frequency = Random_2.Random.randomFloat(1, 2);
        }
        LightSource.prototype.step = function () {
            this.time += Game_7.Game.dt;
            this.timeOff -= Game_7.Game.dt;
            if (!this.enableFlickering) {
                this.power = this.basePower;
                return;
            }
            this.power = this.basePower + Math.sin(this.time * Math.PI * this.frequency) * this.amplitude;
            if (Random_2.Random.randomFloat(0, this.offPeriod) < Game_7.Game.dt) {
                this.timeOff = this.offTiming;
                this.offCount = Random_2.Random.randomInt(1, 5);
            }
            if (this.timeOff > 0 && this.offCount)
                this.power = this.power * 0.9;
            if (this.timeOff < -this.offTiming && this.offCount) {
                this.offCount--;
                this.timeOff = this.offTiming;
            }
        };
        return LightSource;
    }());
    exports.LightSource = LightSource;
    ;
    var Level = (function () {
        function Level(size) {
            if (size === void 0) { size = new geom.Vector(0, 0); }
            this.Entities = [];
            this.tileSize = 1;
            this.lightSources = [];
            this.showLighting = false;
            this.gridSize = new geom.Vector();
            this.Grid = [];
            for (var x = 0; x < 50; x++) {
                this.Grid.push([]);
                for (var y = 0; y < 50; y++) {
                    this.Grid[x].push(new Tile_3.Tile());
                }
            }
            this.gridSize.x = size.x;
            this.gridSize.y = size.y;
        }
        Level.prototype.setNewDrawX = function (new_x) {
            this.gridSize.x = new_x;
        };
        Level.prototype.setNewDrawY = function (new_y) {
            this.gridSize.y = new_y;
        };
        Level.prototype.gridCoordinates = function (pos) {
            pos = new geom.Vector(Math.floor(pos.x / this.tileSize), Math.floor(pos.y / this.tileSize));
            if (pos.x < 0)
                pos.x = 0;
            if (pos.y < 0)
                pos.y = 0;
            if (pos.x >= this.gridSize.x)
                pos.x = this.gridSize.x - 1;
            if (pos.y >= this.gridSize.y)
                pos.y = this.gridSize.y - 1;
            return pos;
        };
        Level.prototype.isInBounds = function (pos) {
            return pos.x > 0 &&
                pos.y > 0 &&
                pos.x < this.gridSize.x * this.tileSize &&
                pos.y < this.gridSize.y * this.tileSize;
        };
        Level.prototype.isCellInBounds = function (pos) {
            return pos.x >= 0 &&
                pos.y >= 0 &&
                pos.x < this.gridSize.x &&
                pos.y < this.gridSize.y;
        };
        Level.prototype.getTile = function (pos) {
            return this.Grid[pos.x][pos.y];
        };
        Level.prototype.makeLightSource = function (pos, power) {
            this.lightSources.push(new LightSource(pos.clone(), power));
        };
        Level.prototype.serialize = function () {
            var newLevel;
            var newGrid = [];
            for (var x = 0; x < this.gridSize.x; x++) {
                newGrid.push([]);
                for (var y = 0; y < this.gridSize.y; y++) {
                    newGrid[x].push(this.Grid[x][y]);
                }
            }
            newLevel = { Grid: newGrid, Entities: this.Entities, CollisionMesh: [], Lights: this.lightSources, PathMatrix: new Map() };
            console.log(newLevel.Grid);
            PathGenerator_1.PathGenerator.generateMatrix(newLevel);
            console.log(newLevel.CollisionMesh);
            console.log(newLevel.PathMatrix);
            var blob = new Blob([JSON.stringify(newLevel, replacer)], {
                type: 'application/json'
            });
            console.log(Array.from(newLevel.PathMatrix.keys()));
            var url = window.URL.createObjectURL(blob);
            window.open(url);
        };
        Level.prototype.createFromPrototype = function (prototype) {
            this.Entities = [];
            this.Grid = prototype.Grid;
            this.CollisionMesh = prototype.CollisionMesh;
            this.PathMatrix = prototype.PathMatrix;
            this.lightSources = prototype.Lights;
        };
        Level.prototype.display = function (draw, advanced) {
            if (advanced === void 0) { advanced = false; }
            for (var i = 0; i < this.gridSize.x; i++) {
                for (var j = 0; j < this.gridSize.y; j++) {
                    var size = new geom.Vector(this.tileSize, this.tileSize);
                    draw.image(this.Grid[i][j].image, (new geom.Vector(this.tileSize * i, this.tileSize * j))
                        .add(size.mul(1 / 2)), size, 0, 0);
                    if (this.Grid[i][j].sub_image) {
                        draw.image(this.Grid[i][j].sub_image, (new geom.Vector(this.tileSize * i, this.tileSize * j))
                            .add(size.mul(1 / 2)), size, 0, 0);
                    }
                    if (advanced)
                        draw.strokeRect((new geom.Vector(this.tileSize * i, this.tileSize * j))
                            .add(size.mul(1 / 2)), size, new Draw_10.Color(0, 0, 0), 0.03);
                }
            }
        };
        Level.prototype.displayColisionGrid = function (draw) {
            for (var i = 0; i < this.gridSize.x; i++) {
                for (var j = 0; j < this.gridSize.y; j++)
                    if (this.Grid[i][j].colision == Tile_3.CollisionType.Full) {
                        draw.fillRect(new geom.Vector(i * this.tileSize + 0.5, j * this.tileSize + 0.5), new geom.Vector(1 * this.tileSize, 1 * this.tileSize), new Draw_10.Color(0, 255, 0, 0.5 * Math.sin(aux.getMilliCount() * 0.005) + 0.5));
                    }
            }
        };
        Level.prototype.displayLighting = function (draw) {
            if (!this.showLighting) {
                return;
            }
            var cellSize = 1;
            var buffer = document.createElement('canvas');
            buffer.width = this.gridSize.x * cellSize;
            buffer.height = this.gridSize.y * cellSize;
            var imgCtx = buffer.getContext('2d');
            for (var x = 0; x < this.gridSize.x; x++) {
                for (var y = 0; y < this.gridSize.y; y++) {
                    var alpha = 1 - this.Grid[x][y].light / 10;
                    imgCtx.fillStyle = new Draw_10.Color(0, 0, 0, alpha).toString();
                    imgCtx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
            draw.ctx.imageSmoothingEnabled = true;
            var box = new geom.Vector(this.gridSize.x, this.gridSize.y);
            draw.displayBuffer(buffer, box.mul(1 / 2), box, 0, 1);
        };
        Level.prototype.generateLighting = function () {
            for (var i = 0; i < this.gridSize.x; i++)
                for (var j = 0; j < this.gridSize.y; j++)
                    this.Grid[i][j].light = 0;
            var queue = new Queue_2.Queue();
            var dirs = [
                new geom.Vector(0, 1),
                new geom.Vector(0, -1),
                new geom.Vector(1, 0),
                new geom.Vector(-1, 0),
            ];
            for (var _i = 0, _a = this.lightSources; _i < _a.length; _i++) {
                var source = _a[_i];
                queue.push(source.pos);
                this.getTile(source.pos).light = source.power;
            }
            var decay = 1;
            while (queue.length()) {
                var pos = queue.pop();
                for (var _b = 0, dirs_1 = dirs; _b < dirs_1.length; _b++) {
                    var dir = dirs_1[_b];
                    var posNext = pos.add(dir);
                    if (!this.isCellInBounds(posNext) ||
                        this.getTile(pos).colision && !this.getTile(posNext).colision ||
                        this.getTile(posNext).light > this.getTile(pos).light - decay)
                        continue;
                    this.getTile(posNext).light = this.getTile(pos).light - decay;
                    queue.push(posNext);
                }
            }
        };
        Level.prototype.processLighting = function () {
            this.lightSources.forEach(function (lightSource) { return lightSource.step(); });
            this.generateLighting();
        };
        return Level;
    }());
    exports.Level = Level;
});
define("Entities/EntityAttributes/AI", ["require", "exports", "Geom", "Entities/EntityAttributes/Commands", "AuxLib", "Debug", "Draw"], function (require, exports, geom, Commands_2, aux, Debug_3, Draw_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AI = void 0;
    var AI = (function () {
        function AI(game, body) {
            this.destination = new geom.Vector(0, 0);
            this.activationTime = 0;
            this.game = game;
            this.body = body;
            this.commands = new Commands_2.Commands();
            this.Path = [];
        }
        AI.prototype.stop = function () {
            this.commands.active["MoveRight"] = false;
            this.commands.active["MoveLeft"] = false;
            this.commands.active["MoveDown"] = false;
            this.commands.active["MoveUp"] = false;
        };
        AI.prototype.go = function (point) {
            var eps = 0.05;
            if (this.body.center.x < point.x + eps) {
                this.commands.active["MoveRight"] = true;
            }
            else {
                this.commands.active["MoveRight"] = false;
            }
            if (this.body.center.x > point.x - eps) {
                this.commands.active["MoveLeft"] = true;
            }
            else {
                this.commands.active["MoveLeft"] = false;
            }
            if (this.body.center.y < point.y + eps) {
                this.commands.active["MoveDown"] = true;
            }
            else {
                this.commands.active["MoveDown"] = false;
            }
            if (this.body.center.y > point.y - eps) {
                this.commands.active["MoveUp"] = true;
            }
            else {
                this.commands.active["MoveUp"] = false;
            }
        };
        AI.prototype.getPointCoordinate = function (place) {
            return new geom.Vector(place.y * this.game.currentLevel.tileSize / 2, place.x * this.game.currentLevel.tileSize / 2);
        };
        AI.prototype.chooseMeshPoint = function (currentPoint) {
            var CollisionMesh = this.game.levels[this.game.currentLevelName].CollisionMesh;
            var Grid = this.game.levels[this.game.currentLevelName].Grid;
            var posRound = new geom.Vector(Math.floor(currentPoint.x / this.game.currentLevel.tileSize), Math.floor(currentPoint.y / this.game.currentLevel.tileSize));
            var place = new geom.Vector(posRound.y * 2 + 1, posRound.x * 2 + 1);
            var answer = new geom.Vector(0, 0);
            for (var i = -5; i <= 5; i++) {
                for (var j = -5; j <= 5; j++) {
                    if (place.x + i < CollisionMesh.length && place.x + i > 0) {
                        if (place.y + j < CollisionMesh[place.x + i].length && place.y + j > 0) {
                            if (CollisionMesh[place.x + i][place.y + j] == false &&
                                currentPoint.sub(this.getPointCoordinate(new geom.Vector(answer.x, answer.y))).abs() >
                                    currentPoint.sub(this.getPointCoordinate(new geom.Vector(place.x + i, place.y + j))).abs()) {
                                answer = new geom.Vector(place.x + i, place.y + j);
                            }
                        }
                    }
                }
            }
            return answer;
        };
        AI.prototype.goToPoint = function (point) {
            console.log("Go to point:", point);
            var pathMatrix = this.game.levels[this.game.currentLevelName].PathMatrix;
            this.destination = point;
            this.Path = [];
            var startMeshPoint = this.chooseMeshPoint(this.body.center);
            var finishMeshPoint = this.chooseMeshPoint(point);
            var currentMeshPoint = startMeshPoint.clone();
            if (!pathMatrix.get(aux.vectorStringify(currentMeshPoint)) ||
                !pathMatrix.get(aux.vectorStringify(currentMeshPoint)).get(aux.vectorStringify(finishMeshPoint))) {
                return;
            }
            while (aux.vectorStringify(currentMeshPoint) != aux.vectorStringify(finishMeshPoint)) {
                console.log(aux.vectorStringify(currentMeshPoint), aux.vectorStringify(finishMeshPoint), pathMatrix.get(aux.vectorStringify(currentMeshPoint)).get(aux.vectorStringify(finishMeshPoint)));
                this.Path.push(this.getPointCoordinate(currentMeshPoint.clone()));
                currentMeshPoint = currentMeshPoint.add(pathMatrix.get(aux.vectorStringify(currentMeshPoint)).get(aux.vectorStringify(finishMeshPoint)));
            }
            this.Path.push(this.getPointCoordinate(currentMeshPoint.clone()));
            this.Path[this.Path.length] = point;
            console.log(this.Path);
        };
        AI.prototype.wait = function (milliseconds) {
            this.stop();
            this.activationTime = aux.getMilliCount() + milliseconds;
        };
        AI.prototype.pursuit = function () {
            this.goToPoint(this.game.ghost);
        };
        AI.prototype.getWaitingTime = function () {
            return this.activationTime - aux.getMilliCount();
        };
        AI.prototype.step = function () {
            if (this.activationTime > aux.getMilliCount()) {
                return;
            }
            if (this.Path.length != 0) {
                this.go(this.Path[0]);
                if (this.body.center.sub(this.Path[0]).abs() < 0.2) {
                    this.Path.shift();
                }
            }
            else {
                this.stop();
            }
            var CollisionMesh = this.game.currentLevel.CollisionMesh;
            for (var i = 0; i < CollisionMesh.length; i++) {
                for (var j = 0; j < CollisionMesh[i].length; j++) {
                    var coordinate = this.getPointCoordinate(new geom.Vector(i, j));
                    var color = new Draw_11.Color(0, 255, 0);
                    if (CollisionMesh[i][j] == true) {
                        color = new Draw_11.Color(255, 0, 0);
                    }
                    Debug_3.Debug.addPoint(coordinate, color);
                }
            }
            Debug_3.Debug.addPoint(this.destination, new Draw_11.Color(0, 0, 255));
        };
        return AI;
    }());
    exports.AI = AI;
});
define("Entities/Entity", ["require", "exports", "Geom", "Entities/EntityAttributes/Animation", "Entities/EntityAttributes/AI"], function (require, exports, geom, Animation_4, AI_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Entity = void 0;
    var Entity = (function () {
        function Entity(game, body) {
            this.commands = null;
            this.alive = true;
            this.hpMax = 15;
            this.hp = this.hpMax;
            this.game = game;
            this.body = body;
            this.myAI = new AI_1.AI(game, body);
            this.animation = new Animation_4.Animation("Scientist", 8);
            this.commands = this.myAI.commands;
        }
        Entity.prototype.die = function () {
            this.hp = 0;
            this.alive = false;
        };
        Entity.prototype.step = function () {
            if (this.hp <= 0)
                this.die();
            if (!this.commands)
                return;
            this.myAI.step();
            this.commands = this.myAI.commands;
        };
        Entity.prototype.display = function (draw) {
            draw.image(this.animation.current_state, this.body.center.sub(new geom.Vector(0, 0.5 - this.body.collisionBox.y / 2)), new geom.Vector(1, 1), 0, 1);
        };
        return Entity;
    }());
    exports.Entity = Entity;
});
define("Trigger", ["require", "exports", "Game"], function (require, exports, Game_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Trigger = void 0;
    var Trigger = (function () {
        function Trigger(lifeTime, boundEntity) {
            this.power = 1;
            this.timeLeft = this.lifeTime = lifeTime;
            this.boundEntity = boundEntity;
            this.active = true;
            this.triggeredEntities = new Map();
        }
        Trigger.prototype.step = function () {
            this.timeLeft -= Game_8.Game.dt;
            if (this.timeLeft <= 0 || !this.boundEntity.alive)
                this.active = false;
        };
        Trigger.prototype.getCoordinates = function () {
            return this.boundEntity.body.center.clone();
        };
        Trigger.prototype.entityTriggered = function (entity) {
            this.triggeredEntities[entity.entityID] = true;
        };
        Trigger.prototype.isEntityTriggered = function (entity) {
            return this.triggeredEntities[entity.entityID];
        };
        return Trigger;
    }());
    exports.Trigger = Trigger;
});
define("Game", ["require", "exports", "Geom", "AuxLib", "Entities/EntityAttributes/Body", "Entities/Person", "Control", "Draw", "Tile", "Mimic", "Level", "Trigger", "Debug", "Entities/Scientist", "Entities/Soldier", "Entities/Monster", "Entities/Corpse", "Entities/StationaryObject", "BehaviorModel", "Entities/Projectiles/Biomass", "Sounds"], function (require, exports, geom, aux, Body_2, Person_5, Control_2, Draw_12, Tile_4, Mimic_1, Level_1, Trigger_1, Debug_4, Scientist_2, Soldier_2, Monster_4, Corpse_2, StationaryObject_3, BehaviorModel_3, Biomass_2, Sounds_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = exports.State = void 0;
    var State;
    (function (State) {
        State[State["Waiting"] = 0] = "Waiting";
        State[State["Game"] = 1] = "Game";
    })(State = exports.State || (exports.State = {}));
    ;
    var Game = (function () {
        function Game(draw) {
            this.soundsarr = [];
            this.bodies = [];
            this.entities = [];
            this.triggers = [];
            this.currentLevelName = "map";
            this.currentLevel = new Level_1.Level();
            this.playerID = 0;
            this.ghost = new geom.Vector(0, 0);
            this.state = State.Waiting;
            this.sounds = new Sounds_5.Sounds(0.01);
            console.log("im here!!");
            Control_2.Control.init();
            this.draw = draw;
            this.currentLevel.Grid = [];
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
        Game.reviver = function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (value.dataType === 'Map') {
                    return new Map(value.value);
                }
                if (value.dataType === 'HTMLImageElement') {
                    return Draw_12.Draw.loadImage("./textures/tiles/" + value.value);
                }
                if (value.dataType === 'Vector') {
                    return new geom.Vector(value.x, value.y);
                }
                if (value.dataType == 'Soldier') {
                    var soldier = Game.currentGame.makeSoldier(value.center);
                    soldier.behaviorModel = new BehaviorModel_3.BehaviorModel(soldier.myAI);
                    soldier.behaviorModel = value.behaviorModel;
                    soldier.behaviorModel.myAI = soldier.myAI;
                    soldier.behaviorModel.changeCurrentInstruction("normal");
                    return soldier;
                }
                if (value.dataType == 'Scientist') {
                    console.log("loading scientist");
                    var scientist = Game.currentGame.makeScientist(value.center);
                    scientist.behaviorModel = new BehaviorModel_3.BehaviorModel(scientist.myAI);
                    scientist.behaviorModel.instructions = value.behaviorModel.instructions;
                    scientist.behaviorModel.changeCurrentInstruction("normal");
                    console.log(scientist);
                    return scientist;
                }
                if (value.dataType == "Monster") {
                    var monster = Game.currentGame.makeMonster(value.center);
                    return monster;
                }
                if (value.dataType == 'StationaryObject') {
                    var stationaryObject = new StationaryObject_3.StationaryObject(this.currentGame, new Body_2.Body(value.center, 1), "fine");
                    return stationaryObject;
                }
                if (value.dataType == 'BehaviorModel') {
                    var behaviorModel = new BehaviorModel_3.BehaviorModel(null);
                    behaviorModel.instructions = value.instructions;
                    return behaviorModel;
                }
                if (value.dataType == 'Instruction') {
                    var instruction = new BehaviorModel_3.Instruction();
                    instruction.operations = value.operations;
                    instruction.operationsData = value.operationsData;
                    return instruction;
                }
                if (value.dataType == 'LightSource') {
                    var light = new Level_1.LightSource(value.pos, value.power);
                    return light;
                }
            }
            return value;
        };
        Game.loadMap = function (path, name) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            Game.levelPaths[name] = path;
                            console.log(aux.environment + path);
                            return [4, this.readTextFile(aux.environment + path)
                                    .then(function (result) {
                                    console.log("Map loaded");
                                    var prototype = JSON.parse(result, _this.reviver);
                                    var level = new Level_1.Level();
                                    level.createFromPrototype(prototype);
                                    level.showLighting = true;
                                    level.gridSize = new geom.Vector(level.Grid.length, level.Grid[0].length);
                                    Game.currentGame.levels[name] = level;
                                })];
                        case 1:
                            result = _a.sent();
                            return [2];
                    }
                });
            });
        };
        Game.prototype.makeBody = function (coordinates, radius) {
            var body = new Body_2.Body(coordinates, radius);
            body.game = this;
            return this.bodies[this.bodies.length] = body;
        };
        Game.prototype.makeScientist = function (pos) {
            var body = this.makeBody(pos, 1);
            var entity = new Scientist_2.Scientist(this, body, Person_5.PersonMode.Fine);
            entity.entityID = this.entities.length;
            this.entities[this.entities.length] = entity;
            return entity;
        };
        Game.prototype.makeSoldier = function (pos) {
            var body = this.makeBody(pos, 1);
            var entity = new Soldier_2.Soldier(this, body, Person_5.PersonMode.Fine);
            entity.entityID = this.entities.length;
            this.entities[this.entities.length] = entity;
            return entity;
        };
        Game.prototype.makeMonster = function (pos) {
            var body = this.makeBody(pos, 1);
            var entity = new Monster_4.Monster(this, body);
            entity.entityID = this.entities.length;
            this.entities[this.entities.length] = entity;
            this.makeTrigger(entity, 10, 100000);
            return entity;
        };
        Game.prototype.makeCorpse = function (pos, type) {
            var body = this.makeBody(pos, 1);
            var entity = new Corpse_2.Corpse(this, body, type);
            entity.entityID = this.entities.length;
            this.entities[this.entities.length] = entity;
            this.makeTrigger(entity, 6, 100000);
            console.log("corpse");
            return entity;
        };
        Game.prototype.makeBiomass = function (pos, vel) {
            var body = this.makeBody(pos, 1);
            var entity = new Biomass_2.Biomass(this, body, vel);
            entity.entityID = this.entities.length;
            this.entities[this.entities.length] = entity;
            this.makeTrigger(entity, 3, 100000);
            return entity;
        };
        Game.prototype.makeTrigger = function (boundEntity, power, lifeTime) {
            var trigger = new Trigger_1.Trigger(lifeTime, boundEntity);
            trigger.power = power;
            return this.triggers[this.triggers.length] = trigger;
        };
        Game.prototype.processEntities = function () {
            for (var i = 0; i < this.entities.length; i++) {
                if (!this.entities[i].alive) {
                    this.entities.splice(i, 1);
                    i--;
                }
            }
        };
        Game.prototype.processTriggers = function () {
            for (var i = 0; i < this.triggers.length; i++) {
                if (!this.triggers[i].active) {
                    this.triggers.splice(i, 1);
                    i--;
                }
            }
        };
        Game.prototype.startGame = function () {
            this.state = State.Game;
            this.draw.cam.pos = this.mimic.controlledEntity.body.center;
            this.bodies = [];
            this.entities = [];
            this.triggers = [];
            this.mimic = new Mimic_1.Mimic(this);
            this.mimic.controlledEntity = this.makeMonster(new geom.Vector(0, 0));
            Game.loadMap(Game.levelPaths[this.currentLevelName], this.currentLevelName);
            this.sounds.playcontinuously("game", 0.2);
            this.soundsarr.push(this.sounds);
        };
        Game.prototype.step = function () {
            if (this.state == State.Waiting) {
                if (Control_2.Control.isMouseLeftPressed() || Control_2.Control.isMouseRightPressed())
                    this.startGame();
                return;
            }
            if (this.mimic.isDead()) {
                for (; 0 < this.soundsarr.length;) {
                    var cursound = this.soundsarr.pop();
                    cursound.stop();
                }
                this.state = State.Waiting;
            }
            if (this.levels[this.currentLevelName]) {
                this.currentLevel = this.levels[this.currentLevelName];
            }
            this.currentLevel.generateLighting();
            this.mimic.step();
            this.attachCamToMimic();
            this.entities.forEach(function (entity) { return entity.animation.step(); });
            this.entities.forEach(function (entity) { return entity.step(); });
            this.triggers.forEach(function (trigger) { return trigger.step(); });
            this.processEntities();
            this.processTriggers();
            this.currentLevel.processLighting();
        };
        Game.prototype.attachCamToMimic = function () {
            this.draw.cam.pos = this.draw.cam.pos.add(this.mimic.controlledEntity.body.center.sub(this.draw.cam.pos).mul(0.1));
        };
        Game.prototype.checkWall = function (pos) {
            var posRound = new geom.Vector(Math.floor(pos.x / this.currentLevel.tileSize), Math.floor(pos.y / this.currentLevel.tileSize));
            if (posRound.x < 0 || posRound.y < 0 ||
                posRound.x >= this.currentLevel.Grid.length ||
                posRound.y >= this.currentLevel.Grid[0].length)
                return 0;
            var collisionType = this.currentLevel.Grid[posRound.x][posRound.y].colision;
            var posIn = pos.sub(posRound.mul(this.currentLevel.tileSize)).mul(1 / this.currentLevel.tileSize);
            if (collisionType == Tile_4.CollisionType.Full ||
                collisionType == Tile_4.CollisionType.CornerUR && posIn.y < posIn.x ||
                collisionType == Tile_4.CollisionType.CornerDL && posIn.y > posIn.x ||
                collisionType == Tile_4.CollisionType.CornerDR && posIn.y > 1 - posIn.x ||
                collisionType == Tile_4.CollisionType.CornerUL && posIn.y < 1 - posIn.x)
                return collisionType;
            return Tile_4.CollisionType.Empty;
        };
        Game.prototype.configureCamScale = function () {
            this.draw.cam.scale = 80 * (1 + 0.1 * (this.mimic.aim.charge / this.mimic.aim.chargeMax));
            if (this.mimic.aim.charge > 0) {
                this.draw.cam.pos.x += Math.sin(aux.getMilliCount() * 0.01) * 0.01;
                this.draw.cam.pos.y += Math.cos(aux.getMilliCount() * 0.01) * 0.01;
            }
        };
        Game.prototype.display = function () {
            if (this.state == State.Waiting) {
                this.draw.attachToCanvas();
                var image = Draw_12.Draw.loadImage("textures/Screens/Start.png");
                if (this.mimic.isDead())
                    image = Draw_12.Draw.loadImage("textures/Screens/Death.png");
                this.draw.image(image, this.draw.cam.center, this.draw.cam.center.mul(2), 0, Draw_12.Layer.HudLayer);
                this.draw.getimage();
                return;
            }
            this.configureCamScale();
            this.currentLevel.display(this.draw);
            for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
                var entity = _a[_i];
                entity.display(this.draw);
            }
            this.draw.getimage();
            this.mimic.display(this.draw);
            this.currentLevel.displayLighting(this.draw);
            this.draw.step();
            Debug_4.Debug.clear();
        };
        Game.dt = 0.02;
        Game.levelPaths = new Map();
        return Game;
    }());
    exports.Game = Game;
});
define("SpriteAnimation", ["require", "exports", "Draw", "Game"], function (require, exports, Draw_13, Game_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpriteAnimation = exports.AnimationState = void 0;
    var AnimationState = (function () {
        function AnimationState(pos, box, angle, opacity) {
            if (opacity === void 0) { opacity = 1; }
            this.pos = pos;
            this.box = box;
            this.angle = angle;
            this.opacity = opacity;
        }
        return AnimationState;
    }());
    exports.AnimationState = AnimationState;
    var SpriteAnimation = (function () {
        function SpriteAnimation() {
            this.time = 0;
        }
        SpriteAnimation.prototype.loadFrames = function (name, framesNumber) {
            this.frames = [];
            for (var i = 0; i < framesNumber; i++) {
                this.frames[i] = Draw_13.Draw.loadImage("textures/" + name + "/" + i + ".png");
            }
        };
        SpriteAnimation.prototype.getCurrentState = function () {
            var multB = this.time / this.duration;
            var multA = 1 - multB;
            return new AnimationState(this.initialState.pos.mul(multA).add(this.finalState.pos.mul(multB)), this.initialState.box.mul(multA).add(this.finalState.box.mul(multB)), this.initialState.angle * multA + this.finalState.angle * multB, this.initialState.opacity * multA + this.finalState.opacity * multB);
        };
        SpriteAnimation.prototype.getCurrentFrame = function () {
            var frameNumber = Math.floor(this.time / this.frameDuration) % this.frames.length;
            return this.frames[frameNumber];
        };
        SpriteAnimation.prototype.step = function () {
            this.time += Game_9.Game.dt;
        };
        SpriteAnimation.prototype.isOver = function () {
            return this.time > this.duration;
        };
        SpriteAnimation.prototype.display = function (draw) {
            var state = this.getCurrentState();
            var frame = this.getCurrentFrame();
            draw.image(frame, state.pos, state.box, state.angle, Draw_13.Layer.EntityLayer, state.opacity);
        };
        return SpriteAnimation;
    }());
    exports.SpriteAnimation = SpriteAnimation;
    ;
});
define("Draw", ["require", "exports", "Geom", "SpriteAnimation"], function (require, exports, geom, SpriteAnimation_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Draw = exports.Layer = exports.Color = exports.Camera = void 0;
    var Camera = (function () {
        function Camera() {
        }
        return Camera;
    }());
    exports.Camera = Camera;
    var Color = (function () {
        function Color(r, g, b, a) {
            if (a === void 0) { a = 255; }
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        Color.prototype.toString = function () {
            return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
        };
        Color.prototype.setAlpha = function (a) {
            return new Color(this.r, this.g, this.b, a);
        };
        return Color;
    }());
    exports.Color = Color;
    var Layer;
    (function (Layer) {
        Layer[Layer["TileLayer"] = 0] = "TileLayer";
        Layer[Layer["EntityLayer"] = 1] = "EntityLayer";
        Layer[Layer["HudLayer"] = 2] = "HudLayer";
    })(Layer = exports.Layer || (exports.Layer = {}));
    var Draw = (function () {
        function Draw(canvas, size) {
            if (size === void 0) { size = null; }
            this.imagequeue = [];
            this.hpqueue = [];
            this.cam = new Camera();
            this.spriteAnimations = [];
            this.canvas = canvas;
            if (size) {
                canvas.width = size.x;
                canvas.height = size.y;
            }
            else {
                size = new geom.Vector();
                size.x = canvas.width;
                size.y = canvas.height;
            }
            this.ctx = canvas.getContext("2d");
            this.cam.scale = 1;
            this.cam.pos = new geom.Vector();
            this.cam.center = size.mul(1 / 2);
        }
        Draw.loadImage = function (src) {
            if (this.images[src]) {
                return this.images[src];
            }
            var image = new Image();
            image.src = src;
            this.images[src] = image;
            return image;
        };
        Draw.prototype.transform = function (pos) {
            var posNew = pos.clone();
            posNew = posNew.sub(this.cam.pos);
            posNew = posNew.mul(this.cam.scale);
            posNew = posNew.add(this.cam.center);
            return posNew;
        };
        Draw.prototype.transformBack = function (pos) {
            var posNew = pos.clone();
            posNew = posNew.sub(this.cam.center);
            posNew = posNew.mul(1 / this.cam.scale);
            posNew = posNew.add(this.cam.pos);
            return posNew;
        };
        Draw.prototype.resize = function (size) {
            this.cam.center = size.mul(1 / 2);
            this.canvas.width = size.x;
            this.canvas.height = size.y;
        };
        Draw.prototype.attachToCanvas = function () {
            this.cam.pos = this.cam.center;
            this.cam.scale = 1;
        };
        Draw.prototype.drawimage = function (image, pos, box, angle, transparency) {
            var posNew = this.transform(pos);
            var boxNew = box.mul(this.cam.scale * 1.01);
            posNew = posNew.sub(boxNew.mul(1 / 2));
            this.ctx.imageSmoothingEnabled = false;
            if (angle % (2 * Math.PI) == 0) {
                this.ctx.globalAlpha = transparency;
                this.ctx.drawImage(image, posNew.x, posNew.y, boxNew.x, boxNew.y);
            }
            else {
                var buffer = document.createElement('canvas');
                buffer.width = boxNew.x * 2;
                buffer.height = boxNew.y * 2;
                var bctx = buffer.getContext('2d');
                bctx.imageSmoothingEnabled = false;
                bctx.translate(boxNew.x, boxNew.y);
                bctx.rotate(angle);
                bctx.drawImage(image, -boxNew.x / 2, -boxNew.y / 2, boxNew.x, boxNew.y);
                this.ctx.globalAlpha = transparency;
                this.ctx.drawImage(buffer, posNew.x - boxNew.x / 2, posNew.y - boxNew.y / 2);
            }
            this.ctx.globalAlpha = 1;
        };
        Draw.prototype.image = function (image, pos, box, angle, layer, transparency) {
            if (transparency === void 0) { transparency = 1; }
            if (layer == 0) {
                this.drawimage(image, pos, box, angle, transparency);
            }
            else {
                var curqueue = { image: image, pos: pos, box: box, angle: angle, layer: layer, transparency: transparency };
                this.imagequeue.push(curqueue);
            }
        };
        Draw.prototype.displayBuffer = function (image, pos, box, angle, transparency) {
            var posNew = this.transform(pos);
            var boxNew = box.mul(this.cam.scale * 1.01);
            posNew = posNew.sub(boxNew.mul(1 / 2));
            if (angle % (2 * Math.PI) == 0) {
                this.ctx.globalAlpha = transparency;
                this.ctx.drawImage(image, posNew.x, posNew.y, boxNew.x, boxNew.y);
            }
            else {
                var buffer = document.createElement('canvas');
                buffer.width = boxNew.x * 2;
                buffer.height = boxNew.y * 2;
                var bctx = buffer.getContext('2d');
                bctx.imageSmoothingEnabled = false;
                bctx.translate(boxNew.x, boxNew.y);
                bctx.rotate(angle);
                bctx.drawImage(image, -boxNew.x / 2, -boxNew.y / 2, boxNew.x, boxNew.y);
                this.ctx.globalAlpha = transparency;
                this.ctx.drawImage(buffer, posNew.x - boxNew.x / 2, posNew.y - boxNew.y / 2);
            }
            this.ctx.globalAlpha = 1;
        };
        Draw.prototype.getimage = function () {
            if (this.imagequeue.length > 0) {
                this.imagequeue.sort(function (a, b) {
                    if (a.layer > b.layer)
                        return -1;
                    if (a.layer < b.layer)
                        return 1;
                    if (a.pos.y > b.pos.y)
                        return -1;
                    if (a.pos.y < b.pos.y)
                        return 1;
                    return 0;
                });
                for (; this.imagequeue.length > 0;) {
                    var temp = this.imagequeue.pop();
                    this.drawimage(temp.image, temp.pos, temp.box, temp.angle, temp.transparency);
                }
            }
            for (; this.hpqueue.length > 0;) {
                var temp = this.hpqueue.pop();
                var pos = temp.pos;
                var box = temp.box;
                var percentage = temp.percentage;
                var frontColor = temp.frontColor;
                var backColor = temp.backColor;
                var marks = temp.marks;
                var bar = box.clone();
                bar.x *= percentage;
                this.fillRect(pos, box, backColor);
                var posNew = pos.clone();
                posNew.x -= (box.x - bar.x) / 2;
                this.fillRect(posNew, bar, frontColor);
                bar.x = 2 / this.cam.scale;
                pos.x -= box.x / 2;
                for (var i = 0; i < marks.length; i++) {
                    posNew = pos.clone();
                    posNew.x += box.x * marks[i];
                    this.fillRect(posNew, bar, backColor);
                }
            }
        };
        Draw.prototype.fillRect = function (pos, box, color) {
            var posNew = this.transform(pos);
            var boxNew = box.mul(this.cam.scale);
            posNew = posNew.sub(boxNew.mul(1 / 2));
            this.ctx.fillStyle = color.toString();
            this.ctx.fillRect(posNew.x, posNew.y, boxNew.x, boxNew.y);
        };
        Draw.prototype.strokeRect = function (pos, box, color, lineWidth) {
            var posNew = this.transform(pos);
            var boxNew = box.mul(this.cam.scale);
            posNew = posNew.sub(boxNew.mul(1 / 2));
            this.ctx.strokeStyle = color.toString();
            this.ctx.lineWidth = lineWidth * this.cam.scale;
            this.ctx.strokeRect(posNew.x, posNew.y, boxNew.x, boxNew.y);
        };
        Draw.prototype.fillCircle = function (pos, radius, color) {
            var posNew = this.transform(pos);
            this.ctx.beginPath();
            this.ctx.arc(posNew.x, posNew.y, radius * this.cam.scale, 0, Math.PI * 2, false);
            this.ctx.fillStyle = color.toString();
            this.ctx.fill();
        };
        Draw.prototype.strokeCircle = function (pos, radius, color, lineWidth) {
            var posNew = this.transform(pos);
            this.ctx.beginPath();
            this.ctx.arc(posNew.x, posNew.y, radius * this.cam.scale, 0, Math.PI * 2, false);
            this.ctx.lineWidth = lineWidth * this.cam.scale;
            this.ctx.strokeStyle = color.toString();
            this.ctx.stroke();
        };
        Draw.prototype.fillPolygon = function (vertices, color) {
            for (var i = 0; i < vertices.length; i++) {
                var posNew = this.transform(vertices[i]);
                this.ctx.lineTo(posNew.x, posNew.y);
            }
            this.ctx.fillStyle = color.toString();
            this.ctx.fill();
        };
        Draw.prototype.line = function (begin, end, color, lineWidth) {
            begin = this.transform(begin);
            end = this.transform(end);
            this.ctx.beginPath();
            this.ctx.moveTo(begin.x, begin.y);
            this.ctx.lineTo(end.x, end.y);
            this.ctx.closePath();
            this.ctx.lineWidth = lineWidth;
            this.ctx.strokeStyle = color.toString();
            this.ctx.stroke();
        };
        Draw.prototype.strokePolygon = function (vertices, color, lineWidth) {
            for (var i = 0; i < vertices.length; i++) {
                var posNew = this.transform(vertices[i]);
                this.ctx.lineTo(posNew.x, posNew.y);
                this.ctx.lineWidth = lineWidth * this.cam.scale;
            }
            this.ctx.strokeStyle = color.toString();
            this.ctx.stroke();
        };
        Draw.prototype.fillSector = function (pos, radius, color, startAngle, endAngle) {
            var posNew = this.transform(pos);
            this.ctx.beginPath();
            this.ctx.arc(posNew.x, posNew.y, radius * this.cam.scale, startAngle, endAngle, false);
            this.ctx.fillStyle = color.toString();
            this.ctx.fill();
        };
        Draw.prototype.strokeSector = function (pos, radius, color, lineWidth, startAngle, endAngle) {
            var posNew = this.transform(pos);
            this.ctx.beginPath();
            this.ctx.arc(posNew.x, posNew.y, radius * this.cam.scale, startAngle, endAngle, false);
            this.ctx.lineWidth = lineWidth * this.cam.scale;
            this.ctx.strokeStyle = color.toString();
            this.ctx.stroke();
        };
        Draw.prototype.spriteAnimation = function (name, framesNumber, initialState, finalState, duration, frameDuration) {
            var animation = new SpriteAnimation_5.SpriteAnimation();
            animation.loadFrames(name, framesNumber);
            animation.initialState = initialState;
            animation.finalState = finalState;
            animation.duration = duration;
            animation.frameDuration = frameDuration;
            this.spriteAnimations.push(animation);
        };
        Draw.prototype.step = function () {
            var _this = this;
            this.spriteAnimations.forEach(function (animation) { return animation.step(); });
            for (var i = 0; i < this.spriteAnimations.length; i++) {
                if (this.spriteAnimations[i].isOver()) {
                    this.spriteAnimations.splice(i, 1);
                    i--;
                }
            }
            this.spriteAnimations.forEach(function (animation) { return animation.display(_this); });
        };
        Draw.prototype.clear = function () {
            this.ctx.clearRect(-1000, -1000, 10000, 10000);
        };
        Draw.prototype.bar = function (pos, box, percentage, backColor, frontColor, marks) {
            if (percentage > 1)
                percentage = 1;
            if (percentage < 0)
                percentage = 0;
            var queue = { pos: pos, box: box, percentage: percentage, frontColor: frontColor, backColor: backColor, marks: marks };
            this.hpqueue.push(queue);
        };
        Draw.images = {};
        return Draw;
    }());
    exports.Draw = Draw;
});
define("AuxLib", ["require", "exports", "Draw", "Geom"], function (require, exports, Draw_14, geom) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reviver = exports.replacer = exports.getMilliCount = exports.mergeArray = exports.arrayMove = exports.swap = exports.setEnvironment = exports.setEditorMode = exports.vectorStringify = exports.editorMode = exports.environment = void 0;
    exports.editorMode = false;
    function vectorStringify(v) {
        var ans = "x:" + String(v.x).valueOf() + "y:" + String(v.y);
        return ans;
    }
    exports.vectorStringify = vectorStringify;
    function setEditorMode(newEditorMode) {
        exports.editorMode = newEditorMode;
    }
    exports.setEditorMode = setEditorMode;
    function setEnvironment(env) {
        exports.environment = env;
    }
    exports.setEnvironment = setEnvironment;
    function swap(a, b) {
        a = [b, b = a][0];
    }
    exports.swap = swap;
    function arrayMove(arr, old_index, new_index) {
        var elem = arr[old_index];
        if (old_index < new_index) {
            new_index--;
        }
        arr.splice(old_index, 1);
        arr.splice(new_index, 0, elem);
    }
    exports.arrayMove = arrayMove;
    ;
    function mergeArray(arr1, arr2, func) {
        if (arr1.length == 0) {
            return arr2;
        }
        if (arr2.length == 0) {
            return arr1;
        }
        var arr = [];
        for (var i = 0; i < arr1.length; i++) {
            arr[arr.length] = arr1[i];
        }
        for (var i = 0; i < arr2.length; i++) {
            arr[arr.length] = arr2[i];
        }
        arr.sort(func);
        return arr;
    }
    exports.mergeArray = mergeArray;
    function getMilliCount() {
        return new Date().getTime();
    }
    exports.getMilliCount = getMilliCount;
    function replacer(key, value) {
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()),
            };
        }
        if (value instanceof HTMLImageElement) {
            var name_2 = value.src;
            var nameSplit = name_2.split("/");
            var lastSplit = nameSplit[nameSplit.length - 1];
            return {
                dataType: 'HTMLImageElement',
                value: lastSplit
            };
        }
        if (value instanceof geom.Vector) {
            return {
                dataType: 'Vector',
                x: value.x,
                y: value.y
            };
        }
        return value;
    }
    exports.replacer = replacer;
    function reviver(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (value.dataType === 'Map') {
                return new Map(value.value);
            }
            if (value.dataType === 'HTMLImageElement') {
                return Draw_14.Draw.loadImage("./textures/tiles/" + value.value);
            }
            if (value.dataType === 'Vector') {
                return JSON.stringify(new geom.Vector(value.x, value.y));
            }
        }
        return value;
    }
    exports.reviver = reviver;
});
define("Editor/EditorGUI", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EditorGUI = void 0;
    var GUIElement = (function () {
        function GUIElement() {
        }
        GUIElement.prototype.display = function (draw) { };
        return GUIElement;
    }());
    var GUIImage = (function (_super) {
        __extends(GUIImage, _super);
        function GUIImage(pos, image, box) {
            var _this = _super.call(this) || this;
            _this.pos = pos;
            _this.image = image;
            _this.box = box;
            return _this;
        }
        GUIImage.prototype.display = function (draw) {
            console.log("drawed");
            draw.drawimage(this.image, this.pos, this.box, 0, 1);
        };
        return GUIImage;
    }(GUIElement));
    var GUILine = (function (_super) {
        __extends(GUILine, _super);
        function GUILine(begin, end, color) {
            var _this = _super.call(this) || this;
            _this.begin = begin;
            _this.end = end;
            _this.color = color;
            return _this;
        }
        GUILine.prototype.display = function (draw) {
            draw.line(this.begin, this.end, this.color, 2);
        };
        return GUILine;
    }(GUIElement));
    var EditorGUI = (function () {
        function EditorGUI() {
        }
        EditorGUI.addImage = function (pos, image, box) {
            return this.GUIelements[this.GUIelements.length] = new GUIImage(pos, image, box);
        };
        EditorGUI.addLine = function (begin, end, color) {
            return this.GUIelements[this.GUIelements.length] = new GUILine(begin, end, color);
        };
        EditorGUI.display = function (draw) {
            for (var i = 0; i < this.GUIelements.length; i++) {
                this.GUIelements[i].display(draw);
            }
            this.GUIelements = [];
        };
        EditorGUI.GUIelements = [];
        return EditorGUI;
    }());
    exports.EditorGUI = EditorGUI;
});
define("Editor/ListOfPads", ["require", "exports", "BehaviorModel", "Editor/Cursor", "BehaviorModel", "AuxLib", "Geom", "Editor/EditorGUI", "Draw"], function (require, exports, BehaviorModel_4, Cursor_1, BehaviorModel_5, aux, Geom_6, EditorGUI_1, Draw_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListOfPads = void 0;
    var ListOfPads = (function () {
        function ListOfPads() {
        }
        ListOfPads.updateInstructionCopy = function () {
            if (this.behaviorModel != undefined && this.behaviorModel.instructions != undefined
                && this.behaviorModel.instructions[this.instructionType] != undefined) {
                this.instructionCopy = this.behaviorModel.instructions[this.instructionType].clone();
            }
        };
        ListOfPads.getPadPlace = function (pad) {
            var listOfPads = document.querySelector(".listOfPads");
            var pads = listOfPads.children;
            for (var i = 0; i < pads.length; i++) {
                if (pads[i].id == pad.id) {
                    return i;
                }
            }
        };
        ListOfPads.init = function (cursor) {
            var _this = this;
            this.cursor = cursor;
            var listOfPads = document.querySelector(".listOfPads");
            listOfPads.addEventListener('dragstart', function (evt) {
                var x = evt.target;
                x.classList.add('selected');
                _this.updateInstructionCopy();
            });
            listOfPads.addEventListener('dragend', function (evt) {
                var x = evt.target;
                x.classList.remove('selected');
                _this.updateInstructionCopy();
            });
            listOfPads.addEventListener("dragover", function (evt) {
                evt.preventDefault();
                var activeElement = listOfPads.querySelector(".selected");
                var currentElement = evt.target;
                var isMoveable = activeElement !== currentElement &&
                    currentElement.classList.contains("behaviorPad");
                if (!isMoveable) {
                    return;
                }
                var nextElement = (currentElement === activeElement.nextElementSibling) ?
                    currentElement.nextElementSibling :
                    currentElement;
                var instruction = _this.behaviorModel.instructions[_this.instructionType];
                aux.arrayMove(instruction.operations, _this.getPadPlace(activeElement), _this.getPadPlace(nextElement));
                aux.arrayMove(instruction.operationsData, _this.getPadPlace(activeElement), _this.getPadPlace(nextElement));
                listOfPads.insertBefore(activeElement, nextElement);
                _this.updateInstructionCopy();
            });
        };
        ListOfPads.deleteBehaviorPad = function (exitButton) {
            var instruction = this.behaviorModel.instructions[this.instructionType];
            var pad = exitButton.parentElement;
            instruction.operations.splice(this.getPadPlace(pad), 1);
            instruction.operationsData.splice(this.getPadPlace(pad), 1);
            exitButton.parentElement.remove();
            this.updateInstructionCopy();
        };
        ListOfPads.clear = function () {
            var listOfPads = document.querySelector(".listOfPads");
            while (listOfPads.children.length != 0) {
                listOfPads.children[0].remove();
            }
        };
        ListOfPads.createBehaviorPad = function (src, tool) {
            var _this = this;
            var pad = document.createElement("li");
            pad.className = "behaviorPad";
            var additionalElement = document.createElement("p");
            var icon = document.createElement("img");
            var label = document.createElement("p");
            var exitButton = document.createElement("img");
            icon.className = "behaviorPad_icon";
            icon.src = src;
            if (tool != Cursor_1.ToolType.Pursuit) {
                label.className = "behaviorPad_label";
            }
            else {
                label.className = "behaviorPad_center_label";
            }
            pad.id = "pad_" + this.amountOfPads;
            label.id = "padLabel_" + this.amountOfPads;
            additionalElement.className = "behaviorPad_additionalElement";
            switch (tool) {
                case Cursor_1.ToolType.GoToPoint: {
                    label.innerHTML = "Go to ";
                    additionalElement.innerHTML = "(0, 0)";
                    var posPick = function () {
                        console.log("clicked");
                        additionalElement.classList.add("selected");
                        _this.cursor.changeMode(Cursor_1.Mode.PosPicking);
                        _this.currentPad = additionalElement.parentElement;
                        _this.updateInstructionCopy();
                    };
                    additionalElement.onclick = posPick;
                    break;
                }
                case Cursor_1.ToolType.Waiting: {
                    label.innerHTML = "Wait ";
                    additionalElement.inputMode = "decimal";
                    additionalElement.innerHTML = "1000";
                    additionalElement.contentEditable = "true";
                    var changeVal = function (evt) {
                        var elem = evt.target;
                        var val = new Number(elem.innerHTML);
                        console.log("val is ", val, " is integer ", Number.isInteger(val.valueOf()));
                        var instruction = _this.behaviorModel.instructions[_this.instructionType];
                        if (Number.isInteger(val.valueOf())) {
                            instruction.operationsData[_this.getPadPlace(elem.parentElement)] = val.valueOf();
                        }
                        else {
                        }
                        _this.updateInstructionCopy();
                    };
                    additionalElement.addEventListener("input", changeVal);
                    break;
                }
                case Cursor_1.ToolType.Pursuit: {
                    label.innerHTML = "Pursuit";
                    break;
                }
            }
            exitButton.className = "behaviorPad_exitButton";
            exitButton.src = "textures/Editor/cross.ico";
            var deleteDiv = function () {
                _this.deleteBehaviorPad(exitButton);
                _this.updateInstructionCopy();
            };
            exitButton.onclick = deleteDiv;
            pad.draggable = true;
            icon.draggable = false;
            label.draggable = false;
            exitButton.draggable = false;
            pad.appendChild(icon);
            pad.appendChild(label);
            if (tool != Cursor_1.ToolType.Pursuit) {
                pad.appendChild(additionalElement);
            }
            pad.appendChild(exitButton);
            document.getElementById("mainListPads").append(pad);
            this.amountOfPads += 1;
            this.updateInstructionCopy();
            return pad;
        };
        ListOfPads.choosePoint = function (point) {
            if (this.currentPad == null) {
                return;
            }
            this.currentPad.children[2].innerHTML = "(" + new String(point.x) + "," + new String(point.y) + ")";
            this.currentPad.children[2].classList.remove("selected");
            this.behaviorModel.instructions[this.instructionType].operationsData[this.getPadPlace(this.currentPad)] = point;
            this.updateInstructionCopy();
        };
        ListOfPads.GUIstep = function () {
            if (this.instructionCopy == null) {
                return;
            }
            var currentPos = this.entityPos;
            var imageMas = [];
            var imageSize = 1;
            for (var i = 0; i < this.instructionCopy.operations.length; i++) {
                switch (this.instructionCopy.operations[i]) {
                    case BehaviorModel_5.Operations.goToPoint: {
                        console.log(currentPos, this.instructionCopy.operationsData[i]);
                        var oldPos = currentPos;
                        EditorGUI_1.EditorGUI.addLine(currentPos, this.instructionCopy.operationsData[i], new Draw_15.Color(0, 255, 0, 1));
                        currentPos = this.instructionCopy.operationsData[i];
                        for (var j = 0; j < imageMas.length; j++) {
                            EditorGUI_1.EditorGUI.addImage(oldPos.add(new Geom_6.Vector((-imageMas.length * 0.5 + 0.5 + j) * imageSize, 0)), imageMas[j], new Geom_6.Vector(imageSize, imageSize));
                        }
                        imageMas = [];
                        break;
                    }
                    case BehaviorModel_5.Operations.wait: {
                        imageMas[imageMas.length] = Draw_15.Draw.loadImage("textures/Editor/waiting.png");
                        break;
                    }
                    case BehaviorModel_5.Operations.pursuit: {
                        imageMas[imageMas.length] = Draw_15.Draw.loadImage("textures/Editor/pursuit.png");
                        break;
                    }
                }
            }
            for (var j = 0; j < imageMas.length; j++) {
                EditorGUI_1.EditorGUI.addImage(currentPos.add(new Geom_6.Vector(-imageMas.length * 0.5 + 0.5 + j, 0)), imageMas[j], new Geom_6.Vector(imageSize, imageSize));
            }
            imageMas = [];
        };
        ListOfPads.compileBehaviorModel = function (behaviorModel) {
            if (behaviorModel == undefined) {
                behaviorModel = new BehaviorModel_4.BehaviorModel(null);
            }
            if (behaviorModel.instructions[this.instructionType] == undefined) {
                behaviorModel.instructions[this.instructionType] = new BehaviorModel_4.Instruction();
            }
            this.behaviorModel = behaviorModel;
            this.clear();
            var instruction = behaviorModel.instructions[this.instructionType];
            for (var i = 0; i < instruction.operations.length; i++) {
                var src = "";
                switch (instruction.operations[i]) {
                    case BehaviorModel_5.Operations.goToPoint: {
                        src = "textures/Editor/arrow.png";
                        var pad = this.createBehaviorPad(src, Cursor_1.ToolType.GoToPoint);
                        var ae = pad.children[2];
                        ae.innerHTML = "("
                            + new String(instruction.operationsData[i].x) + ","
                            + new String(instruction.operationsData[i].y) + ")";
                        break;
                    }
                    case BehaviorModel_5.Operations.wait: {
                        src = "textures/Editor/waiting.png";
                        var pad = this.createBehaviorPad(src, Cursor_1.ToolType.Waiting);
                        var ae = pad.children[2];
                        ae.innerHTML = new String(instruction.operationsData[i]).valueOf();
                        break;
                    }
                    case BehaviorModel_5.Operations.pursuit: {
                        src = "textures/Editor/pursuit.png";
                        this.createBehaviorPad(src, Cursor_1.ToolType.Pursuit);
                        break;
                    }
                }
            }
            this.updateInstructionCopy();
        };
        ListOfPads.amountOfPads = 0;
        ListOfPads.instructionType = "default";
        ListOfPads.entityPos = new Geom_6.Vector(0, 0);
        ListOfPads.behaviorModel = null;
        ListOfPads.currentPad = null;
        return ListOfPads;
    }());
    exports.ListOfPads = ListOfPads;
});
define("Editor/Cursor", ["require", "exports", "Control", "Draw", "Entities/Entity", "Entities/EntityAttributes/Body", "Entities/Monster", "Entities/Person", "Entities/Scientist", "Entities/Soldier", "Geom", "Tile", "AuxLib", "Editor/ListOfPads"], function (require, exports, Control_3, Draw_16, Entity_4, Body_3, Monster_5, Person_6, Scientist_3, Soldier_3, geom, Tile_5, aux, ListOfPads_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cursor = exports.Mode = exports.ToolType = void 0;
    var ToolType;
    (function (ToolType) {
        ToolType[ToolType["GoToPoint"] = 0] = "GoToPoint";
        ToolType[ToolType["Waiting"] = 1] = "Waiting";
        ToolType[ToolType["Pursuit"] = 2] = "Pursuit";
    })(ToolType = exports.ToolType || (exports.ToolType = {}));
    var Mode;
    (function (Mode) {
        Mode[Mode["Eraser"] = 0] = "Eraser";
        Mode[Mode["Wall"] = 1] = "Wall";
        Mode[Mode["Entity"] = 2] = "Entity";
        Mode[Mode["Selector"] = 3] = "Selector";
        Mode[Mode["PosPicking"] = 4] = "PosPicking";
        Mode[Mode["Light"] = 5] = "Light";
    })(Mode = exports.Mode || (exports.Mode = {}));
    var Cursor = (function () {
        function Cursor(level, draw) {
            if (level === void 0) { level = null; }
            if (draw === void 0) { draw = null; }
            this.pos = new geom.Vector();
            this.gridPos = new geom.Vector();
            this.tile = new Tile_5.Tile(Tile_5.CollisionType.Full);
            this.entity = new Entity_4.Entity(null, new Body_3.Body(new geom.Vector(0, 0), 1));
            this.selectedEntity = null;
            this.mode = Mode.Wall;
            this.mouseLeftButtonClicked = true;
            this.entityLocations = new Map();
            this.level = level;
            this.draw = draw;
        }
        Cursor.prototype.setBlock = function () {
            console.log(this.tile);
            var tileLight = this.level.Grid[this.gridPos.x][this.gridPos.y].light;
            this.level.Grid[this.gridPos.x][this.gridPos.y] = this.tile.clone();
            this.level.Grid[this.gridPos.x][this.gridPos.y].light = tileLight;
            console.log(this.level.Grid[this.gridPos.x][this.gridPos.y]);
        };
        Cursor.prototype.setEntity = function () {
            var currentLocation = this.level.Entities.length;
            if (this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)] != null) {
                currentLocation = this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)];
            }
            this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)] = currentLocation;
            if (this.entity instanceof Soldier_3.Soldier) {
                var pos = this.gridPos.add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1 / 2));
                this.level.Entities[currentLocation] = new Soldier_3.Soldier(null, new Body_3.Body(pos, 1), Person_6.PersonMode.Fine);
            }
            if (this.entity instanceof Scientist_3.Scientist) {
                var pos = this.gridPos.add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1 / 2));
                this.level.Entities[currentLocation] = new Scientist_3.Scientist(null, new Body_3.Body(pos, 1), Person_6.PersonMode.Fine);
            }
            if (this.entity instanceof Monster_5.Monster) {
                var pos = this.gridPos.add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1 / 2));
                this.level.Entities[currentLocation] = new Monster_5.Monster(null, new Body_3.Body(pos, 1));
            }
        };
        Cursor.prototype.setLight = function () {
            this.level.makeLightSource(this.gridPos, 10);
            this.level.generateLighting();
        };
        Cursor.prototype.changeMode = function (mode) {
            this.mode = mode;
            switch (mode) {
                case Mode.Eraser: {
                    document.getElementById("gameCanvas")["style"].cursor = "url(textures/Editor/Cursors/eraser.png) 9 21, auto";
                    this.selectedEntity = null;
                    break;
                }
                case Mode.Entity: {
                    this.selectedEntity = null;
                    document.getElementById("gameCanvas")["style"].cursor = "url(textures/Editor/Cursors/adding.png) 15 15, auto";
                    break;
                }
                case Mode.Wall: {
                    this.selectedEntity = null;
                    document.getElementById("gameCanvas")["style"].cursor = "url(textures/Editor/Cursors/adding.png) 15 15, auto";
                    break;
                }
                case Mode.PosPicking: {
                    document.getElementById("gameCanvas")["style"].cursor = "url(textures/Editor/Cursors/flag.png) 2 25, auto";
                    break;
                }
                case Mode.Selector: {
                    document.getElementById("gameCanvas")["style"].cursor = "default";
                    break;
                }
                case Mode.Light: {
                    this.selectedEntity = null;
                    break;
                }
            }
        };
        Cursor.prototype.step = function () {
            this.pos = this.draw.transformBack(Control_3.Control.mousePos());
            this.gridPos = this.level.gridCoordinates(this.pos);
            if (Control_3.Control.isMouseLeftPressed() && this.level.isInBounds(this.pos)) {
                switch (this.mode) {
                    case Mode.Eraser: {
                        if (this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)] != null) {
                            console.log(this.level.Entities);
                            this.level.Entities.splice(this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)], 1);
                            for (var j = 0; j < this.level.Entities.length; j++) {
                                var gridCord = this.level.gridCoordinates(this.level.Entities[j].body.center);
                                this.entityLocations[JSON.stringify(gridCord, aux.replacer)] = j;
                            }
                            console.log(this.level.Entities);
                            this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)] = null;
                        }
                        break;
                    }
                    case Mode.Wall: {
                        this.setBlock();
                        break;
                    }
                    case Mode.Entity: {
                        if (this.mouseLeftButtonClicked) {
                            this.setEntity();
                            this.mouseLeftButtonClicked = false;
                        }
                        break;
                    }
                    case Mode.Selector: {
                        if (this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)] != null) {
                            this.selectedEntity = this.level.Entities[this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)]];
                            if (this.selectedEntity instanceof Person_6.Person) {
                                ListOfPads_1.ListOfPads.compileBehaviorModel(this.selectedEntity.behaviorModel);
                                ListOfPads_1.ListOfPads.entityPos = this.selectedEntity.body.center;
                            }
                        }
                        break;
                    }
                    case Mode.PosPicking: {
                        var fixedPos = new geom.Vector(new Number(new Number(this.pos.x).toFixed(2)).valueOf(), new Number(new Number(this.pos.y).toFixed(2)).valueOf());
                        ListOfPads_1.ListOfPads.choosePoint(fixedPos);
                        this.changeMode(Mode.Selector);
                        break;
                    }
                    case Mode.Light: {
                        this.setLight();
                        break;
                    }
                }
            }
            if (!Control_3.Control.isMouseLeftPressed()) {
                this.mouseLeftButtonClicked = true;
            }
        };
        Cursor.prototype.display = function () {
            this.drawPreview.attachToCanvas();
            this.drawPreview.clear();
            switch (this.mode) {
                case Mode.Wall: {
                    this.drawPreview.image(this.tile.image, new geom.Vector(25, 25), new geom.Vector(50, 50), 0, 0);
                    if (this.tile.sub_image) {
                        this.drawPreview.image(this.tile.sub_image, new geom.Vector(25, 25), new geom.Vector(50, 50), 0, 0);
                    }
                    break;
                }
                case Mode.Entity: {
                    this.drawPreview.image(this.entity.animation.getDefaultImage(), new geom.Vector(25, 25), new geom.Vector(50, 50), 0, 0);
                    break;
                }
            }
            if (this.level.isInBounds(this.pos))
                this.draw.strokeRect(this.gridPos.mul(this.level.tileSize).add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1 / 2)), new geom.Vector(this.level.tileSize, this.level.tileSize), new Draw_16.Color(0, 255, 0), 0.1);
        };
        return Cursor;
    }());
    exports.Cursor = Cursor;
});
define("Editor", ["require", "exports", "Control", "Draw", "Level", "Geom", "Editor/Cursor", "Tile", "Entities/EntityAttributes/Body", "Entities/Soldier", "Entities/Scientist", "Entities/Person", "Entities/Monster", "Entities/EntityAttributes/Animation", "BehaviorModel", "Editor/ListOfPads", "Editor/EditorGUI"], function (require, exports, Control_4, Draw_17, Level_2, geom, Cursor_2, Tile_6, Body_4, Soldier_4, Scientist_4, Person_7, Monster_6, Animation_5, BehaviorModel_6, ListOfPads_2, EditorGUI_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Editor = void 0;
    var Editor = (function () {
        function Editor() {
            this.level = new Level_2.Level(new geom.Vector(10, 10));
            this.cursor = new Cursor_2.Cursor(this.level);
            this.showCollisionGrid = false;
            this.hideGrid = false;
            this.palette1_bitmap = [0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                1, 0, 1, 0, 0,
                0, 0, 0, 1, 0,
                1, 1, 1, 0, 1,
                0, 1, 1, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0];
            this.palette2_bitmap = [0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                1, 1, 1, 1, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                1, 1, 1, 1, 1,
                0, 0, 0, 0, 0,
                1, 1, 1, 1, 1,
                1, 1, 1, 1, 0,
                0, 0, 0, 0, 0,
                1, 1, 1, 1];
            this.palette3_bitmap = [0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                1, 1, 1, 1, 1,
                1, 0, 1, 1, 1,
                1, 1, 1, 0, 0,
                0];
            this.mousePrev = Control_4.Control.mousePos();
            this.initHTML();
        }
        Editor.prototype.isTileSubImage = function (idPalette) {
            switch (idPalette) {
                case 1: {
                    return true;
                }
                case 2: {
                    return true;
                }
                case 3: {
                    return false;
                }
            }
            return false;
        };
        Editor.prototype.createTileButton = function (src, collision, type) {
            var _this = this;
            var button = document.createElement("img");
            button.src = src;
            button.className = "tileButton";
            var palette = document.getElementById("palette" + type);
            palette.appendChild(button);
            var applyTile = function () {
                _this.cursor.changeMode(Cursor_2.Mode.Wall);
                if (type.length > 0) {
                    var prep = new Number(type);
                    if (_this.isTileSubImage(prep.valueOf())) {
                        if (_this.cursor.tile.image) {
                            _this.cursor.tile.setSubImage(button);
                            _this.cursor.tile.colision = 5;
                        }
                    }
                    else {
                        _this.cursor.tile = new Tile_6.Tile(collision);
                        _this.cursor.tile.setImage(button);
                    }
                }
                else {
                    if (_this.isTileSubImage(1)) {
                        if (_this.cursor.tile.image) {
                            _this.cursor.tile.setSubImage(button);
                            _this.cursor.tile.colision = 5;
                        }
                    }
                    else {
                        _this.cursor.tile = new Tile_6.Tile(collision);
                        _this.cursor.tile.setImage(button);
                    }
                }
            };
            button.onclick = applyTile;
        };
        Editor.prototype.createEntityButton = function (entityType, type) {
            var _this = this;
            var button = document.createElement("img");
            if (entityType == "Soldier") {
                var applyEntity = function () {
                    _this.cursor.changeMode(Cursor_2.Mode.Entity);
                    _this.cursor.entity = new Soldier_4.Soldier(null, new Body_4.Body(new geom.Vector(0, 0), 1), Person_7.PersonMode.Fine);
                    _this.cursor.entity.animation = new Animation_5.Animation("Soldier", 8);
                };
                button.onclick = applyEntity;
                button.src = "textures/Soldier/stand_fine_0.png";
            }
            if (entityType == "Scientist") {
                var applyEntity = function () {
                    _this.cursor.changeMode(Cursor_2.Mode.Entity);
                    _this.cursor.entity = new Scientist_4.Scientist(null, new Body_4.Body(new geom.Vector(0, 0), 1), Person_7.PersonMode.Fine);
                    _this.cursor.entity.animation = new Animation_5.Animation("Scientist", 8);
                };
                button.onclick = applyEntity;
                button.src = "textures/Scientist/stand_fine_0.png";
            }
            if (entityType == "Monster") {
                var applyEntity = function () {
                    _this.cursor.changeMode(Cursor_2.Mode.Entity);
                    _this.cursor.entity = new Monster_6.Monster(null, new Body_4.Body(new geom.Vector(0, 0), 1));
                    _this.cursor.entity.animation = new Animation_5.Animation("Monster", 8);
                };
                button.onclick = applyEntity;
                button.src = "textures/Monster/stand_fine_0.png";
            }
            button.className = "entityButton";
            var palette = document.getElementById("palette" + type);
            console.log(button);
            palette.appendChild(button);
        };
        Editor.prototype.createToolButton = function (toolType, type) {
            var _this = this;
            var button = document.createElement("img");
            button.className = "toolButton";
            var src = "";
            switch (toolType) {
                case Cursor_2.ToolType.GoToPoint: {
                    src = "textures/Editor/arrow.png";
                    break;
                }
                case Cursor_2.ToolType.Waiting: {
                    src = "textures/Editor/waiting.png";
                    break;
                }
                case Cursor_2.ToolType.Pursuit: {
                    src = "textures/Editor/pursuit.png";
                    break;
                }
            }
            button.src = src;
            var palette = document.getElementById("palette" + type);
            palette.appendChild(button);
            var applyTool = function () {
                _this.cursor.changeMode(Cursor_2.Mode.Selector);
                console.log(_this.cursor.selectedEntity);
                if (_this.cursor.selectedEntity != null) {
                    if (_this.cursor.selectedEntity instanceof Person_7.Person) {
                        if (_this.cursor.selectedEntity.behaviorModel == undefined) {
                            _this.cursor.selectedEntity.behaviorModel = new BehaviorModel_6.BehaviorModel(null);
                        }
                        var behaviorModel = _this.cursor.selectedEntity.behaviorModel;
                        console.log(behaviorModel);
                        if (behaviorModel.instructions[ListOfPads_2.ListOfPads.instructionType] == undefined) {
                            behaviorModel.instructions[ListOfPads_2.ListOfPads.instructionType] = new BehaviorModel_6.Instruction();
                        }
                        if (behaviorModel.instructions.get("JSONkeys") == undefined) {
                            behaviorModel.instructions.set("JSONkeys", ["normal", "panic"]);
                        }
                        switch (toolType) {
                            case Cursor_2.ToolType.GoToPoint: {
                                console.log("well");
                                behaviorModel.instructions[ListOfPads_2.ListOfPads.instructionType].addGoingToPoint(new geom.Vector(0, 0));
                                break;
                            }
                            case Cursor_2.ToolType.Waiting: {
                                behaviorModel.instructions[ListOfPads_2.ListOfPads.instructionType].addWaiting(1000);
                                break;
                            }
                            case Cursor_2.ToolType.Pursuit: {
                                behaviorModel.instructions[ListOfPads_2.ListOfPads.instructionType].addPursuit();
                                break;
                            }
                        }
                        var pad = ListOfPads_2.ListOfPads.createBehaviorPad(src, toolType);
                        ListOfPads_2.ListOfPads.updateInstructionCopy();
                    }
                }
            };
            button.onclick = applyTool;
        };
        Editor.prototype.createCursorButton = function (cursorType, type) {
            var _this = this;
            var button = document.createElement("img");
            button.className = "cursorButton";
            if (cursorType == Cursor_2.Mode.Eraser) {
                button.src = "textures/Editor/Cursors/eraser1.png";
            }
            if (cursorType == Cursor_2.Mode.Selector) {
                button.src = "textures/Editor/Cursors/cursor_old.png";
            }
            if (cursorType == Cursor_2.Mode.Light) {
                button.src = "textures/Editor/Cursors/Bulb.png";
            }
            var palette = document.getElementById("palette" + type);
            palette.appendChild(button);
            var applyCursor = function () {
                _this.cursor.changeMode(cursorType);
            };
            button.onclick = applyCursor;
        };
        Editor.prototype.initHTML = function () {
            var _this = this;
            ListOfPads_2.ListOfPads.init(this.cursor);
            var generate = function () { _this.level.serialize(); };
            document.getElementById("generate").onclick = generate;
            var showcollision = function () {
                var chboxxx = document.getElementById("showcolision");
                _this.showCollisionGrid = chboxxx.checked;
                var b = document.getElementById("button_col");
                if (b["style"].backgroundColor == "lime") {
                    b["style"].backgroundColor = "red";
                }
                else {
                    b["style"].backgroundColor = "lime";
                }
            };
            document.getElementById("showcolision").onclick = showcollision;
            var hidegrid = function () {
                var chboxxx = document.getElementById("hidegrid");
                _this.hideGrid = chboxxx.checked;
                var b = document.getElementById("button_grid");
                if (b["style"].backgroundColor == "red") {
                    b["style"].backgroundColor = "lime";
                }
                else {
                    b["style"].backgroundColor = "red";
                }
            };
            document.getElementById("hidegrid").onclick = hidegrid;
            var showlight = function () {
                var chboxxx = document.getElementById("showShadows");
                _this.level.showLighting = chboxxx.checked;
                _this.level.generateLighting();
                var b = document.getElementById("button_shadows");
                if (b["style"].backgroundColor == "lime") {
                    b["style"].backgroundColor = "red";
                }
                else {
                    b["style"].backgroundColor = "lime";
                }
            };
            document.getElementById("showShadows").onclick = showlight;
            for (var i = 0; i < 69; i++)
                this.createTileButton("textures/tiles/ceilings/ceiling" + i + ".png", Tile_6.CollisionType.Full, "");
            for (var i = 0; i < 64; i++)
                this.createTileButton("textures/tiles/walls/wall" + i + ".png", Tile_6.CollisionType.Full, "2");
            for (var i = 0; i < 76; i++)
                this.createTileButton("textures/tiles/floors/floor" + i + ".png", Tile_6.CollisionType.Empty, "3");
            this.createEntityButton("Scientist", "4");
            this.createEntityButton("Soldier", "4");
            this.createEntityButton("Monster", "4");
            this.createToolButton(Cursor_2.ToolType.GoToPoint, "5");
            this.createToolButton(Cursor_2.ToolType.Waiting, "5");
            this.createToolButton(Cursor_2.ToolType.Pursuit, "5");
            this.createCursorButton(Cursor_2.Mode.Eraser, "7");
            this.createCursorButton(Cursor_2.Mode.Selector, "7");
            this.createCursorButton(Cursor_2.Mode.Light, "7");
            this.cursor.drawPreview = new Draw_17.Draw(document.getElementById("preview"), new geom.Vector(50, 50));
            var pal_standart_h = Math.round((window.innerHeight - 30) / 3);
            document.getElementById("palette")["style"].height = Math.round((window.innerHeight - 30) / 3) - 50 + "px";
            document.getElementById("palette2")["style"].height = Math.round((window.innerHeight - 30) / 3) - 37 + "px";
            document.getElementById("palette3")["style"].height = Math.round((window.innerHeight - 30) / 3) - 37 + "px";
            document.getElementById("palette4")["style"].height = Math.round(window.innerHeight / 3) - 40 + "px";
            document.getElementById("palette5")["style"].height = Math.round(window.innerHeight / 3) - 40 + "px";
            document.getElementById("palette6")["style"].height = 2 * Math.round(window.innerHeight / 3) - 35 + "px";
            document.getElementById("palette7")["style"].height = Math.round((window.innerHeight - 30) / 3) - 40 + "px";
            document.getElementById("palette8")["style"].height = Math.round((window.innerHeight - 30) / 3) - 40 + "px";
            document.getElementById("palette")["style"].top = "24px";
            document.getElementById("palette2")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";
            document.getElementById("palette3")["style"].top = 2 * Math.round(window.innerHeight / 3) + "px";
            document.getElementById("palette4")["style"].top = 2 * Math.round(window.innerHeight / 3) + "px";
            document.getElementById("palette5")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";
            document.getElementById("palette6")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";
            document.getElementById("palette7")["style"].top = "24px";
            document.getElementById("palette8")["style"].top = "24px";
            document.getElementById("w8")["style"].top = "0px";
            document.getElementById("w7")["style"].top = "0px";
            document.getElementById("w6")["style"].top = Math.round(window.innerHeight / 3) - 20 + "px";
            document.getElementById("w5")["style"].top = Math.round(window.innerHeight / 3) - 20 + "px";
            document.getElementById("w4")["style"].top = 2 * Math.round(window.innerHeight / 3) - 25 + "px";
            document.getElementById("w3")["style"].top = 2 * Math.round(window.innerHeight / 3) - 25 + "px";
            document.getElementById("w2")["style"].top = Math.round(window.innerHeight / 3) - 20 + "px";
            document.getElementById("w1")["style"].top = "0px";
            document.getElementById("normalMode")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";
            document.getElementById("panicMode")["style"].top = Math.round(window.innerHeight / 3) + 30 + "px";
            document.getElementById("prev_menu")["style"].left = window.innerHeight + 20 + "px";
            document.getElementById("range_menu")["style"].left = window.innerHeight - 20 + "px";
            var normal = function () {
                if (ListOfPads_2.ListOfPads.instructionType == "normal") {
                    return;
                }
                ListOfPads_2.ListOfPads.instructionType = "normal";
                if (_this.cursor.selectedEntity != null && _this.cursor.selectedEntity instanceof Person_7.Person) {
                    console.log(_this.cursor.selectedEntity.behaviorModel);
                    ListOfPads_2.ListOfPads.compileBehaviorModel(_this.cursor.selectedEntity.behaviorModel);
                }
                var normalButton = document.getElementById("normalMode");
                normalButton.classList.remove('selected');
                var panicButton = document.getElementById("panicMode");
                panicButton.classList.add("selected");
                ListOfPads_2.ListOfPads.updateInstructionCopy();
            };
            document.getElementById("normalMode").onclick = normal;
            var panic = function () {
                if (ListOfPads_2.ListOfPads.instructionType == "panic") {
                    return;
                }
                ListOfPads_2.ListOfPads.instructionType = "panic";
                if (_this.cursor.selectedEntity != null && _this.cursor.selectedEntity instanceof Person_7.Person) {
                    console.log(_this.cursor.selectedEntity.behaviorModel);
                    ListOfPads_2.ListOfPads.compileBehaviorModel(_this.cursor.selectedEntity.behaviorModel);
                }
                var panicButton = document.getElementById("panicMode");
                panicButton.classList.remove('selected');
                var normalButton = document.getElementById("normalMode");
                normalButton.classList.add("selected");
                ListOfPads_2.ListOfPads.updateInstructionCopy();
            };
            document.getElementById("panicMode").onclick = panic;
            normal();
        };
        Editor.prototype.isInCanvas = function (mouseCoords) {
            if (document.getElementById("gameCanvas").clientLeft <= mouseCoords.x
                && mouseCoords.x <= document.getElementById("gameCanvas")["height"]
                && document.getElementById("gameCanvas").clientTop <= mouseCoords.y
                && mouseCoords.y <= document.getElementById("gameCanvas")["width"]) {
                return true;
            }
            return false;
        };
        Editor.prototype.moveCamera = function () {
            var mouseCoords = Control_4.Control.mousePos().clone();
            if (this.isInCanvas(mouseCoords)) {
                this.draw.cam.scale *= Math.pow(1.001, -Control_4.Control.wheelDelta());
            }
            else {
                Control_4.Control.clearWheelDelta();
            }
            if (Control_4.Control.isMouseRightPressed() && this.isInCanvas(mouseCoords)) {
                var delta = mouseCoords.sub(this.mousePrev);
                this.draw.cam.pos = this.draw.cam.pos.sub(delta.mul(1 / this.draw.cam.scale));
            }
            this.mousePrev = mouseCoords.clone();
        };
        Editor.prototype.setDraw = function (draw) {
            this.draw = draw;
            this.cursor.draw = this.draw;
        };
        Editor.prototype.step = function () {
            var _this = this;
            if (this.cursor.selectedEntity == null) {
                document.getElementById("palette6")["style"].display = "none";
                document.getElementById("palette6")["style"].animationPlayState = "pause";
                document.getElementById("w6")["style"].display = "none";
                document.getElementById("normalMode")["style"].display = "none";
                document.getElementById("panicMode")["style"].display = "none";
            }
            else {
                document.getElementById("palette6")["style"].display = "block";
                document.getElementById("palette6")["style"].animationPlayState = "running";
                document.getElementById("w6")["style"].display = "block";
                document.getElementById("normalMode")["style"].display = "block";
                document.getElementById("panicMode")["style"].display = "block";
            }
            var range_x = document.getElementById("range_menu_x");
            var range_y = document.getElementById("range_menu_y");
            range_x.oninput = function () {
                _this.level.setNewDrawX(range_x.valueAsNumber);
            };
            range_y.oninput = function () {
                _this.level.setNewDrawY(range_y.valueAsNumber);
            };
            this.moveCamera();
            this.cursor.step();
        };
        Editor.prototype.display = function () {
            if (this.hideGrid) {
                this.level.display(this.draw, false);
            }
            else {
                this.level.display(this.draw, true);
            }
            if (this.showCollisionGrid == true) {
                this.level.displayColisionGrid(this.draw);
            }
            this.level.displayLighting(this.draw);
            this.cursor.display();
            for (var i = 0; i < this.level.Entities.length; i++) {
                this.draw.drawimage(this.level.Entities[i].animation.getDefaultImage(), this.level.Entities[i].body.center, new geom.Vector(this.level.tileSize, this.level.tileSize), 0, 1);
            }
            ListOfPads_2.ListOfPads.GUIstep();
            EditorGUI_2.EditorGUI.display(this.draw);
        };
        return Editor;
    }());
    exports.Editor = Editor;
});
define("Main", ["require", "exports", "Geom", "AuxLib", "Draw", "Game", "Editor"], function (require, exports, geom, aux, Draw_18, Game_10, Editor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    aux.setEnvironment("https://raw.githubusercontent.com/bmstu-iu9/ptp2021-6-2d-game/master/source/env/");
    var levelEditorMode = (document.getElementById("mode").innerHTML == "editor");
    aux.setEditorMode(levelEditorMode);
    var canvas = document.getElementById('gameCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var draw = new Draw_18.Draw(canvas);
    draw.cam.scale = 10;
    var game = new Game_10.Game(draw);
    game.levels = new Map();
    Game_10.Game.currentGame = game;
    Game_10.Game.loadMap("map.json", "map");
    game.makeSoldier(new geom.Vector(1, 1));
    game.mimic.takeControl(game.entities[0]);
    var x = false;
    var t = 0;
    function step() {
        if (game.levels["map"] != undefined) {
            t++;
            if (x == false) {
                console.log(game.levels["map"]);
                x = true;
            }
            if (t % 100 == 0) {
            }
            draw.clear();
            game.step();
            game.display();
        }
    }
    if (levelEditorMode) {
        var editor_1 = new Editor_1.Editor();
        editor_1.setDraw(draw);
        editor_1.draw.resize(new geom.Vector(window.innerHeight - 30, window.innerHeight - 30));
        var editorStep = function () {
            editor_1.step();
            draw.clear();
            editor_1.display();
        };
        setInterval(editorStep, 20);
    }
    else
        setInterval(step, Game_10.Game.dt * 1000);
});
//# sourceMappingURL=build.js.map