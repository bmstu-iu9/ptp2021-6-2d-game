import * as geom from "./Geom";
import * as aux from "./AuxLib";
import { Body } from "./Entities/EntityAttributes/Body";
import { Entity } from "./Entities/Entity";
import { Person, PersonMode } from "./Entities/Person";
import { Control, Keys } from "./Control";
import { Draw, Color, Layer } from "./Draw";
import { Tile, CollisionType } from "./Tile";
import { Mimic } from "./Mimic";
import { Level, LightSource } from "./Level";
import { Trigger } from "./Trigger";
import { Debug } from "./Debug";
import { Scientist } from "./Entities/Scientist";
import { Soldier } from "./Entities/Soldier";
import { Monster } from "./Entities/Monster";
import { Corpse } from "./Entities/Corpse";
import { StationaryObject } from "./Entities/StationaryObject";
import { BehaviorModel, Instruction } from "./BehaviorModel";
import { Biomass } from "./Entities/Projectiles/Biomass";
import { Sounds } from "./Sounds";

export enum State {
    Waiting,
    Game
};

export class Game {
    public levels: Map<any, any>; // набор всех уровней каждый карта вызывается по своему названию
    public static dt = 0.02;
    public static currentGame: Game;
    public soundsarr: Sounds[] = [];
    public draw: Draw;
    private bodies: Body[] = []; // массив всех тел
    public entities: Entity[] = []; // массив всех entity
    public triggers: Trigger[] = []; // массив всех триггеров
    public currentLevelName = "map";  // название текущего уровня
    public currentLevel = new Level(); // текущий уровень (возможно имеет смылс заменить на метод getCurrentLevel)
    public playerID = 0;  // атавизм? id игрока, хз зачем нужно
    public mimic: Mimic; // объект мимик, за который играет игрок
    public ghost: geom.Vector = new geom.Vector(0, 0); // место где последний раз видели мимика (|| триггер?)
    private state = State.Waiting;
    private static levelPaths = new Map<string, string>(); // Пары уровень-путь

    public sounds: Sounds = new Sounds(0.01);
    private static async readTextFile(path) { // функция считывания файла по внешней ссылке | почему именно в game?
        const response = await fetch(path)
        const text = await response.text()
        return text;
    }

    public static reviver(key, value) { // функция обратной замены классов для преобразования из JSON

        if (typeof value === 'object' && value !== null) {
            if (value.dataType === 'Map') { // распаковка Map
                return new Map(value.value);
            }
            if (value.dataType === 'HTMLImageElement') { // распаковка HTMLImageElement
                return Draw.loadImage("./textures/tiles/" + value.value);
            }
            if (value.dataType === 'Vector') { // распаковка Vector
                return new geom.Vector(value.x, value.y);
            }
            if (value.dataType == 'Soldier') {
                let soldier = Game.currentGame.makeSoldier(value.center) as Soldier;
                soldier.behaviorModel = new BehaviorModel(soldier.myAI);
                soldier.behaviorModel = value.behaviorModel;
                soldier.behaviorModel.myAI = soldier.myAI;
                soldier.behaviorModel.changeCurrentInstruction("normal");
                return soldier;
            }
            if (value.dataType == 'Scientist') {
                console.log("loading scientist");
                let scientist = Game.currentGame.makeScientist(value.center) as Scientist;
                scientist.behaviorModel = new BehaviorModel(scientist.myAI);
                scientist.behaviorModel.instructions = value.behaviorModel.instructions;
                scientist.behaviorModel.changeCurrentInstruction("normal");
                console.log(scientist);
                
                return scientist;
            }
            if (value.dataType == "Monster") {
                let monster = Game.currentGame.makeMonster(value.center) as Monster;
                return monster;
            }
            if (value.dataType == 'StationaryObject') {
                let stationaryObject = new StationaryObject(this.currentGame, new Body(value.center, 1), "fine");
                return stationaryObject;
            }
            if (value.dataType == 'BehaviorModel') {
                //console.log("beh mod");
                
                let behaviorModel = new BehaviorModel(null);
                behaviorModel.instructions = value.instructions;
                return behaviorModel;
            }
            if (value.dataType == 'Instruction') {
                let instruction = new Instruction();
                instruction.operations = value.operations;
                instruction.operationsData = value.operationsData;
                //console.log("Instruction", value);
                return instruction;
            }
            if (value.dataType == 'LightSource') {
                let light = new LightSource(value.pos, value.power);
                return light;
            }
        }
        return value;
    }

    public static async loadMap(path: string, name: string) { // загрузка карты по ссылке и названию
        Game.levelPaths[name] = path;
        console.log(aux.environment + path);
        
        let result = await this.readTextFile(aux.environment + path)
            .then(result => {
                console.log("Map loaded");

                let prototype = JSON.parse(result, this.reviver);
                let level = new Level();
                level.createFromPrototype(prototype);
                level.showLighting = true;
                level.gridSize = new geom.Vector(level.Grid.length, level.Grid[0].length);
                // level.makeLightSource(new geom.Vector(5, 5), 10);
                // level.makeLightSource(new geom.Vector(0, 0), 10);
                Game.currentGame.levels[name] = level;
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
        this.makeTrigger(entity, 10, 100000);
        return entity;
    }

    public makeCorpse(pos: geom.Vector, type: string): Entity { // создаёт персонажа и возвращает ссылку
        let body = this.makeBody(pos, 1);
        let entity = new Corpse(this, body, type);//последнее - маркер состояния
        entity.entityID = this.entities.length;
        this.entities[this.entities.length] = entity;
        this.makeTrigger(entity, 6, 100000);
        console.log("corpse");
        return entity;
    }

    public makeBiomass(pos: geom.Vector, vel: geom.Vector): Biomass {
        let body = this.makeBody(pos, 1);
        let entity = new Biomass(this, body, vel);
        entity.entityID = this.entities.length;
        this.entities[this.entities.length] = entity;
        this.makeTrigger(entity, 3, 100000);
        return entity;

    }

    public makeTrigger(boundEntity: Entity, power: number, lifeTime: number) { // создаёт триггер и возвращает ссылку
        let trigger = new Trigger(lifeTime, boundEntity);
        trigger.power = power;
        return this.triggers[this.triggers.length] = trigger;
    }

    private processEntities() {
        // Удаление сущностей
        for (let i = 0; i < this.entities.length; i++) {
            if (!this.entities[i].alive) {
                this.entities.splice(i, 1);
                i--;
            }
        }
    }

    private processTriggers() {
        // Удаление триггеров
        for (let i = 0; i < this.triggers.length; i++) {
            if (!this.triggers[i].active) {
                this.triggers.splice(i, 1);
                i--;
            }
        }
    }

    public startGame() {
        this.state = State.Game;
        this.draw.cam.pos = this.mimic.controlledEntity.body.center;
        this.bodies = [];
        this.entities = [];
        this.triggers = [];
        this.mimic = new Mimic(this);
        this.mimic.controlledEntity = this.makeMonster(new geom.Vector(0, 0));
        // TODO: перезапуск уровня
        Game.loadMap(Game.levelPaths[this.currentLevelName], this.currentLevelName);
        this.sounds.playcontinuously("soundtrack", 0.3);
        this.soundsarr.push(this.sounds)

    }

    public step() {
        // Экран загрузки
        if (this.state == State.Waiting) { // Если в режиме ожидания
            if (Control.isMouseLeftPressed() || Control.isMouseRightPressed())
                this.startGame();
            return;
        }

        // Смерть
        if (this.mimic.isDead()) {
            for (; 0 < this.soundsarr.length;) {
                let cursound = this.soundsarr.pop()
                cursound.stop();
            }
            this.state = State.Waiting;
        }

        // Ксотыль
        if (this.levels[this.currentLevelName]) {
                this.currentLevel = this.levels[this.currentLevelName];
            //this.entities = this.currentLevel.Entities;
        }

        this.currentLevel.generateLighting();
        this.mimic.step();
        this.attachCamToMimic();
        // Processing entities
        this.entities.forEach(entity => entity.animation.step());
        this.entities.forEach(entity => entity.step());
        this.triggers.forEach(trigger => trigger.step());
        this.processEntities();
        this.processTriggers();
        this.currentLevel.processLighting();
    }

    public attachCamToMimic() {
        this.draw.cam.pos = this.draw.cam.pos.add(this.mimic.controlledEntity.body.center.sub(this.draw.cam.pos).mul(0.1));
    }

    // Checks if pos is in wall
    public checkWall(pos: geom.Vector): number {
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

    private configureCamScale() {
        // Масштаб с учётом прицела
        this.draw.cam.scale = 80 * (1 + 0.1 * (this.mimic.aim.charge / this.mimic.aim.chargeMax));
        // Подёргивание камеры
        if (this.mimic.aim.charge > 0) {
            this.draw.cam.pos.x += Math.sin(aux.getMilliCount() * 0.01) * 0.01;
            this.draw.cam.pos.y += Math.cos(aux.getMilliCount() * 0.01) * 0.01;
        }
    }

    public display() {
        // Экран загрузки
        if (this.state == State.Waiting) { // Если в режиме ожидания
            this.draw.attachToCanvas();
            let image = Draw.loadImage("textures/Screens/Start.png");
            if (this.mimic.isDead())
                image = Draw.loadImage("textures/Screens/Death.png");
            this.draw.image(
                image,
                this.draw.cam.center,
                this.draw.cam.center.mul(2),
                0, Layer.HudLayer
            );
            this.draw.getimage();
            return;
        }

        // Настройка камеры
        this.configureCamScale();

        // Орисовка тайлов
        this.currentLevel.display(this.draw);

        // Отрисовка Entities
        for (let entity of this.entities) {
            entity.display(this.draw);
        }
        this.draw.getimage();

        // Мимик
        this.mimic.display(this.draw);

        // Освещение
        this.currentLevel.displayLighting(this.draw);
        
        // Анимации
        this.draw.step();
        // Отрисовка графического дебага
        //Debug.drawPoints(this);
        Debug.clear();
    }

    //public drawCollisionCheck(pos, box, color){
    //  this.draw.fillRect(pos, box,color)
    //}
}