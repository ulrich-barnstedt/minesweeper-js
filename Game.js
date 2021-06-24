const Field = require("./Field");
const initStyles = require("./initStyles");
const Cursor = require("./Cursor");

module.exports = class Game {
    constructor (size = {y : 10, x : 10}, bombs = 40, width = 2) {
        this.size = size;
        this.bombs = bombs;
        this.width = width;

        initStyles(this.width);
        this.reset();
    }

    reset () {
        this.field = new Field(this.size.y, this.size.x);
        this.field.generateBombs(this.bombs);
        this.cursor = new Cursor(this.size.y, this.size.x, this.field);
    }

    flag () {

    }

    destroy () {

    }
}