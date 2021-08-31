import { CollisionType, Tile } from "./Tile";
import * as geom from "./Geom";
import { Color, Draw } from "./Draw";
import { PathGenerator } from "./Editor/PathGenerator";
import { Entity } from "./Entities/Entity";
import { Soldier } from "./Entities/Soldier";
import { Scientist } from "./Entities/Scientist";
import { Monster } from "./Entities/Monster";
import { StationaryObject } from "./Entities/StationaryObject";
import { BehaviorModel, Instruction } from "./BehaviorModel";
import { sign } from "crypto";
import * as aux from "./AuxLib";
import { Queue } from "./Queue";
import { Random } from "./Random";
import { Game } from "./Game";
import { Person } from "./Entities/Person";

function replacer(key, value) { // функция замены классов для преобразования в JSON
    if (value instanceof Map) { // упаковка Map
        let val: any;
        if (value.get("JSONkeys") != undefined) { // гениальнейший костыль (нет)

            let keys = value.get("JSONkeys");
            console.log("JSONkeys", keys);
            let remapping = new Map();
            for (let i = 0; i < keys.length; i++) {
                remapping.set(keys[i], value[keys[i]]);
            }
            val = Array.from(remapping.entries());
        } else {
            val = Array.from(value.entries());
        }
        console.log(val);

        return {
            dataType: 'Map',
            value: val, // or with spread: value: [...value]
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
            center: value.body.center,
            behaviorModel: value.behaviorModel
        }
    }
    if (value instanceof Scientist) {
        return {
            dataType: 'Scientist',
            center: value.body.center,
            behaviorModel: value.behaviorModel
        }
    }
    if (value instanceof Monster) {
        return {
            dataType: 'Monster',
            center: value.body.center
        }
    }
    if (value instanceof StationaryObject) {
        return {
            dataType: 'StationaryObject',
            center: value.body.center,
        }
    }
    if (value instanceof BehaviorModel) {
        return {
            dataType: 'BehaviorModel',
            instructions: value.instructions
        }
    }
    if (value instanceof Instruction) {
        return {
            dataType: 'Instruction',
            operations: value.operations,
            operationsData: value.operationsData
        }
    }
    if (value instanceof LightSource) {
        return {
            dataType: 'LightSource',
            pos: value.pos,
            power: value.power
        }
    } 
    return value;
}

// Так выглядел старый класс, я на всякий оставил, но не думаю, что он сейчас нужен
export class LevelJSON {
    Grid?: Tile[][];
    Entities?: Entity[];
    CollisionMesh?: boolean[][];
    PathMatrix?: Map<any, any>;
    Lights?: LightSource[];
}

// Источник света
export class LightSource {  
    public pos: geom.Vector;
    public power: number;
    public enableFlickering = true;
    // Характеристики периодической изменения яркости
    private time = 0; // Местное время
    private amplitude = 0.1; // Амплитуда мерцания
    private frequency = 1; // Частота
    private basePower: number; // Базовая сила, остаётся неизменной
    // Характеристики мигания
    private offPeriod = 5; // Раз примерно в сколько секунд происходит мигание
    private offTiming = 0.04; // На какое времяя отключается
    private timeOff = 0; // Сколько ещё в выключенном состоянии
    private offCount = 0; // Сколько ещё раз мигать
    constructor(pos: geom.Vector, power: number) {
        this.pos = pos;
        this.basePower = this.power = power;
        this.frequency = Random.randomFloat(1, 2);
    }
    public step() {
        this.time += Game.dt;
        this.timeOff -= Game.dt;
        if (!this.enableFlickering) {
            this.power = this.basePower;
            return;
        }
        this.power = this.basePower + Math.sin(this.time * Math.PI * this.frequency) * this.amplitude;
        // Должны ли мы включить мигание
        if (Random.randomFloat(0, this.offPeriod) < Game.dt) {
            this.timeOff = this.offTiming;
            this.offCount = Random.randomInt(1, 5);
            // TODO: вставить сюда звук лампочки
        }
        // Должны ли мы выключить
        if (this.timeOff > 0 && this.offCount)
            this.power = this.power * 0.9;
        // Должны ли мы включить
        if (this.timeOff < -this.offTiming && this.offCount) {
            this.offCount--;
            this.timeOff = this.offTiming;
        }
    }
};

// Класс Level хранит в себе всю исходную информацию об уровне: 
// карту, расстановку объектов и т.д.
export class Level {
    public Grid: Tile[][];
    public CollisionMesh: boolean[][];
    public PathMatrix: Map<any, any>;
    public Entities: Entity[] = [];
    public tileSize = 1;
    public lightSources: LightSource[] = [];
    public showLighting = false;
    public draw_x : number;
    public draw_y : number;

    constructor(size = new geom.Vector(0, 0)) {
        this.Grid = [];
        for (let x = 0; x < 50; x++) {
            this.Grid.push([]);
            for (let y = 0; y < 50; y++) {
                this.Grid[x].push(new Tile())
            }
        }
        this.draw_x = size.x;
        this.draw_y = size.y;
    }

    public setNewDrawX(new_x : number) {
        this.draw_x = new_x;
    }

    public setNewDrawY(new_y : number) {
        this.draw_y = new_y;
    }


    // Определяет, в каком квадрате сетки лежит заданный вектор
    public gridCoordinates(pos: geom.Vector) {
        pos = new geom.Vector(
            Math.floor(pos.x / this.tileSize),
            Math.floor(pos.y / this.tileSize)
        );
        // Проверка на границы
        if (pos.x < 0) pos.x = 0;
        if (pos.y < 0) pos.y = 0;
        if (pos.x >= this.draw_x) pos.x = this.draw_x - 1;
        if (pos.y >= this.draw_y) pos.y = this.draw_y - 1;
        return pos;
    }

    // Проверяет, находится ли точка в пределах карты
    public isInBounds(pos: geom.Vector): boolean {
        return pos.x > 0 &&
            pos.y > 0 &&
            pos.x < this.draw_x * this.tileSize &&
            pos.y < this.draw_y * this.tileSize;
    }

    // Проверяет, находится ли клетка в пределах карты
    public isCellInBounds(pos: geom.Vector): boolean {
        return pos.x >= 0 &&
            pos.y >= 0 &&
            pos.x < this.draw_x &&
            pos.y < this.draw_y;
    }

    // Возвращает тайл по координатам
    public getTile(pos: geom.Vector): Tile {
        return this.Grid[pos.x][pos.y];
    }

    // Добавляет источник освещения
    public makeLightSource(pos: geom.Vector, power: number) {
        this.lightSources.push(new LightSource(pos.clone(), power));
    }

    // Заворачивает в json
    public serialize() {
        let newLevel : LevelJSON;

        let newGrid = [];
        for (let x = 0; x < this.draw_x; x++) {
            newGrid.push([]);
            for (let y = 0; y < this.draw_y; y++) {
                newGrid[x].push(this.Grid[y]);
            }
        }

        newLevel = {Grid: newGrid, Entities: this.Entities, CollisionMesh: [], PathMatrix: new Map()};

        console.log(newLevel.Grid);

        PathGenerator.generateMatrix(newLevel);

        console.log(newLevel.CollisionMesh);
        console.log(newLevel.PathMatrix);


        const blob = new Blob([JSON.stringify(newLevel, replacer)], {
            type: 'application/json'
        });

        console.log(Array.from(newLevel.PathMatrix.keys()));

        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    // Создание из прототипа
    public createFromPrototype(prototype: any) {
        this.Grid = prototype.Grid;
        this.CollisionMesh = prototype.CollisionMesh;
        this.PathMatrix = prototype.PathMatrix;
        this.lightSources = prototype.Lights;
    }

    // Отрисовка
    public display(draw : Draw, advanced = false) {
        for (let i = 0; i < this.draw_x; i++) {
            for (let j = 0; j < this.draw_y; j++) {
                let size = new geom.Vector(this.tileSize, this.tileSize);
                draw.image(this.Grid[i][j].image, 
                    (new geom.Vector(this.tileSize * i, this.tileSize * j))
                        .add(size.mul(1 / 2)), size, 0, 0);
                if (this.Grid[i][j].sub_image) {
                    draw.image(this.Grid[i][j].sub_image,
                        (new geom.Vector(this.tileSize * i, this.tileSize * j))
                            .add(size.mul(1 / 2)), size, 0, 0);
                }
                // Отрисовка сетки в расширенном режиме
                if (advanced)
                    draw.strokeRect((new geom.Vector(this.tileSize * i, this.tileSize * j))
                        .add(size.mul(1 / 2)), size, new Color(0, 0, 0), 0.03)
            }
        }
    }
    public displayColisionGrid(draw : Draw){
        for(let i = 0; i < this.draw_x; i++){
            for (let j = 0; j < this.draw_y; j++)
            if (this.Grid[i][j].colision == CollisionType.Full) {
                draw.fillRect(new geom.Vector(i*this.tileSize+0.5, j*this.tileSize+0.5), new geom.Vector(1*this.tileSize, 1*this.tileSize), new Color(0, 255, 0, 0.5*Math.sin(aux.getMilliCount()*0.005) + 0.5));
            }
        }
    }

    public displayLighting(draw: Draw) {
        if (!this.showLighting) {
            return;
        }
        // Натуральное число, размер одной световой клетки
        let cellSize = 1; // Чем больше размер, тем меньше рамзытие
        // Создаём картинку на которой будем рендерить освещение
        let buffer = document.createElement('canvas');
        buffer.width = this.draw_x * cellSize;
        buffer.height = this.draw_y * cellSize;
        // Получаем контекст
        let imgCtx = buffer.getContext('2d');
        // Расставляем точки
        for (let x = 0; x < this.draw_x; x++) {
            for (let y = 0; y < this.draw_y; y++) {
                let alpha = 1 - this.Grid[x][y].light / 10;
                imgCtx.fillStyle = new Color(0, 0, 0, alpha).toString();
                imgCtx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
        // Рисуем
        draw.ctx.imageSmoothingEnabled = true; // Это позволяет создать размытие освещения
        let box = new geom.Vector(this.draw_x, this.draw_y);
        draw.displayBuffer(buffer, box.mul(1 / 2), box, 0, 1);
    }

    // Построение освещения 
    public generateLighting() {
        // Очищаем освещение
        for(let i = 0; i < this.draw_x; i++)
            for (let j = 0; j < this.draw_y; j++)
                this.Grid[i][j].light = 0;
        // Очередь для bfs
        let queue = new Queue();
        // Стороны, в которые распространяется свет
        let dirs = [
            new geom.Vector(0, 1),
            new geom.Vector(0, -1),
            new geom.Vector(1, 0),
            new geom.Vector(-1, 0),
        ];
        // Инициализация стартовых точек
        for (let source of this.lightSources) {
            queue.push(source.pos);
            this.getTile(source.pos).light = source.power;
        }
        // Насколько свет уменьшается при прохождении одной клетки
        let decay = 1;
        // bfs
        while (queue.length()) {
            // Достаём из очереди позицию
            let pos = queue.pop() as geom.Vector;
            // Смотрим соседние направления
            for (let dir of dirs) {
                // Позиция, в которую идём
                let posNext = pos.add(dir);
                if (!this.isCellInBounds(posNext) || // За пределами карты
                    this.getTile(pos).colision && !this.getTile(posNext).colision || // Из стены в проход
                    this.getTile(posNext).light > this.getTile(pos).light - decay) // Мы не осветим больше, чем оно есть
                    continue;
                // Освещаем
                this.getTile(posNext).light = this.getTile(pos).light - decay;
                // Добавляем в очередь
                queue.push(posNext);
            }
        }
    }

    // Обработка источников освещения, перерасчёт
    public processLighting() {
        this.lightSources.forEach(lightSource => lightSource.step());
        this.generateLighting();
    }
}