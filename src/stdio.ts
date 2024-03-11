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
    process.on('beforeExit', () => {
      this.print(
        UNICODES.ANSI_ESCAPE.CURSOR.SHOW,
        UNICODES.ANSI_ESCAPE.TEXT.RESET,
      )
      this.stdin.setRawMode(false)
    })
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
    return await new Promise<{ finish: boolean; idx: number }>(
      (resolve, reject) => {
        this.stdin
          .once('data', (data) => {
            const key = data.toString('utf-8')
            this.stdin.setRawMode(false).pause()
            if (key === UNICODES.ENTER) {
              resolve({ finish: true, idx })
              return
            }
            if (key === UNICODES.EXIT) {
              reject(new Error('kill process with ctrl+c'))
              return
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
      },
    )
  }

  async multipleSelect(idx = 0, idxSet = new Set<number>()) {
    return await new Promise<{
      finish: boolean
      idx: number
      idxSet: Set<number>
    }>((resolve, reject) => {
      this.stdin
        .once('data', (data) => {
          const key = data.toString('utf-8')
          this.stdin.setRawMode(false).pause()
          if (key === UNICODES.ENTER) {
            resolve({ finish: true, idx, idxSet })
            return
          }
          if (key === UNICODES.EXIT) {
            reject(new Error('kill process with ctrl+c'))
            return
          }
          if (key === UNICODES.SPACE) {
            if (idxSet.has(idx)) {
              idxSet.delete(idx)
            } else {
              idxSet.add(idx)
            }
            resolve({ finish: false, idx, idxSet })
            return
          }

          let newIdx = idx
          if (key === UNICODES.ANSI_ESCAPE.CURSOR.UP) {
            newIdx = idx - 1
          }
          if (key === UNICODES.ANSI_ESCAPE.CURSOR.DOWN) {
            newIdx = idx + 1
          }
          resolve({ finish: false, idx: newIdx, idxSet })
        })
        .setRawMode(true)
        .resume()
    })
  }
}
