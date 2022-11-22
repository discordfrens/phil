"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../../structures/Command"));
const embeds_1 = require("../../../handlers/embeds");
exports.default = new Command_1.default({
    name: 'embeds',
    userPermissions: ['ManageGuild'],
    category: 'admin',
    description: `Send out the general embeds! :nerd:`,
    main: (props) => {
        (0, embeds_1.ruleEmbeds)(props.ctx);
        props.client.commands.get("rr").main(props);
    },
});
//# sourceMappingURL=mod.js.map