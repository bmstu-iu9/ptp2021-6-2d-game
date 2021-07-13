import { Draw } from "../../Draw";

export class Animation {
    public current_state : HTMLImageElement;
    private stateMachine : HTMLImageElement [] = [];
    private counter : number;
    private name: string; // имя анимации
    private states : number; // кол-во анимаций на 1 состояние

    constructor(person : string, states : number) {
        this.counter = 0;
        this.name = person;
        this.states=states;
        this.current_state = Draw.loadImage("textures/"+this.name+"/right/all/"+this.counter%this.states+".png"); //начальное положение
    }
    public step(string : string, mode : string) { // шаг смены анимации
        this.counter++
        let frame = this.counter % this.states; // номер текущего кадра
        this.current_state = Draw.loadImage("textures/" + 
            this.name + "/" + 
            string + "/" + 
            mode + "/" + 
            frame + ".png");
    }
}