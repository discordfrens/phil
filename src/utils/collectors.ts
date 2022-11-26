import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, embedLength, Message } from 'discord.js'
import PhilEmbed from '../structures/Embed'
import { ExtendedInteraction } from '../types'

export const prompt = (questions: string[], ctx: Message): string[] => {
    return ['']
}

export const pagination = async (
    data: string[],
    ctx: ExtendedInteraction,
    title?: string,
    img_url?: string,
    perEmbed: number = 5
) => {
    let amountOfEmbeds = data.length / perEmbed
    amountOfEmbeds =
        amountOfEmbeds % 1 ? Math.floor(amountOfEmbeds) + 1 : amountOfEmbeds
    const embeds = []
    for (let i = 0; i < amountOfEmbeds; i++) {
        const sliced = data.splice(0, perEmbed)
        embeds.push(
            new PhilEmbed({
                footer: { text: `Page ${i+1}/${amountOfEmbeds}` },
                timestamp: Date.now(),
                author: {
                    name: `${title}`,
                    iconURL: img_url
                },
                description: `${sliced.join('\n')}`,
            })
        )
    }
    const now = Date.now()
    let current = embeds[0]
    const buttons = new ActionRowBuilder<ButtonBuilder>({
        components: [new ButtonBuilder({
            custom_id: `back_page_${now}`,
            label: "Previous Page",
            style: ButtonStyle.Secondary,
        }), new ButtonBuilder({
            custom_id: `next_page_${now}`,
            label: "Next Page",
            style: ButtonStyle.Secondary,
        })]
    })
    await ctx.reply({ ephemeral: true, embeds: [current], components: [buttons] })
    const collector = ctx.channel.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 15000,
    })
    collector.on("collect", (int) => {
        if(int.isButton() && int.customId === `next_page_${now}`) {
            const eid = embeds.indexOf(current)
            console.log(eid, eid +1, embeds.length)
            current = (eid + 1) >= embeds.length ? embeds[0] : embeds[eid +1]
            ctx.editReply({
                embeds: [current]
            })
            int.deferUpdate()
        }
        if(int.isButton() && int.customId === `back_page_${now}`) {
            const eid = embeds.indexOf(current)
            current = (eid + -1) <= 0 ? embeds[0] : embeds[eid -1]
            ctx.editReply({
                embeds: [current]
            })
            int.deferUpdate()
        }
    })
    collector.on("end", () => {
        buttons.components.forEach((c) => [
            c.setDisabled(true)
        ])
        ctx.editReply({
            components: [buttons]
        })
    })
}
