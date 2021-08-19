import { Entity } from "./Entity";
import { Game } from "../Game"
import { Body } from "./EntityAttributes/Body";
import * as geom from "../Geom";
import { Debug } from "../Debug";
import { Color } from "../Draw";

export enum PersonMode {
    Fine,
    Corrupted,
    Dying
}

export class Person extends Entity {
    public viewRadius : number; // радиус сектора видимости
    public viewingAngle : number; // угол сектора видимости
    public direction : geom.Vector; // направление взгляда
    public alertLvl : number; // уровень тревоги
    private mode : PersonMode; // маркер состояния (переименовать по необходимости)

    constructor(game : Game, body : Body, mode : PersonMode) {
        super(game, body)
        this.mode = mode;
        this.viewRadius = 3;
        this.viewingAngle = Math.PI / 4;
        this.direction = new geom.Vector(1, 0);
        this.alertLvl = 0; 
    }

    public upAlertLvl() { // поднятие уровня тревоги
        // Возможно нужны еще манипуляции (тревога по карте и т.д.)
        this.alertLvl++;
    }

    public checkTriggers() { // проверка всех триггеров на попадание в сетор видимости
        let center = this.body.center;
        for (let i = 0; i < this.game.triggers.length; i++) {
            
            let triggerCoordinate = this.game.triggers[i].getCoordinates();
            Debug.addPoint(triggerCoordinate, new Color(0, 0, 255));
            let triggerVector = triggerCoordinate.sub(center);
            if (Math.abs(this.direction.getAngle(triggerVector)) < this.viewingAngle / 2) {
                if (triggerVector.abs() <= this.viewRadius) {
                    if (this.game.mimic.controlledEntity.entityID == this.game.triggers[i].boundEntity.entityID) {
                        this.game.ghost = this.game.mimic.controlledEntity.body.center;
                    }
                    if (!this.game.triggers[i].isEntityTriggered(this)) {
                        this.upAlertLvl();
                        this.game.triggers[i].entityTriggered(this);
                    }
                }
            }
        }
    }

    // Режим в строковом виде
    public modeToString() : string {
        switch (this.mode) {
            case PersonMode.Fine:
                return "fine";
            case PersonMode.Corrupted:
                return "corrupted";
            case PersonMode.Dying:
                return "dying";
        }
    }

    public changedirection(x : number,y : number){
        if(x==0 && y == 0) {
            this.animation.changedirection("stand", this.modeToString())
        }
        if(x==1) {
            this.animation.changedirection("right", this.modeToString())
        }
        if(x==-1) {
            this.animation.changedirection("left", this.modeToString())
        }
        if(x==0 && y == 1) {
            this.animation.changedirection("top", this.modeToString())
        }
        if(x==0 && y == -1) {
            this.animation.changedirection("down", this.modeToString())
        }
    }

    public step() {
        let x = 0;
        let y = 0;
        let vel = this.body.velocity;
        //console.log("alertLvl:", this.alertLvl);
        
        // перемещение согласно commands
        if (!this.commands)
            return;
        if(this.commands["MoveUp"]) {
            y++;
            this.body.move(new geom.Vector(0, -vel));
        }
        if(this.commands["MoveDown"]) {
            y--;
            this.body.move(new geom.Vector(0, vel));
        }
        if(this.commands["MoveRight"]) {
            x++;
            this.body.move(new geom.Vector(vel, 0));
        }
        if(this.commands["MoveLeft"]) {
            x--;
            this.body.move(new geom.Vector(-vel, 0));
        }
        this.changedirection(x, y); // измененниие напрвления для анимаций
        this.checkTriggers();
        this.direction = new geom.Vector(x, y);
        super.step();
    }
}