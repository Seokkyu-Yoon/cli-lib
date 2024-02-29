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
    static Red: ColorRGB;
    static Green: ColorRGB;
    static Blue: ColorRGB;
    static Pink: ColorRGB;
    static Cyan: ColorRGB;
    static Yellow: ColorRGB;
    static White: ColorRGB;
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly hex: string;
    private constructor();
    static fromDecimal(red: number, green: number, blue: number): ColorRGB;
    static fromHex(code: string): ColorRGB;
}
//# sourceMappingURL=color.d.ts.map