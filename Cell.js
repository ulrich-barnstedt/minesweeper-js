module.exports = class Cell {
    constructor () {
        this.bomb = false;
        this.wall = false;
        this.cursor = false;
        this.flag = false;
    }
}