const Field = require("./Field");
const initStyles = require("./initStyles");
const Cursor = require("./Cursor");
const Input = require("./Input");

module.exports = class Game {
    constructor (size = {y : 10, x : 10}, bombs = 40, width = 2) {
        this.size = size;
        this.bombs = bombs;
        this.width = width;
        this.input = new Input();
        this.input.flag = this.flag;
        this.input.destroy = this.destroy();

        initStyles(this.width);
        this.reset();
        this.input.init();
    }

    reset () {
        this.field = new Field(this.size.y, this.size.x);
        this.field.generateBombs(this.bombs);
        this.cursor = new Cursor(this.size.y, this.size.x, this.field);

        this.input.move = this.cursor;
        this.input.unblock();
    }

    loss () {
        // map field to display all bombs
        // lock io
    }

    flag () {

    }

    destroy () {

    }
}