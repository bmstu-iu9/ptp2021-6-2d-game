import * as geom from "./Geom";
import * as aux from "./AuxLib";
import { Commands } from "./Entities/EntityAttributes/Commands";

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
    private static commandsCounter : Map<string, number>;
    public static commands : Commands;

    private static async readTextFile(path) {
        const response = await fetch(path)
        const text = await response.text()
        return text;
    }
    
    public static async loadConfig(path : string) {
        if (localStorage.getItem("commands") == undefined) {
            let result = await this.readTextFile(aux.environment + path)
            .then(result =>  { Control.keyMapping = JSON.parse(result, aux.reviver); console.log("i was here");
            });
        } else {
            Control.keyMapping = JSON.parse(localStorage.getItem("commands"), aux.reviver);
        }
        let keys = Array.from(Control.keyMapping.keys());
        for (let i = 0; i < keys.length; i++) {
            Control.commands[keys[i]] = false;
            Control.commandsCounter[keys[i]] = 0;
        }
    }

    //public static fakeLoadConfig() {
    //    Control.keyMapping.set(38, ["MoveUp"]);
    //    Control.keyMapping.set(40, ["MoveDown"]);
    //    Control.keyMapping.set(39, ["MoveRight"]);
    //    Control.keyMapping.set(37, ["MoveLeft"]);
    //}

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
        Control.commands = new Commands();
        Control.loadConfig("keys.json");
        //Control.fakeLoadConfig();
        console.log(Control.keyMapping, Control.keyMapping.entries(), Array.from(Control.keyMapping.entries()),JSON.stringify(Control.keyMapping, aux.replacer));
        const blob = new Blob([JSON.stringify(Control.keyMapping, aux.replacer)], {
            type: 'application/json'
        });
        
        const url = window.URL.createObjectURL(blob);
        window.open(url);

        

        console.log("Done!!", Control.keyMapping);
        console.log(Control.commands["MoveUp"]);
        console.log(Control.commands);
        
    }

    public static isKeyDown(key : Keys) : boolean {
        return Control._keys[key];
    }

    public static isMouseClicked() : boolean {
        return Control.clicked;
    }

    public static lastMouseCoordinates() : geom.Vector {
        Control.clicked = false;
        return Control.commands.pointer;
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
        Control.commands.pointer = new geom.Vector(event.x, event.y);
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
}