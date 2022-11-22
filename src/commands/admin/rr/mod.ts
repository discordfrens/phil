import Command from '../../../structures/Command'
import { sendEmbeds } from '../../../handlers/reactionRole'

export default new Command({
    name: 'rr',
    userPermissions: ['ManageGuild'],
    category: 'admin',
    description: `Send out the reaction roles! :nerd:`,
    main: ({ args, client, config, ctx, flags, subCommands }) => {
        sendEmbeds(ctx)
    },
})
