import {
    EmbedData,
    GatewayIntentsString,
    IntentsBitField,
    Partials,
    resolveColor,
} from 'discord.js'
import PhilEmbed from './structures/Embed'
import { Config } from './types'
import { format } from 'date-fns'
import { client } from '.'

export const PARTIALS = [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
]
export const INTENTS = Object.keys(IntentsBitField.Flags)
    .filter((z) => z.toLowerCase().startsWith('guild'))
    .concat('MessageContent') as GatewayIntentsString[]
export const LINK_REGEXP =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

export const COLORS = {
    all: {
        purple: resolveColor('#7d53de'),
        pink: resolveColor('#ef709d'),
        blue: resolveColor('#3772ff'),
    },
}

export const ruleBanner = `https://cdn.discordapp.com/attachments/1039957808247996448/1044704912996565022/Rules.png`
export const EMOJIS = {
    "badge_party": "<:badge_party:1045012510916493312>",
    "badge_url": "<:badge_url:1045012620408799273>",
    "badge_message": "<:badge_message:1045012577870155789>",
    "badge_failed": "<:badge_failed:1045013315828596746>",
    "badge_success": "<:badge_success:1045013292281757798>",
    "badge_discord_blue": "<:badge_discord_blue:1045009705761783868>",
    "badge_bot": "<:badge_bot:1045009731451887687>",
    "badge_partner": "<:badge_partner:1045022901197357157>",
    "invisable": "ㅤ"
}

export const CONFIG: Config = {
    server_id: '901881139004862554',
    prefix: '>',
    roles: {
        muted: '1044748632399806534',
    },
    channels: {
        logs: '1045012977532801084',
        roles: '1044393639373180989',
        welcome: '1044393639373180989',
        rules: '1044393639373180989',
        scrapbook: '1044678272434319400',
    },
    reaction_roles: [
        {
            group: 'Colours',
            color: COLORS.all.pink,
            banner: `https://cdn.discordapp.com/attachments/1039957808247996448/1044657003949215794/Colours.png`,
            roles: [
                {
                    emoji: '🌸',
                    id: '1044405185537122387',
                    name: 'Fuchsia Pink',
                },
                { emoji: '🌷', id: '1044402729801490492', name: 'Blurple' },
                { emoji: '🍉', id: '1044402773380313119', name: 'Melon Green' },
                { emoji: '⭐', id: '1044402820843053116', name: 'Star Yellow' },
                { emoji: '🩸', id: '1044402856821792873', name: 'Blood Red' },
                { emoji: '🥛', id: '1044402902359343146', name: 'Milk White' },
                { emoji: '🛰️', id: '1044402934970060881', name: 'Space Black' },
            ],
        },
        {
            group: 'Region',
            max: 1,
            color: COLORS.all.purple,
            banner: `https://cdn.discordapp.com/attachments/1039957808247996448/1044656624104644618/Regions.png`,
            roles: [
                { id: '1044410387682045982', name: 'North America' },
                { id: '1044410405344260167', name: 'South America' },
                { id: "1045078712305070152", name: "Europe"},
                { id: '1044410423677550632', name: 'Asia' },
                { id: '1044410436751212664', name: 'Africa' },
                { id: '1044410447077584927', name: 'Antartica' },
                { id: '1044410464563642379', name: 'Oceanic ( Austrilia )' },
            ],
        },
    ],
}

export const Rules = [
    'Keep all content (messages, images, videos etc) SFW',
    'English only',
    'Hate Speach, Harrassment, Discrimination is prohibited',
    'Use common sense',
    'No discussions of politics, religions, self harm, gore, suggestions of death or torture, or any controversial topics',
    'Discord usernames must be searchable/mentionable ( no special symbols etc )',
    'No advertising of third-party services, including referral schemes',
    'No discussions of hacking/cheating',
]

export const formatShortDate = (date?: number) => {
    const _date = new Date(date || Date.now())

    return format(_date, 'dd/MM/yyyy')
}

export const logEmbed = (data: EmbedData) => {
    return new PhilEmbed({
        ...data,
        footer: data.footer || {
            text: `${formatShortDate()}`,
            iconURL: client.user.avatarURL({
                extension: 'png',
                forceStatic: true,
            }),
        },
    })
}
