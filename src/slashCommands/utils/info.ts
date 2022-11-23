import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js'
import { EMOJIS } from '../../constants'
import PhilEmbed from '../../structures/Embed'
import SlashCommand from '../../structures/SlashCommand'
import { SlashCommandArguments } from '../../types'

export default new SlashCommand({
    name: 'info',
    description: 'View information on a certain thing...',
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.Subcommand,
            description: 'View information on a certain user',
            options: [
                {
                    name: 'mention',
                    type: ApplicationCommandOptionType.User,
                    description: 'A mentioned user',
                    required: true
                },
            ],
        },
        {
            name: 'server',
            type: ApplicationCommandOptionType.Subcommand,
            description: 'View information on the server',
        },
    ],
    main: async (props) => {
        const subCommand = props.args.getSubcommand().toLowerCase()
        switch (subCommand) {
            case 'user':
                return user(props)
            case 'server':
                return server(props)
        }
    },
})

const server = ({ args, client, ctx }: SlashCommandArguments) => {
    const serverBoostLevel = {
        0: 'None',
        1: 'Tier 1',
        2: 'Tier 2',
        3: 'Tier 3',
    }
    const {
        ownerId,
        id,
        createdTimestamp,
        memberCount,
        name,
        partnered,
        verified,
        premiumTier,
        premiumSubscriptionCount,
        maximumMembers,
        roles
    } = ctx.guild


    const boostLevel = serverBoostLevel[premiumTier]
    const banner = ctx.guild.banner ? ctx.guild.bannerURL({size: 2048}) : null
    const icon = ctx.guild.icon ? ctx.guild.iconURL() : null
    const owner = ctx.guild.members.cache.find(f => f.id === ownerId)
    const r = roles.cache.filter(f => f.id !== ctx.guild.id).map((r) => `<@&${r.id}>`)
    return ctx.reply({
      ephemeral: true,
      embeds: [
          new PhilEmbed({
              title: `${name} (${id})`,
              thumbnail: {
                url: icon
              },
              image: {
                url: banner
              },
              description: `>>> **Owner:** <@${owner.id}> (${owner.id})\n **Created:** <t:${Math.floor(createdTimestamp/1000)}:F>\n **Member Count:** ${memberCount}/${maximumMembers}\n **Boost:** ${boostLevel} (${premiumSubscriptionCount})\n **Badges:**\n_ _ - Partnered: ${partnered ? EMOJIS.badge_partner : EMOJIS.badge_failed}\n_ _ - Verified: ${verified ? EMOJIS.badge_success : EMOJIS.badge_failed}\n**Roles ${r.length > 15 ? `(${r.length-15} more)` : ""}:**\n ${r.slice(0,15).join(" ")}`
          }),
      ],
  })

}

const user = ({ args, client, ctx }: SlashCommandArguments) => {
    const user = args.getUser('mention')
    if (!user)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Failed to locate mentioned user, are you sure they are in frens?`,
                }),
            ],
        })
    const member = ctx.guild.members.cache.find((f) => f.id === user.id)
    if (!member)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Failed to locate mentioned user, are you sure they are in frens?`,
                }),
            ],
        })
    const { bot, tag, id, createdTimestamp } = user
    const { joinedTimestamp, roles, premiumSinceTimestamp } = member
    const iconUrl = user.avatarURL()
    const bannerUrl = user.bannerURL()
    return ctx.reply({
        ephemeral: true,
        embeds: [
            new PhilEmbed({
                author: {
                    name: `${tag} (${id})`,
                    iconURL: iconUrl,
                },
                thumbnail: {
                    url: iconUrl,
                },
                image: {
                    url: bannerUrl,
                },
                description: `>>> **Joined:** <t:${Math.floor(
                    joinedTimestamp / 1000
                )}:F>\n **Created:** <t:${Math.floor(
                    createdTimestamp / 1000
                )}:F>\n **Boosted:** ${
                    premiumSinceTimestamp
                        ? `<t:${Math.floor(joinedTimestamp / 1000)}:F>`
                        : `*Not a booster*`
                }\n **Bot:** ${
                    bot ? EMOJIS.badge_bot : EMOJIS.badge_discord_blue
                }\n **Roles (${roles.cache.size}):** ${roles.cache
                    .filter((f) => f.id !== ctx.guild.id)
                    .map((r) => `<@&${r.id}>`)
                    .join(' ')}`,
            }),
        ],
    })
}
