"use strict";
// Scrap Book
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDeletedMessage = void 0;
const constants_1 = require("../constants");
const providers_1 = require("../utils/providers");
const removeDeletedMessage = async (message) => {
    if (message.channelId === constants_1.CONFIG.channels.scrapbook) {
        const { error } = await providers_1.supabase.from("scrapbook").delete().eq("message_id", message.id);
        if (error)
            return message.reply("```" + error.message + "```");
    }
};
exports.removeDeletedMessage = removeDeletedMessage;
exports.default = async (message) => {
    if (message.channelId === constants_1.CONFIG.channels.scrapbook) {
        const { error } = await providers_1.supabase
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
                };
            })
        });
        if (error)
            return message.reply("```" + error.message + "```");
        if (!message.hasThread) {
            message.startThread({
                name: message.content.length > 97 ? `${message?.content.slice(0, 97)}...` : message?.content || message.author.username,
                autoArchiveDuration: 10080,
                reason: 'Scrapbook'
            }).catch(() => { });
        }
    }
};
//# sourceMappingURL=scrapbook.js.map