import { Game } from "./Game";
import * as geom from "./Geom"
import { Control, Keys } from "./Control";
import { Entity } from "./Entities/Entity";
import { Person, PersonMode } from "./Entities/Person";
import { Monster } from "./Entities/Monster";
import { Corpse } from "./Entities/Corpse";
import { Draw } from "./Draw";
import { AnimationState } from "./SpriteAnimation";

export class Mimic {
    public controlledEntity : Entity = null;
    public infectionRadius = 100;
    public game : Game;

    constructor(game : Game) {
        this.game = game;
    }

    public takeControl(entity : Entity) {
        console.log("biba", entity);
        if (this.controlledEntity) {
            this.game.draw.spriteAnimation(
                "MimicTransfer", 3,
                new AnimationState(this.controlledEntity.body.center, new geom.Vector(0.3, 0.3), 0),
                new AnimationState(entity.body.center, new geom.Vector(0.3, 0.3), 0),
                0.2, 0.2/3
            );
            this.game.draw.spriteAnimation(
                "Blood", 6,
                new AnimationState(entity.body.center, new geom.Vector(1, 1), 0),
                new AnimationState(entity.body.center, new geom.Vector(1, 1), 0),
                0.5, 0.5/6
            );
            if (this.controlledEntity instanceof Monster) {
                this.game.draw.spriteAnimation(
                    "MonsterDisappearance", 8,
                    new AnimationState(this.controlledEntity.body.center, new geom.Vector(1, 1), 0),
                    new AnimationState(this.controlledEntity.body.center, new geom.Vector(1, 1), 0),
                    0.4, 0.4/8
                );
            }
            if (this.controlledEntity instanceof Person) {
                this.controlledEntity.behaviorModel.refreshInstruction();
            }
        }
        if (this.controlledEntity instanceof Monster || 
            (this.controlledEntity instanceof Person) && 
            (this.controlledEntity as Person).mode == PersonMode.Dying) {
            this.controlledEntity.die();
        }
        this.controlledEntity = entity;
    }

    public step() {
        // Подменяем комманды дя Entity, если мы не делаем это каждый ход, команды восстанавливаются сами (см Entity.step)
        this.controlledEntity.commands = Control.commands;
        // Наносим урон жертве        
        if ((this.controlledEntity instanceof Person) && !(this.controlledEntity instanceof Monster)) {
            let person = this.controlledEntity as Person;
            person.hp -= Game.dt;
            // Выселяемся из человека, если он умер
            if (person.hp < 0) {
                let monster = this.game.makeMonster(this.controlledEntity.body.center);
                this.controlledEntity = monster;
            }
        }

        // Если мышка нажата, мы производим переселение
        if (Control.isMouseClicked()) { 
            // Пересчитываем координаты на экране в игровые координаты (Мб стоит сделать функцию трансформации в game?)
            let coords = this.game.draw.transformBack(Control.lastMouseCoordinates())
            // Проверяем соседние entity
            for (let i = 0; i < this.game.entities.length; i++) {

                let target = this.game.entities[i];
                // Расстояние между сущностями
                let centerDistance = this.controlledEntity.body.center.sub(target.body.center).abs();
                // Расстояние от мышки до цели
                let mouseDistance = target.body.center.sub(coords).abs();
                if ((centerDistance < this.infectionRadius) && // Цель в радиусе поражения
                    (mouseDistance < target.body.radius) && // На цель навелись мышкой
                    !(target instanceof Corpse) && // Нельзя переселяться в трупы
                    (this.controlledEntity != target)) { // Нельзя переселяться в себя самого
                    this.takeControl(target);   
                    break;
                }
            }
        }
    }
}