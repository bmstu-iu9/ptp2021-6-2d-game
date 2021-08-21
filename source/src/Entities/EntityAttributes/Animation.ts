import { Draw } from "../../Draw";
import * as aux from "../../AuxLib";

export class Animation {
    public current_state : HTMLImageElement;
    private stateMachine : HTMLImageElement [] = [];
    private counter : number;
    private name: string; // имя анимации
    private states : number; // кол-во анимаций на 1 состояние
    public mode : string;
    public direction : string; //направление движения
    public cycles : number;


    constructor(person : string, states : number) {
        this.counter = 0;
        this.cycles = aux.getMilliCount() / 75;
        this.name = person;
        this.states=states;
        this.current_state = Draw.loadImage("textures/"+this.name+"/right_fine_"+this.counter%this.states+".png"); //начальное положение
        this.mode="fine";
        this.direction="right";
    }

    public getImage(current : string) {
        return Draw.loadImage(current);
    }
    public changedirection(string : string, mode : string) { // шаг смены анимации
        this.direction = string; //
        this.mode=mode;
    }
    public step() { // шаг смены анимации      
        if (aux.getMilliCount() / 75 > this.cycles) {
            this.cycles = aux.getMilliCount() / 75 + 1;
            this.counter++;
        }
        let frame = this.counter % this.states; // номер текущего кадра
        this.current_state = this.getImage("textures/" +
            this.name + "/" +
            this.direction + "_" +
            this.mode + "_" +
            frame + ".png");
        this.direction="stand"
    }
}