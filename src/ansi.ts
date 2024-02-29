import { ColorRGB } from './color'

export class AnsiBuilder {
  private readonly msgs: any[]

  protected constructor(ansiBuilder?: AnsiBuilder) {
    this.msgs = typeof ansiBuilder === 'undefined' ? [] : ansiBuilder.msgs
  }

  protected push(...args: any[]) {
    const ansiBuilder = new AnsiBuilder(this)
    ansiBuilder.msgs.push(...args)
    return ansiBuilder
  }

  get Bold() {
    return this.push(Ansi.Bold)
  }

  static get Bold() {
    return new AnsiBuilder().Bold
  }

  get Italic() {
    return this.push(Ansi.Italic)
  }

  static get Italic() {
    return new AnsiBuilder().Italic
  }

  get Underline() {
    return this.push(Ansi.Underline)
  }

  static get Underline() {
    return new AnsiBuilder().Underline
  }

  get Fg() {
    return new FgAnsiBuilder(this)
  }

  static get Fg() {
    return new AnsiBuilder().Fg
  }

  get Bg() {
    return new BgAnsiBuilder(this)
  }

  static get Bg() {
    return new AnsiBuilder().Bg
  }

  message(...msgs: any[]) {
    return this.push(...msgs)
      .push(Ansi.Reset)
      .msgs.join('')
  }

  static message(...msgs: any[]) {
    const ansiBuilder = new AnsiBuilder()
    return ansiBuilder.message(...msgs)
  }
}

class FgAnsiBuilder extends AnsiBuilder {
  get Red() {
    return this.push(AnsiForeground.Red)
  }

  get Green() {
    return this.push(AnsiForeground.Green)
  }

  get Blue() {
    return this.push(AnsiForeground.Blue)
  }

  get Pink() {
    return this.push(AnsiForeground.Pink)
  }

  get Cyan() {
    return this.push(AnsiForeground.Cyan)
  }

  get Yellow() {
    return this.push(AnsiForeground.Yellow)
  }

  get White() {
    return this.push(AnsiForeground.White)
  }

  get Gray() {
    return this.push(AnsiForeground.fromAnsi('246').value)
  }
}

class BgAnsiBuilder extends AnsiBuilder {
  get Red() {
    return this.push(AnsiBackground.Red)
  }

  get Green() {
    return this.push(AnsiBackground.Green)
  }

  get Blue() {
    return this.push(AnsiBackground.Blue)
  }

  get Pink() {
    return this.push(AnsiBackground.Pink)
  }

  get Cyan() {
    return this.push(AnsiBackground.Cyan)
  }

  get Yellow() {
    return this.push(AnsiBackground.Yellow)
  }

  get White() {
    return this.push(AnsiBackground.White)
  }

  get Gray() {
    return this.push(AnsiBackground.fromAnsi('246').value)
  }
}

class Ansi {
  readonly value
  protected constructor(style: string) {
    this.value = `\u001B[${style}m`
  }

  static Reset = new Ansi('0').value
  static Bold = new Ansi('1').value
  static Italic = new Ansi('3').value
  static Underline = new Ansi('4').value
}

abstract class AnsiColor extends Ansi {
  protected abstract colorRgb: ColorRGB

  protected static rgbToAnsi(colorRgb: ColorRGB) {
    return (
      16 +
      36 * Math.floor((6 * colorRgb.red) / 256) +
      6 * Math.floor((6 * colorRgb.green) / 256) +
      Math.floor((6 * colorRgb.blue) / 256)
    )
  }
}

class AnsiForeground extends AnsiColor {
  private static readonly CODE = '38;5;'
  protected colorRgb: ColorRGB

  private constructor(colorRgb: ColorRGB) {
    super(`${AnsiForeground.CODE}${AnsiColor.rgbToAnsi(colorRgb)}`)
    this.colorRgb = colorRgb
  }

  static fromRGB(colorRgb: ColorRGB) {
    return new AnsiForeground(colorRgb)
  }

  static fromAnsi(ansi: string) {
    return new Ansi(`${AnsiForeground.CODE}${ansi}`)
  }

  static Red = new AnsiForeground(ColorRGB.Red).value
  static Green = new AnsiForeground(ColorRGB.Green).value
  static Blue = new AnsiForeground(ColorRGB.Blue).value
  static Pink = new AnsiForeground(ColorRGB.Pink).value
  static Cyan = new AnsiForeground(ColorRGB.Cyan).value
  static Yellow = new AnsiForeground(ColorRGB.Yellow).value
  static White = new AnsiForeground(ColorRGB.White).value
}

class AnsiBackground extends AnsiColor {
  private static readonly CODE = '48;5;'
  protected colorRgb: ColorRGB

  private constructor(colorRgb: ColorRGB) {
    super(`${AnsiBackground.CODE}${AnsiColor.rgbToAnsi(colorRgb)}`)
    this.colorRgb = colorRgb
  }

  static fromRGB(colorRgb: ColorRGB): AnsiColor {
    return new AnsiBackground(colorRgb)
  }

  static fromAnsi(ansi: string) {
    return new Ansi(`${AnsiBackground.CODE}${ansi}`)
  }

  static Red = new AnsiBackground(ColorRGB.Red).value
  static Green = new AnsiBackground(ColorRGB.Green).value
  static Blue = new AnsiBackground(ColorRGB.Blue).value
  static Pink = new AnsiBackground(ColorRGB.Pink).value
  static Cyan = new AnsiBackground(ColorRGB.Cyan).value
  static Yellow = new AnsiBackground(ColorRGB.Yellow).value
  static White = new AnsiBackground(ColorRGB.White).value
}
