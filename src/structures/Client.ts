import {
  Client,
  ClientEvents,
  Collection,
  EmbedData,
  TextChannel,
} from "discord.js";
import { CONFIG, INTENTS, logEmbed, PARTIALS } from "../constants";
import { CommandProperties, Config } from "../types";
import mongoose from "mongoose";
import logger from "../utils/logger";
import { getConfig, globPromise } from "../utils/utils";
import Event from "./Event";

export default class Phil extends Client {
  public commands: Collection<string, CommandProperties> = new Collection();
  public config: Config = CONFIG;
  constructor() {
    super({
      intents: INTENTS,
      partials: PARTIALS,
      allowedMentions: {
        repliedUser: false,
      },
    });
    this.init();
    this.database();
  }

  public async init() {
    this.login(process.env.DISCORD_TOKEN);
    this.handler();
  }

  public async database() {
    mongoose
      .connect(process.env.DATABASE_URL, {
        dbName: "phil-bot",
      })
      .then(() => {
        logger("Connected to database").info();
      })
      .catch((err) => {
        logger("Failed to connect to the database").error(true);
      });
  }

  public async handler() {
    const commands = await globPromise(
      `${__dirname}/../commands/**/**/mod{.js,.ts}`
    );
    const events = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`);
    commands.forEach(async (filePath) => {
      const file: CommandProperties = await (await import(filePath))?.default;
      if (!file || !file.name) return;
      this.commands.set(file.name, file);
    });
    events.forEach(async (filePath) => {
      const file: Event<keyof ClientEvents> = await (
        await import(filePath)
      )?.default;
      if (!file || !file.name) return;
      this.on(file.name, file.main);
    });
    return;
  }

  public async sendLog(guildId: string, data: EmbedData) {
    const guild = this.guilds.cache.find((f) => f.id === guildId);
    if (!guild) return;
    const config = await getConfig(guild.id);
    const logChannel = guild.channels.cache.find(
      (f) => f.id === config.channels.logs
    ) as TextChannel;
    if (!logChannel) return;
    return logChannel.send({
      embeds: [logEmbed(data)],
    });
  }
}
