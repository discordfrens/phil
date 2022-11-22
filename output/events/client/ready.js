"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("../..");
const Event_1 = __importDefault(require("../../structures/Event"));
const logger_1 = __importDefault(require("../../utils/logger"));
exports.default = new Event_1.default('ready', () => {
    (0, logger_1.default)(`Client is now online, ${__1.client.user?.tag}`).info();
    __1.client.user?.setActivity({
        type: discord_js_1.ActivityType.Listening,
        name: `#scrapbook`,
    });
});
//# sourceMappingURL=ready.js.map