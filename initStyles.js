const config = require("./config");

module.exports = (width) => {
    for (let key in config.style.chars) {
        config.style.chars[key].render(width);
    }
}