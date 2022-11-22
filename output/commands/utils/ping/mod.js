"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../../structures/Command"));
exports.default = new Command_1.default({
    name: 'ping',
    main: async ({ ctx, args, client }) => {
        let then = Date.now();
        return ctx.reply({
            content: `Pong! \`${client.ws.ping}\`ms`,
        });
    },
});
//# sourceMappingURL=mod.js.map