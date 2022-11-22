import { SlashCommandOptions } from '../types'

export default class SlashCommand {
    constructor(options: SlashCommandOptions) {
        Object.assign(this, options)
    }
}
