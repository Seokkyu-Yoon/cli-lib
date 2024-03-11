export declare const UNICODE_ENTER = "\r";
export declare const UNICODE_SPACE = " ";
export declare const UNICODE_ESC = "\u001B";
export declare const UNICODE_EXIT = "\u0003";
export declare const UNICODES: Readonly<{
    ENTER: "\r";
    SPACE: " ";
    ESC: "\u001B";
    EXIT: "\u0003";
    ANSI_ESCAPE: Readonly<{
        CURSOR: Readonly<{
            UP: string;
            DOWN: string;
            RIGHT: string;
            LEFT: string;
            FIRST_COLUMN: string;
            HIDE: string;
            SHOW: string;
            REMOVE_AFTER: string;
            ups: (n: number) => string;
            downs: (n: number) => string;
            rights: (n: number) => string;
            lefts: (n: number) => string;
        }>;
        TEXT: Readonly<{
            RESET: string;
            BOLD: string;
            ITALIC: string;
            UNDERLINE: string;
            FOREGROUND: Readonly<{
                RED: string;
                GREEN: string;
                BLUE: string;
                PINK: string;
                CYAN: string;
                YELLOW: string;
                WHITE: string;
                GRAY: string;
                RGB: Readonly<{
                    decimal: (red: number, green: number, blue: number) => string;
                    hex: (hex: string) => string;
                }>;
            }>;
            BACKGROUND: Readonly<{
                RED: string;
                GREEN: string;
                BLUE: string;
                PINK: string;
                CYAN: string;
                YELLOW: string;
                WHITE: string;
                GRAY: string;
                RGB: Readonly<{
                    decimal: (red: number, green: number, blue: number) => string;
                    hex: (hex: string) => string;
                }>;
            }>;
        }>;
    }>;
}>;
//# sourceMappingURL=unicode.d.ts.map