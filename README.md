# Owned by Seokkyu Yoon

- support es5, es6, and ts
- use cli colorful easy way based on chainging
- calculate decimal rgb color and hex rgb color to ansi 211 color

## description

- `Static(true / false)` means can use like `SkyCliHelper.{static method}`

### Clone (Static: false)

- Make clone you defined

```typescript
const yellowPrinter = SkyCliHelper.Text.Foreground.Yellow
yellowPrinter.println("It's yellow text")

const italicYellowPrinter = yellowPrinter.Clone.Text.Italic
const boldItalicYellowPrinter = italicYellowPrinter.Clone.Text.Bold

italicYellowPrinter.println("It's yellow italic text")
boldItalicYellowPrinter.println("It's yellow italic bold text")
```

### Text (Static: true)

- Styling text collection
  |attribute|description|
  |--|--|
  |Reset|Reset text styles|
  |Bold|Make text bold|
  |Italic|Make text italic|
  |Underline|Make text has underline|
  |Foreground|Styling text color of foreground|
  |Background|Styling text color of background|

  #### Foreground and Background

  | attribute | description            |
  | --------- | ---------------------- |
  | Red       | Make color red         |
  | Green     | Make color green       |
  | Blue      | Make color blue        |
  | Pink      | Make color pink        |
  | Cyan      | Make color cyan        |
  | Yellow    | Make color yellow      |
  | White     | Make color white       |
  | Gray      | Make color gray        |
  | Rgb       | choose decimal and hex |

  #### Rgb

  | attribute                                                              | description                                |
  | ---------------------------------------------------------------------- | ------------------------------------------ |
  | decimal(red: number(0-255), green: number(0-255), blue: number(0-255)) | Make ansi color based on decimal rgb color |
  | hex(code: string(/^#[0-9\|a-f\|A-F]{3,6}$/))                           | Make ansi color based on hex rgb color     |

  - example
    ```typescript
    SkyCliHelper.Text.Foreground.Rgb.decimal(0, 0, 0)
      // it's same with #ffffff
      .Text.Background.Rgb.hex('#fff')
      .println("It's black text and background is white")
    ```

### Cursor (Static: true)

- If you need to handle cursor use this
  | attribute | description |
  | ----------------- | ------------------------------------ |
  | Up | Cursor moves to up once |
  | Down | Cursor moves to down once |
  | Right | Cursor moves to right once |
  | Left | Cursor moves to left once |
  | FirstColumn | Move to first column of current line |
  | Hide | Hide cursor |
  | Show | Show cursor |
  | RemoveAfter | Remove after cursor texts |
  | ups(n: number) | Cursor moves to up n times |
  | downs(n: number) | Cursor moves to down n times |
  | rights(n: number) | Cursor moves to right n times |
  | lefts(n: number) | Curosr moves to left n times |

### print(...text: string[]):void (Static: true)

- Write text and cursor positioned at end of text

```typescript
SkyCliHelper.print('abc')

// will be result
// abc|
//    ^ cursor is here
```

### println(...text: string[]):void (Static: true)

- Write text and cursor positioned next line

```typescript
SkyCliHelper.println('def')

// will be result
// abc
// | <- cursor is here
```

### input(inputPrinter?: SkyCliHelper):Promise\<string\> (Static: true)

- inputPrinter make user input to style of printer

```typescript
const answer = await SkyCliHelper.input(
  SkyCliHelper.Text.Foreground.Rgb.decimal(130, 255, 180),
)

// answer will be input
// if use input similaility rgb color text will input
```

### select(items: string[], options: { idx?: number; vertical?: boolean; selectPrinter?: SkyCliHelper; unselectPrint?: SkyCliHelper} = {}) (Static: true)

- select items to arrow input and enter
- items are selectable texts
- options.idx is default idx of item (default: 0)
- if options.vertical is true show vertical else horizontal (default: false)
- options.selectPrinter make cursored text to style of printer
- options.unselectPrinter make uncursored text to style of printer

```typescript
const answer = await SkyCliHelper.select(['Yes', 'No'])

// answer will be { idx: {selectedItemIdx}, item: {selectedItem} }
```

### multipleSelect(items: string[], options: { idx?: number; vertical?: boolean; cursorPrinter?: SkyCliHelper; selectPrinter?: SkyCliHelper; unselectPrint?: SkyCliHelper} = {}) (Static: true)

- mostly like select
- options.cursorPrinter make cursored text to style of printer
- options.selectPrinter make selected text to style of printer
- options.unselectPrinter make unselected text to style of printer

```typescript
const answer = await SkyCliHelper.select(['Python', 'Java', 'Javascript'])

// answer will be Array of select result
```
