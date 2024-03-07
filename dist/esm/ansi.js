var _a;
import { ColorRGB } from './color';
export class AnsiBuilder {
    constructor(ansiBuilder) {
        this.msgs = typeof ansiBuilder === 'undefined' ? [] : [...ansiBuilder.msgs];
    }
    push(...args) {
        const ansiBuilder = new AnsiBuilder(this);
        ansiBuilder.msgs.push(...args);
        return ansiBuilder;
    }
    get Clone() {
        return new AnsiBuilder(this);
    }
    static get New() {
        return new AnsiBuilder();
    }
    get Reset() {
        return this.push(Unicode.Reset);
    }
    static get Reset() {
        return new AnsiBuilder().Reset;
    }
    get Bold() {
        return this.push(Unicode.Bold);
    }
    static get Bold() {
        return new AnsiBuilder().Bold;
    }
    get Italic() {
        return this.push(Unicode.Italic);
    }
    static get Italic() {
        return new AnsiBuilder().Italic;
    }
    get Underline() {
        return this.push(Unicode.Underline);
    }
    static get Underline() {
        return new AnsiBuilder().Underline;
    }
    get Fg() {
        return {
            Red: this.push(Unicode.Foreground(ColorRGB.Red.Ansi).value),
            Green: this.push(Unicode.Foreground(ColorRGB.Green.Ansi).value),
            Blue: this.push(Unicode.Foreground(ColorRGB.Blue.Ansi).value),
            Pink: this.push(Unicode.Foreground(ColorRGB.Pink.Ansi).value),
            Cyan: this.push(Unicode.Foreground(ColorRGB.Cyan.Ansi).value),
            Yellow: this.push(Unicode.Foreground(ColorRGB.Yellow.Ansi).value),
            White: this.push(Unicode.Foreground(ColorRGB.White.Ansi).value),
            Gray: this.push(Unicode.Foreground(ColorRGB.Gray.Ansi).value),
            rgb: (red, green, blue) => this.push(Unicode.Foreground(ColorRGB.fromDecimal(red, green, blue).Ansi).value),
            hex: (hex) => this.push(Unicode.Foreground(ColorRGB.fromHex(hex).Ansi).value),
        };
    }
    static get Fg() {
        return new AnsiBuilder().Fg;
    }
    get Bg() {
        return {
            Red: this.push(Unicode.Background(ColorRGB.Red.Ansi).value),
            Green: this.push(Unicode.Background(ColorRGB.Green.Ansi).value),
            Blue: this.push(Unicode.Background(ColorRGB.Blue.Ansi).value),
            Pink: this.push(Unicode.Background(ColorRGB.Pink.Ansi).value),
            Cyan: this.push(Unicode.Background(ColorRGB.Cyan.Ansi).value),
            Yellow: this.push(Unicode.Background(ColorRGB.Yellow.Ansi).value),
            White: this.push(Unicode.Background(ColorRGB.White.Ansi).value),
            Gray: this.push(Unicode.Background(ColorRGB.Gray.Ansi).value),
            rgb: (red, green, blue) => this.push(Unicode.Background(ColorRGB.fromDecimal(red, green, blue).Ansi).value),
            hex: (hex) => this.push(Unicode.Background(ColorRGB.fromHex(hex).Ansi).value),
        };
    }
    static get Bg() {
        return new AnsiBuilder().Bg;
    }
    message(...msgs) {
        return [...this.msgs, ...msgs, Unicode.Reset].join('');
    }
    static message(...msgs) {
        return new AnsiBuilder().message(...msgs);
    }
    get Active() {
        return this.msgs.join('');
    }
    static get Active() {
        return new AnsiBuilder().Active;
    }
}
export class Unicode {
    constructor(unicode) {
        this.value = unicode;
    }
    static AnsiEscape(style) {
        return new _a(`\u001b[${style}`);
    }
    static AnsiEscapeText(style) {
        return this.AnsiEscape(`${style}m`);
    }
    static Foreground(style) {
        return this.AnsiEscapeText(`38;5;${style}`);
    }
    static Background(style) {
        return this.AnsiEscapeText(`48;5;${style}`);
    }
    static Ups(n) {
        return n < 2 ? this.Up : this.AnsiEscape(`${n}A`).value;
    }
    static Downs(n) {
        return n < 2 ? this.Down : this.AnsiEscape(`${n}B`).value;
    }
    static Rights(n) {
        return n < 2 ? this.Right : this.AnsiEscape(`${n}C`).value;
    }
    static Lefts(n) {
        return n < 2 ? this.Left : this.AnsiEscape(`${n}D`).value;
    }
}
_a = Unicode;
Unicode.Reset = _a.AnsiEscapeText('0').value;
Unicode.Bold = _a.AnsiEscapeText('1').value;
Unicode.Italic = _a.AnsiEscapeText('3').value;
Unicode.Underline = _a.AnsiEscapeText('4').value;
Unicode.Up = _a.AnsiEscape('A').value;
Unicode.Down = _a.AnsiEscape('B').value;
Unicode.Right = _a.AnsiEscape('C').value;
Unicode.Left = _a.AnsiEscape('D').value;
Unicode.Home = _a.AnsiEscape('G').value;
Unicode.Enter = new _a('\u000d').value;
Unicode.Space = new _a('\u0020').value;
Unicode.HideCursor = _a.AnsiEscape('?25l').value;
Unicode.ShowCursor = _a.AnsiEscape('?25h').value;
Unicode.SaveCursorPosition = _a.AnsiEscape('s').value;
Unicode.RestoreCursorPosition = _a.AnsiEscape('u').value;
Unicode.RemoveAfterCursor = _a.AnsiEscape('J').value;
Unicode.Exit = new _a('\u0003').value;
