import * as geom from "../../Geom";
import { Body } from "./Body";
import { Game } from "../../Game";
import { Level } from "../../Level";
import { Commands } from "./Commands";
import path = require("path/posix");
import * as aux from "../../AuxLib";
import { Debug } from "../../Debug";
import { Color } from "../../Draw";

export class AI {
    private destination: geom.Vector = new geom.Vector(0, 0); // конечная точка, куда направляется персонаж(нужна для дебага)
    private activationTime: number = 0; // время, с которого объект перестаёт ждать и становится активным

    private body: Body; // тело объекта
    public Path: geom.Vector[]; // путь к конечной точке
    public game: Game;
    public commands: Commands; // набор команд, генерируемых AIЫ

    constructor(game: Game, body: Body) {
        this.game = game;
        this.body = body;
        this.commands = new Commands();
        this.Path = [];
    }

    private stop() { // функция остановки
        this.commands.active["MoveRight"] = false;
        this.commands.active["MoveLeft"] = false;
        this.commands.active["MoveDown"] = false;
        this.commands.active["MoveUp"] = false;
    }

    private go(point: geom.Vector) { // функция движения в направлении к точке
        let eps = 0.05;
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
    }

    // возвращает координату точки коллизионной сетки по её положению в этой сетке
    private getPointCoordinate(place: geom.Vector): geom.Vector {
        return new geom.Vector(place.y * this.game.currentLevel.tileSize / 2, place.x * this.game.currentLevel.tileSize / 2);
    }

    // находит ближайшую точку коллизионной сетки
    private chooseMeshPoint(currentPoint: geom.Vector): geom.Vector {
        let CollisionMesh = this.game.levels[this.game.currentLevelName].CollisionMesh;
        let Grid = this.game.levels[this.game.currentLevelName].Grid;
        let posRound = new geom.Vector(
            Math.floor(currentPoint.x / this.game.currentLevel.tileSize),
            Math.floor(currentPoint.y / this.game.currentLevel.tileSize)
        );
        let place = new geom.Vector(posRound.y * 2 + 1, posRound.x * 2 + 1);
        let answer = new geom.Vector(0, 0);

        for (let i = -5; i <= 5; i++) {
            for (let j = -5; j <= 5; j++) {
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
        //console.log(currentPoint, answer)
        return answer;
    }

    public goToPoint(point: geom.Vector) { // функция, прокладывающая путь до точки
        console.log("Go to point:", point);
        
        let pathMatrix = this.game.levels[this.game.currentLevelName].PathMatrix;
        //console.log("q");
        this.destination = point;
        this.Path = [];
        let startMeshPoint = this.chooseMeshPoint(this.body.center);
        let finishMeshPoint = this.chooseMeshPoint(point);
        let currentMeshPoint = startMeshPoint.clone();

        if (!pathMatrix.get(aux.vectorStringify(currentMeshPoint)) ||
         !pathMatrix.get(aux.vectorStringify(currentMeshPoint)).get(aux.vectorStringify(finishMeshPoint))) {
            return;
        }
        
        while (aux.vectorStringify(currentMeshPoint) != aux.vectorStringify(finishMeshPoint)) {
            console.log(aux.vectorStringify(currentMeshPoint), aux.vectorStringify(finishMeshPoint),
            pathMatrix.get(aux.vectorStringify(currentMeshPoint)).get(aux.vectorStringify(finishMeshPoint)));
            this.Path.push(this.getPointCoordinate(currentMeshPoint.clone()));
            currentMeshPoint = currentMeshPoint.add(pathMatrix.get(aux.vectorStringify(currentMeshPoint)).get(aux.vectorStringify(finishMeshPoint)))
        }
        this.Path.push(this.getPointCoordinate(currentMeshPoint.clone()));
        this.Path[this.Path.length] = point;

        console.log(this.Path);
        
    }

    // функция, определяющая когда активируется персонаж(чтобы сбросить время ожидания вызвать wait(0))
    public wait(milliseconds : number) {
        this.stop();
        this.activationTime = aux.getMilliCount() + milliseconds;
    }

    // функция преследования мимика со всеми вытекающими
    public pursuit() {
        this.goToPoint(this.game.ghost);
        // TODO сделать поиск в окрестности точки ghost
    }

    public getWaitingTime() {
        return this.activationTime - aux.getMilliCount();
    }

    public step() {
        if (this.activationTime > aux.getMilliCount()) { // проверк активности персонажа
            return;
        }
        if (this.Path.length != 0) { // если путь не пустой, то идти по направлению следующей точки

            this.go(this.Path[0]);
            //console.log(this.body.center.sub(this.Path[0]).abs(), geom.eps * 150);
            if (this.body.center.sub(this.Path[0]).abs() < 0.2) {
                this.Path.shift();
            }
        } else { // иначе остановится
            this.stop();
        }

        // Debug коллизионной сетки
        let CollisionMesh = this.game.currentLevel.CollisionMesh;

        for (let i = 0; i < CollisionMesh.length; i++) {
            for (let j = 0; j < CollisionMesh[i].length; j++) {
                let coordinate = this.getPointCoordinate(new geom.Vector(i, j));
                let color = new Color(0, 255, 0);
                if (CollisionMesh[i][j] == true) {
                    color = new Color(255, 0, 0);
                }
                Debug.addPoint(coordinate, color);
            }
        }

        Debug.addPoint(this.destination, new Color(0, 0, 255));
    }
}