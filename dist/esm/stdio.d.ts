/// <reference types="node" />
export declare class Stdio {
    private static stdio?;
    static get instance(): Stdio;
    readonly stdin: NodeJS.ReadStream & {
        fd: 0;
    };
    readonly stdout: NodeJS.WriteStream & {
        fd: 1;
    };
    private constructor();
    print(...text: any[]): void;
    println(...text: any[]): void;
    input(): Promise<string>;
    select(vertical?: boolean, idx?: number): Promise<{
        finish: boolean;
        idx: number;
    }>;
    multipleSelect(idx?: number, idxSet?: Set<number>): Promise<{
        finish: boolean;
        idx: number;
        idxSet: Set<number>;
    }>;
}
//# sourceMappingURL=stdio.d.ts.map