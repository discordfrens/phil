"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const constants_1 = require("../../constants");
const Event_1 = __importDefault(require("../../structures/Event"));
const utils_1 = require("../../utils/utils");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)(process.env['Supabase_URL'], process.env['Supabase_Service_Role']);
exports.default = new Event_1.default('messageCreate', async (message) => {
    if (!message.author || !message.guild || message.author.bot)
        return;
    if (message.channelId === '1044384359110676531') {
        const { error } = await supabase
            .from('scrapbook')
            .insert({
            author: message.author.id,
            author_avatar: message.author.displayAvatarURL(),
            author_name: message.author.username,
            message_id: message.id,
            content: message.content,
            media: message.attachments.map(a => {
                return {
                    url: a.url,
                    type: a.contentType,
                    size: a.size,
                    height: a.height,
                    width: a.width,
                };
            })
        });
        if (error)
            return message.reply("```" + error.message + "```");
        if (!message.hasThread) {
            message.startThread({
                name: message?.cleanContent || message.author.username,
                autoArchiveDuration: 10080,
                reason: 'Scrapbook'
            });
        }
    }
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