import { Tile } from "./Tile";
import * as geom from "./Geom";
import { Draw } from "./Draw";

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

    // Создание из прототипа
    public createFromPrototype(prototype : any) {
        this.Grid = prototype.Grid;
        this.CollisionMesh = prototype.CollisionMesh;
        this.PathMatrix = prototype.PathMatrix;
    }

    // Отрисовка
    public display(draw : Draw) {
        for (let i = 0; i < this.Grid.length; i++) {
            for (let j = 0; j < this.Grid.length; j++) {
                let size = new geom.Vector(this.tileSize, this.tileSize);
                draw.image(this.Grid[i][j].image,
                    (new geom.Vector(this.tileSize * j, this.tileSize * i))
                    .add(size.mul(1 / 2)), size);
            }
        }
    }
}