import { BehaviorModel, Instruction } from "../BehaviorModel";
import { ToolType } from "./Cursor";
import { Operations } from "../BehaviorModel";
import * as aux from "../AuxLib";

export class ListOfPads {
    private static amountOfPads = 0;
    public static instructionType = "default";
    public static behaviorModel = null;

    private static getPadPlace(pad : Element) {
        const listOfPads = document.querySelector(`.listOfPads`) as HTMLObjectElement;
        let pads = listOfPads.children;
        for (let i = 0; i < pads.length; i++) {
            if (pads[i].id == pad.id) {
                return i;
            }
        }
    }

    public static init() {
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
        exitButton.parentElement.remove();
    }

    public static clear() {
        const listOfPads = document.querySelector(`.listOfPads`) as HTMLObjectElement;
        while (listOfPads.children.length != 0) {
            listOfPads.children[0].remove();
        }
    }

    public static createBehaviorPad(src: string, text: string) {
        let pad = document.createElement("li");
        pad.className = "behaviorPad";

        let icon = document.createElement("img") as HTMLImageElement;
        let label = document.createElement("p");
        let exitButton = document.createElement("img") as HTMLImageElement;

        icon.className = "behaviorPad_icon";
        icon.src = src;
        label.className = "behaviorPad_label";

        pad.id = "pad_" + this.amountOfPads;
        label.id = "padLabel_" + this.amountOfPads;
        label.innerHTML = text;

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
        pad.appendChild(exitButton);

        pad.addEventListener(`dragover`, (evt) => {
            evt.preventDefault();
        });

        //let palette = document.getElementById("palette6");        

        document.getElementById("mainListPads").append(pad);
        //palette.appendChild(pad);
        this.amountOfPads += 1;

        return pad;
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
                    this.createBehaviorPad(src, "Going to ("
                    + new String(instruction.operationsData[i].x) + ","
                    + new String(instruction.operationsData[i].y) + ")");
                    break;
                }
                case Operations.wait: {
                    src = "textures/Editor/waiting.png";
                    this.createBehaviorPad(src, "Waiting (" + new String(instruction.operationsData[i]) + ")");
                    break;
                }
                case Operations.pursuit: {
                    src = "textures/Editor/pursuit.png";
                    this.createBehaviorPad(src, "Pursuit");
                    break;
                }
            }
        }
    }
}