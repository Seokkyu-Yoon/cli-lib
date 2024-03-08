import { UNICODES } from './unicode'

export class Stdio {
  private static stdio?: Stdio

  static get instance() {
    if (typeof this.stdio === 'undefined') {
      this.stdio = new Stdio()
    }
    return this.stdio
  }

  readonly stdin
  readonly stdout

  private constructor() {
    this.stdin = process.stdin
    this.stdout = process.stdout
  }

  print(...text: any[]) {
    this.stdout.write(text.join(''))
  }

  println(...text: any[]) {
    this.print(...text, '\n')
  }

  async input() {
    return await new Promise<string>((resolve) => {
      this.stdin
        .once('data', (data) => {
          this.stdin.pause()
          resolve(data.toString('utf-8').slice(0, -1)) // for remove \n last
        })
        .resume()
    })
  }

  async select(vertical = false, idx = 0) {
    return await new Promise<{ finish: boolean; idx: number }>((resolve) => {
      this.stdin
        .once('data', (data) => {
          const key = data.toString('utf-8')
          this.stdin.setRawMode(false)
          if (key === UNICODES.ENTER) {
            resolve({ finish: true, idx })
            return
          }
          if (key === UNICODES.EXIT) {
            return process.exit(1)
          }

          let newIdx = idx
          if (vertical) {
            if (key === UNICODES.ANSI_ESCAPE.CURSOR.UP) {
              newIdx = idx - 1
            }
            if (key === UNICODES.ANSI_ESCAPE.CURSOR.DOWN) {
              newIdx = idx + 1
            }
          } else {
            if (key === UNICODES.ANSI_ESCAPE.CURSOR.LEFT) {
              newIdx = idx - 1
            }
            if (key === UNICODES.ANSI_ESCAPE.CURSOR.RIGHT) {
              newIdx = idx + 1
            }
          }
          resolve({ finish: false, idx: newIdx })
        })
        .setRawMode(true)
        .resume()
    })
  }
}
