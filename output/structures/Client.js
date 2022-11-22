"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const constants_1 = require("../constants");
const logger_1 = __importDefault(require("../utils/logger"));
const utils_1 = require("../utils/utils");
class Phil extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    slashCommands = new discord_js_1.Collection();
    config = constants_1.CONFIG;
    constructor() {
        super({
            intents: constants_1.INTENTS,
            partials: constants_1.PARTIALS,
            allowedMentions: {
                repliedUser: false,
            },
        });
        this.init();
        //this.database();
    }
    async init() {
        this.login(process.env.DISCORD_TOKEN);
        this.handler();
    }
    /*
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
*/
    async handler() {
        const commands = await (0, utils_1.globPromise)(`${__dirname}/../commands/**/**/mod{.js,.ts}`);
        const slashCommands = await (0, utils_1.globPromise)(`${__dirname}/../slashCommands/**/*{.js,.ts}`);
        const events = await (0, utils_1.globPromise)(`${__dirname}/../events/**/*{.ts,.js}`);
        const rawSlashCommands = [];
        commands.forEach(async (filePath) => {
            var _a;
            const file = await (await (_a = filePath, Promise.resolve().then(() => __importStar(require(_a)))))?.default;
            if (!file || !file.name)
                return;
            this.commands.set(file.name, file);
        });
        slashCommands.forEach(async (filePath) => {
            var _a;
            const sc = await (await (_a = filePath, Promise.resolve().then(() => __importStar(require(_a)))))?.default;
            if (!sc || !sc.name)
                return;
            this.slashCommands.set(sc.name, sc);
            rawSlashCommands.push(sc);
        });
        this.on("ready", () => {
            const guild = this.guilds.cache.find(f => f.id === constants_1.CONFIG.server_id);
            if (!guild)
                (0, logger_1.default)(`Failed to locate frens server`).error(true);
            guild.commands.set(rawSlashCommands);
            (0, logger_1.default)(`Set commands for ${guild.name} (${guild.id})`).info();
        });
        events.forEach(async (filePath) => {
            var _a;
            const file = await (await (_a = filePath, Promise.resolve().then(() => __importStar(require(_a)))))?.default;
            if (!file || !file.name)
                return;
            this.on(file.name, file.main);
        });
        return;
    }
}
exports.default = Phil;
//# sourceMappingURL=Client.js.map