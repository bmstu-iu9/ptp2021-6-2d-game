export enum Keys {
    LeftArrow = 37,
    UpArrow = 38,
    RightArrow = 39,
    DownArrow = 40
}

export class Control {
    private static _keys: boolean[] = [];

    public static init() : void {
        for (let i = 0; i < 256; i++) {
            Control._keys[i] = false;
        }

        window.addEventListener("keydown", Control.onKeyDown);
        window.addEventListener("keyup", Control.onKeyUp);
    }

    public static isKeyDown(key : Keys) : boolean {
        return Control._keys[key];
    }

    private static onKeyDown(event : KeyboardEvent) : boolean {
        Control._keys[event.keyCode] = true;
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    private static onKeyUp(event : KeyboardEvent) : boolean {
        Control._keys[event.keyCode] = false;
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
}