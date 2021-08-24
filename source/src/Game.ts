import * as geom from "./Geom";
import * as aux from "./AuxLib";
import { Body } from "./Entities/EntityAttributes/Body";
import { Entity } from "./Entities/Entity";
import { Person, PersonMode } from "./Entities/Person";
import { Control, Keys } from "./Control";
import { Draw, Color } from "./Draw";
import { Tile, CollisionType } from "./Tile";
import { Mimic } from "./Mimic";
import { Level } from "./Level";
import { Trigger } from "./Trigger";
import { Debug } from "./Debug";
import { Scientist } from "./Entities/Scientist";
import { Soldier } from "./Entities/Soldier";
import { Monster } from "./Entities/Monster";
import { Corpse } from "./Entities/Corpse";
import { StationaryObject } from "./Entities/StationaryObject";
import { Biomass } from "./Entities/Biomass";

export class Game {
    public static levels: Map<any, any>; // набор всех уровней каждый карта вызывается по своему названию
    public static dt = 0.02;

    public draw: Draw;
    private bodies: Body[] = []; // массив всех тел
    public entities: Entity[] = []; // массив всех entity
    public triggers: Trigger[] = []; // массив всех триггеров
    public currentLevelName = "map";  // название текущего уровня
    public currentLevel = new Level(); // текущий уровень (возможно имеет смылс заменить на метод getCurrentLevel)
    public playerID = 0;  // атавизм? id игрока, хз зачем нужно
    public mimic: Mimic; // объект мимик, за который играет игрок
    public ghost: geom.Vector = new geom.Vector(0, 0); // место где последний раз видели мимика (|| триггер?)

    private static async readTextFile(path) { // функция считывания файла по внешней ссылке | почему именно в game?
        const response = await fetch(path)
        const text = await response.text()
        return text;
    }

    public static async loadMap(path: string, name: string) { // загрузка карты по ссылке и названию
        let result = await this.readTextFile(aux.environment + path)
            .then(result => {
                console.log(result);

                let prototype = JSON.parse(result, aux.reviver);
                let level = new Level();
                level.createFromPrototype(prototype);
                this.levels[name] = level;
            });
    }

    constructor(draw: Draw) {
        console.log("im here!!");

        Control.init();
        this.draw = draw;
        this.currentLevel.Grid = [];

        this.mimic = new Mimic(this);
    }


    public makeBody(coordinates: geom.Vector, radius: number): Body { // создаёт тело и возвращает ссылку
        let body = new Body(coordinates, radius);
        body.game = this;
        return this.bodies[this.bodies.length] = body;
    }

    public makeScientist(pos: geom.Vector): Scientist { // создаёт персонажа и возвращает ссылку
        let body = this.makeBody(pos, 1);
        let entity = new Scientist(this, body, PersonMode.Fine);//последнее - маркер состояния
        entity.entityID = this.entities.length;
        this.entities[this.entities.length] = entity;
        return entity;
    }

    public makeSoldier(pos: geom.Vector): Soldier { // создаёт персонажа и возвращает ссылку
        let body = this.makeBody(pos, 1);
        let entity = new Soldier(this, body, PersonMode.Fine);//последнее - маркер состояния
        entity.entityID = this.entities.length;
        this.entities[this.entities.length] = entity;
        return entity;
    }

    public makeMonster(pos: geom.Vector): Monster { // создаёт персонажа и возвращает ссылку
        let body = this.makeBody(pos, 1);
        let entity = new Monster(this, body);//последнее - маркер состояния
        entity.entityID = this.entities.length;
        this.entities[this.entities.length] = entity;
        return entity;
    }

    public makeCorpse(pos: geom.Vector, type: string): Entity { // создаёт персонажа и возвращает ссылку
        let body = this.makeBody(pos, 1);
        let entity = new Corpse(this, body, type);//последнее - маркер состояния
        entity.entityID = this.entities.length;
        this.entities[this.entities.length] = entity;
        return entity;
    }

    public makeBiomass(pos: geom.Vector, vel: geom.Vector): Biomass {
        let body = this.makeBody(pos, 1);
        let entity = new Biomass(this, body, vel);
        entity.entityID = this.entities.length;
        this.entities[this.entities.length] = entity;
        return entity;
    }

    public makeTrigger(lifeTime: number, boundEntity: Entity) { // создаёт триггер и возвращает ссылку
        return this.triggers[this.triggers.length] = new Trigger(lifeTime, boundEntity);
    }

    private processEntities() {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i] instanceof Person && (this.entities[i] as Person).hp <= 0 ||
                this.entities[i] instanceof Biomass && !(this.entities[i] as Biomass).alive) 
                {
                this.entities.splice(i, 1);
                i--;
            }
        }
    }

    public step() {
        // Ксотыль
        if (Game.levels[this.currentLevelName])
            this.currentLevel = Game.levels[this.currentLevelName];

        this.mimic.step();
        this.attachCamToMimic();
        // Processing entities
        this.entities.forEach(entity => entity.animation.step());
        this.entities.forEach(entity => entity.step());
        this.processEntities();
    }

    public attachCamToMimic() {
        this.draw.cam.pos = this.draw.cam.pos.add(this.mimic.controlledEntity.body.center.sub(this.draw.cam.pos).mul(0.1));
    }

    // Checks if pos is in wall
    public check_wall(pos: geom.Vector): number {
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
        // Масштаб с учётом прицела
        this.draw.cam.scale = 80 * (1 + 0.1 * (this.mimic.aim.charge / this.mimic.aim.chargeMax));
        if (this.mimic.aim.charge > 0) {
            this.draw.cam.pos.x += Math.sin(aux.getMilliCount() * 0.01) * 0.01;
            this.draw.cam.pos.y += Math.cos(aux.getMilliCount() * 0.01) * 0.01;
        }
        // Tiles
        this.currentLevel.display(this.draw);

        // People
        for (let entity of this.entities) {
            entity.display(this.draw);
            //let pos = entity.body.center.clone().add(new geom.Vector(0,0.4));
            //this.drawCollisionCheck(pos, new geom.Vector(0.8, 0.3), new Color(0, 0, 255));
        }
        this.draw.getimage();

        // Анимации
        this.draw.step();

        // Отрисовка графического дебага
        //Debug.drawPoints(this);
    }

    //public drawCollisionCheck(pos, box, color){
    //  this.draw.fillRect(pos, box,color)
    //}

    public replacer(key, value) { // функция замены классов для преобразования в JSON
        if (value instanceof Map) { // упаковка Map
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
        if (value instanceof Soldier) {
            return {
                dataType: 'Soldier',
                place: value.body.center,
                behaviorModel: value.behaviorModel
            }
        }
        if (value instanceof Scientist) {
            return {
                dataType: 'Scientist',
                place: value.body.center,
                behaviorModel: value.behaviorModel
            }
        }
        if (value instanceof StationaryObject) {
            return {
                dataType: 'StationaryObject',
                place: value.body.center,
            }
        }
        return value;
    }

    public reviver(key, value) { // функция обратной замены классов для преобразования из JSON
        if (typeof value === 'object' && value !== null) {
            if (value.dataType === 'Map') { // распаковка Map
                return new Map(value.value);
            }
            if (value.dataType === 'HTMLImageElement') { // распаковка HTMLImageElement
                return Draw.loadImage("./textures/tiles/" + value.value);
            }
            if (value.dataType === 'Vector') { // распаковка Vector
                return JSON.stringify(new geom.Vector(value.x, value.y));
            }
            if (value.dataType == 'Soldier') {
                let soldier = this.makeSoldier(value.place) as Soldier;
                soldier.behaviorModel = value.behaviorModel;
                return soldier;
            }
            if (value.dataType == 'Scientist') {
                let scientist = this.makeScientist(value.place) as Scientist;
                scientist.behaviorModel = value.behaviorModel;
                return scientist;
            }
            if (value.dataType == 'StationaryObject') {
                let stationaryObject = new StationaryObject(this, new Body(value.place, 1), "fine");
            }
        }
        return value;
    }
}