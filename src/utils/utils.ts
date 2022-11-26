import { promisify } from 'util'
import glob from 'glob'
import { Guild, GuildMember, Message, PermissionResolvable } from 'discord.js'
import { client } from '..'

export const globPromise = async (filePath: string): Promise<string[]> => {
    const gp = promisify(glob)
    const files = (await gp(filePath)) as string[]
    return files
}

export const permissionHandler = (permissions: PermissionResolvable[]) => {
    return {
        bot: (client_member: GuildMember) => {
            if (
                client_member.permissions.has('Administrator') ||
                client_member.permissions.has(permissions)
            )
                return true
            return
        },
        user: (client_member: GuildMember) => {
            if (
                client_member.permissions.has('Administrator') ||
                client_member.permissions.has(permissions)
            )
                return true
            return
        },
    }
}

export const async = (cb: (res: (any) => any, rej: (any) => any) => any) => {
    return new Promise((res, rej) => {
        cb(res, rej)
        res(0)
    })
}

export const getUser = (userId: string, ctx: Message) => {
    if (!userId) return
    return (
        ctx.mentions.members.first() ||
        ctx.guild.members.cache.find(
            (f) =>
                f.id === userId ||
                f.user.tag.toLowerCase() === userId.toLowerCase() ||
                f.user.username.toLowerCase() === userId.toLowerCase()
        ) ||
        ctx.guild.members.cache.find((f) =>
            f.nickname
                ? f.nickname.toLowerCase() === userId.toLowerCase()
                : false
        )
    )
}


export const id = (length: number = 35) => {
    let str = ''
    let chars =
        'QWERTYUIOPQASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890'
    const date = Date.now().toString().split('')
    for (let i = 0; i < length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        str += `${date[i] ? date[i] : ''}${char}`
    }
    return str
}

export const isAdminOrMod = (user: GuildMember, guild: Guild) => {
    const c = guild.members.cache.find((f) => f.id === client.user.id)
    return (
        user.permissions.has('Administrator') ||
        user.permissions.has('ManageGuild') ||
        user.roles.highest.position > c.roles.highest.position
    )
}
