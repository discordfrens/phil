import { APIEmbedFooter, EmbedBuilder, EmbedData, resolveColor } from "discord.js";
import { COLOR } from "../constants";

export default class PhilEmbed {
  constructor(data: EmbedData) {
    return new EmbedBuilder({
      color: data.color || COLOR.resolved,
      ...data
    })
  }
}