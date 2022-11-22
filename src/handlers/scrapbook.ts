// Scrap Book

import { Message, PartialMessage } from "discord.js";
import { CONFIG } from "../constants";
import { supabase } from "../utils/providers";

export const removeDeletedMessage = async(message: Message | PartialMessage) => {
    if(message.channelId === CONFIG.channels.scrapbook) {
        const { error } = await supabase.from("scrapbook").delete().eq("message_id", message.id)
        if (error) return message.reply("```" + error.message + "```");
    }
}

export default async (message: Message) => {
  if (message.channelId === CONFIG.channels.scrapbook) {
    const { error } = await supabase
        .from('scrapbook')
        .insert({
            author: message.author.id,
            author_avatar: message.author.displayAvatarURL(),
            author_name: message.author.username,
            message_id: message.id,
            content: message.content ? message.content : null,
            media: message.attachments.filter(h => ['image/png', 'image/jpg', 'image/jepg', 'image/webp', 'video/mp4', 'video/webm', "image/gif"].includes(h.contentType)).map(a => {
                return {
                    url: a.url,
                    type: a.contentType,
                    size: a.size,
                    height: a.height,
                    width: a.width,
                }
            })
        })
        
    if (error) return message.reply("```" + error.message + "```");

    if (!message.hasThread) {
        message.startThread({
            name: message.content.length > 97 ? `${message?.content.slice(0, 97)}...` : message?.content || message.author.username,
            autoArchiveDuration: 10080,
            reason: 'Scrapbook'
        }).catch(() => {})
    }
}
}