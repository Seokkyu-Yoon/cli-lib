import { ColorRGB } from './color';
export class AnsiBuilder {
    constructor(ansiBuilder) {
        this.msgs = typeof ansiBuilder === 'undefined' ? [] : ansiBuilder.msgs;
    }
    push(...args) {
        const ansiBuilder = new AnsiBuilder(this);
        ansiBuilder.msgs.push(...args);
        return ansiBuilder;
    }
    get Bold() {
        return this.push(Ansi.Bold);
    }
    static get Bold() {
        return new AnsiBuilder().Bold;
    }
    get Italic() {
        return this.push(Ansi.Italic);
    }
    static get Italic() {
        return new AnsiBuilder().Italic;
    }
    get Underline() {
        return this.push(Ansi.Underline);
    }
    static get Underline() {
        return new AnsiBuilder().Underline;
    }
    get Fg() {
        return new FgAnsiBuilder(this);
    }
    static get Fg() {
        return new AnsiBuilder().Fg;
    }
    get Bg() {
        return new BgAnsiBuilder(this);
    }
    static get Bg() {
        return new AnsiBuilder().Bg;
    }
    message(...msgs) {
        return this.push(...msgs)
            .push(Ansi.Reset)
            .msgs.join('');
    }
    static message(...msgs) {
        const ansiBuilder = new AnsiBuilder();
        return ansiBuilder.message(...msgs);
    }
}
class FgAnsiBuilder extends AnsiBuilder {
    get Red() {
        return this.push(AnsiForeground.Red);
    }
    get Green() {
        return this.push(AnsiForeground.Green);
    }
    get Blue() {
        return this.push(AnsiForeground.Blue);
    }
    get Pink() {
        return this.push(AnsiForeground.Pink);
    }
    get Cyan() {
        return this.push(AnsiForeground.Cyan);
    }
    get Yellow() {
        return this.push(AnsiForeground.Yellow);
    }
    get White() {
        return this.push(AnsiForeground.White);
    }
    get Gray() {
        return this.push(AnsiForeground.fromAnsi('246').value);
    }
}
class BgAnsiBuilder extends AnsiBuilder {
    get Red() {
        return this.push(AnsiBackground.Red);
    }
    get Green() {
        return this.push(AnsiBackground.Green);
    }
    get Blue() {
        return this.push(AnsiBackground.Blue);
    }
    get Pink() {
        return this.push(AnsiBackground.Pink);
    }
    get Cyan() {
        return this.push(AnsiBackground.Cyan);
    }
    get Yellow() {
        return this.push(AnsiBackground.Yellow);
    }
    get White() {
        return this.push(AnsiBackground.White);
    }
    get Gray() {
        return this.push(AnsiBackground.fromAnsi('246').value);
    }
}
class Ansi {
    constructor(style) {
        this.value = `\u001B[${style}m`;
    }
}
Ansi.Reset = new Ansi('0').value;
Ansi.Bold = new Ansi('1').value;
Ansi.Italic = new Ansi('3').value;
Ansi.Underline = new Ansi('4').value;
class AnsiColor extends Ansi {
    static rgbToAnsi(colorRgb) {
        return (16 +
            36 * Math.floor((6 * colorRgb.red) / 256) +
            6 * Math.floor((6 * colorRgb.green) / 256) +
            Math.floor((6 * colorRgb.blue) / 256));
    }
}
class AnsiForeground extends AnsiColor {
    constructor(colorRgb) {
        super(`${AnsiForeground.CODE}${AnsiColor.rgbToAnsi(colorRgb)}`);
        this.colorRgb = colorRgb;
    }
    static fromRGB(colorRgb) {
        return new AnsiForeground(colorRgb);
    }
    static fromAnsi(ansi) {
        return new Ansi(`${AnsiForeground.CODE}${ansi}`);
    }
}
AnsiForeground.CODE = '38;5;';
AnsiForeground.Red = new AnsiForeground(ColorRGB.Red).value;
AnsiForeground.Green = new AnsiForeground(ColorRGB.Green).value;
AnsiForeground.Blue = new AnsiForeground(ColorRGB.Blue).value;
AnsiForeground.Pink = new AnsiForeground(ColorRGB.Pink).value;
AnsiForeground.Cyan = new AnsiForeground(ColorRGB.Cyan).value;
AnsiForeground.Yellow = new AnsiForeground(ColorRGB.Yellow).value;
AnsiForeground.White = new AnsiForeground(ColorRGB.White).value;
class AnsiBackground extends AnsiColor {
    constructor(colorRgb) {
        super(`${AnsiBackground.CODE}${AnsiColor.rgbToAnsi(colorRgb)}`);
        this.colorRgb = colorRgb;
    }
    static fromRGB(colorRgb) {
        return new AnsiBackground(colorRgb);
    }
    static fromAnsi(ansi) {
        return new Ansi(`${AnsiBackground.CODE}${ansi}`);
    }
}
AnsiBackground.CODE = '48;5;';
AnsiBackground.Red = new AnsiBackground(ColorRGB.Red).value;
AnsiBackground.Green = new AnsiBackground(ColorRGB.Green).value;
AnsiBackground.Blue = new AnsiBackground(ColorRGB.Blue).value;
AnsiBackground.Pink = new AnsiBackground(ColorRGB.Pink).value;
AnsiBackground.Cyan = new AnsiBackground(ColorRGB.Cyan).value;
AnsiBackground.Yellow = new AnsiBackground(ColorRGB.Yellow).value;
AnsiBackground.White = new AnsiBackground(ColorRGB.White).value;
