import { Draw } from "./Draw";

export class Animation {
    public current_state : HTMLImageElement;
    private stateMachine : HTMLImageElement [] = [];
    private count: number; // вспомогательный счетчик
    private person: string; // тип персонажа
    private states : number; // кол-во анимаций на 1 состояние
    private mnimik : boolean; //разрешено ли отваливание частей (вселен ли мнимик)

    constructor(person : string,states : number) {
        this.count = 0;
        this.person = person;
        this.states=states;
        this.mnimik = false;
        this.current_state = Draw.loadImage("textures/"+this.person+"/right/all/"+this.count%this.states+".png"); //начальное положение
    }
    public step(string : string) { //шаг смены анимации
            this.count++
        if (this.count > 1000 && this.mnimik) { //отвалилось 2 раза
            this.current_state = Draw.loadImage("textures/"+this.person+"/" + string + "/legs/" + this.count % this.states + ".png");
            return
        }
        if (this.count > 500 && this.mnimik) { //отвалилось 1 раз
            this.current_state = Draw.loadImage("textures/"+this.person+"/" + string + "/Headless/" + this.count % this.states + ".png");
            return
        }
        this.current_state = Draw.loadImage("textures/"+this.person+"/" + string + "/all/" + this.count % this.states + ".png");
        return
    }
    public unitmnimik(bool : boolean){ //инициализация мнимика
        this.count=this.count%this.states; //сброс счетчика
        this.mnimik=bool; //переключение режима мнимика
    }
}