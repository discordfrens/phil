import { ApplicationCommandOptionType } from 'discord.js'
import { EMOJIS, formatShortDate } from '../../constants'
import PhilEmbed from '../../structures/Embed'
import SlashCommand from '../../structures/SlashCommand'
import { ScrapBookPost } from '../../types'
import { supabase } from '../../utils/providers'

export default new SlashCommand({
    name: 'scrapbook',
    description: `Search the scrap book....`,
    options: [
        {
            name: 'post',
            type: ApplicationCommandOptionType.Subcommand,
            description: 'Search for a scrapbook post...',
            options: [
                {
                    name: 'message_id',
                    type: ApplicationCommandOptionType.String,
                    description: 'The posts message id in #scrapbook',
                    required: true,
                },
            ],
        },
        {
            name: 'user',
            type: ApplicationCommandOptionType.Subcommand,
            description: 'Search for a scrapbook user...',
            options: [
                {
                    name: 'user',
                    type: ApplicationCommandOptionType.User,
                    description: 'The user...',
                    required: true,
                },
            ],
        },
    ],
    main: async ({ args, client, ctx }) => {
        const subCommand = args.getSubcommand()

        switch (subCommand.toLowerCase()) {
            case 'post':
                const messageId = args.getString('message_id')
                const { data, error } = await supabase
                    .from('scrapbook')
                    .select('*')
                    .eq('message_id', messageId)
                let post: ScrapBookPost =
                    data && data.length > 0 ? data[0] : null
                if (error)
                    return ctx
                        .reply({
                            embeds: [
                                new PhilEmbed({
                                    description: `${EMOJIS.badge_failed} Failed to fetch scrapbook data!`,
                                }),
                            ],
                            ephemeral: true,
                        })
                        .catch(() => null)
                if (!post)
                    return ctx
                        .reply({
                            embeds: [
                                new PhilEmbed({
                                    description: `${EMOJIS.badge_failed} Failed to locate post with message id of \`${messageId}\``,
                                }),
                            ],
                            ephemeral: true,
                        })
                        .catch(() => null)

                return ctx
                    .reply({
                        embeds: [
                            new PhilEmbed({
                                description: `${EMOJIS.badge_url} https://discordfrens.netlify.app/scrapbook/post/${post.message_id}`,
                            }),
                        ],
                        ephemeral: true,
                    })
                    .catch(() => null)
            case 'user':
                const userMention = args.getUser('user')
                if (!userMention)
                    return ctx
                        .reply({
                            embeds: [
                                new PhilEmbed({
                                    description: `${EMOJIS.badge_failed} Please mention a user!`,
                                }),
                            ],
                            ephemeral: true,
                        })
                        .catch(() => null)

                const { data: d, error: err } = await supabase
                    .from('scrapbook')
                    .select('*')
                    .eq('author', userMention.id)
                if (err)
                    return ctx
                        .reply({
                            embeds: [
                                new PhilEmbed({
                                    description: `${EMOJIS.badge_failed} Failed to fetch scrapbook data!`,
                                }),
                            ],
                            ephemeral: true,
                        })
                        .catch(() => null)

                if (!d || !d.length)
                    return ctx
                        .reply({
                            embeds: [
                                new PhilEmbed({
                                    description: `${EMOJIS.badge_failed} This user hasent sent any scraps!`,
                                }),
                            ],
                            ephemeral: true,
                        })
                        .catch(() => null)

                return ctx
                    .reply({
                        embeds: [
                            new PhilEmbed({
                                description: `${EMOJIS.badge_discord_blue} **User:** <@${userMention.id}> (\`${userMention.id}\`)\n${EMOJIS.badge_message} **Total:** ${d.length} scraps\n${EMOJIS.badge_url} **Profile:** [here](https://discordfrens.netlify.app/scrapbook/user/${userMention.id})`,
                            }),
                        ],
                        ephemeral: true,
                    })
                    .catch(() => null)
        }
    },
})
