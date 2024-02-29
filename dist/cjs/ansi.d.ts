export declare class AnsiBuilder {
    private readonly msgs;
    protected constructor(ansiBuilder?: AnsiBuilder);
    protected push(...args: any[]): AnsiBuilder;
    get Bold(): AnsiBuilder;
    static get Bold(): AnsiBuilder;
    get Italic(): AnsiBuilder;
    static get Italic(): AnsiBuilder;
    get Underline(): AnsiBuilder;
    static get Underline(): AnsiBuilder;
    get Fg(): FgAnsiBuilder;
    static get Fg(): FgAnsiBuilder;
    get Bg(): BgAnsiBuilder;
    static get Bg(): BgAnsiBuilder;
    message(...msgs: any[]): string;
    static message(...msgs: any[]): string;
}
declare class FgAnsiBuilder extends AnsiBuilder {
    get Red(): AnsiBuilder;
    get Green(): AnsiBuilder;
    get Blue(): AnsiBuilder;
    get Pink(): AnsiBuilder;
    get Cyan(): AnsiBuilder;
    get Yellow(): AnsiBuilder;
    get White(): AnsiBuilder;
    get Gray(): AnsiBuilder;
}
declare class BgAnsiBuilder extends AnsiBuilder {
    get Red(): AnsiBuilder;
    get Green(): AnsiBuilder;
    get Blue(): AnsiBuilder;
    get Pink(): AnsiBuilder;
    get Cyan(): AnsiBuilder;
    get Yellow(): AnsiBuilder;
    get White(): AnsiBuilder;
    get Gray(): AnsiBuilder;
}
export {};
//# sourceMappingURL=ansi.d.ts.map