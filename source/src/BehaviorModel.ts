import { Vector } from "./Geom";
import { eps } from "./Geom";
import { AI } from "./Entities/EntityAttributes/AI";
import * as aux from "./AuxLib";

enum Operations {
    goToPoint,
    wait,
    pursuit
}

class Instruction {
    public operations : number[];
    public operationsData : any[];

    public addGoingToPoint(point : Vector) {
        let place = this.operations.length;
        this.operations[place] = Operations.goToPoint;
        this.operationsData[place] = point;
    }

    public addWaiting(milliseconds : number) {
        let place = this.operations.length;
        this.operations[place] = Operations.wait;
        this.operationsData[place] = milliseconds;
    }

    public addPursuit() {
        let place = this.operations.length;
        this.operations[place] = Operations.pursuit;
    }
}

export class BehaviorModel {
    private operationNum = 0;
    private currentInstruction : string;
    public instructions : Map<string, Instruction>;
    public myAI : AI;

    constructor(myAI : AI) {
        this.myAI = myAI;
        this.instructions = new Map;
    }

    public changeCurrentInstruction(newInstruction : string) {
        this.operationNum = 0;
        this.myAI.Path = [];
        this.myAI.wait(0);
        this.currentInstruction = newInstruction;
    }

    public step() {
        if (this.myAI.Path == [] && this.myAI.getWaitingTime() < eps) {
            this.operationNum++;
            this.operationNum %= this.instructions[this.currentInstruction].operations.length;
            let operation = this.instructions[this.currentInstruction].operations[this.operationNum];
            let data = this.instructions[this.currentInstruction].operationsData[this.operationNum];
            switch (operation) {
                case Operations.goToPoint: {
                    this.myAI.goToPoint(data);
                    break;
                }
                case Operations.wait: {
                    this.myAI.wait(data);
                    break;
                }
                case Operations.pursuit: {
                    this.myAI.pursuit();
                    break;
                }
            }
        }
    }
}