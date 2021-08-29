import { Draw, Layer } from "./Draw";
import { Game } from "./Game";
import * as geom from "./Geom";

export class AnimationState {
    public pos : geom.Vector;
    public box : geom.Vector;
    public angle : number;
    public opacity : number;
    constructor (pos : geom.Vector, box : geom.Vector, angle : number, opacity = 1) {
        this.pos = pos;
        this.box = box;
        this.angle = angle;
        this.opacity = opacity;
    }
}

export class SpriteAnimation {
    private frames : HTMLImageElement[]; // кадры анимации
    public initialState : AnimationState; // начальное состояние
    public finalState : AnimationState; // конечное состояние
    public duration : number; // длительноссть анимации
    private time = 0; // текушее время
    public frameDuration : number; // длительность одного кадра

    // Загружает кадры
    public loadFrames(name : string, framesNumber : number) {
        this.frames = [];
        for (let i = 0; i < framesNumber; i++) {
            this.frames[i] = Draw.loadImage("textures/" + name + "/" + i + ".png");
        }
    }

    // Вычисляет промежуточное состояние
    private getCurrentState() : AnimationState {
        let multB = this.time / this.duration;
        let multA = 1 - multB;
        return new AnimationState(
            this.initialState.pos.mul(multA).add(this.finalState.pos.mul(multB)),
            this.initialState.box.mul(multA).add(this.finalState.box.mul(multB)),
            this.initialState.angle * multA + this.finalState.angle * multB,
            this.initialState.opacity * multA + this.finalState.opacity * multB
        );
    }

    public getCurrentFrame() : HTMLImageElement{
        let frameNumber = Math.floor(this.time / this.frameDuration) % this.frames.length;
        return this.frames[frameNumber];
    }

    public step() {
        this.time += Game.dt;
    }

    public isOver() : boolean{
        return this.time > this.duration;
    }

    public display(draw : Draw) {
        let state = this.getCurrentState();
        let frame = this.getCurrentFrame();
        draw.image(frame, state.pos, state.box, state.angle, Layer.EntityLayer, state.opacity);
    }
};