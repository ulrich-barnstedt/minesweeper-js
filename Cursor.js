module.exports = class Cursor {
    constructor (maxY, maxX, field, renderCb) {
        this.pos = [0, 0];
        this.maxPos = [maxY, maxX];

        this.field = field;
        this.renderCb = renderCb;
        this.field.state[this.pos[0]][this.pos[1]].cursor = true;
    }

    down () {
        if (this.pos[0] + 1 >= this.maxPos[0]) return;

        this.remove();
        this.pos[0]++;
        this.set();
    }

    right () {
        if (this.pos[1] + 1 >= this.maxPos[1]) return;

        this.remove();
        this.pos[1]++;
        this.set();
    }

    up () {
        if (this.pos[0] - 1 < 0) return;

        this.remove();
        this.pos[0]--;
        this.set();
    }

    left () {
        if (this.pos[1] - 1 < 0) return;

        this.remove();
        this.pos[1]--;
        this.set();
    }

    remove () {
        this.field.state[this.pos[0]][this.pos[1]].cursor = false;
    }

    set () {
        this.field.state[this.pos[0]][this.pos[1]].cursor = true;
        this.renderCb();
    }
}