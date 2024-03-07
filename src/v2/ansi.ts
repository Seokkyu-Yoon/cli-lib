import { ColorRGB } from './color'
import { Unicode1 } from './unicode'

export class AnsiEscape {
  readonly value
  protected constructor(style: string) {
    this.value = `${Unicode1.Escape}[${style}`
  }

  static Text = {}
}

class AnsiEscapeCursor extends AnsiEscape {
  private static moves(n: number, style: string) {
    return new AnsiEscapeCursor(`${n < 2 ? '' : n}${style}`).value
  }

  static Ups(n: number) {
    return this.moves(n, 'A')
  }

  static Downs(n: number) {
    return this.moves(n, 'B')
  }

  static Rights(n: number) {
    return this.moves(n, 'C')
  }

  static Lefts(n: number) {
    return this.moves(n, 'D')
  }

  static Up = this.Ups(1)
  static Down = this.Downs(1)
  static Right = this.Rights(1)
  static Left = this.Lefts(1)

  static FirstColumn = new AnsiEscape('G').value
  static Hide = new AnsiEscape('?25l').value
  static Show = new AnsiEscape('?25h').value
  static RemoveAfter = new AnsiEscape('J').value
}

export class AnsiEscapeText extends AnsiEscape {
  protected constructor(style: string) {
    super(`${style}m`)
  }
}

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
    return this.push(Unicode1.Reset)
  }

  static get Reset() {
    return new AnsiBuilder().Reset
  }

  get Bold() {
    return this.push(Unicode1.Bold)
  }

  static get Bold() {
    return new AnsiBuilder().Bold
  }

  get Italic() {
    return this.push(Unicode1.Italic)
  }

  static get Italic() {
    return new AnsiBuilder().Italic
  }

  get Underline() {
    return this.push(Unicode1.Underline)
  }

  static get Underline() {
    return new AnsiBuilder().Underline
  }

  get Fg() {
    return {
      Red: this.push(Unicode1.Foreground(ColorRGB.Red.Ansi).value),
      Green: this.push(Unicode1.Foreground(ColorRGB.Green.Ansi).value),
      Blue: this.push(Unicode1.Foreground(ColorRGB.Blue.Ansi).value),
      Pink: this.push(Unicode1.Foreground(ColorRGB.Pink.Ansi).value),
      Cyan: this.push(Unicode1.Foreground(ColorRGB.Cyan.Ansi).value),
      Yellow: this.push(Unicode1.Foreground(ColorRGB.Yellow.Ansi).value),
      White: this.push(Unicode1.Foreground(ColorRGB.White.Ansi).value),
      Gray: this.push(Unicode1.Foreground(ColorRGB.Gray.Ansi).value),
      rgb: (red: number, green: number, blue: number) =>
        this.push(
          Unicode1.Foreground(ColorRGB.fromDecimal(red, green, blue).Ansi)
            .value,
        ),
      hex: (hex: string) =>
        this.push(Unicode1.Foreground(ColorRGB.fromHex(hex).Ansi).value),
    }
  }

  static get Fg() {
    return new AnsiBuilder().Fg
  }

  get Bg() {
    return {
      Red: this.push(Unicode1.Background(ColorRGB.Red.Ansi).value),
      Green: this.push(Unicode1.Background(ColorRGB.Green.Ansi).value),
      Blue: this.push(Unicode1.Background(ColorRGB.Blue.Ansi).value),
      Pink: this.push(Unicode1.Background(ColorRGB.Pink.Ansi).value),
      Cyan: this.push(Unicode1.Background(ColorRGB.Cyan.Ansi).value),
      Yellow: this.push(Unicode1.Background(ColorRGB.Yellow.Ansi).value),
      White: this.push(Unicode1.Background(ColorRGB.White.Ansi).value),
      Gray: this.push(Unicode1.Background(ColorRGB.Gray.Ansi).value),
      rgb: (red: number, green: number, blue: number) =>
        this.push(
          Unicode1.Background(ColorRGB.fromDecimal(red, green, blue).Ansi)
            .value,
        ),
      hex: (hex: string) =>
        this.push(Unicode1.Background(ColorRGB.fromHex(hex).Ansi).value),
    }
  }

  static get Bg() {
    return new AnsiBuilder().Bg
  }

  message(...msgs: any[]) {
    return [...this.msgs, ...msgs, Unicode1.Reset].join('')
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
