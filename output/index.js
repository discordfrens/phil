"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require("dotenv/config");
const Client_1 = __importDefault(require("./structures/Client"));
exports.client = new Client_1.default();
//# sourceMappingURL=index.js.map