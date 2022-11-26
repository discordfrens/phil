import { Message, ThreadAutoArchiveDuration } from "discord.js";
import { CONFIG } from "../constants";
import logger from "../utils/logger";

export const open_source = async (message: Message) => {
  if(message.channel.id === CONFIG.channels.open_source) {
    message.startThread({
      name: message.content ? message.content.slice(0, 100) : message.author.tag,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
    }).catch(() => {
      logger(`Failed to open thread in open source channel.`).send_error(`src/handlers/threaders.ts (11)`)
    })
  }
}
