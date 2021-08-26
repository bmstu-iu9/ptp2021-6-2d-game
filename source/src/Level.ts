import { CollisionType, Tile } from "./Tile";
import * as geom from "./Geom";
import { Color, Draw } from "./Draw";
import { PathGenerator } from "./Editor/PathGenerator";
import { replacer } from "./AuxLib";
import * as aux from "./AuxLib";
import { Queue } from "./Queue";

// Так выглядел старый класс, я на всякий оставил, но не думаю, что он сейчас нужен
export class LevelJSON {
    Grid? : Tile[][];
    CollisionMesh? : boolean[][];
    PathMatrix? : Map<any, any>;
}

// Источник света
export class LightSource {
    pos : geom.Vector;
    power : number;
    constructor(pos : geom.Vector, power : number) {
        this.pos = pos;
        this.power = power;
    }
};

// Класс Level хранит в себе всю исходную информацию об уровне: 
// карту, расстановку объектов и т.д.
export class Level {
    public Grid : Tile[][];
    public CollisionMesh : boolean[][];
    public PathMatrix : Map<any, any>;
    public tileSize = 1;
    public lightSources : LightSource[] = [];

    constructor(size = new geom.Vector(0, 0)) {
        this.Grid = [];
        for (let x = 0; x < size.x; x++) {
            this.Grid.push([]);
            for (let y = 0; y < size.y; y++) {
                this.Grid[x].push(new Tile())
            }
        }
    }


    // Определяет, в каком квадрате сетки лежит заданный вектор
    public gridCoordinates(pos : geom.Vector) {
        pos = new geom.Vector(
            Math.floor(pos.x / this.tileSize),
            Math.floor(pos.y / this.tileSize)
        );
        // Проверка на границы
        if (pos.x < 0) pos.x = 0;
        if (pos.y < 0) pos.y = 0;
        if (pos.x >= this.Grid.length) pos.x = this.Grid.length - 1;
        if (pos.y >= this.Grid[0].length) pos.y = this.Grid[0].length - 1;
        return pos;
    }

    // Проверяет, находится ли точка в пределах карты
    public isInBounds(pos : geom.Vector) : boolean {
        return pos.x > 0 &&
            pos.y > 0 &&
            pos.x < this.Grid.length * this.tileSize &&
            pos.y < this.Grid[0].length * this.tileSize;
    }

    // Проверяет, находится ли клетка в пределах карты
    public isCellInBounds(pos : geom.Vector) : boolean {
        return pos.x >= 0 &&
            pos.y >= 0 &&
            pos.x < this.Grid.length &&
            pos.y < this.Grid[0].length;
    }

    // Возвращает тайл по координатам
    public getTile(pos : geom.Vector) : Tile {
        return this.Grid[pos.x][pos.y];
    }

    // Заворачивает в json
    public serialize() {
        let newLevel : LevelJSON;
        newLevel = {Grid: this.Grid, CollisionMesh: [], PathMatrix: new Map()};

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
    public createFromPrototype(prototype : any) {
        this.Grid = prototype.Grid;
        this.CollisionMesh = prototype.CollisionMesh;
        this.PathMatrix = prototype.PathMatrix;
    }

    // Отрисовка
    public display(draw : Draw, advanced = false) {        
        for (let i = 0; i < this.Grid.length; i++) {
            for (let j = 0; j < this.Grid[i].length; j++) {
                let size = new geom.Vector(this.tileSize, this.tileSize);
                draw.image(this.Grid[i][j].image, 
                    (new geom.Vector(this.tileSize * i, this.tileSize * j))
                    .add(size.mul(1 / 2)), size,0,0);
                // Отрисовка сетки в расширенном режиме
                if (advanced)
                    draw.strokeRect((new geom.Vector(this.tileSize * i, this.tileSize * j))
                    .add(size.mul(1 / 2)), size,  new Color(0, 0, 0), 0.03)
            }
        }
    }
    public displayColisionGrid(draw : Draw){
        for(let i = 0; i < this.Grid.length; i++){
            for (let j = 0; j < this.Grid[i].length; j++)
            if (this.Grid[i][j].colision == CollisionType.Full) {
                draw.fillRect(new geom.Vector(i*this.tileSize+0.5, j*this.tileSize+0.5), new geom.Vector(1*this.tileSize, 1*this.tileSize), new Color(0, 255, 0, 0.5*Math.sin(aux.getMilliCount()*0.005) + 0.5));
            }
        }
    }

    public displayLighting(draw : Draw) {
        for(let i = 0; i < this.Grid.length; i++){
            for (let j = 0; j < this.Grid[i].length; j++)
                draw.fillRect(
                    new geom.Vector(i*this.tileSize+0.5, j*this.tileSize+0.5), 
                    new geom.Vector(1*this.tileSize, 1*this.tileSize), 
                    new Color(0, 0, 0, 1 - this.Grid[i][j].light / 10));
        }
    }

    // Построение освещения 
    public generateLighting() {
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
                    this.getTile(posNext).colision || // Стена
                    this.getTile(posNext).light > this.getTile(pos).light - decay) // Мы не осветим больше, чем оно есть
                    continue;
                // Освещаем
                this.getTile(posNext).light = this.getTile(pos).light - decay;
                // Добавляем в очередь
                queue.push(posNext);
            }
        }
    }
}