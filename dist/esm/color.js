import { NumberSerializer } from './number.serializer';
class Color {
    constructor(decimal, hex) {
        this.decimal = decimal;
        this.hex = hex;
    }
}
class ColorFactory {
    constructor(options = {}) {
        this.min = typeof options.min === 'undefined' ? 0 : options.min;
        this.max = typeof options.max === 'undefined' ? 255 : options.max;
        this.numberSerializer = new NumberSerializer(this.min, this.max);
    }
    createByDecimal(value) {
        const decimal = this.numberSerializer.serialize(value);
        const hex = decimal.toString(16).padStart(2, '0');
        return new Color(decimal, hex);
    }
    createByHex(value) {
        if (!/^[0-9|a-f|A-F]{1,2}$/.test(value)) {
            throw new Error('invalid hex');
        }
        const hex = value.repeat(3 - value.length);
        return this.createByDecimal(parseInt(hex, 16));
    }
}
export class Rgb {
    constructor(red, green, blue) {
        this.red = red.decimal;
        this.green = green.decimal;
        this.blue = blue.decimal;
        this.hex = `#${red.hex}${green.hex}${blue.hex}`;
    }
}
export class RgbFactory {
    constructor() {
        this.colorFactory = new ColorFactory();
        this.red = this.createByDecimal(255, 0, 0);
        this.green = this.createByDecimal(0, 255, 0);
        this.blue = this.createByDecimal(0, 0, 255);
        this.pink = this.createByDecimal(255, 0, 255);
        this.cyan = this.createByDecimal(0, 255, 255);
        this.yellow = this.createByDecimal(255, 255, 0);
        this.white = this.createByDecimal(255, 255, 255);
    }
    createByDecimal(red, green, blue) {
        const colorRed = this.colorFactory.createByDecimal(red);
        const colorGreen = this.colorFactory.createByDecimal(green);
        const colorBlue = this.colorFactory.createByDecimal(blue);
        return new Rgb(colorRed, colorGreen, colorBlue);
    }
    createByHex(hex) {
        if (!/^#[0-9|a-f|A-F]{3,6}$/.test(hex)) {
            throw new Error('invalid color hex');
        }
        const [colorRed, colorGreen, colorBlue] = (hex.length === 4
            ? [hex[1], hex[2], hex[3]]
            : [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5)]).map((h) => this.colorFactory.createByHex(h));
        return new Rgb(colorRed, colorGreen, colorBlue);
    }
}
