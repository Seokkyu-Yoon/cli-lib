import { Stdio } from './stdio'
import { UNICODES } from './unicode'

export default class SkyCliHelper {
  private readonly stdio = Stdio.instance
  private memo: string[] = []

  private push(...args: string[]) {
    this.memo.push(...args)
    return this
  }

  get Clone() {
    return new SkyCliHelper().push(...this.memo)
  }

  Text = ((ctx: SkyCliHelper) => {
    const textUnicodes = UNICODES.ANSI_ESCAPE.TEXT
    return new (class {
      get Reset() {
        return ctx.push(textUnicodes.RESET)
      }

      get Bold() {
        return ctx.push(textUnicodes.BOLD)
      }

      get Italic() {
        return ctx.push(textUnicodes.ITALIC)
      }

      get Underline() {
        return ctx.push(textUnicodes.UNDERLINE)
      }

      get Foreground() {
        const foregroundUnicodes = textUnicodes.FOREGROUND
        return new (class {
          get Red() {
            return ctx.push(foregroundUnicodes.RED)
          }

          get Green() {
            return ctx.push(foregroundUnicodes.GREEN)
          }

          get Blue() {
            return ctx.push(foregroundUnicodes.BLUE)
          }

          get Pink() {
            return ctx.push(foregroundUnicodes.PINK)
          }

          get Cyan() {
            return ctx.push(foregroundUnicodes.CYAN)
          }

          get Yellow() {
            return ctx.push(foregroundUnicodes.YELLOW)
          }

          get White() {
            return ctx.push(foregroundUnicodes.WHITE)
          }

          get Gray() {
            return ctx.push(foregroundUnicodes.GRAY)
          }

          get Rgb() {
            return new (class {
              decimal(red: number, green: number, blue: number) {
                return ctx.push(
                  foregroundUnicodes.RGB.decimal(red, green, blue),
                )
              }

              hex(hex: string) {
                return ctx.push(foregroundUnicodes.RGB.hex(hex))
              }
            })()
          }
        })()
      }

      get Background() {
        const backgroundUnicodes = textUnicodes.BACKGROUND
        return new (class {
          get Red() {
            return ctx.push(backgroundUnicodes.RED)
          }

          get Green() {
            return ctx.push(backgroundUnicodes.GREEN)
          }

          get Blue() {
            return ctx.push(backgroundUnicodes.BLUE)
          }

          get Pink() {
            return ctx.push(backgroundUnicodes.PINK)
          }

          get Cyan() {
            return ctx.push(backgroundUnicodes.CYAN)
          }

          get Yellow() {
            return ctx.push(backgroundUnicodes.YELLOW)
          }

          get White() {
            return ctx.push(backgroundUnicodes.WHITE)
          }

          get Gray() {
            return ctx.push(backgroundUnicodes.GRAY)
          }

          get Rgb() {
            return new (class {
              decimal(red: number, green: number, blue: number) {
                return ctx.push(
                  backgroundUnicodes.RGB.decimal(red, green, blue),
                )
              }

              hex(hex: string) {
                return ctx.push(backgroundUnicodes.RGB.hex(hex))
              }
            })()
          }
        })()
      }
    })()
  })(this)

  static get Text() {
    return new SkyCliHelper().Text
  }

  Cursor = ((ctx: SkyCliHelper) => {
    const cursorUnicodes = UNICODES.ANSI_ESCAPE.CURSOR
    return new (class {
      get Up() {
        return ctx.push(cursorUnicodes.UP)
      }

      get Down() {
        return ctx.push(cursorUnicodes.DOWN)
      }

      get Right() {
        return ctx.push(cursorUnicodes.RIGHT)
      }

      get Left() {
        return ctx.push(cursorUnicodes.LEFT)
      }

      get FirstColumn() {
        return ctx.push(cursorUnicodes.FIRST_COLUMN)
      }

      get Hide() {
        return ctx.push(cursorUnicodes.HIDE)
      }

      get Show() {
        return ctx.push(cursorUnicodes.SHOW)
      }

      get RemoveAfter() {
        return ctx.push(cursorUnicodes.REMOVE_AFTER)
      }

      ups(n: number) {
        return ctx.push(cursorUnicodes.ups(n))
      }

      downs(n: number) {
        return ctx.push(cursorUnicodes.downs(n))
      }

      rights(n: number) {
        return ctx.push(cursorUnicodes.rights(n))
      }

      lefts(n: number) {
        return ctx.push(cursorUnicodes.lefts(n))
      }
    })()
  })(this)

  static get Cursor() {
    return new SkyCliHelper().Cursor
  }

  flush() {
    this.memo = []
    return this
  }

  print(...text: string[]) {
    this.stdio.print(...this.memo, ...text, UNICODES.ANSI_ESCAPE.TEXT.RESET)
    this.flush()
  }

  static print(...text: string[]) {
    new SkyCliHelper().print(...text)
  }

  println(...text: string[]) {
    this.stdio.println(...this.memo, ...text, UNICODES.ANSI_ESCAPE.TEXT.RESET)
    this.flush()
  }

  static println(...text: string[]) {
    new SkyCliHelper().println(...text)
  }

  async input(inputPrinter?: SkyCliHelper) {
    if (typeof inputPrinter !== 'undefined') {
      this.stdio.print(inputPrinter.memo.join(''))
    }
    const result = await this.stdio.input()
    this.Text.Reset.print()
    return result
  }

  static async input(inputPrinter?: SkyCliHelper) {
    return await new SkyCliHelper().input(inputPrinter)
  }

  private async _select(
    items: string[],
    options: {
      idx?: number
      vertical?: boolean
      selectPrinter?: SkyCliHelper
      unselectPrinter?: SkyCliHelper
    } = {},
  ): Promise<string> {
    const idxOld = typeof options.idx === 'undefined' ? 0 : options.idx
    const vertical =
      typeof options.vertical === 'undefined' ? false : options.vertical
    const selectPrinter =
      typeof options.selectPrinter === 'undefined'
        ? new SkyCliHelper()
        : options.selectPrinter
    const unselectPrinter =
      typeof options.unselectPrinter === 'undefined'
        ? new SkyCliHelper()
        : options.unselectPrinter

    const outputs = []
    for (let i = 0; i < items.length; i += 1) {
      const item = vertical ? `${i + 1}. ${items[i]}` : items[i]
      outputs.push(
        idxOld === i
          ? `${selectPrinter.memo.join('')}${item}${UNICODES.ANSI_ESCAPE.TEXT.RESET}`
          : `${unselectPrinter.memo.join('')}${item}${UNICODES.ANSI_ESCAPE.TEXT.RESET}`,
      )
    }
    this.stdio.print(outputs.join(vertical ? '\n' : ' / '))

    const { finish, idx: idxNew } = await this.stdio.select(vertical, idxOld)
    const idx = (items.length + idxNew) % items.length

    if (!finish) {
      if (vertical) {
        this.Cursor.ups(
          items.length - 1,
        ).Cursor.FirstColumn.Cursor.RemoveAfter.print()
      } else {
        this.Cursor.lefts(items.join(' / ').length).Cursor.RemoveAfter.print()
      }
      return await this._select(items, {
        idx,
        vertical,
        selectPrinter,
        unselectPrinter,
      })
    }
    this.flush()
    return items[idx]
  }

  async select(
    items: string[],
    options: {
      idx?: number
      vertical?: boolean
      selectPrinter?: SkyCliHelper
      unselectPrinter?: SkyCliHelper
    } = {},
  ): Promise<string> {
    const skyCliHelper = new SkyCliHelper()
    skyCliHelper.Cursor.Hide.print()
    try {
      const result = await this._select(items, options)
      return result
    } catch (err) {
      skyCliHelper.Text.Foreground.Red.println(
        err instanceof Error ? err.message : String(err),
      )
      process.exit(1)
    } finally {
      skyCliHelper.Cursor.Show.print()
    }
  }

  static async select(
    items: string[],
    options: {
      idx?: number
      vertical?: boolean
      selectPrinter?: SkyCliHelper
      unselectPrinter?: SkyCliHelper
    } = {},
  ) {
    return await new SkyCliHelper().select(items, options)
  }

  async _multipleSelect(
    items: string[],
    multipleSelectOption: {
      idx?: number
      cursorPrinter?: SkyCliHelper
      selectPrinter?: SkyCliHelper
      unselectPrinter?: SkyCliHelper
    } = {},
    idxSet = new Set<number>(),
  ): Promise<string[]> {
    const idxOld =
      typeof multipleSelectOption.idx === 'undefined'
        ? 0
        : multipleSelectOption.idx
    const cursorPrinter =
      typeof multipleSelectOption.cursorPrinter === 'undefined'
        ? new SkyCliHelper()
        : multipleSelectOption.cursorPrinter
    const selectPrinter =
      typeof multipleSelectOption.selectPrinter === 'undefined'
        ? new SkyCliHelper()
        : multipleSelectOption.selectPrinter
    const unselectPrinter =
      typeof multipleSelectOption.unselectPrinter === 'undefined'
        ? new SkyCliHelper()
        : multipleSelectOption.unselectPrinter

    const outputs = []
    for (let i = 0; i < items.length; i += 1) {
      const prefix = `(${idxSet.has(i) ? '*' : ' '}) `
      const item = items[i]
      outputs.push(
        idxOld === i
          ? `${prefix}${cursorPrinter.memo.join('')}${item}${UNICODES.ANSI_ESCAPE.TEXT.RESET}`
          : idxSet.has(i)
            ? `${prefix}${selectPrinter.memo.join('')}${item}${UNICODES.ANSI_ESCAPE.TEXT.RESET}`
            : `${prefix}${unselectPrinter.memo.join('')}${item}${UNICODES.ANSI_ESCAPE.TEXT.RESET}`,
      )
    }
    this.stdio.print(outputs.join('\n'))

    const {
      finish,
      idx: idxNew,
      idxSet: idxSetNew,
    } = await this.stdio.multipleSelect(idxOld, idxSet)
    const idx = (items.length + idxNew) % items.length

    if (!finish) {
      this.Cursor.ups(
        items.length - 1,
      ).Cursor.FirstColumn.Cursor.RemoveAfter.print()

      return await this._multipleSelect(
        items,
        {
          idx,
          cursorPrinter,
          selectPrinter,
          unselectPrinter,
        },
        idxSetNew,
      )
    }
    this.flush()
    return Array.from(idxSetNew).map((i) => items[i])
  }

  async multipleSelect(
    items: string[],
    multipleSelectOption: {
      idx?: number
      cursorPrinter?: SkyCliHelper
      selectPrinter?: SkyCliHelper
      unselectPrinter?: SkyCliHelper
    } = {},
    idxSet = new Set<number>(),
  ) {
    const skyCliHelper = new SkyCliHelper()
    skyCliHelper.Cursor.Hide.print()
    try {
      const result = await this._multipleSelect(
        items,
        multipleSelectOption,
        idxSet,
      )
      return result
    } catch (err) {
      skyCliHelper.Text.Foreground.Red.println(
        err instanceof Error ? err.message : String(err),
      )
      process.exit(1)
    } finally {
      skyCliHelper.Cursor.Show.print()
    }
  }

  static async multipleSelect(
    items: string[],
    multipleSelectOption: {
      idx?: number
      cursorPrinter?: SkyCliHelper
      selectPrinter?: SkyCliHelper
      unselectPrinter?: SkyCliHelper
    } = {},
    idxSet = new Set<number>(),
  ) {
    return await new SkyCliHelper().multipleSelect(
      items,
      multipleSelectOption,
      idxSet,
    )
  }
}

main().catch(console.error)
async function main() {
  SkyCliHelper.Text.Bold.println('test')

  SkyCliHelper.Text.Foreground.Red.print('test2: ')
  const answer1 = await SkyCliHelper.input(SkyCliHelper.Text.Foreground.Yellow)
  SkyCliHelper.println()
  SkyCliHelper.Text.Italic.Text.Background.White.Text.Foreground.Pink.println(
    answer1,
  )

  SkyCliHelper.Text.Foreground.Green.print('test3: ')

  const answer2 = await SkyCliHelper.select(['Yes', 'No'], {
    selectPrinter: SkyCliHelper.Text.Foreground.Cyan.Text.Underline,
    unselectPrinter: SkyCliHelper.Text.Foreground.Gray,
  })
  SkyCliHelper.println()
  SkyCliHelper.println(answer2)

  SkyCliHelper.Text.Foreground.Pink.println('test4')
  const answer3 = await SkyCliHelper.multipleSelect(
    ['java', 'nodejs', 'python'],
    {
      cursorPrinter: SkyCliHelper.Text.Foreground.Yellow,
    },
  )
  SkyCliHelper.println()
  SkyCliHelper.println(`[${answer3.join(', ')}]`)
}
