import { Game } from "./Game";
import * as geom from "./Geom"
import { Control, Keys } from "./Control";
import { Entity } from "./Entities/Entity";
import { Person, PersonMode } from "./Entities/Person";
import { Monster } from "./Entities/Monster";
import { Corpse } from "./Entities/Corpse";
import { Draw, Layer } from "./Draw";
import { AnimationState } from "./SpriteAnimation";
import { Biomass } from "./Entities/Projectiles/Biomass";
import {Sounds} from "./Sounds"

export class Aim {
    public vel = 0;
    public charge = 0; // Заряд
    public chargeMax = 5; // Максимальный заряд
    public chargingTime = 1; // Время для полного заряда
    public dir = new geom.Vector();
    public mimic : Mimic;
    public step() {
        let coords = this.mimic.game.draw.transformBack(Control.mousePos());
        this.dir = coords.sub(this.mimic.controlledEntity.body.center).norm();
        if (Control.isMouseLeftPressed()) {
            if (this.charge < this.chargeMax) {
                this.charge += Game.dt * this.chargeMax / this.chargingTime;
            }
        }
        else
            this.charge = 0;
    }
    public getVel() : geom.Vector {
        return this.dir.mul(this.charge);
    }
}

export class Mimic {
    
    public sounds : Sounds;
    public controlledEntity : Entity = null;
    public infectionRadius = 100;
    public game : Game;
    public aim = new Aim();

    constructor(game : Game) {
        this.game = game;
        this.aim.mimic = this;
        this.sounds=new Sounds(1)
    }

    public takeControl(entity : Entity) {
        if (this.controlledEntity) {
            this.sounds.playimposition("alarm")
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
        Control.commands.active["shoot"] = Control.isMouseRightPressed();
        Control.commands.pointer = this.game.draw.transformBack(Control.mousePos()).sub(this.controlledEntity.body.center);
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
        if (!Control.isMouseLeftPressed() && this.aim.charge && !(this.controlledEntity instanceof Biomass)) { 
            // Пересчитываем координаты на экране в игровые координаты
            let biomass = this.ejectBiomass(this.aim.getVel());
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

    // Рисует интерфейс
    public display(draw : Draw) {
        // Aim
        if (this.aim.charge) {
            let numberOfArrows = 5;
            let dist = this.aim.charge / numberOfArrows;
            for (let i = 1; i < numberOfArrows; i++) {
                let pos = this.controlledEntity.body.center.add(this.aim.dir.mul(dist * i));
                let arrow = Draw.loadImage("textures/HudElements/arrow.png");
                draw.image(arrow, pos, new geom.Vector(1, 1), this.aim.dir.angle(), Layer.HudLayer);
            }
        }
    }
}