import { Game } from "../../Game";
import { Projectile } from "./Projectile";
import { Body } from "../EntityAttributes/Body";
import * as geom from "../../Geom";
import { Animation } from "../EntityAttributes/Animation";
import { SpriteAnimation } from "../../SpriteAnimation";
import { Draw, Layer } from "../../Draw";
import { Entity } from "../Entity";
import { Corpse } from "../Corpse";
import { Person } from "../Person";

// Боевой прожектайл с уроном и временем жизни
export class CombatProjectile extends Projectile {
    public damage = 0.1; // Урон
    private remainingTime = 0; // Сколько ещё жить
    private lifetime = 0; // Сколько всего приказано жить

    constructor(game: Game, body: Body, vel: geom.Vector) {
        super(game, body, vel);
        this.loadSpriteAnimation("Flame", 3);
    }

    public setLifetime(lifetime: number) {
        this.lifetime = this.remainingTime = lifetime;
    }

    public step() {
        // Время уходит
        this.remainingTime -= Game.dt;
        // Проверка на то, надо ли перестать быть живым
        if (// Пришло время умирать
            this.remainingTime <= 0 ||
            // Проверка на удары об стену
            this.shouldBeKilledByWall && this.body.getCollisionsNumber())
            this.alive = false;
        // Нанесение урона
        for (let entity of this.game.entities) {
            if (entity instanceof Projectile ||
                entity == this.baseEntity ||
                geom.dist(this.body.center, entity.body.center) > this.body.radius)
                continue;
            entity.hp -= this.damage;
            this.alive = false;
        }
        super.step();
    }

    public display(draw: Draw) {
        draw.image(
            this.spriteAnimation.getCurrentFrame(),
            this.body.center,
            new geom.Vector(this.body.radius, this.body.radius),
            0, Layer.EntityLayer,
            0.5 * this.remainingTime / this.lifetime);
    }
}