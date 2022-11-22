"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrapbook_1 = require("../../handlers/scrapbook");
const Event_1 = __importDefault(require("../../structures/Event"));
exports.default = new Event_1.default("messageDelete", (message) => {
    if (!message.guild || !message.author || message.author.bot)
        return;
    (0, scrapbook_1.removeDeletedMessage)(message);
});
//# sourceMappingURL=messageDelete.js.map