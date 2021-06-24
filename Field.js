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
        return this.state.map((row, y) => row.map((cell, x) => {
            return cell.render(y, x);
        }))
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
        }
    }
}