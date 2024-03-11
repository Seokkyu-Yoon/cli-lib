# Owned by Seokkyu Yoon

- support es5, es6, and ts
- cli-helper use like this
- use cli easy and colorful

## example code

```typescript
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
```
