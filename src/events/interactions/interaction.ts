import Event from '../../structures/Event'
import { handleInteraction } from '../../handlers/reactionRole'
import { client } from '../..'
import { ExtendedInteraction } from '../../types'
import { CommandInteractionOptionResolver } from 'discord.js'
import { close_ticket, handleButton } from '../../handlers/tickets'

export default new Event('interactionCreate', (int) => {
    int.member = int.guild.members.cache.find(f => f.id === int.user.id)
    if(int.isCommand()) {
        const commandName = int.commandName
        const command = client.slashCommands.find(f => f.name.toLowerCase() === commandName.toLowerCase())
        if(!command) return;
        command.main({
            args: int.options as CommandInteractionOptionResolver,
            client: client,
            ctx: int as ExtendedInteraction
        })
    }
    if(int.isButton() && int.customId === "create_ticket") {
        handleButton(int)
    }
    if(int.isButton() && int.customId === "close_ticket") {
        close_ticket(int)
    }
    handleInteraction(int)
})
