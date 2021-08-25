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
    exports.Vector = exports.eps = void 0;
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
        return Vector;
    }());
    exports.Vector = Vector;
});
define("Entities/EntityAttributes/Commands", ["require", "exports", "Geom"], function (require, exports, Geom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Commands = void 0;
    var Commands = (function () {
        function Commands() {
            this.commands = new Map();
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
                                            Control.commands[vals[i][j]] = false;
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
                                    Control.commands[vals[i][j]] = false;
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
            window.addEventListener("keydown", Control.onKeyDown);
            window.addEventListener("keyup", Control.onKeyUp);
            window.addEventListener("click", Control.onClick);
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
                    Control.commands[currentCommand] = (Control.commandsCounter[currentCommand] != 0);
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
        function Tile(colision, image) {
            if (colision === void 0) { colision = 0; }
            if (image === void 0) { image = null; }
            this.colision = CollisionType.Empty;
            this.colision = colision;
            if (image) {
                this.image = image;
                return;
            }
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
        }
        Tile.prototype.setColision = function (colision) {
            this.colision = colision;
        };
        Tile.prototype.setImage = function (image) {
            this.image = image;
        };
        Tile.prototype.clone = function () {
            return new Tile(this.colision, this.image);
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
            this.velocity = 0.05;
            this.height = 0.3;
            this.width = 0.5;
            this.center = center;
            this.radius = radius;
        }
        Body.prototype.move = function (delta) {
            var delta1 = delta.add(new geom.Vector(this.width / 2, this.height / 2));
            var collisionUR = this.game.check_wall(this.center.add(delta1));
            var collisionUL = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(-this.width, 0))));
            var collisionDL = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(-this.width, -this.height))));
            var collisionDR = this.game.check_wall(this.center.add(delta1.add(new geom.Vector(0, -this.height))));
            if (collisionUL == Tile_1.CollisionType.Full || collisionUR == Tile_1.CollisionType.Full || collisionDR == Tile_1.CollisionType.Full || collisionDL == Tile_1.CollisionType.Full)
                delta = new geom.Vector();
            else if (collisionUL != Tile_1.CollisionType.Empty) {
                var norm = void 0;
                if (collisionUL == Tile_1.CollisionType.CornerDL)
                    norm = new geom.Vector(1, -1);
                if (collisionUL == Tile_1.CollisionType.CornerDR)
                    norm = new geom.Vector(-1, -1);
                if (collisionUL == Tile_1.CollisionType.CornerUL)
                    norm = new geom.Vector(1, 1);
                if (collisionUL == Tile_1.CollisionType.CornerUR)
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
define("Entities/EntityAttributes/Animation", ["require", "exports", "Draw", "AuxLib"], function (require, exports, Draw_2, aux) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Animation = void 0;
    var Animation = (function () {
        function Animation(person, states) {
            this.stateMachine = [];
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
define("Editor/PathGenerator", ["require", "exports", "Geom", "Tile"], function (require, exports, Geom_2, Tile_2) {
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
        PathGenerator.findNearestWays = function (collisionMesh, place, distance, path) {
            for (var i = -1; i <= 1; i++) {
                if (place.x + i < 0 || place.x + i >= collisionMesh.length) {
                    continue;
                }
                for (var j = -1; j <= 1; j++) {
                    if (i == 0 && j == 0) {
                        continue;
                    }
                    if (place.y + j < 0 || place.y + j >= collisionMesh[place.x + i].length) {
                        continue;
                    }
                    if (collisionMesh[place.x + i][place.y + j] == false) {
                        var cur_vec = new Geom_2.Vector(place.x + i, place.y + j);
                        distance.get(JSON.stringify(place)).set(JSON.stringify(cur_vec), 1);
                        path.get(JSON.stringify(place)).set(JSON.stringify(cur_vec), cur_vec);
                    }
                }
            }
        };
        PathGenerator.FloydWarshall = function (vertices, distance, path) {
            for (var k = 0; k < vertices.length; k++) {
                for (var i = 0; i < vertices.length; i++) {
                    for (var j = 0; j < vertices.length; j++) {
                        var dik = distance.get(JSON.stringify(vertices[i])).get(JSON.stringify(vertices[k]));
                        var dkj = distance.get(JSON.stringify(vertices[k])).get(JSON.stringify(vertices[j]));
                        var dij = distance.get(JSON.stringify(vertices[i])).get(JSON.stringify(vertices[j]));
                        if (dik != undefined && dkj != undefined) {
                            if (dij == undefined || dij > dik + dkj) {
                                distance.get(JSON.stringify(vertices[i])).set(JSON.stringify(vertices[j]), dik + dkj);
                                path.get(JSON.stringify(vertices[i])).set(JSON.stringify(vertices[j]), vertices[k]);
                            }
                        }
                    }
                }
            }
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
            var vertices;
            vertices = [];
            var path = new Map();
            for (var i = 0; i < collisionMesh.length; i++) {
                for (var j = 0; j < collisionMesh[i].length; j++) {
                    if (collisionMesh[i][j] == false) {
                        var place = new Geom_2.Vector(i, j);
                        if (distance.get(JSON.stringify(place)) == undefined) {
                            distance.set(JSON.stringify(place), new Map());
                            path.set(JSON.stringify(place), new Map());
                        }
                        this.findNearestWays(collisionMesh, place, distance, path);
                        vertices[vertices.length] = place;
                    }
                }
            }
            console.log(path);
            this.FloydWarshall(vertices, distance, path);
            console.log(path);
            var correctPath = new Map();
            var progress = document.getElementById("progressbar");
            progress.max = vertices.length.toString();
            for (var i = 0; i < vertices.length; i++) {
                progress.value = i.toString();
                console.log(progress.max, progress.value);
                for (var j = 0; j < vertices.length; j++) {
                    if (path.get(JSON.stringify(vertices[i])).get(JSON.stringify(vertices[j])) != undefined) {
                        if (correctPath.get(vertices[i]) == undefined) {
                            correctPath.set(vertices[i], new Map());
                        }
                        correctPath.get(vertices[i]).set(vertices[j], path.get(JSON.stringify(vertices[i])).get(JSON.stringify(vertices[j])));
                    }
                }
            }
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
        Debug.drawPoints = function (game) {
            for (var i = 0; i < this.points.length; i++) {
                this.points[i].drawPoint(game);
            }
            this.points = [];
        };
        Debug.points = [];
        return Debug;
    }());
    exports.Debug = Debug;
});
define("BehaviorModel", ["require", "exports", "Geom"], function (require, exports, Geom_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BehaviorModel = exports.Instruction = void 0;
    var Operations;
    (function (Operations) {
        Operations[Operations["goToPoint"] = 0] = "goToPoint";
        Operations[Operations["wait"] = 1] = "wait";
        Operations[Operations["pursuit"] = 2] = "pursuit";
    })(Operations || (Operations = {}));
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
        BehaviorModel.prototype.changeCurrentInstruction = function (newInstruction) {
            this.operationNum = 0;
            this.myAI.Path = [];
            this.myAI.wait(0);
            this.currentInstruction = newInstruction;
        };
        BehaviorModel.prototype.refreshInstruction = function () {
            this.changeCurrentInstruction(this.currentInstruction);
        };
        BehaviorModel.prototype.step = function () {
            if (this.myAI.Path.length == 0 && this.myAI.getWaitingTime() < Geom_4.eps && this.instructions[this.currentInstruction]) {
                this.operationNum++;
                this.operationNum %= this.instructions[this.currentInstruction].operations.length;
                var operation = this.instructions[this.currentInstruction].operations[this.operationNum];
                var data = this.instructions[this.currentInstruction].operationsData[this.operationNum];
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
define("Entities/Person", ["require", "exports", "Entities/Entity", "Geom", "Debug", "Draw", "BehaviorModel"], function (require, exports, Entity_1, geom, Debug_1, Draw_3, BehaviorModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Person = exports.PersonMode = void 0;
    var PersonMode;
    (function (PersonMode) {
        PersonMode[PersonMode["Fine"] = 0] = "Fine";
        PersonMode[PersonMode["Corrupted"] = 1] = "Corrupted";
        PersonMode[PersonMode["Dying"] = 2] = "Dying";
    })(PersonMode = exports.PersonMode || (exports.PersonMode = {}));
    var Person = (function (_super) {
        __extends(Person, _super);
        function Person(game, body, mode) {
            var _this = _super.call(this, game, body) || this;
            _this.hpMax = 15;
            _this.hp = _this.hpMax;
            _this.hpThresholdCorrupted = 10;
            _this.hpThresholdDying = 5;
            _this.type = null;
            _this.mode = mode;
            _this.viewRadius = 3;
            _this.viewingAngle = Math.PI / 4;
            _this.direction = new geom.Vector(1, 0);
            _this.alertLvl = 0;
            _this.behaviorModel = new BehaviorModel_1.BehaviorModel(_this.myAI);
            _this.setModeTimings(10, 5, 5);
            return _this;
        }
        Person.prototype.setModeTimings = function (fine, corrupted, dying) {
            this.hpThresholdDying = dying;
            this.hpThresholdCorrupted = dying + corrupted;
            this.hpMax = dying + corrupted + fine;
            this.hp = this.hpMax;
        };
        Person.prototype.upAlertLvl = function () {
            this.alertLvl++;
        };
        Person.prototype.die = function () {
            this.hp = 0;
            if (this.type)
                this.game.makeCorpse(this.body.center, this.type);
        };
        Person.prototype.checkTriggers = function () {
            var center = this.body.center;
            for (var i = 0; i < this.game.triggers.length; i++) {
                var triggerCoordinate = this.game.triggers[i].getCoordinates();
                Debug_1.Debug.addPoint(triggerCoordinate, new Draw_3.Color(0, 0, 255));
                var triggerVector = triggerCoordinate.sub(center);
                if (Math.abs(this.direction.getAngle(triggerVector)) < this.viewingAngle / 2) {
                    if (triggerVector.abs() <= this.viewRadius) {
                        if (this.game.mimic.controlledEntity.entityID == this.game.triggers[i].boundEntity.entityID) {
                            this.game.ghost = this.game.mimic.controlledEntity.body.center;
                        }
                        if (!this.game.triggers[i].isEntityTriggered(this)) {
                            this.upAlertLvl();
                            this.game.triggers[i].entityTriggered(this);
                        }
                    }
                }
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
            if (x == 0 && y == 0) {
                this.animation.changedirection("stand", this.modeToString());
            }
            if (x == 1) {
                this.animation.changedirection("right", this.modeToString());
            }
            if (x == -1) {
                this.animation.changedirection("left", this.modeToString());
            }
            if (x == 0 && y == 1) {
                this.animation.changedirection("top", this.modeToString());
            }
            if (x == 0 && y == -1) {
                this.animation.changedirection("down", this.modeToString());
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
        Person.prototype.step = function () {
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
            this.checkTriggers();
            this.direction = new geom.Vector(x, y);
            this.updateMode();
            this.behaviorModel.step();
            _super.prototype.step.call(this);
        };
        Person.prototype.display = function (draw) {
            _super.prototype.display.call(this, draw);
            var box = new geom.Vector(1, 0.1);
            var pos = this.body.center.clone().add(new geom.Vector(0, -1));
            var percentage = this.hp / this.hpMax;
            var frontColor = new Draw_3.Color(25, 25, 25);
            var backColor = new Draw_3.Color(25, 255, 25);
            var marks = [this.hpThresholdCorrupted / this.hpMax, this.hpThresholdDying / this.hpMax];
            draw.bar(pos, box, percentage, frontColor, backColor, marks);
        };
        return Person;
    }(Entity_1.Entity));
    exports.Person = Person;
});
define("Entities/Soldier", ["require", "exports", "Entities/Person", "Entities/EntityAttributes/Animation"], function (require, exports, Person_1, Animation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Soldier = void 0;
    var Soldier = (function (_super) {
        __extends(Soldier, _super);
        function Soldier(game, body, mode) {
            var _this = _super.call(this, game, body, mode) || this;
            _this.animation = new Animation_1.Animation("Soldier", 8);
            _this.type = "Soldier";
            return _this;
        }
        Soldier.prototype.step = function () {
            _super.prototype.step.call(this);
            if (this.commands.commands["shoot"]) {
            }
        };
        return Soldier;
    }(Person_1.Person));
    exports.Soldier = Soldier;
});
define("Entities/Scientist", ["require", "exports", "Entities/Person", "Entities/EntityAttributes/Animation"], function (require, exports, Person_2, Animation_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scientist = void 0;
    var Scientist = (function (_super) {
        __extends(Scientist, _super);
        function Scientist(game, body, mode) {
            var _this = _super.call(this, game, body, mode) || this;
            _this.animation = new Animation_2.Animation("Scientist", 8);
            _this.type = "Scientist";
            return _this;
        }
        return Scientist;
    }(Person_2.Person));
    exports.Scientist = Scientist;
});
define("Entities/Monster", ["require", "exports", "Entities/Person", "Entities/EntityAttributes/Animation"], function (require, exports, Person_3, Animation_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Monster = void 0;
    var Monster = (function (_super) {
        __extends(Monster, _super);
        function Monster(game, body) {
            var _this = _super.call(this, game, body, Person_3.PersonMode.Fine) || this;
            _this.animation = new Animation_3.Animation("Monster", 8);
            return _this;
        }
        return Monster;
    }(Person_3.Person));
    exports.Monster = Monster;
});
define("Entities/StationaryObject", ["require", "exports", "Entities/Entity", "Draw", "Geom"], function (require, exports, Entity_2, Draw_4, geom) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StationaryObject = void 0;
    var StationaryObject = (function (_super) {
        __extends(StationaryObject, _super);
        function StationaryObject(game, body, type) {
            var _this = _super.call(this, game, body) || this;
            _this.image = Draw_4.Draw.loadImage("textures/Corpses/" + type + ".png");
            return _this;
        }
        StationaryObject.prototype.display = function (draw) {
            draw.image(this.image, this.body.center, new geom.Vector(1, 1), 0, Draw_4.Layer.EntityLayer);
        };
        return StationaryObject;
    }(Entity_2.Entity));
    exports.StationaryObject = StationaryObject;
});
define("Level", ["require", "exports", "Tile", "Geom", "Draw", "Editor/PathGenerator", "Entities/Soldier", "Entities/Scientist", "Entities/Monster", "Entities/StationaryObject"], function (require, exports, Tile_3, geom, Draw_5, PathGenerator_1, Soldier_1, Scientist_1, Monster_1, StationaryObject_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Level = exports.LevelJSON = void 0;
    function replacer(key, value) {
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()),
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
        if (value instanceof Monster_1.Monster) {
            return {
                dataType: 'Monster',
                center: value.body.center,
            };
        }
        if (value instanceof StationaryObject_1.StationaryObject) {
            return {
                dataType: 'StationaryObject',
                place: value.body.center,
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
    var Level = (function () {
        function Level(size) {
            if (size === void 0) { size = new geom.Vector(0, 0); }
            this.Entities = [];
            this.tileSize = 1;
            this.Grid = [];
            for (var x = 0; x < size.x; x++) {
                this.Grid.push([]);
                for (var y = 0; y < size.y; y++) {
                    this.Grid[x].push(new Tile_3.Tile());
                }
            }
        }
        Level.prototype.gridCoordinates = function (pos) {
            pos = new geom.Vector(Math.floor(pos.x / this.tileSize), Math.floor(pos.y / this.tileSize));
            if (pos.x < 0)
                pos.x = 0;
            if (pos.y < 0)
                pos.y = 0;
            if (pos.x >= this.Grid.length)
                pos.x = this.Grid.length - 1;
            if (pos.y >= this.Grid[0].length)
                pos.y = this.Grid[0].length - 1;
            return pos;
        };
        Level.prototype.isInBounds = function (pos) {
            return pos.x > 0 &&
                pos.y > 0 &&
                pos.x < this.Grid.length * this.tileSize &&
                pos.y < this.Grid[0].length * this.tileSize;
        };
        Level.prototype.generateMatrix = function (level) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log("generating matrix");
                    PathGenerator_1.PathGenerator.generateMatrix(level);
                    return [2];
                });
            });
        };
        ;
        Level.prototype.serialize = function () {
            var newLevel;
            newLevel = { Grid: this.Grid, Entities: this.Entities, CollisionMesh: [], PathMatrix: new Map() };
            this.generateMatrix(newLevel);
            console.log(newLevel.Grid);
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
            this.Grid = prototype.Grid;
            this.CollisionMesh = prototype.CollisionMesh;
            this.PathMatrix = prototype.PathMatrix;
        };
        Level.prototype.display = function (draw, advanced) {
            if (advanced === void 0) { advanced = false; }
            for (var i = 0; i < this.Grid.length; i++) {
                for (var j = 0; j < this.Grid[i].length; j++) {
                    var size = new geom.Vector(this.tileSize, this.tileSize);
                    draw.image(this.Grid[i][j].image, (new geom.Vector(this.tileSize * i, this.tileSize * j))
                        .add(size.mul(1 / 2)), size, 0, 0);
                    if (advanced)
                        draw.strokeRect((new geom.Vector(this.tileSize * i, this.tileSize * j))
                            .add(size.mul(1 / 2)), size, new Draw_5.Color(0, 0, 0), 0.03);
                }
            }
        };
        return Level;
    }());
    exports.Level = Level;
});
define("Entities/EntityAttributes/AI", ["require", "exports", "Geom", "Game", "Entities/EntityAttributes/Commands", "AuxLib", "Debug", "Draw"], function (require, exports, geom, Game_1, Commands_2, aux, Debug_2, Draw_6) {
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
            this.commands["MoveRight"] = false;
            this.commands["MoveLeft"] = false;
            this.commands["MoveDown"] = false;
            this.commands["MoveUp"] = false;
        };
        AI.prototype.go = function (point) {
            var eps = 0.01;
            if (this.body.center.x < point.x + eps) {
                this.commands["MoveRight"] = true;
            }
            else {
                this.commands["MoveRight"] = false;
            }
            if (this.body.center.x > point.x - eps) {
                this.commands["MoveLeft"] = true;
            }
            else {
                this.commands["MoveLeft"] = false;
            }
            if (this.body.center.y < point.y + eps) {
                this.commands["MoveDown"] = true;
            }
            else {
                this.commands["MoveDown"] = false;
            }
            if (this.body.center.y > point.y - eps) {
                this.commands["MoveUp"] = true;
            }
            else {
                this.commands["MoveUp"] = false;
            }
        };
        AI.prototype.getPointCoordinate = function (place) {
            return new geom.Vector(place.y * this.game.currentLevel.tileSize / 2, place.x * this.game.currentLevel.tileSize / 2);
        };
        AI.prototype.chooseMeshPoint = function (currentPoint) {
            var CollisionMesh = Game_1.Game.levels[this.game.currentLevelName].CollisionMesh;
            var Grid = Game_1.Game.levels[this.game.currentLevelName].Grid;
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
            console.log(currentPoint, answer);
            return answer;
        };
        AI.prototype.makePath = function (start, finish) {
            var pathMatrix = Game_1.Game.levels[this.game.currentLevelName].PathMatrix;
            if (JSON.stringify(start) == JSON.stringify(finish) || pathMatrix.get(JSON.stringify(start)).get(JSON.stringify(finish)) == undefined) {
                return [];
            }
            if (pathMatrix.get(JSON.stringify(start)).get(JSON.stringify(finish)) == JSON.stringify(finish)) {
                var answer_1;
                answer_1 = [];
                answer_1[0] = this.getPointCoordinate(finish);
                console.log("Path from ", start, " to ", finish, " is ", answer_1);
                return answer_1;
            }
            var middlePoint = JSON.parse(pathMatrix.get(JSON.stringify(start)).get(JSON.stringify(finish)));
            var a1 = this.makePath(start, middlePoint);
            var a2 = this.makePath(middlePoint, finish);
            var answer = a1.concat(a2);
            return answer;
        };
        AI.prototype.goToPoint = function (point) {
            console.log("q");
            this.destination = point;
            this.Path = [];
            var startMeshPoint = this.chooseMeshPoint(this.body.center);
            var finishMeshPoint = this.chooseMeshPoint(point);
            var localPath = this.makePath(startMeshPoint, finishMeshPoint);
            for (var i = 0; i < localPath.length; i++) {
                this.Path[i] = localPath[i].clone();
            }
            this.Path[this.Path.length] = point;
        };
        AI.prototype.wait = function (milliseconds) {
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
                    var color = new Draw_6.Color(0, 255, 0);
                    if (CollisionMesh[i][j] == true) {
                        color = new Draw_6.Color(255, 0, 0);
                    }
                    Debug_2.Debug.addPoint(coordinate, color);
                }
            }
            Debug_2.Debug.addPoint(this.destination, new Draw_6.Color(0, 0, 255));
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
            this.game = game;
            this.body = body;
            this.myAI = new AI_1.AI(game, body);
            this.animation = new Animation_4.Animation("Scientist", 8);
            this.commands = this.myAI.commands;
        }
        Entity.prototype.step = function () {
            if (!this.commands)
                return;
            this.myAI.step();
            this.commands = this.myAI.commands;
        };
        Entity.prototype.display = function (draw) {
            draw.image(this.animation.current_state, this.body.center.sub(new geom.Vector(0, 0.5 - this.body.height / 2)), new geom.Vector(1, 1), 0, 1);
        };
        return Entity;
    }());
    exports.Entity = Entity;
});
define("Entities/Corpse", ["require", "exports", "Entities/StationaryObject"], function (require, exports, StationaryObject_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Corpse = void 0;
    var Corpse = (function (_super) {
        __extends(Corpse, _super);
        function Corpse(game, body, type) {
            return _super.call(this, game, body, type) || this;
        }
        return Corpse;
    }(StationaryObject_2.StationaryObject));
    exports.Corpse = Corpse;
});
define("Mimic", ["require", "exports", "Game", "Geom", "Control", "Entities/Person", "Entities/Monster", "Entities/Corpse", "SpriteAnimation"], function (require, exports, Game_2, geom, Control_1, Person_4, Monster_2, Corpse_1, SpriteAnimation_1) {
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
            if (this.controlledEntity) {
                this.game.draw.spriteAnimation("MimicTransfer", 3, new SpriteAnimation_1.AnimationState(this.controlledEntity.body.center, new geom.Vector(0.3, 0.3), 0), new SpriteAnimation_1.AnimationState(entity.body.center, new geom.Vector(0.3, 0.3), 0), 0.2, 0.2 / 3);
                this.game.draw.spriteAnimation("Blood", 6, new SpriteAnimation_1.AnimationState(entity.body.center, new geom.Vector(1, 1), 0), new SpriteAnimation_1.AnimationState(entity.body.center, new geom.Vector(1, 1), 0), 0.5, 0.5 / 6);
                if (this.controlledEntity instanceof Monster_2.Monster) {
                    this.game.draw.spriteAnimation("MonsterDisappearance", 8, new SpriteAnimation_1.AnimationState(this.controlledEntity.body.center, new geom.Vector(1, 1), 0), new SpriteAnimation_1.AnimationState(this.controlledEntity.body.center, new geom.Vector(1, 1), 0), 0.4, 0.4 / 8);
                }
                if (this.controlledEntity instanceof Person_4.Person) {
                    this.controlledEntity.behaviorModel.refreshInstruction();
                }
            }
            if (this.controlledEntity instanceof Monster_2.Monster ||
                (this.controlledEntity instanceof Person_4.Person) &&
                    this.controlledEntity.mode == Person_4.PersonMode.Dying) {
                this.controlledEntity.die();
            }
            this.controlledEntity = entity;
        };
        Mimic.prototype.step = function () {
            this.controlledEntity.commands = Control_1.Control.commands;
            if ((this.controlledEntity instanceof Person_4.Person) && !(this.controlledEntity instanceof Monster_2.Monster)) {
                var person = this.controlledEntity;
                person.hp -= Game_2.Game.dt;
                if (person.hp < 0) {
                    var monster = this.game.makeMonster(this.controlledEntity.body.center);
                    this.controlledEntity = monster;
                }
            }
            if (Control_1.Control.isMouseClicked()) {
                var coords = this.game.draw.transformBack(Control_1.Control.lastMouseCoordinates());
                for (var i = 0; i < this.game.entities.length; i++) {
                    var target = this.game.entities[i];
                    var centerDistance = this.controlledEntity.body.center.sub(target.body.center).abs();
                    var mouseDistance = target.body.center.sub(coords).abs();
                    if ((centerDistance < this.infectionRadius) &&
                        (mouseDistance < target.body.radius) &&
                        !(target instanceof Corpse_1.Corpse) &&
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
define("Trigger", ["require", "exports", "AuxLib", "Geom"], function (require, exports, aux, Geom_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Trigger = void 0;
    var Trigger = (function () {
        function Trigger(lifeTime, boundEntity) {
            this.lifeTime = lifeTime;
            this.boundEntity = boundEntity;
            this.active = true;
            this.appearanceTime = aux.getMilliCount();
            this.triggeredEntities = new Map();
        }
        Trigger.prototype.isActive = function () {
            if (aux.getMilliCount() - this.appearanceTime > this.lifeTime) {
                this.active = false;
            }
            if (this.boundEntity == null) {
                this.active = false;
            }
            return this.active;
        };
        Trigger.prototype.getCoordinates = function () {
            if (!this.isActive()) {
                return new Geom_5.Vector(-1000, -1000);
            }
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
define("Game", ["require", "exports", "Geom", "AuxLib", "Entities/EntityAttributes/Body", "Entities/Person", "Control", "Draw", "Tile", "Mimic", "Level", "Trigger", "Entities/Scientist", "Entities/Soldier", "Entities/Monster", "Entities/Corpse", "Entities/StationaryObject"], function (require, exports, geom, aux, Body_1, Person_5, Control_2, Draw_7, Tile_4, Mimic_1, Level_1, Trigger_1, Scientist_2, Soldier_2, Monster_3, Corpse_2, StationaryObject_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    var Game = (function () {
        function Game(draw) {
            this.bodies = [];
            this.entities = [];
            this.triggers = [];
            this.currentLevelName = "map";
            this.currentLevel = new Level_1.Level();
            this.playerID = 0;
            this.ghost = new geom.Vector(0, 0);
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
        Game.loadMap = function (path, name) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.readTextFile(aux.environment + path)
                                .then(function (result) {
                                console.log(result);
                                var prototype = JSON.parse(result, aux.reviver);
                                var level = new Level_1.Level();
                                level.createFromPrototype(prototype);
                                _this.levels[name] = level;
                            })];
                        case 1:
                            result = _a.sent();
                            return [2];
                    }
                });
            });
        };
        Game.prototype.makeBody = function (coordinates, radius) {
            var body = new Body_1.Body(coordinates, radius);
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
            var entity = new Monster_3.Monster(this, body);
            entity.entityID = this.entities.length;
            this.entities[this.entities.length] = entity;
            return entity;
        };
        Game.prototype.makeCorpse = function (pos, type) {
            var body = this.makeBody(pos, 1);
            var entity = new Corpse_2.Corpse(this, body, type);
            entity.entityID = this.entities.length;
            this.entities[this.entities.length] = entity;
            return entity;
        };
        Game.prototype.makeTrigger = function (lifeTime, boundEntity) {
            return this.triggers[this.triggers.length] = new Trigger_1.Trigger(lifeTime, boundEntity);
        };
        Game.prototype.processEntities = function () {
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i] instanceof Person_5.Person && this.entities[i].hp <= 0) {
                    this.entities.splice(i, 1);
                    i--;
                }
            }
        };
        Game.prototype.step = function () {
            if (Game.levels[this.currentLevelName])
                this.currentLevel = Game.levels[this.currentLevelName];
            this.mimic.step();
            this.attachCamToMimic();
            this.entities.forEach(function (entity) { return entity.animation.step(); });
            this.entities.forEach(function (entity) { return entity.step(); });
            this.processEntities();
        };
        Game.prototype.attachCamToMimic = function () {
            this.draw.cam.pos = this.draw.cam.pos.add(this.mimic.controlledEntity.body.center.sub(this.draw.cam.pos).mul(0.1));
        };
        Game.prototype.check_wall = function (pos) {
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
        Game.prototype.display = function () {
            this.draw.cam.scale = 100;
            this.currentLevel.display(this.draw);
            for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
                var entity = _a[_i];
                entity.display(this.draw);
            }
            this.draw.getimage();
            this.draw.step();
        };
        Game.prototype.replacer = function (key, value) {
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
            if (value instanceof Soldier_2.Soldier) {
                return {
                    dataType: 'Soldier',
                    center: value.body.center,
                    behaviorModel: value.behaviorModel
                };
            }
            if (value instanceof Scientist_2.Scientist) {
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
            if (value instanceof StationaryObject_3.StationaryObject) {
                return {
                    dataType: 'StationaryObject',
                    center: value.body.center,
                };
            }
            return value;
        };
        Game.prototype.reviver = function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (value.dataType === 'Map') {
                    return new Map(value.value);
                }
                if (value.dataType === 'HTMLImageElement') {
                    return Draw_7.Draw.loadImage("./textures/tiles/" + value.value);
                }
                if (value.dataType === 'Vector') {
                    return JSON.stringify(new geom.Vector(value.x, value.y));
                }
                if (value.dataType == 'Soldier') {
                    var soldier = this.makeSoldier(value.center);
                    soldier.behaviorModel = value.behaviorModel;
                    return soldier;
                }
                if (value.dataType == 'Scientist') {
                    var scientist = this.makeScientist(value.center);
                    scientist.behaviorModel = value.behaviorModel;
                    return scientist;
                }
                if (value.dataType == "Monster") {
                    var monster = this.makeMonster(value.center);
                    return monster;
                }
                if (value.dataType == 'StationaryObject') {
                    var stationaryObject = new StationaryObject_3.StationaryObject(this, new Body_1.Body(value.center, 1), "fine");
                }
            }
            return value;
        };
        Game.dt = 0.02;
        return Game;
    }());
    exports.Game = Game;
});
define("SpriteAnimation", ["require", "exports", "Draw", "Game"], function (require, exports, Draw_8, Game_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpriteAnimation = exports.AnimationState = void 0;
    var AnimationState = (function () {
        function AnimationState(pos, box, angle) {
            this.pos = pos;
            this.box = box;
            this.angle = angle;
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
                this.frames[i] = Draw_8.Draw.loadImage("textures/" + name + "/" + i + ".png");
            }
        };
        SpriteAnimation.prototype.getCurrentState = function () {
            var multB = this.time / this.duration;
            var multA = 1 - multB;
            return new AnimationState(this.initialState.pos.mul(multA).add(this.finalState.pos.mul(multB)), this.initialState.box.mul(multA).add(this.finalState.box.mul(multB)), this.initialState.angle * multA + this.finalState.angle * multB);
        };
        SpriteAnimation.prototype.getCurrentFrame = function () {
            var frameNumber = Math.floor(this.time / this.frameDuration) % this.frames.length;
            return this.frames[frameNumber];
        };
        SpriteAnimation.prototype.step = function () {
            this.time += Game_3.Game.dt;
        };
        SpriteAnimation.prototype.isOver = function () {
            return this.time > this.duration;
        };
        SpriteAnimation.prototype.display = function (draw) {
            var state = this.getCurrentState();
            var frame = this.getCurrentFrame();
            draw.image(frame, state.pos, state.box, state.angle, 0);
        };
        return SpriteAnimation;
    }());
    exports.SpriteAnimation = SpriteAnimation;
    ;
});
define("Draw", ["require", "exports", "Geom", "SpriteAnimation"], function (require, exports, geom, SpriteAnimation_2) {
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
        function Color(r, g, b) {
            this.r = r;
            this.g = g;
            this.b = b;
        }
        Color.prototype.toString = function () {
            return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
        };
        return Color;
    }());
    exports.Color = Color;
    var Layer;
    (function (Layer) {
        Layer[Layer["TileLayer"] = 0] = "TileLayer";
        Layer[Layer["EntityLayer"] = 1] = "EntityLayer";
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
            this.cam.pos = size.mul(1 / 2);
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
        Draw.prototype.drawimage = function (image, pos, box, angle) {
            var posNew = this.transform(pos);
            var boxNew = box.mul(this.cam.scale * 1.01);
            posNew = posNew.sub(boxNew.mul(1 / 2));
            this.ctx.imageSmoothingEnabled = false;
            if (angle % (2 * Math.PI) == 0) {
                this.ctx.drawImage(image, posNew.x, posNew.y, boxNew.x, boxNew.y);
            }
            else {
                var buffer = document.createElement('canvas');
                buffer.width = boxNew.x * 2;
                buffer.height = boxNew.y * 2;
                var bctx = buffer.getContext('2d');
                bctx.translate(boxNew.x, boxNew.y);
                bctx.rotate(angle);
                bctx.drawImage(image, 0, 0, boxNew.x, boxNew.y);
                this.ctx.drawImage(buffer, posNew.x, posNew.y);
            }
        };
        Draw.prototype.image = function (image, pos, box, angle, layer) {
            if (layer == 0) {
                this.drawimage(image, pos, box, angle);
            }
            if (layer == 1) {
                var curqueue = { image: image, pos: pos, box: box, angle: angle };
                this.imagequeue.push(curqueue);
            }
        };
        Draw.prototype.getimage = function () {
            if (this.imagequeue.length > 0) {
                this.imagequeue.sort(function (a, b) {
                    if (a.pos.y > b.pos.y) {
                        return -1;
                    }
                    if (a.pos.y < b.pos.y) {
                        return 1;
                    }
                    return 0;
                });
                for (; this.imagequeue.length > 0;) {
                    var temp = this.imagequeue.pop();
                    this.drawimage(temp.image, temp.pos, temp.box, temp.angle);
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
                this.fillRect(pos, box, frontColor);
                var posNew = pos.clone();
                posNew.x -= (box.x - bar.x) / 2;
                this.fillRect(posNew, bar, backColor);
                bar.x = 2 / this.cam.scale;
                pos.x -= box.x / 2;
                for (var i = 0; i < marks.length; i++) {
                    posNew = pos.clone();
                    posNew.x += box.x * marks[i];
                    this.fillRect(posNew, bar, frontColor);
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
            var animation = new SpriteAnimation_2.SpriteAnimation();
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
        Draw.prototype.bar = function (pos, box, percentage, frontColor, backColor, marks) {
            var queue = { pos: pos, box: box, percentage: percentage, frontColor: frontColor, backColor: backColor, marks: marks };
            this.hpqueue.push(queue);
        };
        Draw.images = {};
        return Draw;
    }());
    exports.Draw = Draw;
});
define("AuxLib", ["require", "exports", "Draw", "Geom"], function (require, exports, Draw_9, geom) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reviver = exports.replacer = exports.getMilliCount = exports.setEnvironment = exports.environment = void 0;
    function setEnvironment(env) {
        exports.environment = env;
    }
    exports.setEnvironment = setEnvironment;
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
            var name_3 = value.src;
            var nameSplit = name_3.split("/");
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
                return Draw_9.Draw.loadImage("./textures/tiles/" + value.value);
            }
            if (value.dataType === 'Vector') {
                return JSON.stringify(new geom.Vector(value.x, value.y));
            }
        }
        return value;
    }
    exports.reviver = reviver;
});
define("Editor/Cursor", ["require", "exports", "Control", "Draw", "Entities/Entity", "Entities/EntityAttributes/Body", "Entities/Monster", "Entities/Person", "Entities/Scientist", "Entities/Soldier", "Geom", "Tile", "AuxLib"], function (require, exports, Control_3, Draw_10, Entity_3, Body_2, Monster_4, Person_6, Scientist_3, Soldier_3, geom, Tile_5, aux) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cursor = exports.Mode = void 0;
    var Mode;
    (function (Mode) {
        Mode[Mode["Eraser"] = 0] = "Eraser";
        Mode[Mode["Wall"] = 1] = "Wall";
        Mode[Mode["Entity"] = 2] = "Entity";
        Mode[Mode["Selector"] = 3] = "Selector";
    })(Mode = exports.Mode || (exports.Mode = {}));
    var Cursor = (function () {
        function Cursor(level, draw) {
            if (level === void 0) { level = null; }
            if (draw === void 0) { draw = null; }
            this.pos = new geom.Vector();
            this.gridPos = new geom.Vector();
            this.mode = Mode.Wall;
            this.tile = new Tile_5.Tile(Tile_5.CollisionType.Full);
            this.entity = new Entity_3.Entity(null, new Body_2.Body(new geom.Vector(0, 0), 1));
            this.mouseLeftButtonClicked = true;
            this.entityLocations = new Map();
            this.level = level;
            this.draw = draw;
        }
        Cursor.prototype.setBlock = function () {
            this.level.Grid[this.gridPos.x][this.gridPos.y] = this.tile.clone();
        };
        Cursor.prototype.setEntity = function () {
            var currentLocation = this.level.Entities.length;
            if (this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)] != null) {
                currentLocation = this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)];
            }
            this.entityLocations[JSON.stringify(this.gridPos, aux.replacer)] = currentLocation;
            if (this.entity instanceof Soldier_3.Soldier) {
                var pos = this.gridPos.add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1 / 2));
                this.level.Entities[currentLocation] = new Soldier_3.Soldier(null, new Body_2.Body(pos, 1), Person_6.PersonMode.Fine);
            }
            if (this.entity instanceof Scientist_3.Scientist) {
                var pos = this.gridPos.add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1 / 2));
                this.level.Entities[currentLocation] = new Scientist_3.Scientist(null, new Body_2.Body(pos, 1), Person_6.PersonMode.Fine);
            }
            if (this.entity instanceof Monster_4.Monster) {
                var pos = this.gridPos.add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1 / 2));
                this.level.Entities[currentLocation] = new Monster_4.Monster(null, new Body_2.Body(pos, 1));
            }
        };
        Cursor.prototype.step = function () {
            this.pos = this.draw.transformBack(Control_3.Control.mousePos());
            this.gridPos = this.level.gridCoordinates(this.pos);
            if (Control_3.Control.isMouseLeftPressed() && this.level.isInBounds(this.pos)) {
                switch (this.mode) {
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
                }
            }
            if (!Control_3.Control.isMouseLeftPressed()) {
                this.mouseLeftButtonClicked = true;
            }
        };
        Cursor.prototype.display = function () {
            this.drawPreview.clear();
            switch (this.mode) {
                case Mode.Wall: {
                    this.drawPreview.image(this.tile.image, new geom.Vector(25, 25), new geom.Vector(50, 50), 0, 0);
                    break;
                }
                case Mode.Entity: {
                    this.drawPreview.image(this.entity.animation.getDefaultImage(), new geom.Vector(25, 25), new geom.Vector(50, 50), 0, 0);
                    break;
                }
            }
            if (this.level.isInBounds(this.pos))
                this.draw.strokeRect(this.gridPos.mul(this.level.tileSize).add(new geom.Vector(this.level.tileSize, this.level.tileSize).mul(1 / 2)), new geom.Vector(this.level.tileSize, this.level.tileSize), new Draw_10.Color(0, 255, 0), 0.1);
        };
        return Cursor;
    }());
    exports.Cursor = Cursor;
});
define("Editor", ["require", "exports", "Control", "Draw", "Level", "Geom", "Editor/Cursor", "Tile", "Entities/EntityAttributes/Body", "Entities/Soldier", "Entities/Scientist", "Entities/Person", "Entities/Monster", "Entities/EntityAttributes/Animation"], function (require, exports, Control_4, Draw_11, Level_2, geom, Cursor_1, Tile_6, Body_3, Soldier_4, Scientist_4, Person_7, Monster_5, Animation_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Editor = void 0;
    var Editor = (function () {
        function Editor() {
            this.level = new Level_2.Level(new geom.Vector(10, 10));
            this.cursor = new Cursor_1.Cursor(this.level);
            this.mousePrev = Control_4.Control.mousePos();
            this.initHTML();
        }
        Editor.prototype.createTileButton = function (src, collision, type) {
            var _this = this;
            var button = document.createElement("img");
            button.src = src;
            button.className = "tileButton";
            var palette = document.getElementById("palette" + type);
            palette.appendChild(button);
            var applyTile = function () {
                _this.cursor.mode = Cursor_1.Mode.Wall;
                _this.cursor.tile = new Tile_6.Tile(collision, button);
            };
            button.onclick = applyTile;
        };
        Editor.prototype.createEntityButton = function (entityType, type) {
            var _this = this;
            var button = document.createElement("img");
            if (entityType == "Soldier") {
                var applyEntity = function () {
                    _this.cursor.mode = Cursor_1.Mode.Entity;
                    _this.cursor.entity = new Soldier_4.Soldier(null, new Body_3.Body(new geom.Vector(0, 0), 1), Person_7.PersonMode.Fine);
                    _this.cursor.entity.animation = new Animation_5.Animation("Soldier", 8);
                };
                button.onclick = applyEntity;
                button.src = "textures/Soldier/stand_fine_0.png";
            }
            if (entityType == "Scientist") {
                var applyEntity = function () {
                    _this.cursor.mode = Cursor_1.Mode.Entity;
                    _this.cursor.entity = new Scientist_4.Scientist(null, new Body_3.Body(new geom.Vector(0, 0), 1), Person_7.PersonMode.Fine);
                    _this.cursor.entity.animation = new Animation_5.Animation("Scientist", 8);
                };
                button.onclick = applyEntity;
                button.src = "textures/Scientist/stand_fine_0.png";
            }
            if (entityType == "Monster") {
                var applyEntity = function () {
                    _this.cursor.mode = Cursor_1.Mode.Entity;
                    _this.cursor.entity = new Monster_5.Monster(null, new Body_3.Body(new geom.Vector(0, 0), 1));
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
        Editor.prototype.initHTML = function () {
            var _this = this;
            var progress = document.getElementById("progressbar");
            var generate = function () { _this.level.serialize(); };
            document.getElementById("generate").onclick = generate;
            for (var i = 0; i < 47; i++)
                this.createTileButton("textures/tiles/ceilings/ceiling" + i + ".png", Tile_6.CollisionType.Full, "");
            for (var i = 0; i < 64; i++)
                this.createTileButton("textures/tiles/walls/wall" + i + ".png", Tile_6.CollisionType.Full, "2");
            for (var i = 0; i < 76; i++)
                this.createTileButton("textures/tiles/floors/floor" + i + ".png", Tile_6.CollisionType.Empty, "3");
            this.createEntityButton("Scientist", "4");
            this.createEntityButton("Soldier", "4");
            this.createEntityButton("Monster", "4");
            this.cursor.drawPreview = new Draw_11.Draw(document.getElementById("preview"), new geom.Vector(50, 50));
            document.getElementById("gameCanvas")["style"].height = window.innerHeight - 30 + "px";
            document.getElementById("gameCanvas")["style"].width = document.getElementById("gameCanvas").clientHeight + "px";
            document.getElementById("palette")["style"].height = Math.round(window.innerHeight / 3) - 20 + "px";
            document.getElementById("palette2")["style"].height = Math.round(window.innerHeight / 3) - 20 + "px";
            document.getElementById("palette3")["style"].height = Math.round(window.innerHeight / 3) - 20 + "px";
            document.getElementById("palette4")["style"].height = Math.round(window.innerHeight / 3) - 20 + "px";
            document.getElementById("palette5")["style"].height = Math.round(window.innerHeight / 3) - 20 + "px";
            document.getElementById("palette")["style"].top = "10px";
            document.getElementById("palette2")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";
            document.getElementById("palette3")["style"].top = 2 * Math.round(window.innerHeight / 3) + "px";
            document.getElementById("palette4")["style"].top = 2 * Math.round(window.innerHeight / 3) + "px";
            document.getElementById("palette5")["style"].top = Math.round(window.innerHeight / 3) + 5 + "px";
            document.getElementById("preview")["style"].top = "0px";
            document.getElementById("preview")["style"].left = document.getElementById("gameCanvas").clientWidth + 12 + "px";
            document.getElementById("generate")["style"].top = "62px";
            document.getElementById("generate")["style"].left = document.getElementById("gameCanvas").clientWidth + 12 + "px";
        };
        Editor.prototype.isInCanvas = function (mouseCoords) {
            if (document.getElementById("gameCanvas").clientLeft <= mouseCoords.x && mouseCoords.x <= document.getElementById("gameCanvas")["height"] && document.getElementById("gameCanvas").clientTop <= mouseCoords.y && mouseCoords.y <= document.getElementById("gameCanvas")["width"]) {
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
            this.moveCamera();
            this.cursor.step();
        };
        Editor.prototype.display = function () {
            this.level.display(this.draw, true);
            console.log(this.level.Entities.length);
            for (var i = 0; i < this.level.Entities.length; i++) {
                this.draw.drawimage(this.level.Entities[i].animation.getDefaultImage(), this.level.Entities[i].body.center, new geom.Vector(this.level.tileSize, this.level.tileSize), 0);
            }
            this.cursor.display();
        };
        return Editor;
    }());
    exports.Editor = Editor;
});
define("Main", ["require", "exports", "Geom", "AuxLib", "Draw", "Game", "Editor", "BehaviorModel"], function (require, exports, geom, aux, Draw_12, Game_4, Editor_1, BehaviorModel_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    aux.setEnvironment("https://raw.githubusercontent.com/bmstu-iu9/ptp2021-6-2d-game/master/source/env/");
    var canvas = document.getElementById('gameCanvas');
    var draw = new Draw_12.Draw(canvas);
    draw.cam.scale = 0.4;
    Game_4.Game.levels = new Map();
    Game_4.Game.loadMap("map.json", "map");
    var game = new Game_4.Game(draw);
    game.makeScientist(new geom.Vector(1, 1));
    var soldier = game.makeSoldier(new geom.Vector(2.5, 1));
    soldier.behaviorModel.instructions["test"] = new BehaviorModel_2.Instruction();
    soldier.behaviorModel.instructions["test"].addGoingToPoint(new geom.Vector(1, 1));
    soldier.behaviorModel.instructions["test"].addGoingToPoint(new geom.Vector(6, 1));
    soldier.behaviorModel.changeCurrentInstruction("test");
    game.mimic.takeControl(game.entities[0]);
    var x = false;
    var t = 0;
    var levelEditorMode = (document.getElementById("mode").innerHTML == "editor");
    function step() {
        if (Game_4.Game.levels["map"] != undefined) {
            t++;
            if (x == false) {
                game.entities[1].myAI.goToPoint(new geom.Vector(1, 2.5));
                game.makeTrigger(100000000, game.entities[1]);
                console.log(Game_4.Game.levels["map"].PathMatrix);
                x = true;
            }
            if (t % 100 == 0) {
                for (var i = 0; i < game.entities[1].myAI.Path.length; i++) {
                    console.log(game.entities[1].myAI.Path[i]);
                }
            }
            draw.clear();
            game.step();
            game.display();
        }
    }
    if (levelEditorMode) {
        var editor_1 = new Editor_1.Editor();
        editor_1.setDraw(draw);
        var editorStep = function () {
            editor_1.step();
            draw.clear();
            editor_1.display();
        };
        setInterval(editorStep, 20);
    }
    else
        setInterval(step, Game_4.Game.dt * 1000);
});
//# sourceMappingURL=build.js.map