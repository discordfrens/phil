"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const constants_1 = require("../constants");
class PhilEmbed {
    constructor(data) {
        return new discord_js_1.EmbedBuilder({
            color: data.color || constants_1.COLOR.resolved,
            ...data
        });
    }
}
exports.default = PhilEmbed;
//# sourceMappingURL=Embed.js.map