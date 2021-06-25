const Game = require("./Game");
const Terminal = require("buffer-render");

let t = new Terminal();
let g = new Game();

setInterval(() => {
    t.draw.d2toBuffer(0, 0, g.field.render());
    t.render();
}, 10);