const Cell = require("./Cell");
const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

module.exports = class Field {
    constructor (y, x) {
        this.y = y;
        this.x = x;

        this.init = false;
        this.state = new Array(this.y).fill(undefined).map(() => new Array(this.x).fill(undefined).map(() => new Cell()));
    }

    set renderBombs (value) {
        this.state.forEach(row => row.forEach(cell => cell.renderBomb = value));
    }

    set winState (value) {
        this.state.forEach(row => row.forEach(cell => cell.win = value));
    }

    render () {
        return this.state.map((row, y) => {
            let arr = [];
            row.forEach((cell, x) => {
                arr.push(...cell.render(y, x));
            });

            return arr;
        });
    }

    generateBombs (bombs, pos) {
        this.init = true;

        for (let i = 0; i < bombs; i++) {
            let y = random(0, this.y);
            let x = random(0, this.x);

            if (this.state[y][x].bomb || Math.abs(pos[0] - y) <= 1 && Math.abs(pos[1] - x) <= 1) {
                i--;
                continue;
            }

            this.state[y][x].bomb = true;
            this.state[y][x].num = 0;

            for (let yf = -1; yf < 2; yf++) {
                for (let xf = -1; xf < 2; xf++) {
                    if (this.state[yf + y] === undefined || this.state[yf + y][xf + x] === undefined) continue;
                    this.state[yf + y][xf +x].num++;
                }
            }
        }
    }

    wallCount () {
        return this.state.reduce((ac, row) => ac + row.reduce(((ac, cell) => cell.wall ? ac + 1 : ac), 0), 0);
    }
}