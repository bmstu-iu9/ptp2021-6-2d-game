import * as geom from "./Geom";
import * as aux from "./AuxLib";
import {Body} from "./Entities/EntityAttributes/Body";
import {Entity} from "./Entities/Entity";
import { Person, PersonMode } from "./Entities/Person";
import {Control, Keys} from "./Control";
import {Draw, Color} from "./Draw";
import { Tile, CollisionType } from "./Tile";
import { Mimic } from "./Mimic";
import { Level } from "./Level";
import { Trigger } from "./Trigger";
import { Debug } from "./Debug";

export class Game {
    public static levels : Map<any, any>; // набор всех уровней каждый карта вызывается по своему названию
    public static dt = 0.02;

    public draw : Draw;
    private bodies : Body [] = []; // массив всех тел
    public entities : Entity [] = []; // массив всех entity
    public triggers : Trigger [] = []; // массив всех триггеров
    public currentLevelName = "map";  // название текущего уровня
    public currentLevel = new Level(); // текущий уровень (возможно имеет смылс заменить на метод getCurrentLevel)
    public playerID = 0;  // атавизм? id игрока, хз зачем нужно
    public mimic : Mimic; // объект мимик, за который играет игрок
    public ghost : geom.Vector = new geom.Vector(0, 0); // место где последний раз видели мимика (|| триггер?)

    private static async readTextFile(path) { // функция считывания файла по внешней ссылке | почему именно в game?
        const response = await fetch(path)
        const text = await response.text()
        return text;
    }

    public static async loadMap(path : string, name : string) { // загрузка карты по ссылке и названию
        let result = await this.readTextFile(aux.environment + path)
        .then(result => {
            console.log(result);
            
            let prototype = JSON.parse(result, aux.reviver);
            let level = new Level();
            level.createFromPrototype(prototype);
            this.levels[name] = level;
        });
    }

    constructor(draw : Draw) {
        console.log("im here!!");
        
        Control.init();
        this.draw = draw;
        this.currentLevel.Grid = [];

        this.mimic = new Mimic(this);
    }
    

    public make_body(coordinates : geom.Vector, radius : number) : Body { // создаёт тело и возвращает ссылку
        let body = new Body(coordinates, radius);
        body.game = this;
        return this.bodies[this.bodies.length] = body;
    }

    public make_person(body : Body) { // создаёт персонажа и возвращает ссылку
        this.entities[this.entities.length] = new Person(this, body,PersonMode.Fine);//последнее - маркер состояния
        this.entities[this.entities.length - 1].entityID = this.entities.length - 1;
        return this.entities[this.entities.length - 1];
    }

    public make_trigger(lifeTime : number, boundEntity : Entity) { // создаёт триггер и возвращает ссылку
        return this.triggers[this.triggers.length] = new Trigger(lifeTime, boundEntity);
    }

    public step() {
      // Ксотыль
      if (Game.levels[this.currentLevelName])
        this.currentLevel =  Game.levels[this.currentLevelName];

      this.mimic.step();
      this.attachCamToMimic();
      // Processing entities
      this.entities.forEach(entity => entity.animation.step());
      this.entities.forEach(entity => entity.step());
    }

    public attachCamToMimic() {
        this.draw.cam.pos = this.draw.cam.pos.add(this.mimic.controlledEntity.body.center.sub(this.draw.cam.pos).mul(0.1));
    }

    // Checks if pos is in wall
    public check_wall(pos : geom.Vector) : number {
        let posRound = new geom.Vector(
            Math.floor(pos.x / this.currentLevel.tileSize), 
            Math.floor(pos.y / this.currentLevel.tileSize)
        );

        // If out of bounds
        if (posRound.x < 0 || posRound.y < 0 || 
            posRound.x >= this.currentLevel.Grid.length || 
            posRound.y >= this.currentLevel.Grid[0].length)
            return 0;

        let collisionType = this.currentLevel.Grid[posRound.x][posRound.y].colision;    
        // Coordinates in particular grid cell
        let posIn = pos.sub(posRound.mul(this.currentLevel.tileSize)).mul(1 / this.currentLevel.tileSize);
        // Different collision types
        if (collisionType == CollisionType.Full ||
            collisionType == CollisionType.CornerUR && posIn.y < posIn.x ||
            collisionType == CollisionType.CornerDL && posIn.y > posIn.x ||
            collisionType == CollisionType.CornerDR && posIn.y > 1 - posIn.x ||
            collisionType == CollisionType.CornerUL && posIn.y < 1 - posIn.x
            )
            return collisionType;
        return CollisionType.Empty;
    }

    public display() {
        //this.draw.cam.pos = new geom.Vector(0, 0);
        this.draw.cam.scale = 100;
        // Tiles
        this.currentLevel.display(this.draw);

        // People
        for (let entity of this.entities) {
            entity.display(this.draw);
        }

        // Отрисовка графического дебага
        //Debug.drawPoints(this);
    }
}