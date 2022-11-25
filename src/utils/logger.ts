import chalk from 'chalk'
import { TextChannel } from 'discord.js'
import { client } from '..'
import { CONFIG } from '../constants'
import PhilEmbed from '../structures/Embed'

export default (msg: string) => {
    return {
        warn: () => {
            console.log(`${chalk.yellowBright('phil')} ${msg}`)
        },
        info: () => {
            console.log(`${chalk.cyanBright('phil')} ${msg}`)
        },
        error: (exit?: boolean) => {
            console.log(`${chalk.redBright('phil')} ${msg}`)
            if (exit) {
                process.exit(0)
            }
        },
        api: () => {
            console.log(`${chalk.magentaBright('phil')} ${msg}`)
        },
        send: (title: string, description: string) => {
            console.log(`${chalk.cyanBright('phil')} ${msg}`)
            const channel = client.channels.cache.find(f => f.id === CONFIG.channels.logs) as TextChannel
            if(!channel) return console.log(`${chalk.redBright('phil')} Failed to locate logs channel`);
            channel.send({
                embeds: [new PhilEmbed({
                    title: `${title}`,
                    description: `${description.slice(0, 1000)}`,
                    timestamp: Date.now()
                })]
            })
        },
        send_error: (file: string) => {
            console.log(`${chalk.redBright('phil')} ${msg}`)
            const channel = client.channels.cache.find(f => f.id === CONFIG.channels.logs) as TextChannel
            if(!channel) return console.log(`${chalk.redBright('phil')} Failed to locate logs channel`);
            channel.send({
                embeds: [new PhilEmbed({
                    title: `Error Located - ${file}`,
                    description: `${msg.slice(0, 1000)}`,
                    timestamp: Date.now()
                })]
            })
        }
    }
}

