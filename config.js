const Fmt = require("./CharFormatter");

module.exports = {
    style : {
        chars : {
            flag : new Fmt("F", "#000000", false),
            cursor : new Fmt("-", "#ffffff", true),
            bomb : new Fmt("#", "#ff0000", true),
            1 : new Fmt("1", "#0100fe", false),
            2 : new Fmt("2", "#017f01", false),
            3 : new Fmt("3", "#fe0000", false),
            4 : new Fmt("4", "#010080", false),
            5 : new Fmt("5", "#810102", false),
            6 : new Fmt("6", "#008081", false),
            7 : new Fmt("7", "#000000", false),
            8 : new Fmt("8", "#808080", false),
            empty : new Fmt(" ", "#000000", true)
        },
        bg : {
            colors : {
                wall : {
                    1 : "#00dd00",
                    0 : "#00ff00"
                },
                empty : {
                    1 : "#bbbbbb",
                    0 : "#aaaaaa"
                },
                win : {
                    0 : "#000000",
                    1 : "#000000"
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