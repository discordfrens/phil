"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../../structures/Command"));
const reactionRole_1 = require("../../../handlers/reactionRole");
exports.default = new Command_1.default({
    name: 'rr',
    userPermissions: ['ManageGuild'],
    category: 'admin',
    description: `Send out the reaction roles! :nerd:`,
    main: ({ args, client, config, ctx, flags, subCommands }) => {
        (0, reactionRole_1.sendEmbeds)(ctx);
    },
});
//# sourceMappingURL=mod.js.map