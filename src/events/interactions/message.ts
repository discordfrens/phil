import { client } from '../..'
import { CONFIG } from '../../constants'
import scrapbook from '../../handlers/scrapbook'
import Event from '../../structures/Event'
import { permissionHandler } from '../../utils/utils'

export default new Event('messageCreate', async (message) => {
    if (!message.author || !message.guild || message.author.bot) return
    if(message.content.split(" ").includes("W")) {
        message.react("<:wkey:1044742922773471262>")
    }
    scrapbook(message)
    const data = CONFIG
    if (!message.content.toLowerCase().startsWith(data.prefix)) return
    const [command_name, ...args] = message.content
        .slice(data.prefix.length)
        .trim()
        .split(/ +/g)

    if (!command_name) return
    const command = client.commands.find(
        (f) => f.name.toLowerCase() === command_name.toLowerCase()
    )

    if (!command) return
    if (command.botPermissions) {
        if (
            !permissionHandler(command.botPermissions).bot(
                message.guild.members.cache.find((f) => f.id === client.user.id)
            )
        )
            return
    }
    if (command.userPermissions) {
        if (
            !permissionHandler(command.botPermissions).user(
                message.guild.members.cache.find(
                    (f) => f.id === message.author.id
                )
            )
        )
            return
    }
    const props = {
        args: args,
        client: client,
        ctx: message,
        flags: {},
        config: data,
    }
    if (command.subCommands && command.subCommands.length > 0) {
        const subCommand_name = args[0]
        const subCommand = command.subCommands.find(
            (f) => f.name.toLowerCase() === subCommand_name?.toLowerCase()
        )
        if (!subCommand)
            return command.main({
                subCommands: command.subCommands ? command.subCommands : null,
                ...props,
            })
        if (subCommand.botPermissions) {
            if (
                !permissionHandler(command.botPermissions).bot(
                    message.guild.members.cache.find(
                        (f) => f.id === client.user.id
                    )
                )
            )
                return
        }
        if (subCommand.userPermissions) {
            if (
                !permissionHandler(command.botPermissions).user(
                    message.guild.members.cache.find(
                        (f) => f.id === message.author.id
                    )
                )
            )
                return
        }
        props['args'] = args.slice(1)
        subCommand.main(props)
    } else {
        command.main({
            subCommands: command.subCommands ? command.subCommands : null,
            ...props,
        })
    }
})
