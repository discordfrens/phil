import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js'
import { delete_warn, warn } from '../../handlers/infractions'
import SlashCommand from '../../structures/SlashCommand'

export default new SlashCommand({
    name: 'warn',
    options: [
        {
            name: 'add',
            type: ApplicationCommandOptionType.Subcommand,
            description: 'Warn a member',
            options: [
                {
                    name: 'member',
                    type: ApplicationCommandOptionType.User,
                    description: 'The member',
                    required: true,
                },
                {
                    name: 'reason',
                    type: ApplicationCommandOptionType.String,
                    description: 'The reasoning behind the warn',
                },
                {
                    name: 'notify',
                    type: ApplicationCommandOptionType.Boolean,
                    description: 'Try to notify the user or not',
                },
            ],
        },
        {
            name: 'delete',
            type: ApplicationCommandOptionType.Subcommand,
            description: 'delete a warning',
            options: [
                {
                    name: 'id',
                    type: ApplicationCommandOptionType.String,
                    description: 'the warning id',
                    required: true,
                },
                {
                    name: 'reason',
                    type: ApplicationCommandOptionType.String,
                    description: 'deletion reasoning',
                },
            ],
        },
    ],
    defaultMemberPermissions: [PermissionFlagsBits.ManageMessages],
    description: 'Warn a member',
    main: async (props) => {
        const subCommand = props.args.getSubcommand().toLowerCase()
        switch (subCommand) {
          case "add":
            return warn(props)
          case "delete":
            return delete_warn(props)
        }
    },
})
