const Cell = require("./Cell");
const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

module.exports = class Field {
    constructor (y, x) {
        this.y = y;
        this.x = x;

        this.renderBombsBool = false;
        this.state = new Array(this.y).fill(undefined).map(() => new Array(this.x).fill(undefined).map(() => new Cell()));
    }

    set renderBombs (value) {
        this.renderBombsBool = value;
        this.state.forEach(row => row.forEach(cell => cell.renderBomb = value));
    }

    get renderBombs () {
        return this.renderBombsBool;
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

    generateBombs (bombs) {
        for (let i = 0; i < bombs; i++) {
            let y = random(0, this.y);
            let x = random(0, this.x);

            if (this.state[y][x].bomb) {
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
}