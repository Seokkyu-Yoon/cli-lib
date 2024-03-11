export declare class AnsiEscapeFactory {
    readonly cursor: AnsiEscapeCursorFactory;
    readonly text: AnsiEscapeTextFactory;
}
declare class AnsiEscapeCursorFactory {
    private readonly UP;
    private readonly DOWN;
    private readonly RIGHT;
    private readonly LEFT;
    private readonly FIRST_COLUMN;
    private readonly HIDE;
    private readonly SHOW;
    private readonly REMOVE_AFTER;
    readonly up: AnsiEscape;
    readonly down: AnsiEscape;
    readonly right: AnsiEscape;
    readonly left: AnsiEscape;
    readonly firstColumn: AnsiEscape;
    readonly hide: AnsiEscape;
    readonly show: AnsiEscape;
    readonly removeAfter: AnsiEscape;
    ups(n: number): AnsiEscape;
    downs(n: number): AnsiEscape;
    rights(n: number): AnsiEscape;
    lefts(n: number): AnsiEscape;
    private moves;
}
declare class AnsiEscapeTextFactory {
    private readonly RESET;
    private readonly BOLD;
    private readonly ITALIC;
    private readonly UNDERLINE;
    readonly reset: AnsiEscapeText;
    readonly bold: AnsiEscapeText;
    readonly italic: AnsiEscapeText;
    readonly underline: AnsiEscapeText;
    readonly fg: AnsiEscapeTextColorFactory;
    readonly bg: AnsiEscapeTextColorFactory;
}
declare class AnsiEscapeTextColorFactory {
    private readonly rgbFactory;
    private readonly RED;
    private readonly GREEN;
    private readonly BLUE;
    private readonly PINK;
    private readonly CYAN;
    private readonly YELLOW;
    private readonly WHITE;
    private readonly GRAY;
    private readonly ground;
    readonly red: AnsiEscapeTextColor;
    readonly green: AnsiEscapeTextColor;
    readonly blue: AnsiEscapeTextColor;
    readonly pink: AnsiEscapeTextColor;
    readonly cyan: AnsiEscapeTextColor;
    readonly yellow: AnsiEscapeTextColor;
    readonly white: AnsiEscapeTextColor;
    readonly gray: AnsiEscapeTextColor;
    constructor(ground: typeof AnsiEscapeTextColor.FOREGROUND | typeof AnsiEscapeTextColor.BACKGROUND);
    private rgbToAnsi;
    createByRgbDecimal(red: number, green: number, blue: number): AnsiEscapeTextColor;
    createByRgbHex(hex: string): AnsiEscapeTextColor;
}
export declare class AnsiEscape {
    readonly style: string;
    constructor(style: string);
}
declare class AnsiEscapeText extends AnsiEscape {
    constructor(style: string);
}
declare class AnsiEscapeTextColor extends AnsiEscapeText {
    static readonly FOREGROUND = "38;5;";
    static readonly BACKGROUND = "48;5;";
    constructor(ground: typeof AnsiEscapeTextColor.FOREGROUND | typeof AnsiEscapeTextColor.BACKGROUND, style: string);
}
export {};
//# sourceMappingURL=ansi.escape.d.ts.map