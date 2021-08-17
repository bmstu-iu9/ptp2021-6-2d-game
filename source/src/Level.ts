import { Tile } from "./Tile";
import * as geom from "./Geom";
import { Color, Draw } from "./Draw";

// Так выглядел старый класс, я на всякий оставил, но не думаю, что он сейчас нужен
export class LevelJSON {
    Grid? : Tile[][];
    CollisionMesh? : boolean[][];
    PathMatrix? : Map<any, any>;
}

// Класс Level хранит в себе всю исходную информацию об уровне: 
// карту, расстановку объектов и т.д.
export class Level {
    public Grid : Tile[][];
    public CollisionMesh : boolean[][];
    public PathMatrix : Map<any, any>;
    public tileSize = 1;

    constructor(size = new geom.Vector(0, 0)) {
        this.Grid = [];
        for (let x = 0; x < size.x; x++) {
            this.Grid.push([]);
            for (let y = 0; y < size.y; y++) {
                this.Grid[x].push(new Tile())
            }
        }
    }

    // Создание из прототипа
    public createFromPrototype(prototype : any) {
        this.Grid = prototype.Grid;
        this.CollisionMesh = prototype.CollisionMesh;
        this.PathMatrix = prototype.PathMatrix;
    }

    // Отрисовка
    public display(draw : Draw, advanced = false) {
        let str = "";
        for (let j = 0; j < this.Grid[0].length; j++) {
            for (let i = 0; i < this.Grid.length; i++) {
                str += this.Grid[i][j].colision;
            }
            str += "\n";
        }
        //console.log(str);
        
        for (let i = 0; i < this.Grid.length; i++) {
            for (let j = 0; j < this.Grid[i].length; j++) {
                let size = new geom.Vector(this.tileSize, this.tileSize);
                draw.image(this.Grid[i][j].image, 
                    (new geom.Vector(this.tileSize * i, this.tileSize * j))
                    .add(size.mul(1 / 2)), size);
                // Отрисовка сетки в расширенном режиме
                draw.strokeRect((new geom.Vector(this.tileSize * i, this.tileSize * j))
                .add(size.mul(1 / 2)), size,  new Color(0, 0, 0), 1)
            }
        }
    }
}