const Cell = require("./Cell");

module.exports = class Field {
    constructor (y, x) {
        this.y = y;
        this.x = x;

        this.array = new Array(this.y).fill(undefined).map(() => new Array(this.x).fill(undefined).map(() => new Cell()));
    }

}