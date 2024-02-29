import { AnsiBuilder } from './ansi'

class Stdio {
  private readonly stdin
  private readonly stdout

  private constructor() {
    this.stdin = process.stdin
    this.stdout = process.stdout
  }

  print(text: string) {
    this.stdout.write(text)
    return this
  }

  static print(text: string) {
    return new Stdio().print(text)
  }

  get Next() {
    this.stdout.write('\n')
    return this
  }

  static get Next() {
    return new Stdio().Next
  }

  async ask(text: string, inputAfterLine = false) {
    this.stdout.write(text)
    if (inputAfterLine) {
      this.stdout.write('\n')
    }

    return await new Promise<string>((resolve) => {
      this.stdin.resume()
      this.stdin.once('data', (data) => {
        this.stdin.pause()
        resolve(data.toString('utf-8'))
      })
    })
  }

  static async ask(text: string, inputAfterLine = false) {
    return await new Stdio().ask(text, inputAfterLine)
  }

  async askChoosable(
    choosable: Choosable,
    text: string,
    inputAfterLine = false,
  ) {
    this.stdout.write(text)
    if (inputAfterLine) {
      this.stdout.write('\n')
    }

    this.stdout.write(choosable.getItems())
    return await new Promise<string>((resolve) => {
      const onData = (data: Buffer) => {
        const key = data.toString()
        console.log(key === '\u001b[B')
      }
      this.stdin.resume()
      this.stdin.once('data', onData)
    })
  }
}

class Choosable {
  private readonly items
  private readonly mode
  private idx = 0

  static readonly MODE = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
  } as const

  constructor(chooseableConfig: {
    items: string[]
    mode?: (typeof Choosable.MODE)[keyof typeof Choosable.MODE]
    selectedItemAnsiBuilder: AnsiBuilder
  }) {
    const items = chooseableConfig.items
    const mode =
      typeof chooseableConfig.mode === 'undefined'
        ? Choosable.MODE.HORIZONTAL
        : chooseableConfig.mode
    const selectedItemAnsiBuilder = chooseableConfig.selectedItemAnsiBuilder
    if (items.length === 0) throw new Error('items must be longer than 0')
    this.items = items
    this.mode = mode
    this.itemAnsiBuilder = selectedItemAnsiBuilder
  }

  private addIdx() {
    this.idx = (this.idx + 1) % this.items.length
    return this
  }

  private subIdx() {
    this.idx = (this.items.length + this.idx - 1) % this.items.length
    return this
  }

  onKeyUp() {
    if (this.mode !== Choosable.MODE.VERTICAL) return this
    return this.subIdx()
  }

  onKeyDown() {
    if (this.mode !== Choosable.MODE.VERTICAL) return this
    return this.addIdx()
  }

  onKeyLeft() {
    if (this.mode !== Choosable.MODE.HORIZONTAL) return this
    return this.subIdx()
  }

  onKeyRight() {
    if (this.mode !== Choosable.MODE.HORIZONTAL) return this
    return this.addIdx()
  }

  get Item() {
    return this.items[this.idx]
  }

  getItems(seperator = ' / ') {
    return this.items.join(seperator)
  }
}

async function main() {
  const answer1 = await Stdio.print(AnsiBuilder.Fg.Pink.Active)
    .print(AnsiBuilder.message('test'))
    .Next.ask('name: ')
  console.log(answer1)

  const answer2 = await Stdio.print(
    AnsiBuilder.Fg.Blue.message('test2'),
  ).Next.askChoosable(new Choosable(['yes', 'no']), 'test2:')
  console.log(answer2)
}

main().then(console.log).catch(console.error)
