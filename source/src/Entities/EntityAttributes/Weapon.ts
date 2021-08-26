import { Person } from "../Person";
import { Game } from "../../Game";
import { Body } from "./Body";
import * as geom from "../../Geom";
import { Projectile } from "../Projectile";
import { Random } from "../../Random";


export class Weapon {
    public owner: Person; // Владелец оружия
    public clipCapacity = 50; // Вместимость обоймы
    public clipCooldown = 5; // Время перезарядки обоймы
    public cooldown = 0.1; // Время перезарядки одного снаряда
    public projectilesInClip = this.clipCapacity; // Кол-во снарядов в обойме
    public timeToCooldown = 0; // Время до перезарядки
    public scatter = 0; // Угол разброса
    public projectileVel = 10; // Скорость снаряда
    public projectileAnimationName = "Flame";
    public projectileAnimationFrames = 3;
    private isClipRecharging = false; // Если true, перезаряжается обойма

    constructor(owner: Person) {
        this.owner = owner;
    }

    // Перезарядить обойму
    public rechargeClip() {
        this.timeToCooldown = this.clipCooldown;
        this.isClipRecharging = true;
    }

    private createProjectile(dir: geom.Vector) {
        console.log("shoot");
        dir = dir.norm();
        dir = geom.vectorFromAngle(dir.angle() + Random.randomFloat(-this.scatter, this.scatter));
        let body = new Body(this.owner.body.center, 1);
        body.game = this.owner.game;
        let projectile = new Projectile(this.owner.game, body, dir.norm().mul(this.projectileVel));
        projectile.entityID = this.owner.game.entities.length;
        projectile.loadSpriteAnimation(this.projectileAnimationName, this.projectileAnimationFrames);
        projectile.shouldBeKilledByWall = true;
        this.owner.game.entities.push(projectile);
        console.log(projectile);
    }

    // Выстрелить
    public shoot(dir: geom.Vector) {
        // Если в обойме нет патронов
        if (this.projectilesInClip <= 0) {
            this.rechargeClip();
            return;
        }
        // Если на перезарядке
        if (this.timeToCooldown > 0)
            return;
        // Производим выстрел
        this.createProjectile(dir);
        this.timeToCooldown = this.cooldown;
    }

    public step() {
        this.timeToCooldown -= Game.dt;
        // Ели
        if (this.timeToCooldown <= 0 && this.isClipRecharging) {
            this.isClipRecharging = false;
            this.projectilesInClip = this.clipCapacity;
        }
    }
}
