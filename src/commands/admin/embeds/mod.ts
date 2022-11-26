import Command from '../../../structures/Command'
import { ruleEmbeds, ticketEmbed } from '../../../handlers/embeds'

export default new Command({
    name: 'embeds',
    userPermissions: ['ManageGuild'],
    category: 'admin',
    description: `Send out the general embeds! :nerd:`,
    main: (props) => {
        ruleEmbeds(props.ctx)
        ticketEmbed(props.ctx)
        props.client.commands.get("rr").main(props)
    },
})
