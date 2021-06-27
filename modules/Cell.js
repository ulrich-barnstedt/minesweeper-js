const config = require("../config");
const chalk = require("chalk");

module.exports = class Cell {
    constructor () {
        this.bomb = false;
        this.cursor = false;
        this.flag = false;
        this.wall = true;
        this.win = false;
        this.renderBomb = false;
        this.num = 0;
    }

    bgCalculate (y, x) {
        let i = (y % 2 + x) % 2;

        let colorFn;
        if (this.win) colorFn = chalk.bgHex(config.style.bg.colors.win[i]);
        if (this.wall) colorFn = chalk.bgHex(config.style.bg.colors.wall[i]);
        if (!colorFn) colorFn = chalk.bgHex(config.style.bg.colors.empty[i]);

        return (a) => a.map(c => colorFn(c));
    }

    render (y, x) {
        let fgt = config.style.chars.empty.o;

        if (this.cursor) fgt = config.style.chars.cursor.o; else
        if (this.renderBomb && this.bomb) fgt = config.style.chars.bomb.o; else
        if (this.flag) fgt = config.style.chars.flag.o; else
        if (this.num !== 0 && !this.wall) fgt = config.style.chars[this.num].o;

        return this.bgCalculate(y, x)(fgt);
    }
}