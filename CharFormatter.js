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
        this.o = this.doubleable ? Array(width).fill(this.char) : [this.char, ...Array(width - 1).fill(this.fillChar)];

        let colorFn = chalk.hex(this.color);
        this.o = this.o.map(c => colorFn(c));
    }
}