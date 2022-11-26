import Command from '../../../structures/Command'
import { ruleEmbeds, ticketEmbed } from '../../../handlers/embeds'

export default new Command({
    name: 'embeds',
    userPermissions: ['ManageGuild'],
    category: 'admin',
    description: `Send out the general embeds! :nerd:`,
    main: (props) => {
        const type = props.args && props.args.length > 0 ? props.args[0] : null
        if(!type) {
            ruleEmbeds(props.ctx)
            ticketEmbed(props.ctx)
            props.client.commands.get("rr").main(props)
        } else {
            switch (type.toLowerCase()) {
                case "rr":
                    return props.client.commands.get("rr").main(props)
                case "tickets":
                    return ticketEmbed(props.ctx)
                case "rules": 
                    return ruleEmbeds(props.ctx)
            }
        }
    },
})
