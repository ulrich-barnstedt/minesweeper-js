const Field = require("./Field");
const initStyles = require("../styles/initStyles");
const Cursor = require("./Cursor");
const Input = require("./Input");
const Terminal = require("buffer-render");

module.exports = class Game {
    directions = [];

    constructor (size = {y : 16, x : 16}, bombs = 40, width = 2) {
        this.size = size;
        this.bombs = bombs;
        this.width = width;
        this.input = new Input(this.flag.bind(this), this.destroy.bind(this), this.reset.bind(this));
        this.terminal = new Terminal();

        initStyles(this.width);
        this.reset();
        this.input.init();

        for (let i = 0; i < 4; i++) {
            this.directions[i]     = [ Math.floor(i / 2) % 2, i % 2 ].map(x => 2 * x - 1);
            this.directions[4 + i] = [ (i + 1) % 2, i % 2 ].map(x => x * (2 * (i >= 2) - 1));
        }
    }

    reset () {
        this.field = new Field(this.size.y, this.size.x);
        this.cursor = new Cursor(this.size.y, this.size.x, this.field, this.renderCB.bind(this));
        this.flags = this.bombs;

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

    dtcWin () {
        if (this.field.wallCount() !== this.bombs) return false;

        this.field.winState = true;
        this.input.block();
        this.renderCB();

        return true;
    }

    //--------------

    getPosition([ y, x ]) {
        return this.field.state[y][x];
    }

    addPosition(pos1) {
        return pos2 => [ pos1[0] + pos2[0], pos1[1] + pos2[1] ];
    }

    flag () {
        if (!this.field.init) return;

        let i = this.getPosition(this.cursor.pos);
        if (!i.wall) return;

        i.flag = !i.flag;
        i.flag ? this.flags-- : this.flags++;

        this.renderCB();
    }

    destroy () {
        if (!this.field.init) this.field.generateBombs(this.bombs, this.cursor.pos);

        let at = this.getPosition(this.cursor.pos);
        if (at.bomb) {
            return this.loss();
        }
        if (at.flag) return;

        this.clear(this.cursor.pos);
        if (this.dtcWin()) return;

        this.renderCB();
    }

    isValid(position) {
        return position[1] >= 0 && position[1] < this.field.state.length && position[0] >= 0 && position[0] < this.field.state[0].length;
    }

    clear(position) {
        if (!this.isValid(position)) return;
        const cell = this.getPosition(position);

        if (!cell.wall || cell.flag) return;
        cell.wall = false;

        if (cell.num) return;
        this.directions.map(this.addPosition(position)).forEach(this.clear.bind(this));
    }
}