import { Unicode, AnsiBuilder } from './ansi'
export default class Stdio {
  readonly stdin
  readonly stdout

  private constructor() {
    this.stdin = process.stdin
    this.stdout = process.stdout
    this.stdin.pause()
  }

  print(text: string) {
    this.stdout.write(text)
    return this
  }

  static print(text: string) {
    return new Stdio().print(text)
  }

  println(text?: string) {
    return this.print(typeof text === 'undefined' ? '\n' : `${text}\n`)
  }

  static println(text?: string) {
    return new Stdio().println(text)
  }

  get HideCursor() {
    return this.print(Unicode.HideCursor)
  }

  get ShowCursor() {
    return this.print(Unicode.ShowCursor)
  }

  get SaveCursorPosition() {
    return this.print(Unicode.SaveCursorPosition)
  }

  get RestoreCursorPosition() {
    return this.print(Unicode.RestoreCursorPosition)
  }

  get RemoveAfterCursor() {
    return this.print(Unicode.RemoveAfterCursor)
  }

  moveUp(n: number) {
    return this.print(Unicode.Ups(n))
  }

  moveDown(n: number) {
    return this.print(Unicode.Downs(n))
  }

  moveLeft(n: number) {
    return this.print(Unicode.Lefts(n))
  }

  moveRight(n: number) {
    return this.print(Unicode.Rights(n))
  }

  get Home() {
    return this.print(Unicode.Home)
  }

  async input(ansiBuilder?: AnsiBuilder) {
    if (typeof ansiBuilder !== 'undefined') {
      this.print(ansiBuilder.Active)
    }
    return await new Promise<string>((resolve) => {
      this.stdin
        .once('data', (data) => {
          this.stdin.pause()
          this.print(AnsiBuilder.Reset.Active)
          resolve(data.toString('utf-8').trim())
        })
        .resume()
    })
  }

  static async input(ansiBuilder?: AnsiBuilder) {
    return await new Stdio().input(ansiBuilder)
  }

  async select(
    items: string[],
    selectOption: {
      idx?: number
      vertical?: boolean
      ansiBuilder?: AnsiBuilder
      selectedAnsiBuilder?: AnsiBuilder
    } = {},
  ) {
    const idx = typeof selectOption.idx === 'undefined' ? 0 : selectOption.idx
    const vertical =
      typeof selectOption.vertical === 'undefined'
        ? false
        : selectOption.vertical
    const ansiBuilder =
      typeof selectOption.ansiBuilder === 'undefined'
        ? AnsiBuilder.New
        : selectOption.ansiBuilder.Clone
    const selectedAnsiBuilder =
      typeof selectOption.selectedAnsiBuilder === 'undefined'
        ? AnsiBuilder.New
        : selectOption.selectedAnsiBuilder.Clone

    const prettyItems = []
    for (let i = 0; i < items.length; i += 1) {
      const item = vertical ? `${i + 1}. ${items[i]}` : items[i]
      if (i === idx) {
        prettyItems.push(selectedAnsiBuilder.message(item))
        continue
      }
      prettyItems.push(ansiBuilder.message(item))
    }

    const seperator = vertical ? '\n' : ' / '
    this.RemoveAfterCursor.print(
      `${prettyItems.join(seperator)}`,
    ).HideCursor.stdin.setRawMode(true)
    return await new Promise<string>((resolve) => {
      this.stdin
        .once('data', (data) => {
          this.stdin.setRawMode(false)
          const key = data.toString('utf-8')
          if (key === Unicode.Enter) {
            this.ShowCursor.println(AnsiBuilder.Reset.Active)
            resolve(items[idx])
            return
          }

          if (key === Unicode.Exit) {
            this.ShowCursor.println(AnsiBuilder.Reset.Active)
            return process.exit(1)
          }

          if (vertical) {
            this.moveUp(items.length - 1).Home.stdin.pause()
          } else {
            this.moveLeft(items.join(' / ').length).stdin.pause()
          }

          let newIdx = idx
          if (key === Unicode.Left) {
            newIdx = vertical ? newIdx : (items.length + idx - 1) % items.length
          }
          if (key === Unicode.Right) {
            newIdx = vertical ? newIdx : (idx + 1) % items.length
          }
          if (key === Unicode.Up) {
            newIdx = vertical ? (items.length + idx - 1) % items.length : newIdx
          }
          if (key === Unicode.Down) {
            newIdx = vertical ? (idx + 1) % items.length : newIdx
          }
          resolve(
            this.select(items, {
              idx: newIdx,
              vertical,
              ansiBuilder,
              selectedAnsiBuilder,
            }),
          )
        })
        .resume()
    })
  }

  static async select(
    items: string[],
    selectOption: {
      idx?: number
      vertical?: boolean
      ansiBuilder?: AnsiBuilder
      selectedAnsiBuilder?: AnsiBuilder
    } = {},
  ) {
    return await new Stdio().select(items, selectOption)
  }

  async multipleSelect(
    items: string[],
    selectOption: {
      idx?: number
      ansiBuilder?: AnsiBuilder
      selectedAnsiBuilder?: AnsiBuilder
    } = {},
    idxSet = new Set<number>(),
  ) {
    const idx = typeof selectOption.idx === 'undefined' ? 0 : selectOption.idx
    const ansiBuilder =
      typeof selectOption.ansiBuilder === 'undefined'
        ? AnsiBuilder.New
        : selectOption.ansiBuilder.Clone
    const selectedAnsiBuilder =
      typeof selectOption.selectedAnsiBuilder === 'undefined'
        ? AnsiBuilder.New
        : selectOption.selectedAnsiBuilder.Clone
    const prettyItems = []
    for (let i = 0; i < items.length; i += 1) {
      const item = [idxSet.has(i) ? '(*)' : '( )', items[i]].join(' ')
      prettyItems.push(
        i === idx
          ? selectedAnsiBuilder.message(item)
          : ansiBuilder.message(item),
      )
    }

    const seperator = '\n'
    this.RemoveAfterCursor.print(
      `${prettyItems.join(seperator)}`,
    ).HideCursor.stdin.setRawMode(true)
    return await new Promise<string[]>((resolve) => {
      this.stdin
        .once('data', (data) => {
          this.stdin.setRawMode(false)
          const key = data.toString('utf-8')
          if (key === Unicode.Enter) {
            this.ShowCursor.println(AnsiBuilder.Reset.Active)
            resolve(Array.from(idxSet).map((i) => items[i]))
            return
          }

          if (key === Unicode.Exit) {
            this.ShowCursor.println(AnsiBuilder.Reset.Active)
            return process.exit(1)
          }

          this.moveUp(items.length - 1).Home.stdin.pause()
          let newIdx = idx
          if (key === Unicode.Up) {
            newIdx = (items.length + idx - 1) % items.length
          }
          if (key === Unicode.Down) {
            newIdx = (idx + 1) % items.length
          }
          if (key === Unicode.Space) {
            idxSet.has(idx) ? idxSet.delete(idx) : idxSet.add(idx)
          }
          resolve(
            this.multipleSelect(
              items,
              {
                idx: newIdx,
                ansiBuilder,
                selectedAnsiBuilder,
              },
              idxSet,
            ),
          )
        })
        .resume()
    })
  }
}

if (require.main === module) {
  main().catch(console.error)
}
async function main() {
  const answer = await Stdio.print(
    AnsiBuilder.Fg.rgb(130, 0, 0).message('test: '),
  ).input(AnsiBuilder.Fg.Yellow)
  Stdio.println(`answer is ${answer}`).println()

  const answer2 = await Stdio.print('test2: ').select(['yes', 'no'], {
    ansiBuilder: AnsiBuilder.Fg.Gray,
    selectedAnsiBuilder: AnsiBuilder.Fg.Cyan,
  })
  Stdio.println(`answer2 is ${answer2}`).println()

  const answer3 = await Stdio.println('test3').select(['yes', 'no'], {
    vertical: true,
    ansiBuilder: AnsiBuilder.Fg.Gray,
    selectedAnsiBuilder: AnsiBuilder.Bg.White,
  })
  Stdio.println(`answer3 is ${answer3}`).println()

  const answer4 = await Stdio.println(
    'test4 (space: select(*) / enter: finish)',
  ).multipleSelect(['c', 'c++', 'java', 'python'], {
    ansiBuilder: AnsiBuilder.Fg.White.Italic,
    selectedAnsiBuilder: AnsiBuilder.Fg.Blue.Bold.Underline,
  })
  Stdio.println(`answer4 are [${answer4.join(',')}]`).println()
}
