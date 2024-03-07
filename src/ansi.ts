import { ColorRGB } from './color'

export class AnsiBuilder {
  private readonly msgs: any[]

  protected constructor(ansiBuilder?: AnsiBuilder) {
    this.msgs = typeof ansiBuilder === 'undefined' ? [] : [...ansiBuilder.msgs]
  }

  protected push(...args: any[]) {
    const ansiBuilder = new AnsiBuilder(this)
    ansiBuilder.msgs.push(...args)
    return ansiBuilder
  }

  get Clone() {
    return new AnsiBuilder(this)
  }

  static get New() {
    return new AnsiBuilder()
  }

  get Reset() {
    return this.push(Unicode.Reset)
  }

  static get Reset() {
    return new AnsiBuilder().Reset
  }

  get Bold() {
    return this.push(Unicode.Bold)
  }

  static get Bold() {
    return new AnsiBuilder().Bold
  }

  get Italic() {
    return this.push(Unicode.Italic)
  }

  static get Italic() {
    return new AnsiBuilder().Italic
  }

  get Underline() {
    return this.push(Unicode.Underline)
  }

  static get Underline() {
    return new AnsiBuilder().Underline
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
      rgb: (red: number, green: number, blue: number) =>
        this.push(
          Unicode.Foreground(ColorRGB.fromDecimal(red, green, blue).Ansi).value,
        ),
      hex: (hex: string) =>
        this.push(Unicode.Foreground(ColorRGB.fromHex(hex).Ansi).value),
    }
  }

  static get Fg() {
    return new AnsiBuilder().Fg
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
      rgb: (red: number, green: number, blue: number) =>
        this.push(
          Unicode.Background(ColorRGB.fromDecimal(red, green, blue).Ansi).value,
        ),
      hex: (hex: string) =>
        this.push(Unicode.Background(ColorRGB.fromHex(hex).Ansi).value),
    }
  }

  static get Bg() {
    return new AnsiBuilder().Bg
  }

  message(...msgs: any[]) {
    return [...this.msgs, ...msgs, Unicode.Reset].join('')
  }

  static message(...msgs: any[]) {
    return new AnsiBuilder().message(...msgs)
  }

  get Active() {
    return this.msgs.join('')
  }

  static get Active() {
    return new AnsiBuilder().Active
  }
}

export class Unicode {
  readonly value
  protected constructor(unicode: string) {
    this.value = unicode
  }

  static AnsiEscape(style: string) {
    return new Unicode(`\u001b[${style}`)
  }

  static AnsiEscapeText(style: string) {
    return this.AnsiEscape(`${style}m`)
  }

  static Foreground(style: string) {
    return this.AnsiEscapeText(`38;5;${style}`)
  }

  static Background(style: string) {
    return this.AnsiEscapeText(`48;5;${style}`)
  }

  static Reset = this.AnsiEscapeText('0').value
  static Bold = this.AnsiEscapeText('1').value
  static Italic = this.AnsiEscapeText('3').value
  static Underline = this.AnsiEscapeText('4').value

  static Up = this.AnsiEscape('A').value
  static Down = this.AnsiEscape('B').value
  static Right = this.AnsiEscape('C').value
  static Left = this.AnsiEscape('D').value
  static Home = this.AnsiEscape('G').value
  static Ups(n: number) {
    return n < 2 ? this.Up : this.AnsiEscape(`${n}A`).value
  }

  static Downs(n: number) {
    return n < 2 ? this.Down : this.AnsiEscape(`${n}B`).value
  }

  static Rights(n: number) {
    return n < 2 ? this.Right : this.AnsiEscape(`${n}C`).value
  }

  static Lefts(n: number) {
    return n < 2 ? this.Left : this.AnsiEscape(`${n}D`).value
  }

  static Enter = new Unicode('\u000d').value
  static Space = new Unicode('\u0020').value
  static HideCursor = this.AnsiEscape('?25l').value
  static ShowCursor = this.AnsiEscape('?25h').value
  static SaveCursorPosition = this.AnsiEscape('s').value
  static RestoreCursorPosition = this.AnsiEscape('u').value
  static RemoveAfterCursor = this.AnsiEscape('J').value
  static Exit = new Unicode('\u0003').value
}
