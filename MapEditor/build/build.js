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
define("Tile", ["require", "exports"], function (require, exports) {
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
                this.image = "textures/Empty.png";
            }
            if (colision == 1) {
                this.image = "textures/CornerUL.png";
            }
            if (colision == 2) {
                this.image = "textures/CornerUR.png";
            }
            if (colision == 3) {
                this.image = "textures/CornerDL.png";
            }
            if (colision == 4) {
                this.image = "textures/CornerDR.png";
            }
            if (colision == 5) {
                this.image = "textures/Full.png";
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
define("PathGenerator", ["require", "exports", "Geom", "Tile"], function (require, exports, Geom_1, Tile_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PathGenerator = void 0;
    var PathGenerator = (function () {
        function PathGenerator() {
        }
        PathGenerator.fillTile = function (collisionMesh, tileInfo, place) {
            switch (tileInfo.colision) {
                case Tile_1.CollisionType.CornerDL: {
                    var k = -2;
                    for (var i = -1; i <= 1; i++) {
                        k++;
                        for (var j = -1; j <= k; j++) {
                            collisionMesh[place.x + i][place.y + j] = true;
                        }
                    }
                    break;
                }
                case Tile_1.CollisionType.CornerDR: {
                    var k = 2;
                    for (var i = -1; i <= 1; i++) {
                        k--;
                        for (var j = 1; j >= k; j--) {
                            collisionMesh[place.x + i][place.y + j] = true;
                        }
                    }
                    break;
                }
                case Tile_1.CollisionType.CornerUL: {
                    var k = 2;
                    for (var i = -1; i <= 1; i++) {
                        k--;
                        for (var j = -1; j <= k; j++) {
                            collisionMesh[place.x + i][place.y + j] = true;
                        }
                    }
                    break;
                }
                case Tile_1.CollisionType.CornerUR: {
                    var k = -2;
                    for (var i = -1; i <= 1; i++) {
                        k++;
                        for (var j = 1; j >= k; j--) {
                            collisionMesh[place.x + i][place.y + j] = true;
                        }
                    }
                    break;
                }
                case Tile_1.CollisionType.Full: {
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
                        var cur_vec = new Geom_1.Vector(place.x + i, place.y + j);
                        distance.get(place).set(cur_vec, 1);
                        path.get(place).set(cur_vec, cur_vec);
                    }
                }
            }
        };
        PathGenerator.FloydWarshall = function (vertices, distance, path) {
            for (var k = 0; k < vertices.length; k++) {
                for (var i = 0; i < vertices.length; i++) {
                    for (var j = 0; j < vertices.length; j++) {
                        var dik = distance.get(vertices[i]).get(vertices[k]);
                        var dkj = distance.get(vertices[k]).get(vertices[j]);
                        var dij = distance.get(vertices[i]).get(vertices[j]);
                        if (dik != undefined && dkj != undefined) {
                            if (dij == undefined || dij < dik + dkj) {
                                distance.get(vertices[i]).set(vertices[j], dik + dkj);
                                path.get(vertices[i]).set(vertices[j], vertices[k]);
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
                    collisionMesh[i + 1][j * 2 + 1] = false;
                    collisionMesh[i + 1][j * 2 + 2] = false;
                    collisionMesh[i + 2][j * 2 + 1] = false;
                    collisionMesh[i + 2][j * 2 + 2] = false;
                }
            }
            for (var i = 0; i < collisionMap.length; i++) {
                for (var j = 0; j < collisionMap[i].length; j++) {
                    console.log(i, j, collisionMap[i][j], i * 2 + 1, j * 2 + 1);
                    this.fillTile(collisionMesh, collisionMap[i][j], new Geom_1.Vector(i * 2 + 1, j * 2 + 1));
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
                        var place = new Geom_1.Vector(i, j);
                        if (distance.get(place) == undefined) {
                            distance.set(place, new Map());
                            path.set(place, new Map());
                        }
                        this.findNearestWays(collisionMesh, place, distance, path);
                        vertices[vertices.length] = place;
                    }
                }
            }
            console.log(path);
            this.FloydWarshall(vertices, distance, path);
            console.log(path);
            MimicMap.PathMatrix = path;
            MimicMap.CollisionMesh = collisionMesh;
        };
        return PathGenerator;
    }());
    exports.PathGenerator = PathGenerator;
});
define("Main", ["require", "exports", "Tile", "Tile", "PathGenerator"], function (require, exports, Tile_2, Tile_3, PathGenerator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MimicMapJSON = exports.VectorPair = void 0;
    var VectorPair = (function () {
        function VectorPair(first, second) {
            this.first = first;
            this.second = second;
        }
        return VectorPair;
    }());
    exports.VectorPair = VectorPair;
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
    var MimicMapJSON = (function () {
        function MimicMapJSON() {
        }
        return MimicMapJSON;
    }());
    exports.MimicMapJSON = MimicMapJSON;
    var grid = [];
    var sizeX = 10;
    var sizeY = 10;
    for (var x = 0; x < sizeX; x++) {
        grid[x] = [];
        for (var y = 0; y < sizeY; y++) {
            grid[x][y] = new Tile_2.Tile();
        }
    }
    grid[1][1] = new Tile_2.Tile(Tile_3.CollisionType.CornerDR);
    grid[2][2] = new Tile_2.Tile(Tile_3.CollisionType.CornerUL);
    grid[1][2] = new Tile_2.Tile(Tile_3.CollisionType.CornerDL);
    grid[2][1] = new Tile_2.Tile(Tile_3.CollisionType.CornerUR);
    var newMap;
    newMap = { Grid: grid, CollisionMesh: [], PathMatrix: new Map() };
    console.log(grid);
    console.log(newMap.Grid);
    PathGenerator_1.PathGenerator.generateMatrix(newMap);
    console.log(newMap.CollisionMesh);
    console.log(newMap.PathMatrix);
    var blob = new Blob([JSON.stringify(newMap, replacer)], {
        type: 'application/json'
    });
    console.log(Array.from(newMap.PathMatrix.keys()));
    var url = window.URL.createObjectURL(blob);
    window.open(url);
});
//# sourceMappingURL=build.js.map