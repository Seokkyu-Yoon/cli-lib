export class NumberSerializer {
  private readonly min
  private readonly max

  constructor(min: number, max: number) {
    if (min > max) throw new Error('min value is grater than max value')
    this.min = min
    this.max = max
  }

  serialize(value: number, isNaN: number | Error = this.min) {
    let v = value
    if (Number.isNaN(v)) {
      if (isNaN instanceof Error) {
        throw isNaN
      }
      v = isNaN
    }
    return Math.min(Math.max(v, this.min), this.max)
  }
}
