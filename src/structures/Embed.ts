import {
    EmbedBuilder,
    EmbedData,
} from 'discord.js'
import { COLORS } from '../constants'

export default class PhilEmbed {
    constructor(data: EmbedData) {
        return new EmbedBuilder({
            color: data.color || COLORS.all.purple,
            ...data,
        })
    }
}
