import { AnsiEscapeFactory } from './ansi.escape';
const ansiEscapeFactory = new AnsiEscapeFactory();
export const UNICODE_ENTER = '\u000d';
export const UNICODE_SPACE = '\u0020';
export const UNICODE_ESC = '\u001b';
export const UNICODE_EXIT = '\u0003';
export const UNICODES = Object.freeze({
    ENTER: UNICODE_ENTER,
    SPACE: UNICODE_SPACE,
    ESC: UNICODE_ESC,
    EXIT: UNICODE_EXIT,
    ANSI_ESCAPE: Object.freeze({
        CURSOR: Object.freeze({
            UP: unicodeByAnsiEscape(ansiEscapeFactory.cursor.up),
            DOWN: unicodeByAnsiEscape(ansiEscapeFactory.cursor.down),
            RIGHT: unicodeByAnsiEscape(ansiEscapeFactory.cursor.right),
            LEFT: unicodeByAnsiEscape(ansiEscapeFactory.cursor.left),
            FIRST_COLUMN: unicodeByAnsiEscape(ansiEscapeFactory.cursor.firstColumn),
            HIDE: unicodeByAnsiEscape(ansiEscapeFactory.cursor.hide),
            SHOW: unicodeByAnsiEscape(ansiEscapeFactory.cursor.show),
            REMOVE_AFTER: unicodeByAnsiEscape(ansiEscapeFactory.cursor.removeAfter),
            ups: (n) => unicodeByAnsiEscape(ansiEscapeFactory.cursor.ups(n)),
            downs: (n) => unicodeByAnsiEscape(ansiEscapeFactory.cursor.downs(n)),
            rights: (n) => unicodeByAnsiEscape(ansiEscapeFactory.cursor.rights(n)),
            lefts: (n) => unicodeByAnsiEscape(ansiEscapeFactory.cursor.lefts(n)),
        }),
        TEXT: Object.freeze({
            RESET: unicodeByAnsiEscape(ansiEscapeFactory.text.reset),
            BOLD: unicodeByAnsiEscape(ansiEscapeFactory.text.bold),
            ITALIC: unicodeByAnsiEscape(ansiEscapeFactory.text.italic),
            UNDERLINE: unicodeByAnsiEscape(ansiEscapeFactory.text.underline),
            FOREGROUND: Object.freeze({
                RED: unicodeByAnsiEscape(ansiEscapeFactory.text.fg.red),
                GREEN: unicodeByAnsiEscape(ansiEscapeFactory.text.fg.green),
                BLUE: unicodeByAnsiEscape(ansiEscapeFactory.text.fg.blue),
                PINK: unicodeByAnsiEscape(ansiEscapeFactory.text.fg.pink),
                CYAN: unicodeByAnsiEscape(ansiEscapeFactory.text.fg.cyan),
                YELLOW: unicodeByAnsiEscape(ansiEscapeFactory.text.fg.yellow),
                WHITE: unicodeByAnsiEscape(ansiEscapeFactory.text.fg.white),
                GRAY: unicodeByAnsiEscape(ansiEscapeFactory.text.fg.gray),
                RGB: Object.freeze({
                    decimal: (red, green, blue) => unicodeByAnsiEscape(ansiEscapeFactory.text.fg.createByRgbDecimal(red, green, blue)),
                    hex: (hex) => unicodeByAnsiEscape(ansiEscapeFactory.text.fg.createByRgbHex(hex)),
                }),
            }),
            BACKGROUND: Object.freeze({
                RED: unicodeByAnsiEscape(ansiEscapeFactory.text.bg.red),
                GREEN: unicodeByAnsiEscape(ansiEscapeFactory.text.bg.green),
                BLUE: unicodeByAnsiEscape(ansiEscapeFactory.text.bg.blue),
                PINK: unicodeByAnsiEscape(ansiEscapeFactory.text.bg.pink),
                CYAN: unicodeByAnsiEscape(ansiEscapeFactory.text.bg.cyan),
                YELLOW: unicodeByAnsiEscape(ansiEscapeFactory.text.bg.yellow),
                WHITE: unicodeByAnsiEscape(ansiEscapeFactory.text.bg.white),
                GRAY: unicodeByAnsiEscape(ansiEscapeFactory.text.bg.gray),
                RGB: Object.freeze({
                    decimal: (red, green, blue) => unicodeByAnsiEscape(ansiEscapeFactory.text.fg.createByRgbDecimal(red, green, blue)),
                    hex: (hex) => unicodeByAnsiEscape(ansiEscapeFactory.text.bg.createByRgbHex(hex)),
                }),
            }),
        }),
    }),
});
function unicodeByAnsiEscape(ansiEscape) {
    return `${UNICODE_ESC}${ansiEscape.style}`;
}
