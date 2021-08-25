import { setEnvironmentData } from "worker_threads";
import { Draw } from "./Draw";
import * as geom from "./Geom";

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
    // if (value instanceof Soldier) {
    //   return {
    //     dataType: 'Soldier',
    //     place: value.body.center,
    //     behaviorModel: value.behaviorModel
    //   }
    // }
    // if (value instanceof Scientist) {
    //   return {
    //     dataType: 'Scientist',
    //     place: value.body.center,
    //     behaviorModel: value.behaviorModel
    //   }
    // }
    // if (value instanceof StationaryObject) {
    //   return {
    //     dataType: 'StationaryObject',
    //     place: value.body.center,
    //   }
    // }
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
        // if (value.dataType == 'Soldier') {
        //   let soldier = game.makeSoldier(value.place) as Soldier;
        //   soldier.behaviorModel = value.behaviorModel;
        //   return soldier;
        // }
        // if (value.dataType == 'Scientist') {
        //   let scientist = game.makeScientist(value.place) as Scientist;
        //   scientist.behaviorModel = value.behaviorModel;
        //   return scientist;
        // }
        // if (value.dataType == 'StationaryObject') {
        //   let stationaryObject = new StationaryObject(game, new Body(value.place, 1), "fine");
        // }
    }
    return value;
}

export class Random {

  public static randomInt(a:number, b:number){
      if (a < b){
          let r = a;
          a = b;
          b = r;
      }
      a = Math.ceil(a);
      b = Math.floor(b);
      return Math.floor(Math.random() * (b - a +1)) + a;
  }

  public static randomFloat(a:number, b:number) {
      if (a < b){
          let r = a;
          a = b;
          b = r;
      }
      return Math.random() * (b - a+1) + a;
  }

  public static randomVector(a:geom.Vector,b:geom.Vector) {
      let x = 0;
      let y = 0;
      x = Random.randomInt(b.x, a.x);
      y = Random.randomInt(a.y, b.y);
      return new geom.Vector(x, y);
  }

  public randomSector(alpha:number, beta:number, lenMin:number, lenMax:number) {
      let x = 0;
      let y = 0;
      x = Random.randomInt(alpha, beta);
      y = Math.abs(Random.randomInt(lenMin, lenMax));
      return new geom.Vector(x, y);
  }

  
}