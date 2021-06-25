const Fmt = require("./CharFormatter");

module.exports = {
    style : {
        chars : {
            flag : new Fmt("X", "#0000ff", true),
            cursor : new Fmt("-", "#ff00ff", true),
            bomb : new Fmt("#", "#ff0000", true),
            1 : new Fmt("1", "#ffffff", false),
            2 : new Fmt("2", "#ffffff", false),
            3 : new Fmt("3", "#ffffff", false),
            4 : new Fmt("4", "#ffffff", false),
            5 : new Fmt("5", "#ffffff", false),
            6 : new Fmt("6", "#ffffff", false),
            7 : new Fmt("7", "#ffffff", false),
            8 : new Fmt("8", "#ffffff", false),
            empty : new Fmt(" ", "#000000", true)
        },
        bg : {
            colors : {
                wall : {
                    1 : "#00ff00",
                    0 : "#00dd00"
                },
                empty : {
                    1 : "#222222",
                    0 : "#333333"
                }
            }
        }
    },
    keys : {
        move : {
            up : "up",
            down : "down",
            right : "right",
            left : "left"
        },
        place : {
            flag : "w",
            destroy : "d"
        },
        reset : "r"
    }
}