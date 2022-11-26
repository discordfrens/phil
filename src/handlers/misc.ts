import { Message } from 'discord.js'

export const auto_w = (message: Message) => {
    if (message.content.split(' ').includes('W')) {
        message.react('<:wkey:1044742922773471262>').catch(() => null)
    }
}
