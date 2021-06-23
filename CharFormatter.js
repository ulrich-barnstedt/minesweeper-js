const chalk = require("chalk");

module.exports = class CharFormatter {
    constructor (char, color, spacing, fillChar = " ") {
        this.char = char;
        this.color = color;
        this.doubleable = spacing;
        this.fillChar = fillChar;

        this.o = undefined;
    }

    render (width) {
        this.o = this.doubleable ? this.char.repeat(width) : this.char.padEnd(width, this.fillChar);
        this.o = chalk.hex(this.color)(this.o);
    }
}