import {
    ChatInputApplicationCommandData,
    ColorResolvable,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    Message,
    PermissionResolvable,
} from 'discord.js'
import Phil from './structures/Client'
import SubCommand from './structures/SubCommand'

export type Config = {
    server_id: string
    prefix: string
    roles: {
        muted: string;
        booster: string;
        discord_blue: string;
        moderator: string;
    }
    channels: {
        logs: string
        roles: string
        welcome: string
        rules: string
        scrapbook: string
        open_source: string
        tickets: string
    }
    reaction_roles: {
        group: string
        max?: number
        banner: string
        color: number
        select?: boolean
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

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember
}

export type SlashCommandArguments = {
    client: Phil
    ctx: ExtendedInteraction
    args: CommandInteractionOptionResolver
}

export type SlashCommandOptions = {
    userPermissions?: PermissionResolvable[]
    main: (options: SlashCommandArguments) => any
} & ChatInputApplicationCommandData

export type ScrapBookPost = {
    id: string
    author: string
    created_at: string
    content: string
    media: ScrapBookPostMedia[]
    message_id: number
    author_avatar: string
    author_name: string
}

export type ScrapBookPostMedia = {
    url: string
    type: string
    height: number
    size: number
    width: number
}

export type SupabaseUserTable = {
    id: number;
    created_at: Date;
    infractions: Infraction[];
    user_id: string;
}

export type Infraction = {
    type: "mute" | "warn" | "ban" | "kick" | "unmute" | "unban";
    id: string;
    reason: string;
    timestamp: number;
    moderatorId: string;
    length?: number
}


export type Ticket = {
    timestamp: number;
    user_id: string;
    channel_id: string;
    locked: boolean;
    members: string[]
}
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string
        }
    }
}
