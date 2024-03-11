import { type Rgb, RgbFactory } from './color'

export class AnsiEscapeFactory {
  readonly cursor = new AnsiEscapeCursorFactory()
  readonly text = new AnsiEscapeTextFactory()
}
class AnsiEscapeCursorFactory {
  private readonly UP = 'A'
  private readonly DOWN = 'B'
  private readonly RIGHT = 'C'
  private readonly LEFT = 'D'
  private readonly FIRST_COLUMN = 'G'
  private readonly HIDE = '?25l'
  private readonly SHOW = '?25h'
  private readonly REMOVE_AFTER = 'J'

  readonly up = new AnsiEscape(this.UP)
  readonly down = new AnsiEscape(this.DOWN)
  readonly right = new AnsiEscape(this.RIGHT)
  readonly left = new AnsiEscape(this.LEFT)
  readonly firstColumn = new AnsiEscape(this.FIRST_COLUMN)
  readonly hide = new AnsiEscape(this.HIDE)
  readonly show = new AnsiEscape(this.SHOW)
  readonly removeAfter = new AnsiEscape(this.REMOVE_AFTER)

  ups(n: number) {
    return this.moves(n, this.UP)
  }

  downs(n: number) {
    return this.moves(n, this.DOWN)
  }

  rights(n: number) {
    return this.moves(n, this.RIGHT)
  }

  lefts(n: number) {
    return this.moves(n, this.LEFT)
  }

  private moves(
    n: number,
    style:
      | typeof this.UP
      | typeof this.DOWN
      | typeof this.RIGHT
      | typeof this.LEFT,
  ) {
    return new AnsiEscape(`${n < 2 ? '' : n}${style}`)
  }
}

class AnsiEscapeTextFactory {
  private readonly RESET = '0'
  private readonly BOLD = '1'
  private readonly ITALIC = '3'
  private readonly UNDERLINE = '4'

  readonly reset = new AnsiEscapeText(this.RESET)
  readonly bold = new AnsiEscapeText(this.BOLD)
  readonly italic = new AnsiEscapeText(this.ITALIC)
  readonly underline = new AnsiEscapeText(this.UNDERLINE)
  readonly fg = new AnsiEscapeTextColorFactory(AnsiEscapeTextColor.FOREGROUND)
  readonly bg = new AnsiEscapeTextColorFactory(AnsiEscapeTextColor.BACKGROUND)
}

class AnsiEscapeTextColorFactory {
  private readonly rgbFactory = new RgbFactory()
  private readonly RED = this.rgbToAnsi(this.rgbFactory.red)
  private readonly GREEN = this.rgbToAnsi(this.rgbFactory.green)
  private readonly BLUE = this.rgbToAnsi(this.rgbFactory.blue)
  private readonly PINK = this.rgbToAnsi(this.rgbFactory.pink)
  private readonly CYAN = this.rgbToAnsi(this.rgbFactory.cyan)
  private readonly YELLOW = this.rgbToAnsi(this.rgbFactory.yellow)
  private readonly WHITE = this.rgbToAnsi(this.rgbFactory.white)
  private readonly GRAY = '246' // specific code caused use grayscale color

  private readonly ground

  readonly red
  readonly green
  readonly blue
  readonly pink
  readonly cyan
  readonly yellow
  readonly white
  readonly gray

  constructor(
    ground:
      | typeof AnsiEscapeTextColor.FOREGROUND
      | typeof AnsiEscapeTextColor.BACKGROUND,
  ) {
    this.ground = ground
    this.red = new AnsiEscapeTextColor(this.ground, this.RED)
    this.green = new AnsiEscapeTextColor(this.ground, this.GREEN)
    this.blue = new AnsiEscapeTextColor(this.ground, this.BLUE)
    this.pink = new AnsiEscapeTextColor(this.ground, this.PINK)
    this.cyan = new AnsiEscapeTextColor(this.ground, this.CYAN)
    this.yellow = new AnsiEscapeTextColor(this.ground, this.YELLOW)
    this.white = new AnsiEscapeTextColor(this.ground, this.WHITE)
    this.gray = new AnsiEscapeTextColor(this.ground, this.GRAY)
  }

  private rgbToAnsi(rgb: Rgb) {
    return String(
      16 +
        36 * Math.floor((6 * rgb.red) / 256) +
        6 * Math.floor((6 * rgb.green) / 256) +
        Math.floor((6 * rgb.blue) / 256),
    )
  }

  createByRgbDecimal(red: number, green: number, blue: number) {
    return new AnsiEscapeTextColor(
      this.ground,
      this.rgbToAnsi(this.rgbFactory.createByDecimal(red, green, blue)),
    )
  }

  createByRgbHex(hex: string) {
    return new AnsiEscapeTextColor(
      this.ground,
      this.rgbToAnsi(this.rgbFactory.createByHex(hex)),
    )
  }
}

export class AnsiEscape {
  readonly style

  constructor(style: string) {
    this.style = `[${style}`
  }
}
class AnsiEscapeText extends AnsiEscape {
  constructor(style: string) {
    super(`${style}m`)
  }
}
class AnsiEscapeTextColor extends AnsiEscapeText {
  static readonly FOREGROUND = '38;5;'
  static readonly BACKGROUND = '48;5;'

  constructor(
    ground:
      | typeof AnsiEscapeTextColor.FOREGROUND
      | typeof AnsiEscapeTextColor.BACKGROUND,
    style: string,
  ) {
    super(`${ground}${style}`)
  }
}
