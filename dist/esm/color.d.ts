declare class Color {
    readonly decimal: number;
    readonly hex: string;
    constructor(decimal: number, hex: string);
}
export declare class Rgb {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly hex: string;
    constructor(red: Color, green: Color, blue: Color);
}
export declare class RgbFactory {
    private readonly colorFactory;
    readonly red: Rgb;
    readonly green: Rgb;
    readonly blue: Rgb;
    readonly pink: Rgb;
    readonly cyan: Rgb;
    readonly yellow: Rgb;
    readonly white: Rgb;
    createByDecimal(red: number, green: number, blue: number): Rgb;
    createByHex(hex: string): Rgb;
}
export {};
//# sourceMappingURL=color.d.ts.map