import { AttachmentBuilder, Message, TextChannel } from "discord.js";
import { COLORS, CONFIG, ruleBanner, Rules } from "../constants";
import PhilEmbed from "../structures/Embed";

export const ruleEmbeds = (ctx: Message) => {
  const rulesChannel = ctx.guild.channels.cache.find(f => f.id === CONFIG.channels.rules) as TextChannel
  if(!rulesChannel) return;
  rulesChannel.send({
    content: `**Rules**\n\n${Rules.map((z) => `– ${z}`).join("\n")}\n`,
    embeds: [new PhilEmbed({image: { url: ruleBanner}, color: COLORS.all.blue})]})
}