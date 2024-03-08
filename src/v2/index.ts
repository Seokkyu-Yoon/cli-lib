import { Stdio } from './stdio'
import { UNICODES } from './unicode'

export default class SkyCliHelper {
  private readonly stdio = Stdio.instance
  private memo: string[] = []

  private push(...args: string[]) {
    this.memo.push(...args)
    return this
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

  flush() {
    this.memo = []
    return this
  }

  print(...text: string[]) {
    this.stdio.print(...this.memo, ...text, UNICODES.ANSI_ESCAPE.TEXT.RESET)
    this.flush()
  }

  println(...text: string[]) {
    this.stdio.println(...this.memo, ...text, UNICODES.ANSI_ESCAPE.TEXT.RESET)
    this.flush()
  }

  async input(inputPrinter?: SkyCliHelper) {
    if (typeof inputPrinter !== 'undefined') {
      this.stdio.print(inputPrinter.memo.join(''))
    }
    const result = await this.stdio.input()
    this.Text.Reset.print()
    return result
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
        ...(idxOld === i
          ? [...selectPrinter.memo, item, UNICODES.ANSI_ESCAPE.TEXT.RESET]
          : [...unselectPrinter.memo, item, UNICODES.ANSI_ESCAPE.TEXT.RESET]),
      )
    }
    this.Cursor.Hide.print(outputs.join(vertical ? '\n' : ' / '))

    const { finish, idx: idxNew } = await this.stdio.select(vertical, idxOld)
    const idx = (items.length + idxNew) % items.length

    if (!finish) {
      return await this.select(items, {
        idx,
        vertical,
      })
    }
    this.Cursor.Show.flush()
    return items[idx]
  }
}

main().catch(console.error)
async function main() {
  const skyCliHelper = new SkyCliHelper()
  skyCliHelper.Text.Bold.println('test')
  skyCliHelper.Text.Foreground.Red.print('test2: ')
  const answer1 = await skyCliHelper.input(skyCliHelper.Text.Foreground.Yellow)
  skyCliHelper.println()
  skyCliHelper.Text.Italic.Text.Background.White.Text.Foreground.Pink.println(
    answer1,
  )
}
