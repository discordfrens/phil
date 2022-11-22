"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../../structures/Command"));
const rr_1 = require("../../../utils/rr");
exports.default = new Command_1.default({
    name: 'rr',
    userPermissions: ['ManageGuild'],
    category: 'admin',
    description: `Send out the reaction roles! :nerd:`,
    main: ({ args, client, config, ctx, flags, subCommands }) => {
        (0, rr_1.sendEmbeds)(ctx);
    },
});
//# sourceMappingURL=mod.js.map