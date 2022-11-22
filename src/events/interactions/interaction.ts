import Event from '../../structures/Event'
import { handleInteraction } from '../../handlers/reactionRole'
import { client } from '../..'
import { ExtendedInteraction } from '../../types'
import { CommandInteractionOptionResolver } from 'discord.js'

export default new Event('interactionCreate', (int) => {
    if(int.isCommand()) {
        const commandName = int.commandName
        const command = client.slashCommands.find(f => f.name.toLowerCase() === commandName.toLowerCase())
        if(!command) return;
        int.member = int.guild.members.cache.find(f => f.id === int.user.id)
        command.main({
            args: int.options as CommandInteractionOptionResolver,
            client: client,
            ctx: int as ExtendedInteraction
        })
    }
    handleInteraction(int)
})
