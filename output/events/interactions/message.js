"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const constants_1 = require("../../constants");
const scrapbook_1 = __importDefault(require("../../handlers/scrapbook"));
const Event_1 = __importDefault(require("../../structures/Event"));
const utils_1 = require("../../utils/utils");
exports.default = new Event_1.default('messageCreate', async (message) => {
    if (!message.author || !message.guild || message.author.bot)
        return;
    if (message.content.split(" ").includes("W")) {
        message.react("<:wkey:1044742922773471262>");
    }
    (0, scrapbook_1.default)(message);
    const data = constants_1.CONFIG;
    if (!message.content.toLowerCase().startsWith(data.prefix))
        return;
    const [command_name, ...args] = message.content
        .slice(data.prefix.length)
        .trim()
        .split(/ +/g);
    if (!command_name)
        return;
    const command = __1.client.commands.find((f) => f.name.toLowerCase() === command_name.toLowerCase());
    if (!command)
        return;
    if (command.botPermissions) {
        if (!(0, utils_1.permissionHandler)(command.botPermissions).bot(message.guild.members.cache.find((f) => f.id === __1.client.user.id)))
            return;
    }
    if (command.userPermissions) {
        if (!(0, utils_1.permissionHandler)(command.botPermissions).user(message.guild.members.cache.find((f) => f.id === message.author.id)))
            return;
    }
    const props = {
        args: args,
        client: __1.client,
        ctx: message,
        flags: {},
        config: data,
    };
    if (command.subCommands && command.subCommands.length > 0) {
        const subCommand_name = args[0];
        const subCommand = command.subCommands.find((f) => f.name.toLowerCase() === subCommand_name?.toLowerCase());
        if (!subCommand)
            return command.main({
                subCommands: command.subCommands ? command.subCommands : null,
                ...props,
            });
        if (subCommand.botPermissions) {
            if (!(0, utils_1.permissionHandler)(command.botPermissions).bot(message.guild.members.cache.find((f) => f.id === __1.client.user.id)))
                return;
        }
        if (subCommand.userPermissions) {
            if (!(0, utils_1.permissionHandler)(command.botPermissions).user(message.guild.members.cache.find((f) => f.id === message.author.id)))
                return;
        }
        props['args'] = args.slice(1);
        subCommand.main(props);
    }
    else {
        command.main({
            subCommands: command.subCommands ? command.subCommands : null,
            ...props,
        });
    }
});
//# sourceMappingURL=message.js.map