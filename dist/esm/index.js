var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Stdio } from './stdio';
import { UNICODES } from './unicode';
export default class SkyCliHelper {
    constructor() {
        this.stdio = Stdio.instance;
        this.memo = [];
        this.Text = ((ctx) => {
            const textUnicodes = UNICODES.ANSI_ESCAPE.TEXT;
            return new (class {
                get Reset() {
                    return ctx.push(textUnicodes.RESET);
                }
                get Bold() {
                    return ctx.push(textUnicodes.BOLD);
                }
                get Italic() {
                    return ctx.push(textUnicodes.ITALIC);
                }
                get Underline() {
                    return ctx.push(textUnicodes.UNDERLINE);
                }
                get Foreground() {
                    const foregroundUnicodes = textUnicodes.FOREGROUND;
                    return new (class {
                        get Red() {
                            return ctx.push(foregroundUnicodes.RED);
                        }
                        get Green() {
                            return ctx.push(foregroundUnicodes.GREEN);
                        }
                        get Blue() {
                            return ctx.push(foregroundUnicodes.BLUE);
                        }
                        get Pink() {
                            return ctx.push(foregroundUnicodes.PINK);
                        }
                        get Cyan() {
                            return ctx.push(foregroundUnicodes.CYAN);
                        }
                        get Yellow() {
                            return ctx.push(foregroundUnicodes.YELLOW);
                        }
                        get White() {
                            return ctx.push(foregroundUnicodes.WHITE);
                        }
                        get Gray() {
                            return ctx.push(foregroundUnicodes.GRAY);
                        }
                        get Rgb() {
                            return new (class {
                                decimal(red, green, blue) {
                                    return ctx.push(foregroundUnicodes.RGB.decimal(red, green, blue));
                                }
                                hex(hex) {
                                    return ctx.push(foregroundUnicodes.RGB.hex(hex));
                                }
                            })();
                        }
                    })();
                }
                get Background() {
                    const backgroundUnicodes = textUnicodes.BACKGROUND;
                    return new (class {
                        get Red() {
                            return ctx.push(backgroundUnicodes.RED);
                        }
                        get Green() {
                            return ctx.push(backgroundUnicodes.GREEN);
                        }
                        get Blue() {
                            return ctx.push(backgroundUnicodes.BLUE);
                        }
                        get Pink() {
                            return ctx.push(backgroundUnicodes.PINK);
                        }
                        get Cyan() {
                            return ctx.push(backgroundUnicodes.CYAN);
                        }
                        get Yellow() {
                            return ctx.push(backgroundUnicodes.YELLOW);
                        }
                        get White() {
                            return ctx.push(backgroundUnicodes.WHITE);
                        }
                        get Gray() {
                            return ctx.push(backgroundUnicodes.GRAY);
                        }
                        get Rgb() {
                            return new (class {
                                decimal(red, green, blue) {
                                    return ctx.push(backgroundUnicodes.RGB.decimal(red, green, blue));
                                }
                                hex(hex) {
                                    return ctx.push(backgroundUnicodes.RGB.hex(hex));
                                }
                            })();
                        }
                    })();
                }
            })();
        })(this);
        this.Cursor = ((ctx) => {
            const cursorUnicodes = UNICODES.ANSI_ESCAPE.CURSOR;
            return new (class {
                get Up() {
                    return ctx.push(cursorUnicodes.UP);
                }
                get Down() {
                    return ctx.push(cursorUnicodes.DOWN);
                }
                get Right() {
                    return ctx.push(cursorUnicodes.RIGHT);
                }
                get Left() {
                    return ctx.push(cursorUnicodes.LEFT);
                }
                get FirstColumn() {
                    return ctx.push(cursorUnicodes.FIRST_COLUMN);
                }
                get Hide() {
                    return ctx.push(cursorUnicodes.HIDE);
                }
                get Show() {
                    return ctx.push(cursorUnicodes.SHOW);
                }
                get RemoveAfter() {
                    return ctx.push(cursorUnicodes.REMOVE_AFTER);
                }
                ups(n) {
                    return ctx.push(cursorUnicodes.ups(n));
                }
                downs(n) {
                    return ctx.push(cursorUnicodes.downs(n));
                }
                rights(n) {
                    return ctx.push(cursorUnicodes.rights(n));
                }
                lefts(n) {
                    return ctx.push(cursorUnicodes.lefts(n));
                }
            })();
        })(this);
    }
    push(...args) {
        this.memo.push(...args);
        return this;
    }
    get Clone() {
        return new SkyCliHelper().push(...this.memo);
    }
    static get Text() {
        return new SkyCliHelper().Text;
    }
    static get Cursor() {
        return new SkyCliHelper().Cursor;
    }
    flush() {
        this.memo = [];
        return this;
    }
    print(...text) {
        this.stdio.print(...this.memo, ...text, UNICODES.ANSI_ESCAPE.TEXT.RESET);
        this.flush();
    }
    static print(...text) {
        new SkyCliHelper().print(...text);
    }
    println(...text) {
        this.stdio.println(...this.memo, ...text, UNICODES.ANSI_ESCAPE.TEXT.RESET);
        this.flush();
    }
    static println(...text) {
        new SkyCliHelper().println(...text);
    }
    input(inputPrinter) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof inputPrinter !== 'undefined') {
                this.stdio.print(inputPrinter.memo.join(''));
            }
            const result = yield this.stdio.input();
            this.Text.Reset.print();
            return result;
        });
    }
    static input(inputPrinter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new SkyCliHelper().input(inputPrinter);
        });
    }
    _select(items, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const idxOld = typeof options.idx === 'undefined' ? 0 : options.idx;
            const vertical = typeof options.vertical === 'undefined' ? false : options.vertical;
            const selectPrinter = typeof options.selectPrinter === 'undefined'
                ? new SkyCliHelper()
                : options.selectPrinter;
            const unselectPrinter = typeof options.unselectPrinter === 'undefined'
                ? new SkyCliHelper()
                : options.unselectPrinter;
            const outputs = [];
            for (let i = 0; i < items.length; i += 1) {
                const item = vertical ? `${i + 1}. ${items[i]}` : items[i];
                outputs.push(idxOld === i
                    ? `${selectPrinter.memo.join('')}${item}${UNICODES.ANSI_ESCAPE.TEXT.RESET}`
                    : `${unselectPrinter.memo.join('')}${item}${UNICODES.ANSI_ESCAPE.TEXT.RESET}`);
            }
            this.stdio.print(outputs.join(vertical ? '\n' : ' / '));
            const { finish, idx: idxNew } = yield this.stdio.select(vertical, idxOld);
            const idx = (items.length + idxNew) % items.length;
            if (!finish) {
                if (vertical) {
                    this.Cursor.ups(items.length - 1).Cursor.FirstColumn.Cursor.RemoveAfter.print();
                }
                else {
                    this.Cursor.lefts(items.join(' / ').length).Cursor.RemoveAfter.print();
                }
                return yield this._select(items, {
                    idx,
                    vertical,
                    selectPrinter,
                    unselectPrinter,
                });
            }
            this.flush();
            this.stdio.println();
            return {
                idx,
                item: items[idx],
            };
        });
    }
    select(items, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const skyCliHelper = new SkyCliHelper();
            skyCliHelper.Cursor.Hide.print();
            try {
                const result = yield this._select(items, options);
                return result;
            }
            catch (err) {
                skyCliHelper.Text.Foreground.Red.println(err instanceof Error ? err.message : String(err));
                process.exit(1);
            }
            finally {
                skyCliHelper.Cursor.Show.print();
            }
        });
    }
    static select(items, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new SkyCliHelper().select(items, options);
        });
    }
    _multipleSelect(items, multipleSelectOption = {}, idxSet = new Set()) {
        return __awaiter(this, void 0, void 0, function* () {
            const idxOld = typeof multipleSelectOption.idx === 'undefined'
                ? 0
                : multipleSelectOption.idx;
            const cursorPrinter = typeof multipleSelectOption.cursorPrinter === 'undefined'
                ? new SkyCliHelper()
                : multipleSelectOption.cursorPrinter;
            const selectPrinter = typeof multipleSelectOption.selectPrinter === 'undefined'
                ? new SkyCliHelper()
                : multipleSelectOption.selectPrinter;
            const unselectPrinter = typeof multipleSelectOption.unselectPrinter === 'undefined'
                ? new SkyCliHelper()
                : multipleSelectOption.unselectPrinter;
            const outputs = [];
            for (let i = 0; i < items.length; i += 1) {
                const prefix = `(${idxSet.has(i) ? '*' : ' '}) `;
                const item = items[i];
                outputs.push(idxOld === i
                    ? `${prefix}${cursorPrinter.memo.join('')}${item}${UNICODES.ANSI_ESCAPE.TEXT.RESET}`
                    : idxSet.has(i)
                        ? `${prefix}${selectPrinter.memo.join('')}${item}${UNICODES.ANSI_ESCAPE.TEXT.RESET}`
                        : `${prefix}${unselectPrinter.memo.join('')}${item}${UNICODES.ANSI_ESCAPE.TEXT.RESET}`);
            }
            this.stdio.print(outputs.join('\n'));
            const { finish, idx: idxNew, idxSet: idxSetNew, } = yield this.stdio.multipleSelect(idxOld, idxSet);
            const idx = (items.length + idxNew) % items.length;
            if (!finish) {
                this.Cursor.ups(items.length - 1).Cursor.FirstColumn.Cursor.RemoveAfter.print();
                return yield this._multipleSelect(items, {
                    idx,
                    cursorPrinter,
                    selectPrinter,
                    unselectPrinter,
                }, idxSetNew);
            }
            this.flush();
            this.stdio.println();
            return Array.from(idxSetNew).map((idx) => ({
                idx,
                item: items[idx],
            }));
        });
    }
    multipleSelect(items, multipleSelectOption = {}, idxSet = new Set()) {
        return __awaiter(this, void 0, void 0, function* () {
            const skyCliHelper = new SkyCliHelper();
            skyCliHelper.Cursor.Hide.print();
            try {
                const result = yield this._multipleSelect(items, multipleSelectOption, idxSet);
                return result;
            }
            catch (err) {
                skyCliHelper.Text.Foreground.Red.println(err instanceof Error ? err.message : String(err));
                process.exit(1);
            }
            finally {
                skyCliHelper.Cursor.Show.print();
            }
        });
    }
    static multipleSelect(items, multipleSelectOption = {}, idxSet = new Set()) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new SkyCliHelper().multipleSelect(items, multipleSelectOption, idxSet);
        });
    }
}
if (require.main === module) {
    main().catch(console.error);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        SkyCliHelper.Text.Bold.println('test');
        SkyCliHelper.Text.Foreground.Red.print('test2: ');
        const answer1 = yield SkyCliHelper.input(SkyCliHelper.Text.Foreground.Yellow);
        SkyCliHelper.println();
        SkyCliHelper.Text.Italic.Text.Background.White.Text.Foreground.Pink.println(answer1);
        SkyCliHelper.Text.Foreground.Green.print('test3: ');
        const answer2 = yield SkyCliHelper.select(['Yes', 'No'], {
            selectPrinter: SkyCliHelper.Text.Foreground.Cyan.Text.Underline,
            unselectPrinter: SkyCliHelper.Text.Foreground.Gray,
        });
        SkyCliHelper.println();
        SkyCliHelper.println(answer2.item);
        SkyCliHelper.Text.Foreground.Pink.println('test4');
        const answer3 = yield SkyCliHelper.multipleSelect(['java', 'nodejs', 'python'], {
            cursorPrinter: SkyCliHelper.Text.Foreground.Yellow,
        });
        SkyCliHelper.println();
        SkyCliHelper.println(`[${answer3.map(({ item }) => item).join(', ')}]`);
    });
}
