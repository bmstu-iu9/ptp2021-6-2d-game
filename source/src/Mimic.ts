import { Game } from "./Game";
import * as geom from "./Geom"
import { Control, Keys } from "./Control";
import { Entity } from "./Entities/Entity";
import { Person, PersonMode } from "./Entities/Person";
import { Monster } from "./Entities/Monster";
import { Corpse } from "./Entities/Corpse";
import { Draw } from "./Draw";
import { AnimationState } from "./SpriteAnimation";
import { Biomass } from "./Entities/Biomass";
import { Projectile } from "./Entities/Projectile";

export class Aim {
    public vel = 0;
    public charge = 0; // Заряд
    public chargeMax = 5; // Максимальный заряд
    public chargingTime = 1; // Время для полного заряда
    public step() {
        if (Control.isMouseLeftPressed()) {
            if (this.charge < this.chargeMax) {
                this.charge += Game.dt * this.chargeMax / this.chargingTime;
            }
        }
        else
            this.charge = 0;
    }
    public getVel(dir : geom.Vector) : geom.Vector{
        return dir.norm().mul(this.charge);
    }
}

export class Mimic {
    public controlledEntity : Entity = null;
    public infectionRadius = 100;
    public game : Game;
    public aim = new Aim();

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

    // Выход из тела и создание монстра
    private escape() {
        let monster = this.game.makeMonster(this.controlledEntity.body.center);
        this.controlledEntity = monster;
    }

    private ejectBiomass(vel: geom.Vector) {
        let biomass = this.game.makeBiomass(this.controlledEntity.body.center, vel);
        biomass.baseEntity = this.controlledEntity;
        this.takeControl(biomass);
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
                this.escape();
            }
        }

        // Если мышка нажата, мы производим переселение
        if (!Control.isMouseLeftPressed() && this.aim.charge != 0 && !(this.controlledEntity instanceof Biomass)) { 
            // Пересчитываем координаты на экране в игровые координаты
            let coords = this.game.draw.transformBack(Control.lastMouseCoordinates())
            let biomass = this.ejectBiomass(this.aim.getVel(coords.sub(this.controlledEntity.body.center)));
        }

        // Переселение через биомассу
        if (this.controlledEntity instanceof Biomass) {
            let target = this.controlledEntity.checkTarget();
            if (target) {
                this.controlledEntity.alive = false;
                this.takeControl(target);
            } else if (this.controlledEntity.hasStopped()) {
                this.controlledEntity.alive = false;
                this.escape();
            }
        }

        this.aim.step();
    }
}