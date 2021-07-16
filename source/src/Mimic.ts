import { Game } from "./Game";
import * as geom from "./Geom"
import { Control, Keys } from "./Control";

export class Mimic {
    public currentID = 0;
    public infectionRadius = 100;
    public game : Game;

    constructor(game : Game) {
        this.game = game;
    }

    public takeControl(newID : number) {
        this.game.entities[this.currentID].brain.AIcontrol();
        this.game.playerID = newID;
        this.currentID = newID;
        this.game.entities[this.currentID].brain.PlayerControl();
    }

    public step() {
        if (Control.isMouseClicked()) { // Если мышка нажата, мы производим переселение
            // Пересчитываем координаты на экране в игровые координаты (Мб стоит сделать функцию трансформации в game?)
            let coords = new geom.Vector(Control.lastMouseCoordinates().x / this.game.draw.cam.scale,
            Control.lastMouseCoordinates().y / this.game.draw.cam.scale);
            coords = coords.sub(this.game.draw.cam.center.mul(1.0 / this.game.draw.cam.scale));

            // Проверяем соседние entity
            for (let i = 0; i < this.game.entities.length; i++) {
                // Расстояние между сущностями
                let centerDistance = this.game.entities[this.currentID].body.center.sub(this.game.entities[i].body.center).abs();
                // Расстояние от мышки до цели
                let mouseDistance = this.game.entities[i].body.center.sub(coords).abs();
                if ((centerDistance < this.infectionRadius) && // Цель в радиусе поражения
                    (mouseDistance < this.game.entities[i].body.radius) && // На цель навелись мышкой
                    (i != this.currentID)) { // Нельзя переселяться в себя самого
                    this.takeControl(i);   
                    break;
                }
            }
        }
    }
}