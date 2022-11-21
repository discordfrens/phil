import {
  EmbedData,
  GatewayIntentsString,
  IntentsBitField,
  Partials,
  resolveColor,
} from "discord.js";
import PhilEmbed from "./structures/Embed";
import { Config } from "./types";
import { format } from "date-fns";
import { client } from ".";

export const PARTIALS = [
  Partials.Channel,
  Partials.GuildMember,
  Partials.GuildScheduledEvent,
  Partials.Message,
  Partials.Reaction,
  Partials.ThreadMember,
  Partials.User,
];
export const INTENTS = Object.keys(IntentsBitField.Flags)
  .filter((z) => z.toLowerCase().startsWith("guild"))
  .concat("MessageContent") as GatewayIntentsString[];
export const LINK_REGEXP =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

export const COLOR = {
  raw: "#f43f5e",
  resolved: resolveColor("#f43f5e"),
};

export const CONFIG: Config = {
  server_id: "901881139004862554",
  prefix: "f?",
  channels: {
    logs: "",
    roles: "1044393639373180989",
    welcome: "1044393639373180989",
  },
  reaction_roles: [
    {
      group: "Colours",
      roles: [
        { emoji: "🌸", id: "1044405185537122387", name: "Fuchsia Pink" },
        { emoji: "🌷", id: "1044402729801490492", name: "Blurple" },
        { emoji: "🍉", id: "1044402773380313119", name: "Melon Green" },
        { emoji: "⭐", id: "1044402820843053116", name: "Star Yellow" },
        { emoji: "🩸", id: "1044402856821792873", name: "Blood Red" },
        { emoji: "🥛", id: "1044402902359343146", name: "Milk White" },
        { emoji: "🛰️", id: "1044402934970060881", name: "Space Black" },
      ],
    },
    {
      group: "Region",
      roles: [
        { id: "1044410387682045982", name: "North America" },
        { id: "1044410405344260167", name: "Blurple" },
        { id: "1044410423677550632", name: "Asia" },
        { id: "1044410436751212664", name: "Africa" },
        { id: "1044410447077584927", name: "Antartica" },
        { id: "1044410464563642379", name: "Oceanic ( Austrilia )" }
      ],
    },
  ],
};

export const formatShortDate = () => {
  const _date = new Date(Date.now());

  return format(_date, "dd/MM/yyyy");
};

export const logEmbed = (data: EmbedData) => {
  return new PhilEmbed({
    ...data,
    footer: data.footer || {
      text: `${formatShortDate()}`,
      iconURL: client.user.avatarURL({ extension: "png", forceStatic: true }),
    },
  });
};
