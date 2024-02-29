import { NumberSerializer } from './number'

export class Color {
  private static readonly MIN = 0
  private static readonly MAX = 255
  private static readonly numSerializer = new NumberSerializer(
    this.MIN,
    this.MAX,
  )

  readonly decimal
  readonly hex

  private constructor(decimal: number, hex: string) {
    this.decimal = decimal
    this.hex = hex
  }

  static fromDecimal(value: number) {
    const decimal = Color.numSerializer.serialize(value)
    const hex = decimal.toString(16).padStart(2, '0')
    return new Color(decimal, hex)
  }

  static fromHex(value: string) {
    if (value.length !== 1 && value.length !== 2) {
      throw new Error('invalid code')
    }
    if (value.length === 1) {
      const decimal = parseInt(value, 16)
      return new Color(decimal * 16 + decimal, `${value}${value}`)
    }
    const decimal = parseInt(value, 16)
    return new Color(decimal, value)
  }
}

export class ColorRGB {
  static Red = ColorRGB.fromDecimal(255, 0, 0)
  static Green = ColorRGB.fromDecimal(0, 255, 0)
  static Blue = ColorRGB.fromDecimal(0, 0, 255)
  static Pink = ColorRGB.fromDecimal(255, 0, 255)
  static Cyan = ColorRGB.fromDecimal(0, 255, 255)
  static Yellow = ColorRGB.fromDecimal(255, 255, 0)
  static White = ColorRGB.fromDecimal(255, 255, 255)

  readonly red
  readonly green
  readonly blue
  readonly hex

  private constructor(red: Color, green: Color, blue: Color) {
    this.red = red.decimal
    this.green = green.decimal
    this.blue = blue.decimal
    this.hex = `#${red.hex}${green.hex}${blue.hex}`
  }

  static fromDecimal(red: number, green: number, blue: number) {
    const colorRed = Color.fromDecimal(red)
    const colorGreen = Color.fromDecimal(green)
    const colorBlue = Color.fromDecimal(blue)
    return new ColorRGB(colorRed, colorGreen, colorBlue)
  }

  static fromHex(code: string) {
    if (code[0] !== '#' && code.length !== 4 && code.length !== 7) {
      throw new Error('invalid color code')
    }
    if (code.length === 4) {
      const red = Color.fromHex(code[1])
      const green = Color.fromHex(code[2])
      const blue = Color.fromHex(code[3])
      return new ColorRGB(red, green, blue)
    }
    const red = Color.fromHex(code.slice(1, 3))
    const green = Color.fromHex(code.slice(3, 5))
    const blue = Color.fromHex(code.slice(5))
    return new ColorRGB(red, green, blue)
  }
}
