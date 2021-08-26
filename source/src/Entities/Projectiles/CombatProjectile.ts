import { Game } from "../../Game";
import { Projectile } from "./Projectile";
import { Body } from "../EntityAttributes/Body";
import * as geom from "../../Geom";
import { Animation } from "../EntityAttributes/Animation";
import { SpriteAnimation } from "../../SpriteAnimation";
import { Draw, Layer } from "../../Draw";
import { Entity } from "../Entity";
import { Corpse } from "../Corpse";

// Боевой прожектайл с уроном и временем жизни
export class CombatProjectile extends Projectile {
    public damage = 1; // Урон
    public remainingTime = 0; // Сколько ещё жить
    constructor(game : Game, body : Body, vel : geom.Vector) {
        super(game, body, vel);
        this.loadSpriteAnimation("Flame", 3);
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
        // TODO: нанесение урона
        super.step();
    }
}