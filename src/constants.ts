import { EmbedData, GatewayIntentsString, IntentsBitField, Partials, resolveColor } from "discord.js";
import PhilEmbed from "./structures/Embed";
import { Config } from "./types";
import { format } from "date-fns"
import { client } from ".";

export const PARTIALS = [Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User];
export const INTENTS = Object.keys(IntentsBitField.Flags).filter(z => z.toLowerCase().startsWith("guild")).concat("MessageContent") as GatewayIntentsString[]
export const LINK_REGEXP = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

export const COLOR = {
  raw: "#f43f5e",
  resolved: resolveColor("#f43f5e")
}

export const CONFIG: Config = {
  sandbox_server_id: "1039957807706935376",
  prefix: "f?",
  channels: {
    logs: ""
  }
}

export const formatShortDate = () => {
  const _date = new Date(Date.now())

  return format(_date, "dd/MM/yyyy")
}

export const logEmbed = (data: EmbedData) => {
  return new PhilEmbed({
    ...data,
    footer: data.footer || {
      text: `${formatShortDate()}`,
      iconURL: client.user.avatarURL({ extension: "png", forceStatic: true })
    }
  })
}