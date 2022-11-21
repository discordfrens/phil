"use strict";
// Reaction Roles - Saige
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInteraction = exports.sendEmbeds = void 0;
const discord_js_1 = require("discord.js");
const __1 = require("..");
const constants_1 = require("../constants");
const sendEmbeds = (ctx) => {
    const rolesChannel = ctx.guild.channels.cache.find((f) => f.id === constants_1.CONFIG.channels.roles);
    if (!rolesChannel)
        return;
    const msgs = [];
    constants_1.CONFIG.reaction_roles.forEach((z) => {
        msgs.push({
            content: `• **${z.group}**\n>>> ${z.roles
                .map((r) => `${r.name} — <@&${r.id}>`)
                .join("\n")}`,
            components: [
                new discord_js_1.ActionRowBuilder({
                    components: z.roles.length < 5
                        ? z.roles.map((r) => {
                            const obj = {
                                label: r.name,
                                style: r.href ? discord_js_1.ButtonStyle.Link : discord_js_1.ButtonStyle.Primary,
                            };
                            if (r.href) {
                                obj["url"] = r.href;
                            }
                            else {
                                obj["custom_id"] = r.id;
                            }
                            return new discord_js_1.ButtonBuilder(obj);
                        })
                        : [
                            new discord_js_1.SelectMenuBuilder({
                                custom_id: z.group.toLowerCase().split(" ").join("-"),
                                placeholder: "Select one of the following...",
                                min_values: 0,
                                max_values: z.roles.length,
                                options: z.roles.map((r) => {
                                    const o = {
                                        label: r.name,
                                        value: `rr_${r.id}`,
                                    };
                                    if (r.emoji) {
                                        o["emoji"] = r.emoji;
                                    }
                                    return o;
                                }),
                            }),
                        ],
                }),
            ],
        });
    });
    msgs.forEach((m) => rolesChannel.send(m));
};
exports.sendEmbeds = sendEmbeds;
const handleInteraction = (ctx) => {
    if (ctx.isButton()) {
        const id = ctx.customId;
        const guild = __1.client.guilds.cache.find((f) => f.id === constants_1.CONFIG.server_id);
        if (!guild)
            return;
        const role = guild.roles.cache.find((f) => f.id === id);
        if (!role)
            return;
        const member = guild.members.cache.find((f) => f.id === ctx.user.id);
        if (!member)
            return;
        if (member.roles.cache.has(id)) {
            member.roles.remove(role).catch(() => {
                return ctx.reply({
                    ephemeral: true,
                    content: `Failed to take <@&${role.id}> from you.`,
                });
            });
            return ctx.reply({
                ephemeral: true,
                content: `<@&${role.id}> has been taken from you.`,
            });
        }
        else {
            member.roles.add(role).catch(() => {
                return ctx.reply({
                    ephemeral: true,
                    content: `Failed to give <@&${role.id}> to you.`,
                });
            });
            return ctx.reply({
                ephemeral: true,
                content: `You have been given <@&${role.id}>.`,
            });
        }
    }
    if (ctx.isSelectMenu()) {
        const ids = ctx.values
            .filter((f) => f.startsWith("rr_"))
            .map((z) => z.replace("rr_", ""));
        const guild = __1.client.guilds.cache.find((f) => f.id === constants_1.CONFIG.server_id);
        if (!guild)
            return;
        const rr = constants_1.CONFIG.reaction_roles.find((f) => f.group.toLowerCase() === ctx.customId);
        if (!rr)
            return;
        const member = guild.members.cache.find((f) => f.id === ctx.user.id);
        if (!member)
            return;
        const roles = guild.roles.cache.filter((f) => rr.roles.map((z) => z.id).includes(f.id));
        roles.forEach((role) => {
            if (!ids.includes(role.id) && member.roles.cache.has(role.id)) {
                member.roles.remove(role);
            }
            else if (ids.includes(role.id) && !member.roles.cache.has(role.id)) {
                member.roles.add(role);
            }
        });
        ctx.reply({
            ephemeral: true,
            content: `Selected For **${rr.group}**\n${ids.length > 0
                ? ids.map((er) => `<@&${er}>`).join("\n")
                : "*No roles selected*"}`,
        });
    }
};
exports.handleInteraction = handleInteraction;
//# sourceMappingURL=rr.js.map