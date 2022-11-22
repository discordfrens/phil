"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ruleEmbeds = void 0;
const constants_1 = require("../constants");
const Embed_1 = __importDefault(require("../structures/Embed"));
const ruleEmbeds = (ctx) => {
    const rulesChannel = ctx.guild.channels.cache.find(f => f.id === constants_1.CONFIG.channels.rules);
    if (!rulesChannel)
        return;
    rulesChannel.send({
        content: `**Rules**\n\n${constants_1.Rules.map((z) => `– ${z}`).join("\n")}\n`,
        embeds: [new Embed_1.default({ image: { url: constants_1.ruleBanner }, color: constants_1.COLORS.all.blue })]
    });
};
exports.ruleEmbeds = ruleEmbeds;
//# sourceMappingURL=embeds.js.map