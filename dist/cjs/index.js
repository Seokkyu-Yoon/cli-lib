"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ansi_1 = require("./ansi");
class Stdio {
    constructor() {
        this.stdin = process.stdin;
        this.stdout = process.stdout;
        this.stdin.pause();
    }
    print(text) {
        this.stdout.write(text);
        return this;
    }
    static print(text) {
        return new Stdio().print(text);
    }
    println(text) {
        return this.print(typeof text === 'undefined' ? '\n' : `${text}\n`);
    }
    static println(text) {
        return new Stdio().println(text);
    }
    get HideCursor() {
        return this.print(ansi_1.Unicode.HideCursor);
    }
    get ShowCursor() {
        return this.print(ansi_1.Unicode.ShowCursor);
    }
    get SaveCursorPosition() {
        return this.print(ansi_1.Unicode.SaveCursorPosition);
    }
    get RestoreCursorPosition() {
        return this.print(ansi_1.Unicode.RestoreCursorPosition);
    }
    get RemoveAfterCursor() {
        return this.print(ansi_1.Unicode.RemoveAfterCursor);
    }
    moveUp(n) {
        return this.print(ansi_1.Unicode.Ups(n));
    }
    moveDown(n) {
        return this.print(ansi_1.Unicode.Downs(n));
    }
    moveLeft(n) {
        return this.print(ansi_1.Unicode.Lefts(n));
    }
    moveRight(n) {
        return this.print(ansi_1.Unicode.Rights(n));
    }
    get Home() {
        return this.print(ansi_1.Unicode.Home);
    }
    input(ansiBuilder) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof ansiBuilder !== 'undefined') {
                this.print(ansiBuilder.Active);
            }
            return yield new Promise((resolve) => {
                this.stdin
                    .once('data', (data) => {
                    this.stdin.pause();
                    this.print(ansi_1.AnsiBuilder.Reset.Active);
                    resolve(data.toString('utf-8').trim());
                })
                    .resume();
            });
        });
    }
    static input(ansiBuilder) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Stdio().input(ansiBuilder);
        });
    }
    select(items, selectOption = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const idx = typeof selectOption.idx === 'undefined' ? 0 : selectOption.idx;
            const vertical = typeof selectOption.vertical === 'undefined'
                ? false
                : selectOption.vertical;
            const ansiBuilder = typeof selectOption.ansiBuilder === 'undefined'
                ? ansi_1.AnsiBuilder.New
                : selectOption.ansiBuilder.Clone;
            const selectedAnsiBuilder = typeof selectOption.selectedAnsiBuilder === 'undefined'
                ? ansi_1.AnsiBuilder.New
                : selectOption.selectedAnsiBuilder.Clone;
            const prettyItems = [];
            for (let i = 0; i < items.length; i += 1) {
                const item = vertical ? `${i + 1}. ${items[i]}` : items[i];
                if (i === idx) {
                    prettyItems.push(selectedAnsiBuilder.message(item));
                    continue;
                }
                prettyItems.push(ansiBuilder.message(item));
            }
            const seperator = vertical ? '\n' : ' / ';
            this.RemoveAfterCursor.print(`${prettyItems.join(seperator)}`).HideCursor.stdin.setRawMode(true);
            return yield new Promise((resolve) => {
                this.stdin
                    .once('data', (data) => {
                    this.stdin.setRawMode(false);
                    const key = data.toString('utf-8');
                    if (key === ansi_1.Unicode.Enter) {
                        this.ShowCursor.println(ansi_1.AnsiBuilder.Reset.Active);
                        resolve(items[idx]);
                        return;
                    }
                    if (key === ansi_1.Unicode.Exit) {
                        this.ShowCursor.println(ansi_1.AnsiBuilder.Reset.Active);
                        return process.exit(1);
                    }
                    if (vertical) {
                        this.moveUp(items.length - 1).Home.stdin.pause();
                    }
                    else {
                        this.moveLeft(items.join(' / ').length).stdin.pause();
                    }
                    let newIdx = idx;
                    if (key === ansi_1.Unicode.Left) {
                        newIdx = vertical ? newIdx : (items.length + idx - 1) % items.length;
                    }
                    if (key === ansi_1.Unicode.Right) {
                        newIdx = vertical ? newIdx : (idx + 1) % items.length;
                    }
                    if (key === ansi_1.Unicode.Up) {
                        newIdx = vertical ? (items.length + idx - 1) % items.length : newIdx;
                    }
                    if (key === ansi_1.Unicode.Down) {
                        newIdx = vertical ? (idx + 1) % items.length : newIdx;
                    }
                    resolve(this.select(items, {
                        idx: newIdx,
                        vertical,
                        ansiBuilder,
                        selectedAnsiBuilder,
                    }));
                })
                    .resume();
            });
        });
    }
    static select(items, selectOption = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Stdio().select(items, selectOption);
        });
    }
    multipleSelect(items, selectOption = {}, idxSet = new Set()) {
        return __awaiter(this, void 0, void 0, function* () {
            const idx = typeof selectOption.idx === 'undefined' ? 0 : selectOption.idx;
            const ansiBuilder = typeof selectOption.ansiBuilder === 'undefined'
                ? ansi_1.AnsiBuilder.New
                : selectOption.ansiBuilder.Clone;
            const selectedAnsiBuilder = typeof selectOption.selectedAnsiBuilder === 'undefined'
                ? ansi_1.AnsiBuilder.New
                : selectOption.selectedAnsiBuilder.Clone;
            const prettyItems = [];
            for (let i = 0; i < items.length; i += 1) {
                const item = [idxSet.has(i) ? '(*)' : '( )', items[i]].join(' ');
                prettyItems.push(i === idx
                    ? selectedAnsiBuilder.message(item)
                    : ansiBuilder.message(item));
            }
            const seperator = '\n';
            this.RemoveAfterCursor.print(`${prettyItems.join(seperator)}`).HideCursor.stdin.setRawMode(true);
            return yield new Promise((resolve) => {
                this.stdin
                    .once('data', (data) => {
                    this.stdin.setRawMode(false);
                    const key = data.toString('utf-8');
                    if (key === ansi_1.Unicode.Enter) {
                        this.ShowCursor.println(ansi_1.AnsiBuilder.Reset.Active);
                        resolve(Array.from(idxSet).map((i) => items[i]));
                        return;
                    }
                    if (key === ansi_1.Unicode.Exit) {
                        this.ShowCursor.println(ansi_1.AnsiBuilder.Reset.Active);
                        return process.exit(1);
                    }
                    this.moveUp(items.length - 1).Home.stdin.pause();
                    let newIdx = idx;
                    if (key === ansi_1.Unicode.Up) {
                        newIdx = (items.length + idx - 1) % items.length;
                    }
                    if (key === ansi_1.Unicode.Down) {
                        newIdx = (idx + 1) % items.length;
                    }
                    if (key === ansi_1.Unicode.Space) {
                        idxSet.has(idx) ? idxSet.delete(idx) : idxSet.add(idx);
                    }
                    resolve(this.multipleSelect(items, {
                        idx: newIdx,
                        ansiBuilder,
                        selectedAnsiBuilder,
                    }, idxSet));
                })
                    .resume();
            });
        });
    }
}
exports.default = Stdio;
if (require.main === module) {
    main().catch(console.error);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = yield Stdio.print(ansi_1.AnsiBuilder.Fg.rgb(130, 0, 0).message('test: ')).input(ansi_1.AnsiBuilder.Fg.Yellow);
        Stdio.println(`answer is ${answer}`).println();
        const answer2 = yield Stdio.print('test2: ').select(['yes', 'no'], {
            ansiBuilder: ansi_1.AnsiBuilder.Fg.Gray,
            selectedAnsiBuilder: ansi_1.AnsiBuilder.Fg.Cyan,
        });
        Stdio.println(`answer2 is ${answer2}`).println();
        const answer3 = yield Stdio.println('test3').select(['yes', 'no'], {
            vertical: true,
            ansiBuilder: ansi_1.AnsiBuilder.Fg.Gray,
            selectedAnsiBuilder: ansi_1.AnsiBuilder.Bg.White,
        });
        Stdio.println(`answer3 is ${answer3}`).println();
        const answer4 = yield Stdio.println('test4 (space: select(*) / enter: finish)').multipleSelect(['c', 'c++', 'java', 'python'], {
            ansiBuilder: ansi_1.AnsiBuilder.Fg.White.Italic,
            selectedAnsiBuilder: ansi_1.AnsiBuilder.Fg.Blue.Bold.Underline,
        });
        Stdio.println(`answer4 are [${answer4.join(',')}]`).println();
    });
}
