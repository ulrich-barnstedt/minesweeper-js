const Field = require("./Field");
const initStyles = require("./initStyles");
const Cursor = require("./Cursor");
const Input = require("./Input");
const Terminal = require("buffer-render");

module.exports = class Game {
    constructor (size = {y : 10, x : 10}, bombs = 20, width = 2) {
        this.size = size;
        this.bombs = bombs;
        this.width = width;
        this.input = new Input(this.flag.bind(this), this.destroy.bind(this), this.reset.bind(this));
        this.terminal = new Terminal();
        this.flags = bombs;

        initStyles(this.width);
        this.reset();
        this.input.init();
    }

    reset () {
        this.field = new Field(this.size.y, this.size.x);
        this.field.generateBombs(this.bombs);
        this.cursor = new Cursor(this.size.y, this.size.x, this.field, this.renderCB.bind(this));

        this.renderCB();
        this.input.move = this.cursor;
        this.input.unblock();
    }

    renderCB () {
        this.terminal.draw.d2toBuffer(0, 0, this.field.render());
        this.terminal.draw.textIntoX(this.size.y + 1, 0, `Flags: ${this.flags}     `);

        this.terminal.render();
    }

    loss () {
        this.field.renderBombs = true;
        this.input.block();
        this.renderCB();
    }

    win () {

    }

    getAt () {
        return this.field.state[this.cursor.y][this.cursor.x];
    }

    setAt (v) {
        this.field.state[this.cursor.y][this.cursor.x] = v;
    }

    flag () {
        let i = this.getAt();
        if (!i.wall) return;

        i.flag = !i.flag;
        i.flag ? this.flags-- : this.flags++;

        this.renderCB();
    }

    destroy () {
        let at = this.getAt();

        if (at.bomb) {
            return this.loss();
        }
        if (at.flag) return;

        //this.field.state[y][x] - 2D field (cell reference in cell.js)
        //this.size - field size
        //this.getAt() - shorthand for field at cursor x/y
        //this.cursor.y/x - location of the cursor

        //TODO: algorithm for clearing
        //>> algorithm goes here

        //render finished state
        this.renderCB();
    }
}