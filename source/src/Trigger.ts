import * as aux from "./AuxLib";
import { Entity } from "./Entities/Entity";
import { Vector } from "./Geom";

export class Trigger {
    public active : boolean;
    public lifeTime : number;
    public appearanceTime : number;
    public boundEntity : Entity;
    public triggeredEntities : Map<Entity, boolean>;
    public power = 1;

    constructor(lifeTime : number, boundEntity : Entity) {
        this.lifeTime = lifeTime;
        this.boundEntity = boundEntity;
        this.active = true;
        this.appearanceTime = aux.getMilliCount();
        this.triggeredEntities = new Map();
    }

    public isActive() {
        if (aux.getMilliCount() - this.appearanceTime > this.lifeTime) {
            this.active = false;
        }
        if (this.boundEntity == null || !this.boundEntity.alive) {
            this.active = false;
        }
        return this.active;
    }

    public getCoordinates() {
        return this.boundEntity.body.center.clone();
    }

    public entityTriggered(entity : Entity) {
        this.triggeredEntities[entity.entityID] = true;
    }

    public isEntityTriggered(entity : Entity) {
        return this.triggeredEntities[entity.entityID];
    }
}