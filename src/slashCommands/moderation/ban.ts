import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js'
import { ban } from '../../handlers/infractions'
import SlashCommand from '../../structures/SlashCommand'

export default new SlashCommand({
    name: 'ban',
    defaultMemberPermissions: [PermissionFlagsBits.BanMembers],
    description: 'Ban a member',
    options: [
      { name: "member", type: ApplicationCommandOptionType.User, description: "The member", required: true },
      { name: "reason", type: ApplicationCommandOptionType.String, description: "The reasoning behind the ban"},
      { name: "notify", type: ApplicationCommandOptionType.Boolean, description: "Try to notify the user or not"}
    ],
    main: async (props) => {
      return ban(props)
    },
})
