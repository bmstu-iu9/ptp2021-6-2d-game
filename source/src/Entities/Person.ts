import { Entity } from "./Entity";
import { Game } from "../Game"
import { Body } from "./EntityAttributes/Body";
import * as geom from "../Geom";
import { Debug } from "../Debug";
import { Color, Draw } from "../Draw";
import { BehaviorModel } from "../BehaviorModel";
import { domainToASCII } from "url";
import { AnimationState } from "../SpriteAnimation";
import { Sounds } from "../Sounds";

export enum PersonMode {
    Fine,
    Corrupted,
    Dying
}

export enum Behavior {
    Normal = "normal",
    Panic = "panic"
}

export class Person extends Entity {
    public viewRadius: number = 3; // радиус сектора видимости
    public viewingAngle: number; // угол сектора видимости
    public direction: geom.Vector; // направление взгляда
    public awareness = 0;
    public awarenessThreshold = 10;
    public hpThresholdCorrupted = 10;
    public hpThresholdDying = 5;
    public mode: PersonMode; // маркер состояния (переименовать по необходимости)
    protected type: string = null;
    public behaviorModel: BehaviorModel;
    public sound: Sounds = new Sounds(0.9);

    constructor(game: Game, body: Body, mode: PersonMode) {
        super(game, body)
        this.mode = mode;
        this.viewRadius = 5;
        this.viewingAngle = Math.PI / 4;
        this.direction = new geom.Vector(1, 0);
        this.behaviorModel = new BehaviorModel(this.myAI);
        this.setModeTimings(10, 5, 5);
        this.sound.playcontinuously("step", 1);
        this.sound.current_sound.muted = true;
        if (game) {
            game.soundsarr.push(this.sound);
        }
    }

    public setModeTimings(fine: number, corrupted: number, dying: number) {
        this.hpThresholdDying = dying;
        this.hpThresholdCorrupted = dying + corrupted;
        this.hpMax = dying + corrupted + fine;
        this.hp = this.hpMax;
    }

    public die() {
        if (this.type && this.alive)
            this.game.makeCorpse(this.body.center, this.type);
        super.die();

    }

    public isPointVisible(pos: geom.Vector): boolean {
        return geom.dist(this.body.center, pos) <= this.viewRadius;
    }

    public checkTriggers() { // Проверка всех триггеров на попадание в сектор видимости
        let center = this.body.center;
        for (let i = 0; i < this.game.triggers.length; i++) {
            let trigger = this.game.triggers[i];
            let triggerCoordinate = this.game.triggers[i].getCoordinates();
            Debug.addPoint(triggerCoordinate, new Color(0, 0, 255));
            let triggerVector = triggerCoordinate.sub(center);
            if (this.isPointVisible(triggerCoordinate)) {
                if (this.game.mimic.controlledEntity.entityID == this.game.triggers[i].boundEntity.entityID) {
                    this.game.ghost = this.game.mimic.controlledEntity.body.center;
                }
                if (!this.game.triggers[i].isEntityTriggered(this)) {
                    this.awareness += this.game.triggers[i].power;
                    this.game.triggers[i].entityTriggered(this);
                    // Animation
                    this.game.draw.spriteAnimation(
                        "Awareness", 1,
                        new AnimationState(this.body.center.add(new geom.Vector(0, -1)), new geom.Vector(0.5, 0.5), 0),
                        new AnimationState(this.body.center.add(new geom.Vector(0, -1.5)), new geom.Vector(2, 2), 0, 0),
                        0.5, 1
                    );
                }
            }
        }

        // Проверка на пассивные триггеры
        for (let entity of this.game.entities) {
            if (entity == this || !this.isPointVisible(entity.body.center))
                continue;
            // Видим покоцанного челика
            if (entity instanceof Person && entity.hp < entity.hpThresholdCorrupted)
                this.awareness += 2 * Game.dt;
            // Видим настороженного челика
            if (entity instanceof Person && entity.awareness > this.awareness)
                this.awareness = entity.awareness;
        }

    }

    // Режим в строковом виде
    public modeToString(): string {
        switch (this.mode) {
            case PersonMode.Fine:
                return "fine";
            case PersonMode.Corrupted:
                return "corrupted";
            case PersonMode.Dying:
                return "dying";
        }
    }

    public changedirection(x: number, y: number) {
        let currentdist: geom.Vector = this.body.center.sub(this.game.mimic.controlledEntity.body.center) // Получаем расстояние до Мумука
        let dist = Math.sqrt(Math.pow(currentdist.x, 2) + Math.pow(currentdist.y, 2))
        let volume = 1 / dist;
        if (volume > 1)
            volume = 1;
        this.sound.current_sound.volume = volume;
        if (x == 0 && y == 0) {
            this.animation.changedirection("stand", this.modeToString())
            this.sound.current_sound.muted = true;
        }
        if (x == 1) {
            this.animation.changedirection("right", this.modeToString())
            this.sound.current_sound.muted = false;
        }
        if (x == -1) {
            this.animation.changedirection("left", this.modeToString())
            this.sound.current_sound.muted = false;
        }
        if (x == 0 && y == 1) {
            this.animation.changedirection("top", this.modeToString())
            this.sound.current_sound.muted = false;
        }
        if (x == 0 && y == -1) {
            this.animation.changedirection("down", this.modeToString())
            this.sound.current_sound.muted = false;
        }
    }

    private updateMode() {
        if (this.hp < 0) {
            this.die();
        }
        else if (this.hp < this.hpThresholdDying)
            this.mode = PersonMode.Dying;
        else if (this.hp < this.hpThresholdCorrupted)
            this.mode = PersonMode.Corrupted;
        else
            this.mode = PersonMode.Fine;
    }

    public stop() {
        this.myAI.commands.active["MoveUp"] = false;
        this.myAI.commands.active["MoveDown"] = false;
        this.myAI.commands.active["MoveLeft"] = false;
        this.myAI.commands.active["MoveRight"] = false;
        console.log("stop");
    }

    public step() {
        let x = 0;
        let y = 0;
        let vel = this.body.velocity;

        // перемещение согласно commands
        if (!this.commands)
            return;
        if (this.commands.active["MoveUp"]) {
            y++;
            this.body.move(new geom.Vector(0, -vel));
        }
        if (this.commands.active["MoveDown"]) {
            y--;
            this.body.move(new geom.Vector(0, vel));
        }
        if (this.commands.active["MoveRight"]) {
            x++;
            this.body.move(new geom.Vector(vel, 0));
        }
        if (this.commands.active["MoveLeft"]) {
            x--;
            this.body.move(new geom.Vector(-vel, 0));
        }
        this.changedirection(x, y); // измененниие напрвления для анимаций
        this.checkTriggers();
        this.direction = new geom.Vector(x, y);

        // Проверка на awareness
        if (this.awareness >= this.awarenessThreshold) {
            this.behaviorModel.changeCurrentInstruction(Behavior.Panic);
            this.awareness = this.awarenessThreshold;
        }

        this.updateMode();
        this.behaviorModel.step();

        super.step();
    }

    public displayAwareness(draw: Draw) {
        draw.bar(
            this.body.center.clone().add(new geom.Vector(0, -0.9)), // Pos
            new geom.Vector(1, 0.1), // Box
            this.awareness / this.awarenessThreshold, // Percentage
            new Color(25, 25, 25), // Back color
            new Color(25, 150, 255), // Front color
            [] // Marks
        );
    }

    public display(draw: Draw) {
        super.display(draw);
        draw.bar(
            this.body.center.clone().add(new geom.Vector(0, -1)), // Pos
            new geom.Vector(1, 0.1), // Box
            this.hp / this.hpMax, // Percentage
            new Color(25, 25, 25), // Back color
            new Color(25, 255, 25), // Front color
            [this.hpThresholdCorrupted / this.hpMax, this.hpThresholdDying / this.hpMax] // Marks
        );
    }
}