import * as geom from "./Geom";


export enum Keys {
    LeftArrow = 37,
    UpArrow = 38,
    RightArrow = 39,
    DownArrow = 40
}

export class Control {
    private static  keyMapping : Map<number, string[]>;
    private static _keys : boolean[] = [];
    private static clicked = false;
    private static mouseCoordinates = new geom.Vector(0, 0);
    private static commandsCounter : Map<string, number>;
    public static commands : Map<string, boolean>;

    private static async readTextFile(path) {
        const response = await fetch(path)
        const text = await response.text()
        return text;
    }
    
    public static async loadConfig(path : string) {
        let result = await this.readTextFile(path)
        .then(result => result.split("\n"))
        .then(file =>  {            
            let type : string;
            for (let i = 0; i < file.length; i++) {
                let currentString = file[i].split(" ");
                type = currentString[0];
                for (let j = 1; j < currentString.length; j++) {
                    let currentKey = parseInt(currentString[j]);
                    if (Control.keyMapping[currentKey] == undefined) {
                        Control.keyMapping[currentKey] = [];
                    }
                    Control.keyMapping[currentKey][Control.keyMapping[currentKey].length] = type;
                }
                Control.commands[type] = false;
                Control.commandsCounter[type] = 0;
            }
        });
    }

    public static init() : void {
        for (let i = 0; i < 256; i++) {
            Control._keys[i] = false;
        }
        window.addEventListener("keydown", Control.onKeyDown);
        window.addEventListener("keyup", Control.onKeyUp);
        window.addEventListener("click", Control.onClick);
        
        console.log("lets do it!!");
        
        Control.keyMapping = new Map<number, string[]>();
        Control.commandsCounter = new Map<string, number>();
        Control.commands = new Map<string, boolean>();
        Control.loadConfig("https://raw.githubusercontent.com/bmstu-iu9/ptp2021-6-2d-game/master/source/env/keys.conf");
        //Control.fakeLoadConfig();

        console.log("Done!!", Control.keyMapping);
        console.log(Control.commands["MoveUp"]);
        console.log(Control.commands);
        
    }

    public static isKeyDown(key : Keys) : boolean {
        return Control._keys[key];
    }
S
    public static isMouseClicked() : boolean {
        return Control.clicked;
    }

    public static lastMouseCoordinates() : geom.Vector {
        Control.clicked = false;
        return Control.mouseCoordinates;
    }

    private static onKeyDown(event : KeyboardEvent) : boolean {
        if (Control.keyMapping != undefined && Control._keys[event.keyCode] == false) {
            console.log(event.key, Control.keyMapping, Control.keyMapping[event.keyCode]);
            if (Control.keyMapping[event.keyCode] == undefined) {
                Control.keyMapping[event.keyCode] = [];
            }
            for (let i = 0; i < Control.keyMapping[event.keyCode].length; i++) {
                let currentCommand = Control.keyMapping[event.keyCode][i];
                Control.commandsCounter[currentCommand]++;
                Control.commands[currentCommand] = (Control.commandsCounter[currentCommand] != 0);
                console.log(currentCommand, Control.commandsCounter[currentCommand], Control.commands[currentCommand]);
            }
        }
        Control._keys[event.keyCode] = true;
        console.log(event.key);
        console.log(Control.commandsCounter);
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    private static onKeyUp(event : KeyboardEvent) : boolean {
        if (Control.keyMapping != undefined && Control._keys[event.keyCode] == true) {
            if (Control.keyMapping[event.keyCode] == undefined) {
                Control.keyMapping[event.keyCode] = [];
            }
            for (let i = 0; i < Control.keyMapping[event.keyCode].length; i++) {
                let currentCommand = Control.keyMapping[event.keyCode][i];
                Control.commandsCounter[currentCommand]--;
                Control.commands[currentCommand] = (Control.commandsCounter[currentCommand] != 0);
            }
        }
        Control._keys[event.keyCode] = false;
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    private static onClick(event : MouseEvent) : boolean {
        Control.clicked = true;
        Control.mouseCoordinates = new geom.Vector(event.x, event.y);
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
}