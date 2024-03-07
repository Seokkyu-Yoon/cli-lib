export function NumberSerializer(min: number, max: number) {
  if (min > max) throw new Error('min value is grater than max value')

  return function (value: number, isNaN: number | Error = min) {
    let v = value
    if (Number.isNaN(v)) {
      if (isNaN instanceof Error) {
        throw isNaN
      }
      v = isNaN
    }
    return Math.min(Math.max(v, min), max)
  }
}
