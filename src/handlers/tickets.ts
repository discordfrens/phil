import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, channelLink, ChannelType, GuildMember, Message, TextChannel } from "discord.js";
import { CONFIG, EMOJIS } from "../constants";
import PhilEmbed from "../structures/Embed";
import { Ticket, SlashCommandArguments } from "../types";
import { supabase } from "../utils/providers";

export const handleButton = async (int: ButtonInteraction) => {
  const { data, error } = await supabase.from("tickets").select("*").eq("user", `${int.user.id}`)
  const { count } = await supabase.from("tickets").select("*", { count: 'exact', head: true })
  if(error) return int.reply({ ephemeral: true, content: `${EMOJIS.badge_failed} Failed to see if you have an already existing ticket.`})
  const content = data ? data[0] as Ticket : null
  if(data && data.length > 0 || content) return int.reply({ ephemeral: true, content: `${EMOJIS.badge_failed} It appears that you already have an existing ticket. <#${content.channel_id}>`})
  const channel = await int.guild.channels.create({
    name: `ticket-${(count + 1) || "BLANK"}`,
    type: ChannelType.GuildText,
    reason: `Ticket opened`,
    permissionOverwrites: [
      {
        id: int.user.id,
        allow: ["SendMessages", "ViewChannel", "AttachFiles", "EmbedLinks"]
      },
      {
        id: int.guild.id,
        deny: ["SendMessages", "ViewChannel", "AttachFiles", "EmbedLinks"]
      },
      {
        id: CONFIG.roles.moderator,
        allow: ["AttachFiles", "SendMessages", "ViewChannel", "ManageChannels", "EmbedLinks", "ManageMessages"]
      }
    ]
  })
  const { error: e } = await supabase.from("tickets").insert({
    timestamp: Date.now(),
    user_id: int.user.id,
    channel_id: channel.id,
    locked: false,
    members: [],
    user: Number(int.user.id)
  })
  if(e) {
    if(channel) {channel.delete(`Failed to create ticket for user ${int.user.tag} (${int.user.id})`).catch(() => null)}
    return int.reply({ ephemeral: true, content: `${EMOJIS.badge_failed} Failed to create your ticket.`})
  }

  channel.send({
    content: `<@!${int.user.id}> @everyone`,
    components: [new ActionRowBuilder<ButtonBuilder>({
      components: [new ButtonBuilder({
        custom_id: "close_ticket",
        label: "Close Ticket",
        style: ButtonStyle.Danger
      })]
    })],
    embeds: [
      new PhilEmbed({
        description: `${EMOJIS.badge_success} Thank you for creating a ticket <@!${int.user.id}>! Please provide all information relevant to your question; please do not spam, or ping staff directly.`
      })
    ]
  })
}

export const close_ticket = async (int: ButtonInteraction) => {
  if(!(int.member as GuildMember).permissions.has("ManageChannels")) return int.reply({ ephemeral: true, embeds: [new PhilEmbed({
    description: `${EMOJIS.badge_failed} You are missing the required permissions to interaction with this button.`
  })]})
  const { data, error } = await supabase.from("tickets").select("*").eq("channel_id", int.channel.id)
  if(error) return int.reply({ ephemeral: true, embeds: [new PhilEmbed({
    description: `${EMOJIS.badge_failed} Failed to locate currently existing tickets.`
  })]})
  const content = data ? data[0] as Ticket : null
  if(!data && data.length < 0 || !content) return int.reply({ ephemeral: true, embeds: [new PhilEmbed({
    description: `${EMOJIS.badge_failed} It appears that this is not a ticket channel?`
  })]})
  int.channel.delete(`Closing ticket - ${content.channel_id}`).catch(() => {
    return int.reply({ ephemeral: true, content: `${EMOJIS.badge_failed} Failed to delete ticket channel.`})
  })
}

export const lock_ticket = async ({ args, client, ctx }: SlashCommandArguments) => {
  const channel = ctx.guild.channels.cache.find(f => f.id === args.getChannel("channel").id) as TextChannel
  const value = args.getBoolean("lock")
  const { data, error } = await supabase.from("tickets").select("*").eq("channel_id", channel.id)
  if(error) return ctx.reply({  ephemeral: true, embeds: [new PhilEmbed({
    description: `${EMOJIS.badge_failed} Failed to fetch already existing tickets.`
  })]})

  const ticket = data && data.length > 0 ? data[0] as Ticket : null
  if(!ticket)  return ctx.reply({  ephemeral: true, embeds: [new PhilEmbed({
    description: `${EMOJIS.badge_failed} It appears that <#${channel.id}> is not a active ticket channel.`
  })]})

  const opposite = value || !ticket.locked
  const { error: e } = await supabase.from("tickets").update({
    locked: opposite
  }).eq("channel_id", channel.id)
  if(e) return ctx.reply({ ephemeral: true, embeds: [new PhilEmbed({
    description: `${EMOJIS.badge_failed} Failed to update channels stored locked value.`
  })]})
  channel.permissionOverwrites.create(ctx.guild.members.cache.find(f => f.id === `${ticket.user_id}`), {
    'SendMessages': false,
    'ViewChannel': false
  }).catch((e) => {
    return ctx.reply({ ephemeral: true, embeds: [new PhilEmbed({
      description: `${EMOJIS.badge_failed} Failed to ${opposite ? "lock" : "unlock"} the ticket.`
    })]})
  }).then(() => {
    return ctx.reply({ ephemeral: true, embeds: [new PhilEmbed({
      description: `${EMOJIS.badge_success} Successfully ${opposite ? "locked" : "unlocked"} this ticket.`
    })]})
  })
}