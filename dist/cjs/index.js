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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
if (require.main === module) {
    getRootDir().then(console.log).catch(console.error);
}
function getRootDir(directory = process.cwd()) {
    return __awaiter(this, void 0, void 0, function* () {
        if (directory === '/') {
            throw new Error("can't find root directory");
        }
        if (!(yield isRoot(directory))) {
            return yield getRootDir(path_1.default.resolve(directory, '..'));
        }
        return directory;
    });
}
function isRoot(directory) {
    return __awaiter(this, void 0, void 0, function* () {
        const packageJsonPath = path_1.default.resolve(directory, 'package.json');
        try {
            yield fs_1.default.promises.access(packageJsonPath, fs_1.default.constants.R_OK | fs_1.default.constants.W_OK);
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
