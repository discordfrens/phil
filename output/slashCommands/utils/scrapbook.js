"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const SlashCommand_1 = __importDefault(require("../../structures/SlashCommand"));
const providers_1 = require("../../utils/providers");
exports.default = new SlashCommand_1.default({
    name: 'scrapbook',
    description: `Search the scrap book....`,
    options: [
        {
            name: 'post',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            description: 'Search for a scrapbook post...',
            options: [
                {
                    name: 'message_id',
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    description: 'The posts message id in #scrapbook',
                    required: true,
                },
            ],
        },
        {
            name: 'user',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            description: 'Search for a scrapbook user...',
            options: [
                {
                    name: 'user',
                    type: discord_js_1.ApplicationCommandOptionType.User,
                    description: 'The user...',
                    required: true,
                },
            ],
        },
    ],
    main: async ({ args, client, ctx }) => {
        const subCommand = args.getSubcommand();
        switch (subCommand.toLowerCase()) {
            case 'post':
                const messageId = args.getString('message_id');
                const { data, error } = await providers_1.supabase
                    .from('scrapbook')
                    .select('*').eq("message_id", messageId);
                let post = data && data.length > 0
                    ? data[0]
                    : null;
                if (error)
                    return ctx
                        .reply({
                        content: `Failed to fetch scrapbook data!`,
                        ephemeral: true,
                    })
                        .catch(() => null);
                if (!post)
                    return ctx
                        .reply({
                        content: `Failed to locate post with message id of \`${messageId}\`!`,
                        ephemeral: true,
                    })
                        .catch(() => null);
                return ctx
                    .reply({
                    content: `https://discordfrens.netlify.app/scrapbook/post/${post.message_id}`,
                    ephemeral: true,
                })
                    .catch(() => null);
            case "user":
                const userMention = args.getUser('user');
                if (!userMention)
                    return ctx
                        .reply({
                        content: `Please mention a user!`,
                        ephemeral: true,
                    })
                        .catch(() => null);
                const { data: d, error: err } = await providers_1.supabase.from("scrapbook").select("*").eq("author", userMention.id);
                if (err)
                    return ctx
                        .reply({
                        content: `Failed to fetch scrapbook data!`,
                        ephemeral: true,
                    })
                        .catch(() => null);
                if (!d || !d.length)
                    return ctx
                        .reply({
                        content: `This user hasent sent any scraps!`,
                        ephemeral: true,
                    })
                        .catch(() => null);
                return ctx
                    .reply({
                    content: `https://discordfrens.netlify.app/scrapbook/user/${userMention.id}`,
                    ephemeral: true,
                })
                    .catch(() => null);
        }
    },
});
//# sourceMappingURL=scrapbook.js.map