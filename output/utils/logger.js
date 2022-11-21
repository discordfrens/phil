"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
exports.default = (msg) => {
    return {
        warn: () => {
            console.log(`${chalk_1.default.yellowBright("phil")} ${msg}`);
        },
        info: () => {
            console.log(`${chalk_1.default.cyanBright("phil")} ${msg}`);
        },
        error: (exit) => {
            console.log(`${chalk_1.default.redBright("phil")} ${msg}`);
            if (exit) {
                process.exit(0);
            }
        },
        api: () => {
            console.log(`${chalk_1.default.magentaBright("phil")} ${msg}`);
        }
    };
};
//# sourceMappingURL=logger.js.map