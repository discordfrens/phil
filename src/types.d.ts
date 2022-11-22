import { Message, PermissionResolvable } from 'discord.js'
import Phil from './structures/Client'
import SubCommand from './structures/SubCommand'

export type Config = {
    server_id: string
    prefix: string
    channels: {
        logs: string
        roles: string
        welcome: string
    }
    reaction_roles: {
        group: string
        roles: ReactionRole[]
    }[]
}

export type ReactionRole = {
    id: string
    name: string
    emoji?: string
    href?: string
}

export type O<T = any> = {
    [key: string]: T
}

export type CommandArguments = {
    client: Phil
    ctx: Message<boolean>
    args: string[]
    flags: O<string | boolean>
    subCommands?: SubCommandProperties[]
    config: GuildConfig
}

export type CommandProperties = {
    name: string
    description?: string
    category?: string
    subCommands?: SubCommandProperties[]
    userPermissions?: PermissionResolvable[]
    botPermissions?: PermissionResolvable[]
    main: (props: CommandArguments) => any
}

export type SubCommandProperties = {
    name: string
    description?: string
    userPermissions?: PermissionResolvable[]
    botPermissions?: PermissionResolvable[]
    main: (props: CommandArguments) => any
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string
        }
    }
}
