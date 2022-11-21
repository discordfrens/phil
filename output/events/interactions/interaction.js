"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../structures/Event"));
const rr_1 = require("../../utils/rr");
exports.default = new Event_1.default("interactionCreate", (int) => {
    (0, rr_1.handleInteraction)(int);
});
//# sourceMappingURL=interaction.js.map