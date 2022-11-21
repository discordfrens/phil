"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const Event_1 = __importDefault(require("../../structures/Event"));
exports.default = new Event_1.default("guildMemberAdd", (member) => {
    const guild = member.guild;
    if (!guild)
        return;
    const channel = guild.channels.cache.find(f => f.id === constants_1.CONFIG.channels.welcome);
    if (!channel)
        return;
    channel.send({
        content: `Welcome <@${member.id}>! `
    });
});
//# sourceMappingURL=memberAdd.js.map