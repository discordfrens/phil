import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js'
import { ban, unban } from '../../handlers/infractions'
import SlashCommand from '../../structures/SlashCommand'

export default new SlashCommand({
    name: 'unban',
    defaultMemberPermissions: [PermissionFlagsBits.BanMembers],
    description: 'Unban a banned member',
    options: [
      { name: "member", type: ApplicationCommandOptionType.String, description: "The members id", required: true },
      { name: "reason", type: ApplicationCommandOptionType.String, description: "The reasoning behind the ban"},
    ],
    main: async (props) => {
      return unban(props)
    },
})
