import { UNICODE_ESC } from './unicode'

function AnsiEscape(style: string) {
  return `${UNICODE_ESC}[${style}`
}

class CursorFactory {
  private static readonly UP = 'A'
  private static readonly DOWN = 'B'
  private static readonly RIGHT = 'C'
  private static readonly LEFT = 'D'
  private static instance?: CursorFactory

  private constructor() {}

  static get Instance() {
    if (typeof CursorFactory.instance === 'undefined') {
      CursorFactory.instance = new CursorFactory()
    }
    return CursorFactory.instance
  }

  private moves(n: number, style: string) {
    return AnsiEscape(`${n < 2 ? '' : n}${style}`)
  }

  ups(n: number) {
    return this.moves(n, CursorFactory.UP)
  }

  get up() {
    return this.ups(1)
  }

  downs(n: number) {
    return this.moves(n, CursorFactory.DOWN)
  }

  get down() {
    return this.downs(1)
  }

  rights(n: number) {
    return this.moves(n, CursorFactory.RIGHT)
  }

  get right() {
    return this.rights(1)
  }

  lefts(n: number) {
    return this.moves(n, CursorFactory.LEFT)
  }

  get left() {
    return this.lefts(1)
  }

  get firstColumn() {
    return new CursorFactory('G').unicode
  }

  get hide() {
    return new CursorFactory('?25l').unicode
  }

  get show() {
    return new CursorFactory('?25h').unicode
  }

  get removeAfter() {
    return new CursorFactory('J').unicode
  }
}

class Text {
  private readonly unicode
  constructor(style: string) {
    this.unicode = `${UNICODE_ESC}[${style}m`
  }

  get reset() {}
}

const AnsiEscape = {
  Cursor: new CursorFactory(),
} as const
export default AnsiEscape
