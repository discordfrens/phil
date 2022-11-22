"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../../structures/Event"));
const reactionRole_1 = require("../../handlers/reactionRole");
const __1 = require("../..");
exports.default = new Event_1.default('interactionCreate', (int) => {
    if (int.isCommand()) {
        const commandName = int.commandName;
        const command = __1.client.slashCommands.find(f => f.name.toLowerCase() === commandName.toLowerCase());
        if (!command)
            return;
        int.member = int.guild.members.cache.find(f => f.id === int.user.id);
        command.main({
            args: int.options,
            client: __1.client,
            ctx: int
        });
    }
    (0, reactionRole_1.handleInteraction)(int);
});
//# sourceMappingURL=interaction.js.map