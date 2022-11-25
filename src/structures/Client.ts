import {
    ApplicationCommandPermissionType,
    Client,
    ClientEvents,
    Collection,
    EditApplicationCommandPermissionsMixin,
} from 'discord.js'
import { CONFIG, INTENTS, logEmbed, PARTIALS } from '../constants'
import { CommandProperties, Config, SlashCommandOptions } from '../types'
import mongoose from 'mongoose'
import logger from '../utils/logger'
import { globPromise } from '../utils/utils'
import Event from './Event'

export default class Phil extends Client {
    public commands: Collection<string, CommandProperties> = new Collection()
    public slashCommands: Collection<string, SlashCommandOptions> = new Collection()
    public config: Config = CONFIG
    constructor() {
        super({
            intents: INTENTS,
            partials: PARTIALS,
            allowedMentions: {
                repliedUser: false,
            },
        })
        this.init()
    }

    public async init() {
        this.login(process.env.DISCORD_TOKEN)
        this.handler()
    }

    public async handler() {
        const commands = await globPromise(`${__dirname}/../commands/**/**/mod{.js,.ts}`)
        const slashCommands = await globPromise(`${__dirname}/../slashCommands/**/*{.js,.ts}`)
        const events = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`)
        const rawSlashCommands: SlashCommandOptions[] = []
        commands.forEach(async (filePath) => {
            const file: CommandProperties = await (
                await import(filePath)
            )?.default
            if (!file || !file.name) return
            this.commands.set(file.name, file)
        })
        slashCommands.forEach(async (filePath) => {
            const sc: SlashCommandOptions = await (await import(filePath))?.default;
            if(!sc || !sc.name) return;
            this.slashCommands.set(sc.name, sc)
            if(sc.userPermissions) sc.dmPermission = false

            rawSlashCommands.push(sc)
        })
        this.on("ready", () => {
            const guild = this.guilds.cache.find(f => f.id === CONFIG.server_id)
            if(!guild) logger(`Failed to locate frens server`).error(true)
            guild.commands.set(rawSlashCommands)
            logger(`Set commands for ${guild.name} (${guild.id})`).info()
        });
        events.forEach(async (filePath) => {
            const file: Event<keyof ClientEvents> = await (
                await import(filePath)
            )?.default
            if (!file || !file.name) return
            this.on(file.name, file.main)
        })
        return
    }
}
