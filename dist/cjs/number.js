"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberSerializer = void 0;
class NumberSerializer {
    constructor(min, max) {
        if (min > max)
            throw new Error('min value is grater than max value');
        this.min = min;
        this.max = max;
    }
    serialize(value, isNaN = this.min) {
        let v = value;
        if (Number.isNaN(v)) {
            if (isNaN instanceof Error) {
                throw isNaN;
            }
            v = isNaN;
        }
        return Math.min(Math.max(v, this.min), this.max);
    }
}
exports.NumberSerializer = NumberSerializer;
