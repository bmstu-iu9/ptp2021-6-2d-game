import { BehaviorModel, Instruction } from "../BehaviorModel";
import { Cursor, Mode, ToolType } from "./Cursor";
import { Operations } from "../BehaviorModel";
import * as aux from "../AuxLib";
import { Vector } from "../Geom";
import { Editor } from "../Editor";
import { EditorGUI } from "./EditorGUI";
import { Color, Draw } from "../Draw";

export class ListOfPads {
    private static amountOfPads = 0;
    public static instructionType = "default";
    public static entityPos = new Vector(0, 0);
    public static behaviorModel = null;
    public static cursor: Cursor;
    private static currentPad: HTMLElement = null;
    private static instructionCopy;

    public static updateInstructionCopy() {
        if (this.behaviorModel != undefined && this.behaviorModel.instructions != undefined
            && this.behaviorModel.instructions[this.instructionType] != undefined) {
            this.instructionCopy = this.behaviorModel.instructions[this.instructionType].clone();
        }
    }

    private static getPadPlace(pad: Element) {
        const listOfPads = document.querySelector(`.listOfPads`) as HTMLObjectElement;
        let pads = listOfPads.children;
        for (let i = 0; i < pads.length; i++) {
            if (pads[i].id == pad.id) {
                return i;
            }
        }
    }

    public static init(cursor: Cursor) {
        this.cursor = cursor;
        const listOfPads = document.querySelector(`.listOfPads`) as HTMLObjectElement;
        listOfPads.addEventListener('dragstart', (evt) => {
            let x = evt.target as HTMLObjectElement;
            x.classList.add('selected');
            this.updateInstructionCopy();
        });

        listOfPads.addEventListener('dragend', (evt) => {
            let x = evt.target as HTMLObjectElement;
            x.classList.remove('selected');
            this.updateInstructionCopy();
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
            this.updateInstructionCopy();
        });
    }

    private static deleteBehaviorPad(exitButton: HTMLImageElement) {
        let instruction = this.behaviorModel.instructions[this.instructionType];
        let pad = exitButton.parentElement;
        instruction.operations.splice(this.getPadPlace(pad), 1);
        instruction.operationsData.splice(this.getPadPlace(pad), 1);
        exitButton.parentElement.remove();
        this.updateInstructionCopy();
    }

    public static clear() {
        const listOfPads = document.querySelector(`.listOfPads`) as HTMLObjectElement;
        while (listOfPads.children.length != 0) {
            listOfPads.children[0].remove();
        }
    }

    public static createBehaviorPad(src: string, tool: ToolType) {
        let pad = document.createElement("li");
        pad.className = "behaviorPad";

        let additionalElement = document.createElement("p");
        let icon = document.createElement("img") as HTMLImageElement;
        let label = document.createElement("p");
        let exitButton = document.createElement("img") as HTMLImageElement;

        icon.className = "behaviorPad_icon";
        icon.src = src;
        if (tool != ToolType.Pursuit) {
            label.className = "behaviorPad_label";
        } else {
            label.className = "behaviorPad_center_label";
        }

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
                    this.cursor.changeMode(Mode.PosPicking);
                    this.currentPad = additionalElement.parentElement;
                    this.updateInstructionCopy();
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
                    this.updateInstructionCopy();
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
        let deleteDiv = () => {
            this.deleteBehaviorPad(exitButton);
            this.updateInstructionCopy();
        }
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

        this.updateInstructionCopy();
        return pad;
    }

    public static choosePoint(point: Vector) {
        if (this.currentPad == null) {
            return;
        }
        this.currentPad.children[2].innerHTML = "(" + new String(point.x) + "," + new String(point.y) + ")";
        this.currentPad.children[2].classList.remove("selected");
        this.behaviorModel.instructions[this.instructionType].operationsData[this.getPadPlace(this.currentPad)] = point;
        this.updateInstructionCopy();
    }

    public static GUIstep() {
        //console.log(this.instructionCopy);
        
        if (this.instructionCopy == null) {
            return;
        }
        let currentPos = this.entityPos;
        let imageMas : HTMLImageElement[] = [];
        let imageSize = 1;
        for (let i = 0; i < this.instructionCopy.operations.length; i++) {
            switch (this.instructionCopy.operations[i]) {
                case Operations.goToPoint: {
                    console.log(currentPos, this.instructionCopy.operationsData[i]);

                    let oldPos = currentPos;
                    EditorGUI.addLine(currentPos, this.instructionCopy.operationsData[i], new Color(0, 255, 0, 1));
                    currentPos = this.instructionCopy.operationsData[i];

                    for (let j = 0; j < imageMas.length; j++) {
                        EditorGUI.addImage(oldPos.add(new Vector((-imageMas.length * 0.5 + 0.5 + j) * imageSize, 0)),
                         imageMas[j], new Vector(imageSize, imageSize));
                    }
                    imageMas = [];

                    break;
                }
                case Operations.wait: {
                    imageMas[imageMas.length] = Draw.loadImage("textures/Editor/waiting.png");
                    break;
                }
                case Operations.pursuit: {
                    imageMas[imageMas.length] = Draw.loadImage("textures/Editor/pursuit.png");
                    break;
                }
            }
        }
        for (let j = 0; j < imageMas.length; j++) {
            EditorGUI.addImage(currentPos.add(new Vector(-imageMas.length * 0.5 + 0.5 + j, 0)),
             imageMas[j], new Vector(imageSize, imageSize));
        }
        imageMas = [];
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
        this.updateInstructionCopy();
    }
}