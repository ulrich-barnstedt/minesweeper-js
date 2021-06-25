const Rlc = require("readline-char");
const config = require("./config");

module.exports = class Input {
    constructor (flag, destroy, reset) {
        this.input = new Rlc();

        this.destroy = destroy;
        this.flag = flag;
        this.reset = reset;

        this.move = undefined;
        this.block = this.input.block.bind(this.input);
        this.unblock = this.input.unblock.bind(this.input);

        this.input.bind(this.handler.bind(this));
        this.input.bindUnblocked(this.unblockedHandler.bind(this));
    }

    handler (key) {
        switch (key.name) {
            case config.keys.place.flag:
                this.flag();
                break;
            case config.keys.place.destroy:
                this.destroy();
                break;
            case config.keys.move.up:
                this.move.up();
                break;
            case config.keys.move.down:
                this.move.down();
                break;
            case config.keys.move.right:
                this.move.right();
                break;
            case config.keys.move.left:
                this.move.left();
                break;
        }
    }

    unblockedHandler (key) {
        switch (key.name) {
            case config.keys.reset:
                this.reset();
                break;
        }
    }

    init () {
        this.input.init();
    }
}