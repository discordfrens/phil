import { CONFIG, EMOJIS } from '../constants'
import PhilEmbed from '../structures/Embed'
import { Infraction, SlashCommandArguments, SupabaseUserTable } from '../types'
import ms, { StringValue } from '../utils/ms'
import { supabase } from '../utils/providers'
import { id } from '../utils/utils'

export const warn = async ({ args, client, ctx }: SlashCommandArguments) => {
    const userMention = args.getUser('member')
    const reason = args.getString('reason') || 'No reason provided'
    const notify = args.getBoolean('notify')
    if (!userMention)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Please mention a member.`,
                }),
            ],
        })
    const { error } = await supabase.from('infractions').insert({
        type: 'warn',
        inf_id: id(),
        reason: reason,
        timestamp: Date.now(),
        moderatorId: ctx.member.id,
        user_id: userMention.id,
    })
    if (error)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Failed to insert this users warning.`,
                }),
            ],
        })
    if (notify) {
        userMention
            .send({
                embeds: [
                    new PhilEmbed({
                        description: `${EMOJIS.badge_message} You have been warned in **${ctx.guild.name}**.`,
                    }),
                ],
            })
            .catch(() => null)
    }
    return ctx.reply({
        ephemeral: true,
        embeds: [
            new PhilEmbed({
                description: `${EMOJIS.badge_success} Successfully warning **${userMention.tag}** (\`${userMention.id}\`).`,
            }),
        ],
    })
}

export const mute = async ({ args, client, ctx }: SlashCommandArguments) => {
    const userMention = ctx.guild.members.cache.find(
        (f) => f.id === args.getUser('member').id
    )
    const reason = args.getString('reason') || 'No reason provided'
    const notify = args.getBoolean('notify')
    const highestClientRole = ctx.guild.members.cache.find(
        (f) => f.id === client.user.id
    ).roles.highest.position
    const length = args.getString('length')
        ? ms(`${args.getString('length') as StringValue}`)
        : null
    const mutedRole = ctx.guild.roles.cache.find(
        (f) => f.id === CONFIG.roles.muted
    )
    if (!userMention)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Please mention a member.`,
                }),
            ],
        })
    if (!mutedRole)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Failed to locate muted role; exited mute.`,
                }),
            ],
        })
    if (
        highestClientRole <= userMention.roles.highest.position ||
        userMention.permissions.has('BanMembers') ||
        userMention.permissions.has('KickMembers')
    )
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Failed to mute this user, appears they are a mod/admin.`,
                }),
            ],
        })
    const { error } = await supabase.from('infractions').insert({
        type: 'mute',
        inf_id: id(),
        reason: reason,
        timestamp: Date.now(),
        moderatorId: ctx.member.id,
        user_id: userMention.id,
        length: length,
    })
    if (error)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Failed to insert this users mute.`,
                }),
            ],
        })

    if (length) {
        userMention.timeout(length, reason).catch(() => null)
    }

    userMention.roles.add(mutedRole).catch(() => null)

    if (notify) {
        userMention
            .send({
                embeds: [
                    new PhilEmbed({
                        description: `${
                            EMOJIS.badge_message
                        } You have been muted in **${ctx.guild.name}**. ${
                            length ? `For ${ms(length, { long: true })}` : ''
                        }`,
                    }),
                ],
            })
            .catch(() => null)
    }
    return ctx.reply({
        ephemeral: true,
        embeds: [
            new PhilEmbed({
                description: `${EMOJIS.badge_success} Successfully muted **${
                    userMention.user.tag
                }** (\`${userMention.id}\`). ${
                    length ? `For ${ms(length, { long: true })}` : ''
                }`,
            }),
        ],
    })
}

export const unmuted = async ({ args, client, ctx }: SlashCommandArguments) => {
    const userMention = ctx.guild.members.cache.find(
        (f) => f.id === args.getUser('member').id
    )
    const reason = args.getString('reason') || 'No reason provided'
    const notify = args.getBoolean('notify')
    const mutedRole = ctx.guild.roles.cache.find(
        (f) => f.id === CONFIG.roles.muted
    )
    if (!userMention)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Please mention a member.`,
                }),
            ],
        })
    if (!mutedRole)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Failed to locate muted role; exited unmute.`,
                }),
            ],
        })
    const { error: e } = await supabase
        .from('infractions')
        .select('*')
        .eq('user_id', userMention.id)
        .eq('type', 'mute')
    if (e)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Failed to check if **${userMention.user.tag}** is muted.`,
                }),
            ],
        })

    if (!userMention.roles.cache.has(mutedRole.id))
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} It appears **${userMention.user.tag}** is not muted.`,
                }),
            ],
        })
    const { error } = await supabase.from('infractions').insert({
        type: 'unmute',
        inf_id: id(),
        reason: reason,
        timestamp: Date.now(),
        moderatorId: ctx.member.id,
        user_id: userMention.id,
    })
    if (error)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Failed to insert this users unmute.`,
                }),
            ],
        })
    userMention.timeout(null, reason).catch(() => null)
    if (userMention.roles.cache.has(mutedRole.id)) {
        userMention.roles.remove(mutedRole)
    }
    if (notify) {
        userMention
            .send({
                embeds: [
                    new PhilEmbed({
                        description: `${EMOJIS.badge_message} You have been manually unmuted in **${ctx.guild.name}**.`,
                    }),
                ],
            })
            .catch(() => null)
    }
    return ctx.reply({
        ephemeral: true,
        embeds: [
            new PhilEmbed({
                description: `${EMOJIS.badge_success} Successfully unmuted **${userMention.user.tag}** (\`${userMention.id}\`).`,
            }),
        ],
    })
}

export const ban = async ({ args, client, ctx }: SlashCommandArguments) => {
    const userMention = ctx.guild.members.cache.find(
        (f) => f.id === args.getUser('member').id
    )
    const reason = args.getString('reason') || 'No reason provided'
    const notify = args.getBoolean('notify')
    const highestClientRole = ctx.guild.members.cache.find(
        (f) => f.id === client.user.id
    ).roles.highest.position
    if (!userMention)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Please mention a member.`,
                }),
            ],
        })
    if (
        highestClientRole <= userMention.roles.highest.position ||
        userMention.permissions.has('BanMembers') ||
        userMention.permissions.has('KickMembers')
    )
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Failed to ban this user, appears they are a mod/admin.`,
                }),
            ],
        })
    userMention
        .ban({
            deleteMessageSeconds: 604800,
            reason: reason,
        })
        .catch(() => {
            return ctx.reply({
                ephemeral: true,
                embeds: [
                    new PhilEmbed({
                        description: `${EMOJIS.badge_failed} Failed to ban this member.`,
                    }),
                ],
            })
        })
    const { error } = await supabase.from('infractions').insert({
        type: 'ban',
        inf_id: id(),
        reason: reason,
        timestamp: Date.now(),
        moderatorId: ctx.member.id,
        user_id: userMention.id,
    })
    if (error)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Failed to insert this users ban.`,
                }),
            ],
        })
    if (notify) {
        userMention
            .send({
                embeds: [
                    new PhilEmbed({
                        description: `${EMOJIS.badge_message} You have been banned in **${ctx.guild.name}**.`,
                    }),
                ],
            })
            .catch(() => null)
    }

    return ctx.reply({
        ephemeral: true,
        embeds: [
            new PhilEmbed({
                description: `${EMOJIS.badge_success} Successfully banned **${userMention.user.tag}**.`,
            }),
        ],
    })
}

export const unban = async ({ args, client, ctx }: SlashCommandArguments) => {
    const userId = args.getString('member')
    const reason = args.getString('reason') || 'No reason provided'
    const banned = ctx.guild.bans.cache.find((f) => f.user.id === userId)
    if (!banned)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} It appears that \`${userId}\` is not currently banned.`,
                }),
            ],
        })
    ctx.guild.members.unban(banned.user.id, reason).catch(() => {
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Failed to unban user \`${userId}\`.`,
                }),
            ],
        })
    })

    const { error } = await supabase.from('infractions').insert({
        type: 'unban',
        inf_id: id(),
        reason: reason,
        timestamp: Date.now(),
        moderatorId: ctx.member.id,
        user_id: userId,
    })
    if (error)
        return ctx.reply({
            ephemeral: true,
            embeds: [
                new PhilEmbed({
                    description: `${EMOJIS.badge_failed} Failed to insert this users unban.`,
                }),
            ],
        })
    return ctx.reply({
        ephemeral: true,
        embeds: [
            new PhilEmbed({
                description: `${EMOJIS.badge_success} Successfully unbanned **${banned.user.tag}**.`,
            }),
        ],
    })
}
