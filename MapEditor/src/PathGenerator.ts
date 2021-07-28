import { join } from "path/posix";
import { Vector } from "./Geom";
import { CollisionType, Tile } from "./Tile";
import { MimicMapJSON } from "./Main";

export class PathGenerator {
    private static fillTile(collisionMesh : boolean[][], tileInfo : Tile, place : Vector) {
        switch(tileInfo.colision) {
            case CollisionType.CornerDL: {
                let k = -2;
                for (let i = -1; i <= 1; i++) {
                    k++;
                    for (let j = -1; j <= k; j++) {
                        collisionMesh[place.x + i][place.y + j] = true;
                    }
                }
                break;
            }
            case CollisionType.CornerDR: {
                let k = 2;
                for (let i = -1; i <= 1; i++) {
                    k--;
                    for (let j = 1; j >= k; j--) {
                        collisionMesh[place.x + i][place.y + j] = true;
                    }
                }
                break;
            }
            case CollisionType.CornerUL: {
                let k = 2;
                for (let i = -1; i <= 1; i++) {
                    k--;
                    for (let j = -1; j <= k; j++) {
                        collisionMesh[place.x + i][place.y + j] = true;
                    }
                }
                break;
            }
            case CollisionType.CornerUR: {
                let k = -2;
                for (let i = -1; i <= 1; i++) {
                    k++;
                    for (let j = 1; j >= k; j--) {
                        collisionMesh[place.x + i][place.y + j] = true;
                    }
                }
                break;
            }
            case CollisionType.Full: {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        collisionMesh[place.x + i][place.y + j] = true;
                    }
                }
                break;
            }
        }
    }

    private static findNearestWays(collisionMesh : boolean[][], place : Vector, distance : Map<any, any>, path : Map<any, any>) {
        for (let i = -1; i <= 1; i++) {
            if (place.x + i < 0 || place.x + i >= collisionMesh.length) {
                continue;
            }
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                if (place.y + j < 0 || place.y + j >= collisionMesh[place.x + i].length) {
                    continue;
                }
                if (collisionMesh[place.x + i][place.y + j] == false) {
                    let cur_vec = new Vector(place.x + i, place.y + j);
                    distance.get(JSON.stringify(place)).set(JSON.stringify(cur_vec), 1);
                    path.get(JSON.stringify(place)).set(JSON.stringify(cur_vec), cur_vec);
                }
            }
        }
    }

    private static FloydWarshall(vertices : Vector[], distance : Map<any, any>, path : Map<any, any>) {
        for (let k = 0; k < vertices.length; k++) {
            console.log(k, " from ", vertices.length);
            for (let i = 0; i < vertices.length; i++) {
                for (let j = 0; j < vertices.length; j++) {
                    let dik = distance.get(JSON.stringify(vertices[i])).get(JSON.stringify(vertices[k]));
                    let dkj = distance.get(JSON.stringify(vertices[k])).get(JSON.stringify(vertices[j]));
                    let dij = distance.get(JSON.stringify(vertices[i])).get(JSON.stringify(vertices[j]));
                    if (dik != undefined && dkj != undefined) {
                        if (dij == undefined || dij > dik + dkj) {
                            //console.log(vertices[i], vertices[k], vertices[j], dik + dkj, dij, dij < dik + dkj);
                            distance.get(JSON.stringify(vertices[i])).set(JSON.stringify(vertices[j]), dik + dkj);
                            path.get(JSON.stringify(vertices[i])).set(JSON.stringify(vertices[j]), vertices[k]);
                        }
                    }
                }
            }
        }
    }

    public static generateMatrix(MimicMap : MimicMapJSON) {
        let collisionMap = MimicMap.Grid;
        let collisionMesh : boolean[][]; // Коллизионная сетка
        let distance = new Map(); // Матрица расстояний между узлами коллизионной сетки
        collisionMesh = [];
        collisionMesh[0] = [];
        collisionMesh[0][0] = false; 
        for (let j = 0; j < collisionMap[0].length; j++) {
            collisionMesh[0][j * 2 + 1] = false;
            collisionMesh[0][j * 2 + 2] = false;
        }
        // Заполнение матрицы коллизионной сетки значениями false
        for (let i = 0; i < collisionMap.length; i++) {
            collisionMesh[i * 2 + 1] = [];
            collisionMesh[i * 2 + 1][0] = false;
            collisionMesh[i * 2 + 2] = [];
            collisionMesh[i * 2 + 2][0] = false;
            for (let j = 0; j < collisionMap[i].length; j++) {
                collisionMesh[i * 2 + 1][j * 2 + 1] = false;
                collisionMesh[i * 2  + 1][j * 2 + 2] = false;
                collisionMesh[i * 2 + 2][j * 2 + 1] = false;
                collisionMesh[i * 2 + 2][j * 2 + 2] = false;
            }
        }
        // Заполнение матрицы коллизионной сетки значениями коллизионной карты
        for (let i = 0; i < collisionMap.length; i++) {
            for (let j = 0; j < collisionMap[i].length; j++) {
                console.log(i, j, collisionMap[i][j], i * 2 + 1, j * 2 + 1);
                
                this.fillTile(collisionMesh, collisionMap[i][j], new Vector(i * 2 + 1, j * 2 + 1));
            }
        }
        for (let i = 0; i < collisionMesh.length; i++) {
            let x = "";
            for(let j = 0; j < collisionMesh[i].length; j++) {
                if (collisionMesh[i][j]) {
                    x += "1";
                }
                else {
                    x += "0";
                }
            }
            console.log(x);
        }
        let vertices : Vector[]; // свободные узлы коллизионной сетки
        vertices = [];
        let path = new Map(); // матрица предков
        // Заполнение матрицы расстояний рёбрами графа
        for (let i = 0; i < collisionMesh.length; i++) {
            for (let j = 0; j < collisionMesh[i].length; j++) {
                if (collisionMesh[i][j] == false) {
                    let place = new Vector(i, j);
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
        
        // Поиск кратчайших путей
        this.FloydWarshall(vertices, distance, path);
        console.log(path);

        let correctPath = new Map();

        for (let i = 0; i < vertices.length; i++) {
            for (let j = 0; j < vertices.length; j++) {
                if (path.get(JSON.stringify(vertices[i])).get(JSON.stringify(vertices[j])) != undefined) {
                    if (correctPath.get(vertices[i]) == undefined) {
                        correctPath.set(vertices[i], new Map());
                    }
                    correctPath.get(vertices[i]).set(vertices[j],
                         path.get(JSON.stringify(vertices[i])).get(JSON.stringify(vertices[j])));
                }
            }
        }
        
        MimicMap.PathMatrix = correctPath;
        MimicMap.CollisionMesh = collisionMesh;
    }
}