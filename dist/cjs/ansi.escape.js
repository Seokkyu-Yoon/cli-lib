"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnsiEscape = exports.AnsiEscapeFactory = void 0;
const color_1 = require("./color");
class AnsiEscapeFactory {
    constructor() {
        this.cursor = new AnsiEscapeCursorFactory();
        this.text = new AnsiEscapeTextFactory();
    }
}
exports.AnsiEscapeFactory = AnsiEscapeFactory;
class AnsiEscapeCursorFactory {
    constructor() {
        this.UP = 'A';
        this.DOWN = 'B';
        this.RIGHT = 'C';
        this.LEFT = 'D';
        this.FIRST_COLUMN = 'G';
        this.HIDE = '?25l';
        this.SHOW = '?25h';
        this.REMOVE_AFTER = 'J';
        this.up = new AnsiEscape(this.UP);
        this.down = new AnsiEscape(this.DOWN);
        this.right = new AnsiEscape(this.RIGHT);
        this.left = new AnsiEscape(this.LEFT);
        this.firstColumn = new AnsiEscape(this.FIRST_COLUMN);
        this.hide = new AnsiEscape(this.HIDE);
        this.show = new AnsiEscape(this.SHOW);
        this.removeAfter = new AnsiEscape(this.REMOVE_AFTER);
    }
    ups(n) {
        return this.moves(n, this.UP);
    }
    downs(n) {
        return this.moves(n, this.DOWN);
    }
    rights(n) {
        return this.moves(n, this.RIGHT);
    }
    lefts(n) {
        return this.moves(n, this.LEFT);
    }
    moves(n, style) {
        return new AnsiEscape(`${n < 2 ? '' : n}${style}`);
    }
}
class AnsiEscapeTextFactory {
    constructor() {
        this.RESET = '0';
        this.BOLD = '1';
        this.ITALIC = '3';
        this.UNDERLINE = '4';
        this.reset = new AnsiEscapeText(this.RESET);
        this.bold = new AnsiEscapeText(this.BOLD);
        this.italic = new AnsiEscapeText(this.ITALIC);
        this.underline = new AnsiEscapeText(this.UNDERLINE);
        this.fg = new AnsiEscapeTextColorFactory(AnsiEscapeTextColor.FOREGROUND);
        this.bg = new AnsiEscapeTextColorFactory(AnsiEscapeTextColor.BACKGROUND);
    }
}
class AnsiEscapeTextColorFactory {
    constructor(ground) {
        this.rgbFactory = new color_1.RgbFactory();
        this.RED = this.rgbToAnsi(this.rgbFactory.red);
        this.GREEN = this.rgbToAnsi(this.rgbFactory.green);
        this.BLUE = this.rgbToAnsi(this.rgbFactory.blue);
        this.PINK = this.rgbToAnsi(this.rgbFactory.pink);
        this.CYAN = this.rgbToAnsi(this.rgbFactory.cyan);
        this.YELLOW = this.rgbToAnsi(this.rgbFactory.yellow);
        this.WHITE = this.rgbToAnsi(this.rgbFactory.white);
        this.GRAY = '246'; // specific code caused use grayscale color
        this.ground = ground;
        this.red = new AnsiEscapeTextColor(this.ground, this.RED);
        this.green = new AnsiEscapeTextColor(this.ground, this.GREEN);
        this.blue = new AnsiEscapeTextColor(this.ground, this.BLUE);
        this.pink = new AnsiEscapeTextColor(this.ground, this.PINK);
        this.cyan = new AnsiEscapeTextColor(this.ground, this.CYAN);
        this.yellow = new AnsiEscapeTextColor(this.ground, this.YELLOW);
        this.white = new AnsiEscapeTextColor(this.ground, this.WHITE);
        this.gray = new AnsiEscapeTextColor(this.ground, this.GRAY);
    }
    rgbToAnsi(rgb) {
        return String(16 +
            36 * Math.floor((6 * rgb.red) / 256) +
            6 * Math.floor((6 * rgb.green) / 256) +
            Math.floor((6 * rgb.blue) / 256));
    }
    createByRgbDecimal(red, green, blue) {
        return new AnsiEscapeTextColor(this.ground, this.rgbToAnsi(this.rgbFactory.createByDecimal(red, green, blue)));
    }
    createByRgbHex(hex) {
        return new AnsiEscapeTextColor(this.ground, this.rgbToAnsi(this.rgbFactory.createByHex(hex)));
    }
}
class AnsiEscape {
    constructor(style) {
        this.style = `[${style}`;
    }
}
exports.AnsiEscape = AnsiEscape;
class AnsiEscapeText extends AnsiEscape {
    constructor(style) {
        super(`${style}m`);
    }
}
class AnsiEscapeTextColor extends AnsiEscapeText {
    constructor(ground, style) {
        super(`${ground}${style}`);
    }
}
AnsiEscapeTextColor.FOREGROUND = '38;5;';
AnsiEscapeTextColor.BACKGROUND = '48;5;';
