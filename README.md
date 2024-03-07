# Owned by Seokkyu Yoon

- support es5, es6, and ts
- cli-helper use like this
- use cli easy and colorful

## example code

```typescript
const answer = await Stdio.print(
  Stdio.AnsiBuilder.Fg.rgb(130, 0, 0).message('test: '),
).input(Stdio.AnsiBuilder.Fg.Yellow)
Stdio.println(`answer is ${answer}`).println()

const answer2 = await Stdio.print('test2: ').select(['yes', 'no'], {
  ansiBuilder: Stdio.AnsiBuilder.Fg.Gray,
  selectedAnsiBuilder: Stdio.AnsiBuilder.Fg.Cyan,
})
Stdio.println(`answer2 is ${answer2}`).println()

const answer3 = await Stdio.println('test3').select(['yes', 'no'], {
  vertical: true,
  ansiBuilder: Stdio.AnsiBuilder.Fg.Gray,
  selectedAnsiBuilder: Stdio.AnsiBuilder.Bg.White,
})
Stdio.println(`answer3 is ${answer3}`).println()

const answer4 = await Stdio.println(
  'test4 (space: select(*) / enter: finish)',
).multipleSelect(['c', 'c++', 'java', 'python'], {
  ansiBuilder: Stdio.AnsiBuilder.Fg.White.Italic,
  selectedAnsiBuilder: Stdio.AnsiBuilder.Fg.Blue.Bold.Underline,
})
Stdio.println(`answer4 are [${answer4.join(',')}]`).println()
```
