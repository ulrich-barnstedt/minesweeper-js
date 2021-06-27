const Game = require("./modules/Game");
const config = require("./config");

new Game(config.game.size, config.game.bombs);