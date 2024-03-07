"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorRGB = exports.Color = void 0;
const number_1 = require("./number");
class Color {
    constructor(decimal, hex) {
        this.decimal = decimal;
        this.hex = hex;
    }
    static fromDecimal(value) {
        const decimal = _a.numSerializer.serialize(value);
        const hex = decimal.toString(16).padStart(2, '0');
        return new _a(decimal, hex);
    }
    static fromHex(value) {
        if (value.length !== 1 && value.length !== 2) {
            throw new Error('invalid code');
        }
        if (value.length === 1) {
            const decimal = parseInt(value, 16);
            return new _a(decimal * 16 + decimal, `${value}${value}`);
        }
        const decimal = parseInt(value, 16);
        return new _a(decimal, value);
    }
}
exports.Color = Color;
_a = Color;
Color.MIN = 0;
Color.MAX = 255;
Color.numSerializer = new number_1.NumberSerializer(_a.MIN, _a.MAX);
class ColorRGB {
    constructor(red, green, blue) {
        this.red = red.decimal;
        this.green = green.decimal;
        this.blue = blue.decimal;
        this.hex = `#${red.hex}${green.hex}${blue.hex}`;
    }
    static fromDecimal(red, green, blue) {
        const colorRed = Color.fromDecimal(red);
        const colorGreen = Color.fromDecimal(green);
        const colorBlue = Color.fromDecimal(blue);
        return new ColorRGB(colorRed, colorGreen, colorBlue);
    }
    static fromHex(code) {
        if (code[0] !== '#' && code.length !== 4 && code.length !== 7) {
            throw new Error('invalid color code');
        }
        if (code.length === 4) {
            const red = Color.fromHex(code[1]);
            const green = Color.fromHex(code[2]);
            const blue = Color.fromHex(code[3]);
            return new ColorRGB(red, green, blue);
        }
        const red = Color.fromHex(code.slice(1, 3));
        const green = Color.fromHex(code.slice(3, 5));
        const blue = Color.fromHex(code.slice(5));
        return new ColorRGB(red, green, blue);
    }
    get Ansi() {
        return String(16 +
            36 * Math.floor((6 * this.red) / 256) +
            6 * Math.floor((6 * this.green) / 256) +
            Math.floor((6 * this.blue) / 256));
    }
}
exports.ColorRGB = ColorRGB;
ColorRGB.Red = ColorRGB.fromDecimal(255, 0, 0);
ColorRGB.Green = ColorRGB.fromDecimal(0, 255, 0);
ColorRGB.Blue = ColorRGB.fromDecimal(0, 0, 255);
ColorRGB.Pink = ColorRGB.fromDecimal(255, 0, 255);
ColorRGB.Cyan = ColorRGB.fromDecimal(0, 255, 255);
ColorRGB.Yellow = ColorRGB.fromDecimal(255, 255, 0);
ColorRGB.White = ColorRGB.fromDecimal(255, 255, 255);
ColorRGB.Gray = {
    get Ansi() {
        return '246';
    },
};
