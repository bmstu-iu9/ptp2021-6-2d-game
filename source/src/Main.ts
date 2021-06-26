import * as geom from "./Geom"
import * as gameClass from "./Game"

let game = new gameClass.Game();
let autoSaveInterval: number = setInterval(() => {
    game.step();
  }, 5000);