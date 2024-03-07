export declare class Color {
    private static readonly MIN;
    private static readonly MAX;
    private static readonly numSerializer;
    readonly decimal: number;
    readonly hex: string;
    private constructor();
    static fromDecimal(value: number): Color;
    static fromHex(value: string): Color;
}
export declare class ColorRGB {
    static readonly Red: ColorRGB;
    static readonly Green: ColorRGB;
    static readonly Blue: ColorRGB;
    static readonly Pink: ColorRGB;
    static readonly Cyan: ColorRGB;
    static readonly Yellow: ColorRGB;
    static readonly White: ColorRGB;
    static readonly Gray: {
        readonly Ansi: string;
    };
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly hex: string;
    private constructor();
    static fromDecimal(red: number, green: number, blue: number): ColorRGB;
    static fromHex(code: string): ColorRGB;
    get Ansi(): string;
}
//# sourceMappingURL=color.d.ts.map