import { ApplicationCommandOptionType, ChannelType } from 'discord.js'
import { lock_ticket } from '../../handlers/tickets'
import SlashCommand from '../../structures/SlashCommand'

export default new SlashCommand({
    name: 'ticket',
    description: 'Ticket handling',
    defaultMemberPermissions: ['ManageChannels'],
    options: [
        {
          name: "lock",
          type :ApplicationCommandOptionType.Subcommand,
          description: "Lock/unlock a ticket",
          options: [
            {
              name: 'channel',
              type: ApplicationCommandOptionType.Channel,
              description: 'the ticket channel.',
              required: true,
              channelTypes: [ChannelType.GuildText],
          },
          {
              name: 'lock',
              type: ApplicationCommandOptionType.Boolean,
              description: 'Lock a ticket or not.',
              required: false,
          },
          ]
        }
    ],
    main: async (props) => {
      const subCommand = props.args.getSubcommand().toLowerCase()
      switch (subCommand) {
        case "lock":
          return lock_ticket(props)
      }
    },
})
