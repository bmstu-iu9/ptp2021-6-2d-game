import { stringify } from "querystring";
import { setEnvironmentData } from "worker_threads";
import { Draw } from "./Draw";
import * as geom from "./Geom";

export let environment: string;
export let editorMode = false;

export function vectorStringify(v: geom.Vector) {
    let ans = "x:" + String(v.x).valueOf() + "y:" + String(v.y);
    return ans;
}

export function setEditorMode(newEditorMode: boolean) {
    editorMode = newEditorMode;
}

export function setEnvironment(env: string) {
    environment = env;
}

export function swap(a, b: any) {
    a = [b, b = a][0];
}

export function arrayMove(arr, old_index, new_index) {
    let elem = arr[old_index];
    if (old_index < new_index) {
        new_index--;
    }
    arr.splice(old_index, 1);
    arr.splice(new_index, 0, elem);
};

export function mergeArray(arr1, arr2, func: (a, b) => number) {
    if (arr1.length == 0) {
        return arr2;
    }
    if (arr2.length == 0) {
        return arr1;
    }
    let arr = [];
    for (let i = 0; i < arr1.length; i++) {
        arr[arr.length] = arr1[i];
    }
    for (let i = 0; i < arr2.length; i++) {
        arr[arr.length] = arr2[i];
    }
    arr.sort(func);
    return arr;
}

export function getMilliCount() {
    return new Date().getTime();
}

export function replacer(key, value) { // функция замены классов для преобразования в JSON
    if (value instanceof Map) { // упаковка Map
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    }
    if (value instanceof HTMLImageElement) { // упаковка HTMLImageElement
        // ALARM: если в игре нет текстуры с таким же названием может возникнуть ошибка 
        let name = value.src;
        let nameSplit = name.split("/");
        let lastSplit = nameSplit[nameSplit.length - 1];
        return {
            dataType: 'HTMLImageElement',
            value: lastSplit
        };
    }
    if (value instanceof geom.Vector) { // упаковка Vector
        return {
            dataType: 'Vector',
            x: value.x,
            y: value.y
        };
    }
    return value;
}

export function reviver(key, value) { // функция обратной замены классов для преобразования из JSON
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') { // распаковка Map
            return new Map(value.value);
        }
        if (value.dataType === 'HTMLImageElement') { // распаковка HTMLImageElement
            return Draw.loadImage("./textures/tiles/" + value.value);
        }
        if (value.dataType === 'Vector') { // распаковка Vector
            return JSON.stringify(new geom.Vector(value.x, value.y));
        }
    }
    return value;
}