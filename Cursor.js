module.exports = class Cursor {
    constructor (maxY, maxX, field) {
        this.y = 0;
        this.x = 0;
        this.maxY = maxY;
        this.maxX = maxX;

        this.field = field;
    }

    down () {
        if (this.y + 1 >= this.maxY) return;

        this.remove();
        this.y++;
        this.set();
    }

    right () {
        if (this.x + 1 >= this.maxX) return;

        this.remove();
        this.x++;
        this.set();
    }

    up () {
        if (this.y - 1 < 0) return;

        this.remove();
        this.y--;
        this.set();
    }

    left () {
        if (this.x - 1 < 0) return;

        this.remove();
        this.x--;
        this.set();
    }

    remove () {
        this.field.state[this.y][this.x].cursor = false;
    }

    set () {
        this.field.state[this.y][this.x].cursor = true;
    }
}