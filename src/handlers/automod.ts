import { Message } from "discord.js";
import { readFileSync } from "fs";
import { EMOJIS } from "../constants";
import logger from "../utils/logger";

export const antiLink = async (message: Message) => {
  const scamLinks = await readFileSync(`${process.cwd()}/static/scam_links.txt`, { encoding: "utf-8" }).split("\n").map((z) => z.replaceAll('\r', ""))
  const lowercase = message.content.toLowerCase()
  if(scamLinks.some((link) => lowercase.includes(link.toLowerCase()))) {
    message.delete().catch(() => {
      logger(`Failed to delete scam link`).send_error("src/handlers/automod.ts (10)")
    })
    logger(`Failed to delete scam link`).send("Deleted scam link", `${EMOJIS.badge_success} Scam link detected & deleted\n\n${EMOJIS.badge_discord_blue} **By:** <@${message.author.id}>\n${EMOJIS.badge_message} **Channel:** <#${message.channel.id}>\n${EMOJIS.badge_url} **Content:**\n\`\`\`\n${message.content.slice(0, 700)}\n\`\`\``)
  }
}