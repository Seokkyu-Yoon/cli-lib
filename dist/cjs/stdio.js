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
exports.Stdio = void 0;
const unicode_1 = require("./unicode");
class Stdio {
    static get instance() {
        if (typeof this.stdio === 'undefined') {
            this.stdio = new Stdio();
        }
        return this.stdio;
    }
    constructor() {
        this.stdin = process.stdin;
        this.stdout = process.stdout;
        process.on('beforeExit', () => {
            this.print(unicode_1.UNICODES.ANSI_ESCAPE.CURSOR.SHOW, unicode_1.UNICODES.ANSI_ESCAPE.TEXT.RESET);
            this.stdin.setRawMode(false);
        });
    }
    print(...text) {
        this.stdout.write(text.join(''));
    }
    println(...text) {
        this.print(...text, '\n');
    }
    input() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve) => {
                this.stdin
                    .once('data', (data) => {
                    this.stdin.pause();
                    resolve(data.toString('utf-8').slice(0, -1)); // for remove \n last
                })
                    .resume();
            });
        });
    }
    select(vertical = false, idx = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                this.stdin
                    .once('data', (data) => {
                    const key = data.toString('utf-8');
                    this.stdin.setRawMode(false).pause();
                    if (key === unicode_1.UNICODES.ENTER) {
                        resolve({ finish: true, idx });
                        return;
                    }
                    if (key === unicode_1.UNICODES.EXIT) {
                        reject(new Error('kill process with ctrl+c'));
                        return;
                    }
                    let newIdx = idx;
                    if (vertical) {
                        if (key === unicode_1.UNICODES.ANSI_ESCAPE.CURSOR.UP) {
                            newIdx = idx - 1;
                        }
                        if (key === unicode_1.UNICODES.ANSI_ESCAPE.CURSOR.DOWN) {
                            newIdx = idx + 1;
                        }
                    }
                    else {
                        if (key === unicode_1.UNICODES.ANSI_ESCAPE.CURSOR.LEFT) {
                            newIdx = idx - 1;
                        }
                        if (key === unicode_1.UNICODES.ANSI_ESCAPE.CURSOR.RIGHT) {
                            newIdx = idx + 1;
                        }
                    }
                    resolve({ finish: false, idx: newIdx });
                })
                    .setRawMode(true)
                    .resume();
            });
        });
    }
    multipleSelect(idx = 0, idxSet = new Set()) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                this.stdin
                    .once('data', (data) => {
                    const key = data.toString('utf-8');
                    this.stdin.setRawMode(false).pause();
                    if (key === unicode_1.UNICODES.ENTER) {
                        resolve({ finish: true, idx, idxSet });
                        return;
                    }
                    if (key === unicode_1.UNICODES.EXIT) {
                        reject(new Error('kill process with ctrl+c'));
                        return;
                    }
                    if (key === unicode_1.UNICODES.SPACE) {
                        if (idxSet.has(idx)) {
                            idxSet.delete(idx);
                        }
                        else {
                            idxSet.add(idx);
                        }
                        resolve({ finish: false, idx, idxSet });
                        return;
                    }
                    let newIdx = idx;
                    if (key === unicode_1.UNICODES.ANSI_ESCAPE.CURSOR.UP) {
                        newIdx = idx - 1;
                    }
                    if (key === unicode_1.UNICODES.ANSI_ESCAPE.CURSOR.DOWN) {
                        newIdx = idx + 1;
                    }
                    resolve({ finish: false, idx: newIdx, idxSet });
                })
                    .setRawMode(true)
                    .resume();
            });
        });
    }
}
exports.Stdio = Stdio;
