export default class SkyCliHelper {
    private readonly stdio;
    private memo;
    private push;
    get Clone(): SkyCliHelper;
    Text: {
        readonly Reset: SkyCliHelper;
        readonly Bold: SkyCliHelper;
        readonly Italic: SkyCliHelper;
        readonly Underline: SkyCliHelper;
        readonly Foreground: {
            readonly Red: SkyCliHelper;
            readonly Green: SkyCliHelper;
            readonly Blue: SkyCliHelper;
            readonly Pink: SkyCliHelper;
            readonly Cyan: SkyCliHelper;
            readonly Yellow: SkyCliHelper;
            readonly White: SkyCliHelper;
            readonly Gray: SkyCliHelper;
            readonly Rgb: {
                decimal(red: number, green: number, blue: number): SkyCliHelper;
                hex(hex: string): SkyCliHelper;
            };
        };
        readonly Background: {
            readonly Red: SkyCliHelper;
            readonly Green: SkyCliHelper;
            readonly Blue: SkyCliHelper;
            readonly Pink: SkyCliHelper;
            readonly Cyan: SkyCliHelper;
            readonly Yellow: SkyCliHelper;
            readonly White: SkyCliHelper;
            readonly Gray: SkyCliHelper;
            readonly Rgb: {
                decimal(red: number, green: number, blue: number): SkyCliHelper;
                hex(hex: string): SkyCliHelper;
            };
        };
    };
    static get Text(): {
        readonly Reset: SkyCliHelper;
        readonly Bold: SkyCliHelper;
        readonly Italic: SkyCliHelper;
        readonly Underline: SkyCliHelper;
        readonly Foreground: {
            readonly Red: SkyCliHelper;
            readonly Green: SkyCliHelper;
            readonly Blue: SkyCliHelper;
            readonly Pink: SkyCliHelper;
            readonly Cyan: SkyCliHelper;
            readonly Yellow: SkyCliHelper;
            readonly White: SkyCliHelper;
            readonly Gray: SkyCliHelper;
            readonly Rgb: {
                decimal(red: number, green: number, blue: number): SkyCliHelper;
                hex(hex: string): SkyCliHelper;
            };
        };
        readonly Background: {
            readonly Red: SkyCliHelper;
            readonly Green: SkyCliHelper;
            readonly Blue: SkyCliHelper;
            readonly Pink: SkyCliHelper;
            readonly Cyan: SkyCliHelper;
            readonly Yellow: SkyCliHelper;
            readonly White: SkyCliHelper;
            readonly Gray: SkyCliHelper;
            readonly Rgb: {
                decimal(red: number, green: number, blue: number): SkyCliHelper;
                hex(hex: string): SkyCliHelper;
            };
        };
    };
    Cursor: {
        readonly Up: SkyCliHelper;
        readonly Down: SkyCliHelper;
        readonly Right: SkyCliHelper;
        readonly Left: SkyCliHelper;
        readonly FirstColumn: SkyCliHelper;
        readonly Hide: SkyCliHelper;
        readonly Show: SkyCliHelper;
        readonly RemoveAfter: SkyCliHelper;
        ups(n: number): SkyCliHelper;
        downs(n: number): SkyCliHelper;
        rights(n: number): SkyCliHelper;
        lefts(n: number): SkyCliHelper;
    };
    static get Cursor(): {
        readonly Up: SkyCliHelper;
        readonly Down: SkyCliHelper;
        readonly Right: SkyCliHelper;
        readonly Left: SkyCliHelper;
        readonly FirstColumn: SkyCliHelper;
        readonly Hide: SkyCliHelper;
        readonly Show: SkyCliHelper;
        readonly RemoveAfter: SkyCliHelper;
        ups(n: number): SkyCliHelper;
        downs(n: number): SkyCliHelper;
        rights(n: number): SkyCliHelper;
        lefts(n: number): SkyCliHelper;
    };
    flush(): this;
    print(...text: string[]): void;
    static print(...text: string[]): void;
    println(...text: string[]): void;
    static println(...text: string[]): void;
    input(inputPrinter?: SkyCliHelper): Promise<string>;
    static input(inputPrinter?: SkyCliHelper): Promise<string>;
    private _select;
    select(items: string[], options?: {
        idx?: number;
        vertical?: boolean;
        selectPrinter?: SkyCliHelper;
        unselectPrinter?: SkyCliHelper;
    }): Promise<string>;
    static select(items: string[], options?: {
        idx?: number;
        vertical?: boolean;
        selectPrinter?: SkyCliHelper;
        unselectPrinter?: SkyCliHelper;
    }): Promise<string>;
    _multipleSelect(items: string[], multipleSelectOption?: {
        idx?: number;
        cursorPrinter?: SkyCliHelper;
        selectPrinter?: SkyCliHelper;
        unselectPrinter?: SkyCliHelper;
    }, idxSet?: Set<number>): Promise<string[]>;
    multipleSelect(items: string[], multipleSelectOption?: {
        idx?: number;
        cursorPrinter?: SkyCliHelper;
        selectPrinter?: SkyCliHelper;
        unselectPrinter?: SkyCliHelper;
    }, idxSet?: Set<number>): Promise<string[]>;
    static multipleSelect(items: string[], multipleSelectOption?: {
        idx?: number;
        cursorPrinter?: SkyCliHelper;
        selectPrinter?: SkyCliHelper;
        unselectPrinter?: SkyCliHelper;
    }, idxSet?: Set<number>): Promise<string[]>;
}
//# sourceMappingURL=index.d.ts.map