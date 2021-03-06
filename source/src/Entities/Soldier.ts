import { Person, PersonMode } from "./Person";
import { Game } from "../Game";
import { Body } from "./EntityAttributes/Body";
import { Animation } from "./EntityAttributes/Animation";
import { Weapon } from "./EntityAttributes/Weapon";
import { Color, Draw } from "../Draw";
import * as geom from "../Geom";
import { Monster } from "./Monster";
import { Sounds } from "../Sounds";

export class Soldier extends Person {
    public weapon = new Weapon(this);
    public soundweapon: Sounds = new Sounds(1);

    constructor(game: Game, body: Body, mode: PersonMode) {
        super(game, body, mode);
        this.animation = new Animation("Soldier", 8);
        this.type = "Soldier";
        this.soundweapon.playcontinuously("flamethrower", 1)
        this.soundweapon.current_sound.muted = true;
        if (this.game)
            this.game.soundsarr.push(this.soundweapon);
    }

    public step() {
        // Нападаем
        this.myAI.commands.active["shoot"] = false;
        for (let entity of this.game.entities) {
            if (entity instanceof Monster) {
                // Остановка
                if (geom.dist(entity.body.center, this.body.center) < this.weapon.range / 2)
                    this.stop();
                // Стрельба
                if (geom.dist(entity.body.center, this.body.center) < this.weapon.range)
                    this.myAI.commands.active["shoot"] = true;
                this.myAI.commands.pointer = entity.body.center.sub(this.body.center);
            }
        }
        if (this.commands.active["shoot"]) {
            this.soundweapon.current_sound.muted = false;
            // выстрелить в направлении this.commands.pointer
            this.weapon.shoot(this.commands.pointer);

        } else {
            this.soundweapon.current_sound.muted = true;
        }
        this.weapon.step();
        super.step();
    }

    public die() {
        super.die();
        this.soundweapon.current_sound.muted = true;
    }

    public display(draw: Draw) {
        super.display(draw);
        this.displayAwareness(draw);
        this.weapon.display(draw);
    }
}