import { join } from "path/posix";
import { json } from "stream/consumers";
import { Vector, vectorComparison } from "../Geom";
import { LevelJSON } from "../Level";
import { Queue } from "../Queue";
import { CollisionType, Tile } from "../Tile";
import * as aux from "../AuxLib";

export class PathGenerator {
    private static fillTile(collisionMesh: boolean[][], tileInfo: Tile, place: Vector) {
        switch (tileInfo.colision) {
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

    private static findNearestWays(collisionMesh: boolean[][], place: Vector, was : Map<string, boolean>) {
        let vertices : Vector[] = [];
        for (let i = -1; i <= 1; i++) {
            if (place.x + i < 0 || place.x + i >= collisionMesh.length || i == 0) {
                continue;
            }
            if (collisionMesh[place.x + i][place.y] == false && !was[JSON.stringify(new Vector(place.x + i, place.y))]) {
                vertices.push(new Vector(place.x + i, place.y));
            }
        }
        for (let i = -1; i <= 1; i++) {
            if (place.y + i < 0 || place.y + i >= collisionMesh[place.x].length || i == 0) {
                continue;
            }
            if (collisionMesh[place.x][place.y + i] == false && !was[JSON.stringify(new Vector(place.x, place.y + i))]) {
                vertices.push(new Vector(place.x, place.y + i));
            }
        }
        for (let i = -1; i <= 1; i++) {
            if (place.x + i < 0 || place.x + i >= collisionMesh.length) {
                continue;
            }
            for (let j = -1; j <= 1; j++) {
                if (i == 0 || j == 0) {
                    continue;
                }
                if (place.y + j < 0 || place.y + j >= collisionMesh[place.x + i].length) {
                    continue;
                }
                if (collisionMesh[place.x + i][place.y + j] == false && was[JSON.stringify(new Vector(place.x + i, place.y + j))] == false) {
                    vertices.push(new Vector(place.x + i, place.y + j));
                }
            }
        }
        return vertices;
    }

    // private static FloydWarshall(vertices: Vector[], distance: Map<any, any>, path: Map<any, any>) {
    //     for (let k = 0; k < vertices.length; k++) {
    //         for (let i = 0; i < vertices.length; i++) {
    //             for (let j = 0; j < vertices.length; j++) {
    //                 let dik = distance.get(JSON.stringify(vertices[i])).get(JSON.stringify(vertices[k]));
    //                 let dkj = distance.get(JSON.stringify(vertices[k])).get(JSON.stringify(vertices[j]));
    //                 let dij = distance.get(JSON.stringify(vertices[i])).get(JSON.stringify(vertices[j]));
    //                 if (dik != undefined && dkj != undefined) {
    //                     if (dij == undefined || dij > dik + dkj) {
    //                         //console.log(vertices[i], vertices[k], vertices[j], dik + dkj, dij, dij < dik + dkj);
    //                         distance.get(JSON.stringify(vertices[i])).set(JSON.stringify(vertices[j]), dik + dkj);
    //                         path.get(JSON.stringify(vertices[i])).set(JSON.stringify(vertices[j]), vertices[k]);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    private static bfsPathsFinder(collisionMesh) {
        let path = new Map();
        for (let i = 0; i < collisionMesh.length; i++) {
            for (let j = 0; j < collisionMesh[i].length; j++) {
                let queue = new Queue();
                let was = new Map;
                let curPlace = new Vector(i, j); 
                queue.push(curPlace);
                was[JSON.stringify(curPlace)] = true;
                while(queue.length() != 0) {
                    let top = queue.pop();
                    let vertices = this.findNearestWays(collisionMesh, top, was);
                    for (let k = 0; k < vertices.length; k++) {
                        if (path.get(aux.vectorStringify(vertices[k])) == undefined) {
                            path.set(aux.vectorStringify(vertices[k]), new Map());
                        }
                        path.get(aux.vectorStringify(vertices[k])).set(aux.vectorStringify(curPlace), vertices[k].sub(top));
                        was[JSON.stringify(vertices[k])] = true;
                        queue.push(vertices[k]);
                    }
                }
            }
        }
        return path;
    }

    public static generateMatrix(MimicMap: LevelJSON) {
        let collisionMap = MimicMap.Grid;
        let collisionMesh: boolean[][]; // Коллизионная сетка
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
                collisionMesh[i * 2 + 1][j * 2 + 2] = false;
                collisionMesh[i * 2 + 2][j * 2 + 1] = false;
                collisionMesh[i * 2 + 2][j * 2 + 2] = false;
            }
        }
        // Заполнение матрицы коллизионной сетки значениями коллизионной карты
        for (let i = 0; i < collisionMap.length; i++) {
            for (let j = 0; j < collisionMap[i].length; j++) {
                console.log(i, j, collisionMap[i][j], i * 2 + 1, j * 2 + 1);

                this.fillTile(collisionMesh, collisionMap[i][j], new Vector(j * 2 + 1, i * 2 + 1));
            }
        }
        for (let i = 0; i < collisionMesh.length; i++) {
            let x = "";
            for (let j = 0; j < collisionMesh[i].length; j++) {
                if (collisionMesh[i][j]) {
                    x += "1";
                }
                else {
                    x += "0";
                }
            }
            console.log(x);
        }
        
        let correctPath = this.bfsPathsFinder(collisionMesh);

        MimicMap.PathMatrix = correctPath;
        MimicMap.CollisionMesh = collisionMesh;
    }
}