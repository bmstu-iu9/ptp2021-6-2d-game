import { BehaviorModel, Instruction } from "../BehaviorModel";
import { Cursor, Mode, ToolType } from "./Cursor";
import { Operations } from "../BehaviorModel";
import * as aux from "../AuxLib";
import { Vector } from "../Geom";
import { Editor } from "../Editor";
import { EditorGUI } from "./EditorGUI";
import { Color } from "../Draw";

export class ListOfPads {
    private static amountOfPads = 0;
    public static instructionType = "default";
    public static entityPos = new Vector(0, 0);
    public static behaviorModel = null;
    public static cursor : Cursor;
    private static currentPad : HTMLElement = null;

    private static getPadPlace(pad : Element) {
        const listOfPads = document.querySelector(`.listOfPads`) as HTMLObjectElement;
        let pads = listOfPads.children;
        for (let i = 0; i < pads.length; i++) {
            if (pads[i].id == pad.id) {
                return i;
            }
        }
    }

    public static init(cursor : Cursor) {
        this.cursor = cursor;
        const listOfPads = document.querySelector(`.listOfPads`) as HTMLObjectElement;
        listOfPads.addEventListener('dragstart', (evt) => {
            let x = evt.target as HTMLObjectElement;
            x.classList.add('selected')
        });

        listOfPads.addEventListener('dragend', (evt) => {
            let x = evt.target as HTMLObjectElement;
            x.classList.remove('selected')
        });

        listOfPads.addEventListener(`dragover`, (evt) => {
            evt.preventDefault();
            const activeElement = listOfPads.querySelector(`.selected`);
            const currentElement = evt.target as HTMLObjectElement;
            const isMoveable = activeElement !== currentElement &&
                currentElement.classList.contains(`behaviorPad`);

            if (!isMoveable) {
                return;
            }

            const nextElement = (currentElement === activeElement.nextElementSibling) ?
                currentElement.nextElementSibling :
                currentElement;

            let instruction = this.behaviorModel.instructions[this.instructionType];
            aux.arrayMove(instruction.operations, this.getPadPlace(activeElement), this.getPadPlace(nextElement));
            aux.arrayMove(instruction.operationsData, this.getPadPlace(activeElement), this.getPadPlace(nextElement));

            listOfPads.insertBefore(activeElement, nextElement);
        });
    }

    private static deleteBehaviorPad(exitButton: HTMLImageElement) {
        let instruction = this.behaviorModel.instructions[this.instructionType];
        let pad  = exitButton.parentElement;
        instruction.operations.splice(this.getPadPlace(pad), 1);
        instruction.operationsData.splice(this.getPadPlace(pad), 1);
        exitButton.parentElement.remove();
    }

    public static clear() {
        const listOfPads = document.querySelector(`.listOfPads`) as HTMLObjectElement;
        while (listOfPads.children.length != 0) {
            listOfPads.children[0].remove();
        }
    }

    public static createBehaviorPad(src: string, tool : ToolType) {
        let pad = document.createElement("li");
        pad.className = "behaviorPad";

        let additionalElement = document.createElement("p");
        let icon = document.createElement("img") as HTMLImageElement;
        let label = document.createElement("p");
        let exitButton = document.createElement("img") as HTMLImageElement;

        icon.className = "behaviorPad_icon";
        icon.src = src;
        label.className = "behaviorPad_label";

        pad.id = "pad_" + this.amountOfPads;
        label.id = "padLabel_" + this.amountOfPads;

        additionalElement.className = "behaviorPad_additionalElement";

        switch (tool) {
            case ToolType.GoToPoint: {
                label.innerHTML = "Go to ";
                additionalElement.innerHTML = "(0, 0)";
                let posPick = () => {
                    console.log("clicked");
                    
                    additionalElement.classList.add("selected");
                    this.cursor.mode = Mode.PosPicking;
                    this.currentPad = additionalElement.parentElement;
                };
                additionalElement.onclick = posPick;
                break;
            }
            case ToolType.Waiting: {
                label.innerHTML = "Wait ";
                additionalElement.inputMode = "decimal";
                additionalElement.innerHTML = "1000";
                additionalElement.contentEditable = "true";
                let changeVal = (evt) => {
                    //console.log("changed");
                    
                    let elem = evt.target as HTMLObjectElement;
                    let val = new Number(elem.innerHTML);
                    console.log("val is ", val, " is integer ", Number.isInteger(val.valueOf()))
                    let instruction = this.behaviorModel.instructions[this.instructionType];
                    if (Number.isInteger(val.valueOf())) {
                        //elem.innerHTML = new String(val.valueOf()).valueOf();
                        instruction.operationsData[this.getPadPlace(elem.parentElement)] = val.valueOf();
                    } else {
                        //elem.innerHTML = new String(instruction.operationsData[this.getPadPlace(elem.parentElement)]).valueOf();
                    }
                }
                additionalElement.addEventListener("input", changeVal);
                break;
            }
            case ToolType.Pursuit: {
                label.innerHTML = "Pursuit";
                break;
            }
        }

        exitButton.className = "behaviorPad_exitButton";
        exitButton.src = "textures/Editor/cross.ico"
        let deleteDiv = () => { this.deleteBehaviorPad(exitButton) }
        exitButton.onclick = deleteDiv;

        pad.draggable = true;
        icon.draggable = false;
        label.draggable = false;
        exitButton.draggable = false;
        pad.appendChild(icon);
        pad.appendChild(label);
        if (tool != ToolType.Pursuit) {
            pad.appendChild(additionalElement);
        }
        pad.appendChild(exitButton);

        //let palette = document.getElementById("palette6");        

        document.getElementById("mainListPads").append(pad);
        //palette.appendChild(pad);
        this.amountOfPads += 1;

        return pad;
    }

    public static choosePoint(point : Vector) {
        if (this.currentPad == null) {
            return;
        }
        this.currentPad.children[2].innerHTML = "("+ new String(point.x) + "," + new String(point.y) +")";
        this.currentPad.children[2].classList.remove("selected");
        this.behaviorModel.instructions[this.instructionType].operationsData[this.getPadPlace(this.currentPad)] = point;
    }

    public static GUIstep() {
        if (this.behaviorModel == null) {
            return;
        }
        let currentPos = this.entityPos;
        for (let i = 0; i < this.behaviorModel.operations; i++) {
            switch (this.behaviorModel.operations[i]) {
                case Operations.goToPoint: {
                    console.log(currentPos, this.behaviorModel.operationsData[i]);
                    
                    EditorGUI.addLine(currentPos, this.behaviorModel.operationsData[i], new Color(0, 255, 0, 1));
                    currentPos = this.behaviorModel.operationsData[i];
                    break;
                }
            }
        }
    }

    public static compileBehaviorModel(behaviorModel: BehaviorModel) {
        if (behaviorModel == undefined) {
            behaviorModel = new BehaviorModel(null);
        }
        if (behaviorModel.instructions[this.instructionType] == undefined) {
            behaviorModel.instructions[this.instructionType] = new Instruction();
        }
        this.behaviorModel = behaviorModel;
        this.clear();
        let instruction = behaviorModel.instructions[this.instructionType];
        for (let i = 0; i < instruction.operations.length; i++) {
            let src = "";
            switch (instruction.operations[i]) {
                case Operations.goToPoint: {
                    src = "textures/Editor/arrow.png";
                    let pad = this.createBehaviorPad(src, ToolType.GoToPoint);
                    let ae = pad.children[2];
                    ae.innerHTML = "("
                    + new String(instruction.operationsData[i].x) + ","
                    + new String(instruction.operationsData[i].y) + ")";
                    break;
                }
                case Operations.wait: {
                    src = "textures/Editor/waiting.png";
                    let pad = this.createBehaviorPad(src, ToolType.Waiting);
                    let ae = pad.children[2];
                    ae.innerHTML = new String(instruction.operationsData[i]).valueOf();
                    break;
                }
                case Operations.pursuit: {
                    src = "textures/Editor/pursuit.png";
                    this.createBehaviorPad(src, ToolType.Pursuit);
                    break;
                }
            }
        }
    }
}