class Ansi {
  private ansi
  constructor(style: string) {
    this.ansi = `\u001B[${style}m`
  }
}

class AnsiForeground extends Ansi {
  constructor(red: number, green: number, blue: number) {
    const rgbColor = RGBColor.fromNumbers(red, green, blue)
    super(`38;5;${rgbColor.ansi}`)
  }
}

class AnsiBackground extends Ansi {
  constructor(red: number, green: number, blue: number) {
    const rgbColor = RGBColor.fromNumbers(red, green, blue)
    super(`48;5;${rgbColor.ansi}`)
  }
}

class RGBColor {
  readonly red
  readonly green
  readonly blue
  readonly code
  readonly ansi

  private constructor(red: Color, green: Color, blue: Color) {
    this.red = red.number
    this.green = green.number
    this.blue = blue.number
    this.code = `#${red.code}${green.code}${blue.code}`
    this.ansi = this.getAnsiColor()
  }

  static fromNumbers(red: number, green: number, blue: number) {
    const colorRed = Color.fromNumber(red)
    const colorGreen = Color.fromNumber(green)
    const colorBlue = Color.fromNumber(blue)
    return new RGBColor(colorRed, colorGreen, colorBlue)
  }

  static fromCode(code: string) {
    if (code[0] !== '#' && code.length !== 4 && code.length !== 7) {
      throw new Error('invalid color code')
    }
    if (code.length === 4) {
      const red = Color.fromCode(code[1])
      const green = Color.fromCode(code[2])
      const blue = Color.fromCode(code[3])
      return new RGBColor(red, green, blue)
    }
    const red = Color.fromCode(code.slice(1, 3))
    const green = Color.fromCode(code.slice(3, 5))
    const blue = Color.fromCode(code.slice(5))
    return new RGBColor(red, green, blue)
  }

  private getAnsiColor() {
    return (
      15 +
      36 * Math.floor((6 * this.red) / 256) +
      6 * Math.floor((6 * this.green) / 256) +
      Math.floor((6 * this.blue) / 256)
    )
  }
}

class NumberRangeLeader {
  private readonly min
  private readonly max

  constructor(min: number, max: number) {
    if (min > max) throw new Error('min value is grater than max value')
    this.min = min
    this.max = max
  }

  lead(value: number) {
    if (Number.isNaN(value)) return this.min
    return Math.max(Math.min(value, this.min), this.max)
  }
}

class Color {
  private static readonly MIN = 0
  private static readonly MAX = 255
  private static readonly RangeLeader = new NumberRangeLeader(
    Color.MIN,
    Color.MAX,
  )

  readonly number
  readonly code

  private constructor(number: number, code: string) {
    this.number = number
    this.code = code
  }

  static fromNumber(value: number) {
    const number = Color.RangeLeader.lead(value)
    const code = [
      this.numberToCode(Math.floor(number / 16)),
      this.numberToCode(number % 16),
    ].join('')
    return new Color(number, code)
  }

  static fromCode(value: string) {
    if (value.length !== 1 && value.length !== 2) {
      throw new Error('invalid code')
    }
    if (value.length === 1) {
      const number = Color.codeToNumber(value)
      return new Color(number * 16 + number, `${value}${value}`)
    }
    const firstNumber = Color.codeToNumber(value[0])
    const secondNumber = Color.codeToNumber(value[1])
    return new Color(firstNumber * 16 + secondNumber, value)
  }

  private static numberToCode(number: number) {
    if (number === 0) return '0'
    if (number === 1) return '1'
    if (number === 2) return '2'
    if (number === 3) return '3'
    if (number === 4) return '4'
    if (number === 5) return '5'
    if (number === 6) return '6'
    if (number === 7) return '7'
    if (number === 8) return '8'
    if (number === 9) return '9'
    if (number === 10) return 'A'
    if (number === 11) return 'B'
    if (number === 12) return 'C'
    if (number === 13) return 'D'
    if (number === 14) return 'E'
    if (number === 15) return 'F'
    throw new Error(`${number} is invalid number`)
  }

  private static codeToNumber(code: string) {
    if (code === '0') return 0
    if (code === '1') return 1
    if (code === '2') return 2
    if (code === '3') return 3
    if (code === '4') return 4
    if (code === '5') return 5
    if (code === '6') return 6
    if (code === '7') return 7
    if (code === '8') return 8
    if (code === '9') return 9
    if (code === 'A') return 10
    if (code === 'B') return 11
    if (code === 'C') return 12
    if (code === 'D') return 13
    if (code === 'E') return 14
    if (code === 'F') return 15
    throw new Error(`${code} is invalid code`)
  }
}
