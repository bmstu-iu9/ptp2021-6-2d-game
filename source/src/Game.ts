import * as geom from "./Geom";
import {Body} from "./Entities/EntityAttributes/Body";
import {Entity} from "./Entities/Entity";
import { Person } from "./Entities/Person";
import {Control, Keys} from "./Control";
import {Draw, Color} from "./Draw";
import { Tile, CollisionType } from "./Tile";
import { Mimic } from "./Mimic";
import { Trigger } from "./Trigger";
import { Debug } from "./Debug";

function replacer(key, value) { // функция замены классов для преобразования в JSON
    if(value instanceof Map) { // упаковка Map
      return {
          dataType: 'Map', 
          value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    }
    if (value instanceof HTMLImageElement) { // упаковка HTMLImageElement
      // ALARM: если в игре нет текстуры с таким же названием может возникнуть ошибка 
      let name = value.src;
      let nameSplit = name.split("/");
      let lastSplit = nameSplit[nameSplit.length - 1];
  
      return {
        dataType: 'HTMLImageElement',
        value: lastSplit
      };
    }
    if (value instanceof geom.Vector) { // упаковка Vector
      return {
        dataType: 'Vector',
        x: value.x,
        y: value.y
      };
    }
    return value;
  }
  
  function reviver(key, value) { // функция обратной замены классов для преобразования из JSON
      if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') { // распаковка Map
          return new Map(value.value);
        }
        if (value.dataType === 'HTMLImageElement') { // распаковка HTMLImageElement
          return Draw.loadImage("./textures/" + value.value);
        }
        if (value.dataType === 'Vector') { // распаковка Vector
          return JSON.stringify(new geom.Vector(value.x, value.y));
        }
      }
      return value;
  }

export class MimicMap { // класс карты
    Grid? : Tile[][];
    CollisionMesh? : boolean[][];
    PathMatrix? : Map<any, any>;
}

export class Game {
    public static grids : Map<any, any>; // набор всех карт каждая карта вызывается по своему названию

    public tileSize = 1; // размер тайла
    public draw : Draw; 
    private bodies : Body [] = []; // массив всех тел
    public entities : Entity [] = []; // массив всех entity
    public triggers : Trigger [] = []; // массив всех триггеров
    public currentGridName = "map"; // название текущей карты
    public playerID = 0; // атавизм? id игрока, хз зачем нужно
    public mimic : Mimic; // объект мимик, за который играет игрок
    public ghost : geom.Vector = new geom.Vector(0, 0); // место где последний раз видели мимика (|| триггер?)

    private static async readTextFile(path) { // функция считывания файла по внешней ссылке
        const response = await fetch(path)
        const text = await response.text()
        return text;
    }

    public static async loadMap(path : string, name : string) { // загрузка карты по ссылке и названию
        let result = await this.readTextFile(path)
        .then(result => {
            console.log(result);
            
            let grid = JSON.parse(result, reviver);
            this.grids[name] = grid;
        });
    }

    constructor(draw : Draw) {
        console.log("im here!!");
        
        Control.init();
        this.draw = draw;

        this.mimic = new Mimic(this);
    }
    

    public make_body(coordinates : geom.Vector, radius : number) : Body { // создаёт тело и возвращает ссылку
        let body = new Body(coordinates, radius);
        body.game = this;
        return this.bodies[this.bodies.length] = body;
    }

    public make_person(body : Body) { // создаёт персонажа и возвращает ссылку
        this.entities[this.entities.length] = new Person(this, body,"fine");//последнее - маркер состояния
        this.entities[this.entities.length - 1].entityID = this.entities.length - 1;
        return this.entities[this.entities.length - 1];
    }

    public make_trigger(lifeTime : number, boundEntity : Entity) { // создаёт триггер и возвращает ссылку
        return this.triggers[this.triggers.length] = new Trigger(lifeTime, boundEntity);
    }

    public step() {
        this.mimic.step();


        // Processing entities
        this.entities.forEach(entity => entity.animation.step());
        this.entities.forEach(entity => entity.step());
    }

    // Checks if pos is in wall
    public check_wall(pos : geom.Vector) : number {
        let posRound = new geom.Vector(
            Math.floor(pos.x / this.tileSize), 
            Math.floor(pos.y / this.tileSize)
        );

        // If out of bounds
        if (posRound.x < 0 || posRound.y < 0 || 
            posRound.x >= Game.grids[this.currentGridName].Grid.length || 
            posRound.y >= Game.grids[this.currentGridName].Grid[0].length)
            return 0;

        let collisionType = Game.grids[this.currentGridName].Grid[posRound.x][posRound.y].colision;    
        // Coordinates in particular grid cell
        let posIn = pos.sub(posRound.mul(this.tileSize)).mul(1 / this.tileSize);
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
        this.draw.cam.pos = new geom.Vector(0, 0);
        this.draw.cam.scale = 100;
        // Tiles
        for (let i = 0; i < Game.grids[this.currentGridName].Grid.length; i++) {
            for (let j = 0; j < Game.grids[this.currentGridName].Grid.length; j++) {
                let size = new geom.Vector(this.tileSize, this.tileSize);
                this.draw.image(Game.grids[this.currentGridName].Grid[i][j].image,
                    (new geom.Vector(this.tileSize * j, this.tileSize * i)).add(size.mul(1 / 2)), size);
            }
        }

        // People
        for (let i = 0; i < this.entities.length; i++) {
            this.draw.image(this.entities[i].animation.current_state, this.entities[i].body.center, new geom.Vector(1, 1));
        }

        // Отрисовка графического дебага
        Debug.drawPoints(this);
    }
}