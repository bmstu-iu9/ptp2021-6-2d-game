import { Draw } from "../../Draw";
export class Animation {
    public current_state : HTMLImageElement;
    private stateMachine : HTMLImageElement [] = [];
    private counter : number;
    private name: string; // имя анимации
    private states : number; // кол-во анимаций на 1 состояние
    public mode : string;
    public direction : string; //направление движения


    constructor(person : string, states : number) {
        this.counter = 0;
        this.name = person;
        this.states=states;
        this.current_state = Draw.loadImage("textures/"+this.name+"/right_fine_"+this.counter%this.states+".png"); //начальное положение
        this.mode="fine";
        this.direction="right";
        this.Imageloader();
    }
    async Imageloader(){
        let direction = ["top", "down", "left","right","stand"];
        let mods = ["corrupted", "dying", "fine"];
        for (let mod in mods) {
            for (let direct in direction) {
                for (var _i = 0; _i < this.states; _i++) {
                    this.getImage("textures/" +
                    this.name + "/" +
                    direct + "_" +
                    mod + "_" +
                    _i + ".png")
                }
            }
        }
    }
    
    public getImage(current : string) {
        return Draw.loadImage(current);
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