import { Draw } from "../../Draw";
type hashimages = {
    [key: string]: HTMLImageElement ; // Хеш таблица с изображениями
};
export class Animation {
    public current_state : HTMLImageElement;
    private stateMachine : HTMLImageElement [] = [];
    private counter : number;
    private name: string; // имя анимации
    private states : number; // кол-во анимаций на 1 состояние
    public mode : string;
    public direction : string; //направление движения
    private images : hashimages; // Хеш таблица с изображениями


    constructor(person : string, states : number) {
        this.counter = 0;
        this.name = person;
        this.states=states;
        this.current_state = Draw.loadImage("textures/"+this.name+"/right_fine_"+this.counter%this.states+".png"); //начальное положение
        this.mode="fine";
        this.direction="right";
        this.images={};
    }

    public getImage(current : string) {
        if (this.images[current]) {
            return this.images[current]; // Извлекаем из хеш таблицы
        }
        console.log("loadImage");  // Грузим картинку
        this.images[current] = Draw.loadImage(current);
        return this.images[current];
    }
    public changedirection(string : string, mode : string) { // шаг смены анимации
        this.direction = string; //
        this.mode=mode;
    }
    public step() { // шаг смены анимации
        this.counter++
        let frame = this.counter % this.states; // номер текущего кадра
        this.current_state = this.getImage("textures/" +
            this.name + "/" +
            this.direction + "_" +
            this.mode + "_" +
            frame + ".png");
        this.direction="stand"
    }
}