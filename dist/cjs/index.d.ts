/// <reference types="node" />
import { AnsiBuilder } from './ansi';
export default class Stdio {
    readonly stdin: NodeJS.ReadStream & {
        fd: 0;
    };
    readonly stdout: NodeJS.WriteStream & {
        fd: 1;
    };
    static AnsiBuilder: AnsiBuilder;
    private constructor();
    print(text: string): this;
    static print(text: string): Stdio;
    println(text?: string): this;
    static println(text?: string): Stdio;
    get HideCursor(): this;
    get ShowCursor(): this;
    get SaveCursorPosition(): this;
    get RestoreCursorPosition(): this;
    get RemoveAfterCursor(): this;
    moveUp(n: number): this;
    moveDown(n: number): this;
    moveLeft(n: number): this;
    moveRight(n: number): this;
    get Home(): this;
    input(ansiBuilder?: AnsiBuilder): Promise<string>;
    static input(ansiBuilder?: AnsiBuilder): Promise<string>;
    select(items: string[], selectOption?: {
        idx?: number;
        vertical?: boolean;
        ansiBuilder?: AnsiBuilder;
        selectedAnsiBuilder?: AnsiBuilder;
    }): Promise<string>;
    static select(items: string[], selectOption?: {
        idx?: number;
        vertical?: boolean;
        ansiBuilder?: AnsiBuilder;
        selectedAnsiBuilder?: AnsiBuilder;
    }): Promise<string>;
    multipleSelect(items: string[], selectOption?: {
        idx?: number;
        ansiBuilder?: AnsiBuilder;
        selectedAnsiBuilder?: AnsiBuilder;
    }, idxSet?: Set<number>): Promise<string[]>;
}
//# sourceMappingURL=index.d.ts.map