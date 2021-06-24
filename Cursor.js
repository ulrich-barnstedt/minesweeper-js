module.exports = class Cursor {
    constructor (maxY, maxX, field) {
        this.y = 0;
        this.x = 0;
        this.maxY = maxY;
        this.maxX = maxX;

        this.field = field;
    }

    down () {
        this.remove();

        if (this.y + 1 >= this.maxY) return;
        this.y++;

        this.set();
    }

    right () {
        this.remove();

        if (this.x + 1 >= this.maxX) return;
        this.x++;

        this.set();
    }

    up () {
        this.remove();

        if (this.y - 1 < 0) return;
        this.y--;

        this.set();
    }

    left () {
        this.remove();

        if (this.x - 1 < 0) return;
        this.x--;

        this.set();
    }

    remove () {
        this.field[this.y][this.x].cursor = false;
    }

    set () {
        this.field[this.y][this.x].cursor = true;
    }
}