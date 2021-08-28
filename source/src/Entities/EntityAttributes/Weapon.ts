import { Person } from "../Person";
import { Game } from "../../Game";
import { Body } from "./Body";
import * as geom from "../../Geom";
import { Projectile } from "../Projectiles/Projectile";
import { Random } from "../../Random";
import { CombatProjectile } from "../Projectiles/CombatProjectile";
import { Color, Draw,Hp_Layer } from "../../Draw";


export class Weapon {
    public owner: Person; // Владелец оружия
    public magazineCapacity = 50; // Вместимость обоймы
    public magazineCooldown = 2; // Время перезарядки обоймы    
    public projectilesInMagazine = this.magazineCapacity; // Кол-во снарядов в обойме
    public cooldown = 0.02; // Время перезарядки одного снаряда
    public timeToCooldown = 0; // Время до перезарядки
    public scatter = 0.2; // Угол разброса
    public projectilesInOneShot = 5;
    public projectileVel = 5; // Скорость снаряда
    public projectileAnimationName = "Flame";
    public projectileAnimationFrames = 3;
    public range = 3; // Расстояние, на которое стреляет
    private isMagazineRecharging = false; // Если true, перезаряжается обойма

    constructor(owner: Person) {
        this.owner = owner;
    }

    // Перезарядить обойму
    public rechargeClip() {
        this.timeToCooldown = this.magazineCooldown;
        this.isMagazineRecharging = true;
    }

    private createProjectile(dir: geom.Vector) {
        dir = dir.norm();
        dir = geom.vectorFromAngle(dir.angle() + Random.randomFloat(-this.scatter, this.scatter));
        let body = new Body(this.owner.body.center, 0.4);
        body.game = this.owner.game;
        let projectile = new CombatProjectile(this.owner.game, body, dir.norm().mul(this.projectileVel));
        projectile.entityID = this.owner.game.entities.length;
        projectile.loadSpriteAnimation(this.projectileAnimationName, this.projectileAnimationFrames);
        projectile.shouldBeKilledByWall = true;
        projectile.setLifetime(this.range / this.projectileVel);
        projectile.baseEntity = this.owner;
        this.owner.game.entities.push(projectile);
    }

    // Выстрелить
    public shoot(dir: geom.Vector) {
        // Обойма на перезарядке
        if (this.isMagazineRecharging)
            return;
        // Если в обойме нет патронов
        if (this.projectilesInMagazine <= 0) {
            this.rechargeClip();
            return;
        }
        // Если на перезарядке
        if (this.timeToCooldown > 0)
            return;
        // Производим выстрел
        for (let i = 0; i < this.projectilesInOneShot; i++)
            this.createProjectile(dir);
        this.projectilesInMagazine--;
        this.timeToCooldown = this.cooldown;
        if (this.projectilesInMagazine <= 0)
            this.rechargeClip();        
    }

    public step() {
        this.timeToCooldown -= Game.dt;
        // Ели
        if (this.timeToCooldown <= 0 && this.isMagazineRecharging) {
            console.log("a");
            this.isMagazineRecharging = false;
            this.projectilesInMagazine = this.magazineCapacity;
        }
    }

    public display(draw : Draw) {
        // Отрисовка состояния перезарядки
        let color = new Color(255, 50, 50);
        if (this.projectilesInMagazine <= 0) {
            draw.bar(
                this.owner.body.center.clone().add(new geom.Vector(0, -1.1)), // Pos
                new geom.Vector(1, 0.1), // Box
                1 - this.timeToCooldown / this.magazineCooldown, // Percentage
                new Color(25, 25, 25), // Back color
                color.setAlpha(0.5), // Front color
                [], // Marks
                Hp_Layer.Weapon // Индентификатор оружия
            );
        } else {
            draw.bar(
                this.owner.body.center.clone().add(new geom.Vector(0, -1.1)), // Pos
                new geom.Vector(1, 0.1), // Box
                this.projectilesInMagazine / this.magazineCapacity, // Percentage
                new Color(25, 25, 25), // Back color
                color, // Front color
                [], // Marks
                Hp_Layer.Weapon // Индентификатор оружия
            );
        }
    }
}
