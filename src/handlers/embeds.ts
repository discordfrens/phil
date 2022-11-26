import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, Colors, Message, TextChannel } from "discord.js";
import { COLORS, CONFIG, ruleBanner, Rules } from "../constants";
import PhilEmbed from "../structures/Embed";

export const ruleEmbeds = (ctx: Message) => {
  const rulesChannel = ctx.guild.channels.cache.find(f => f.id === CONFIG.channels.rules) as TextChannel
  if(!rulesChannel) return;
  rulesChannel.send({
    content: `**Rules**\n\n${Rules.map((z) => `– ${z}`).join("\n")}\n`,
    embeds: [new PhilEmbed({image: { url: ruleBanner}, color: COLORS.all.blue})],
  components: [new ActionRowBuilder<ButtonBuilder>({
    components: [new ButtonBuilder({ 
      url: "https://discordfrens.com",
      label: "Website",
      emoji: "🌿",
      style: ButtonStyle.Link
    }), new ButtonBuilder({ 
      url: "https://learn.discordfrens.com",
      label: "Resources",
      emoji: "📑",
      style: ButtonStyle.Link
    }), new ButtonBuilder({ 
      url: "https://discordfrens.com/github",
      label: "Github",
      emoji: "💻",
      style: ButtonStyle.Link
    })]
  })]})
}

export const ticketEmbed = (ctx: Message) => {
  const ticketChannel = ctx.guild.channels.cache.find(f => f.id === CONFIG.channels.tickets) as TextChannel
  if(!ticketChannel) return;
  ticketChannel.send({
    embeds: [new PhilEmbed({
      color: COLORS.all.pink,
      title: `🎟️ Support Tickets`,
      description: `Open a ticket for one of the following reasons:\n- if you would like to ask a question in private\n- if you would like to report something\n- if you need any **help with something todo with the server** etc.\n\n*Spamming random and useless tickets will result in you losing access.*`
    })],
    components: [new ActionRowBuilder<ButtonBuilder>({
      components: [new ButtonBuilder({
        custom_id: "create_ticket",
        label: "Create ticket",
        style: ButtonStyle.Primary
      })]
    })]
  })
}