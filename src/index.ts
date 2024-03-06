import { Unicode, AnsiBuilder } from './ansi'

class Stdio {
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

  println(text: string) {
    return this.print(`${text}\n`)
  }

  static println(text: string) {
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

  get End() {
    return this.print(Unicode.End)
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
          resolve(data.toString('utf-8'))
        })
        .resume()
    })
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
    this.print(`${prettyItems.join(seperator)}`).HideCursor.stdin.setRawMode(
      true,
    )
    return await new Promise<string>((resolve) => {
      this.stdin
        .once('data', (data) => {
          const key = data.toString('utf-8')
          if (key === Unicode.Enter) {
            this.ShowCursor.stdin.setRawMode(false)
            this.println('')
            resolve(items[idx])
            return
          }

          if (key === Unicode.Exit) {
            this.ShowCursor.stdin.setRawMode(false)
            return process.exit(1)
          }

          if (vertical) {
            this.Home.moveLeft(items[items.length - 1].length)
              .moveUp(items.length - 1)
              .RemoveAfterCursor.stdin.pause()
          } else {
            this.moveLeft(
              items.join(' / ').length,
            ).RemoveAfterCursor.stdin.pause()
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

  static async input() {
    return await new Stdio().input()
  }
}

async function main() {
  const answer = await Stdio.println(AnsiBuilder.Underline.message('hello'))
    .print(AnsiBuilder.Fg.Red.message('test: '))
    .input(AnsiBuilder.Fg.Yellow)
  Stdio.println(`answer is ${answer}`)

  const answer2 = await Stdio.print('test2: ').select(['yes', 'no'], {
    ansiBuilder: AnsiBuilder.Fg.Gray,
    selectedAnsiBuilder: AnsiBuilder.Fg.Cyan,
  })
  Stdio.println(`answer2 is ${answer2}`)

  const answer3 = await Stdio.println('test3').select(['yes', 'no'], {
    vertical: true,
    ansiBuilder: AnsiBuilder.Fg.Gray,
    selectedAnsiBuilder: AnsiBuilder.Bg.White,
  })
  Stdio.println(`answer3 is ${answer3}`)
}

main().catch(console.error)
