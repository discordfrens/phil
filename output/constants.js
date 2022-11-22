"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEmbed = exports.formatShortDate = exports.CONFIG = exports.COLOR = exports.LINK_REGEXP = exports.INTENTS = exports.PARTIALS = void 0;
const discord_js_1 = require("discord.js");
const Embed_1 = __importDefault(require("./structures/Embed"));
const date_fns_1 = require("date-fns");
const _1 = require(".");
exports.PARTIALS = [
    discord_js_1.Partials.Channel,
    discord_js_1.Partials.GuildMember,
    discord_js_1.Partials.GuildScheduledEvent,
    discord_js_1.Partials.Message,
    discord_js_1.Partials.Reaction,
    discord_js_1.Partials.ThreadMember,
    discord_js_1.Partials.User,
];
exports.INTENTS = Object.keys(discord_js_1.IntentsBitField.Flags)
    .filter((z) => z.toLowerCase().startsWith('guild'))
    .concat('MessageContent');
exports.LINK_REGEXP = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
exports.COLOR = {
    raw: '#f43f5e',
    resolved: (0, discord_js_1.resolveColor)('#f43f5e'),
};
exports.CONFIG = {
    server_id: '901881139004862554',
    prefix: 'f?',
    channels: {
        logs: '',
        roles: '1044393639373180989',
        welcome: '1044393639373180989',
    },
    reaction_roles: [
        {
            group: 'Colours',
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
            roles: [
                { id: '1044410387682045982', name: 'North America' },
                { id: '1044410405344260167', name: 'Blurple' },
                { id: '1044410423677550632', name: 'Asia' },
                { id: '1044410436751212664', name: 'Africa' },
                { id: '1044410447077584927', name: 'Antartica' },
                { id: '1044410464563642379', name: 'Oceanic ( Austrilia )' },
            ],
        },
    ],
};
const formatShortDate = () => {
    const _date = new Date(Date.now());
    return (0, date_fns_1.format)(_date, 'dd/MM/yyyy');
};
exports.formatShortDate = formatShortDate;
const logEmbed = (data) => {
    return new Embed_1.default({
        ...data,
        footer: data.footer || {
            text: `${(0, exports.formatShortDate)()}`,
            iconURL: _1.client.user.avatarURL({
                extension: 'png',
                forceStatic: true,
            }),
        },
    });
};
exports.logEmbed = logEmbed;
//# sourceMappingURL=constants.js.map