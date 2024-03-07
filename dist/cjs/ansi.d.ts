export declare class AnsiBuilder {
    private readonly msgs;
    protected constructor(ansiBuilder?: AnsiBuilder);
    protected push(...args: any[]): AnsiBuilder;
    get Clone(): AnsiBuilder;
    static get New(): AnsiBuilder;
    get Reset(): AnsiBuilder;
    static get Reset(): AnsiBuilder;
    get Bold(): AnsiBuilder;
    static get Bold(): AnsiBuilder;
    get Italic(): AnsiBuilder;
    static get Italic(): AnsiBuilder;
    get Underline(): AnsiBuilder;
    static get Underline(): AnsiBuilder;
    get Fg(): {
        Red: AnsiBuilder;
        Green: AnsiBuilder;
        Blue: AnsiBuilder;
        Pink: AnsiBuilder;
        Cyan: AnsiBuilder;
        Yellow: AnsiBuilder;
        White: AnsiBuilder;
        Gray: AnsiBuilder;
        rgb: (red: number, green: number, blue: number) => AnsiBuilder;
        hex: (hex: string) => AnsiBuilder;
    };
    static get Fg(): {
        Red: AnsiBuilder;
        Green: AnsiBuilder;
        Blue: AnsiBuilder;
        Pink: AnsiBuilder;
        Cyan: AnsiBuilder;
        Yellow: AnsiBuilder;
        White: AnsiBuilder;
        Gray: AnsiBuilder;
        rgb: (red: number, green: number, blue: number) => AnsiBuilder;
        hex: (hex: string) => AnsiBuilder;
    };
    get Bg(): {
        Red: AnsiBuilder;
        Green: AnsiBuilder;
        Blue: AnsiBuilder;
        Pink: AnsiBuilder;
        Cyan: AnsiBuilder;
        Yellow: AnsiBuilder;
        White: AnsiBuilder;
        Gray: AnsiBuilder;
        rgb: (red: number, green: number, blue: number) => AnsiBuilder;
        hex: (hex: string) => AnsiBuilder;
    };
    static get Bg(): {
        Red: AnsiBuilder;
        Green: AnsiBuilder;
        Blue: AnsiBuilder;
        Pink: AnsiBuilder;
        Cyan: AnsiBuilder;
        Yellow: AnsiBuilder;
        White: AnsiBuilder;
        Gray: AnsiBuilder;
        rgb: (red: number, green: number, blue: number) => AnsiBuilder;
        hex: (hex: string) => AnsiBuilder;
    };
    message(...msgs: any[]): string;
    static message(...msgs: any[]): string;
    get Active(): string;
    static get Active(): string;
}
export declare class Unicode {
    readonly value: string;
    protected constructor(unicode: string);
    static AnsiEscape(style: string): Unicode;
    static AnsiEscapeText(style: string): Unicode;
    static Foreground(style: string): Unicode;
    static Background(style: string): Unicode;
    static Reset: string;
    static Bold: string;
    static Italic: string;
    static Underline: string;
    static Up: string;
    static Down: string;
    static Right: string;
    static Left: string;
    static Home: string;
    static Ups(n: number): string;
    static Downs(n: number): string;
    static Rights(n: number): string;
    static Lefts(n: number): string;
    static Enter: string;
    static Space: string;
    static HideCursor: string;
    static ShowCursor: string;
    static SaveCursorPosition: string;
    static RestoreCursorPosition: string;
    static RemoveAfterCursor: string;
    static Exit: string;
}
//# sourceMappingURL=ansi.d.ts.map