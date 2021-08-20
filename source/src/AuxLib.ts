import { setEnvironmentData } from "worker_threads";
import { Draw } from "./Draw";
import * as geom from "./Geom";
import { Commands } from "./Entities/EntityAttributes/Commands";

export let environment : string;

export function setEnvironment(env : string) {
  environment = env;
}

export function getMilliCount() {
    return new Date().getTime();
}

export function replacer(key, value) { // функция замены классов для преобразования в JSON
    if(value instanceof Map) { // упаковка Map
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
    if(typeof value === 'object' && value !== null) {
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