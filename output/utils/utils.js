"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminOrMod = exports.id = exports.getUserData = exports.getUser = exports.async = exports.permissionHandler = exports.globPromise = void 0;
const util_1 = require("util");
const glob_1 = __importDefault(require("glob"));
const __1 = require("..");
const User_1 = __importDefault(require("../models/User"));
const globPromise = async (filePath) => {
    const gp = (0, util_1.promisify)(glob_1.default);
    const files = (await gp(filePath));
    return files;
};
exports.globPromise = globPromise;
const permissionHandler = (permissions) => {
    return {
        bot: (client_member) => {
            if (client_member.permissions.has('Administrator') ||
                client_member.permissions.has(permissions))
                return true;
            return;
        },
        user: (client_member) => {
            if (client_member.permissions.has('Administrator') ||
                client_member.permissions.has(permissions))
                return true;
            return;
        },
    };
};
exports.permissionHandler = permissionHandler;
const async = (cb) => {
    return new Promise((res, rej) => {
        cb(res, rej);
        res(0);
    });
};
exports.async = async;
const getUser = (userId, ctx) => {
    if (!userId)
        return;
    return (ctx.mentions.members.first() ||
        ctx.guild.members.cache.find((f) => f.id === userId ||
            f.user.tag.toLowerCase() === userId.toLowerCase() ||
            f.user.username.toLowerCase() === userId.toLowerCase()) ||
        ctx.guild.members.cache.find((f) => f.nickname
            ? f.nickname.toLowerCase() === userId.toLowerCase()
            : false));
};
exports.getUser = getUser;
const getUserData = async (userId, guildId) => {
    let data = await User_1.default.findOne({ userId, guildId });
    if (!data) {
        await User_1.default.create({
            userId: userId,
            guildId: guildId,
        });
        data = await User_1.default.findOne({ userId, guildId });
    }
    return data;
};
exports.getUserData = getUserData;
const id = (length = 35) => {
    let str = '';
    let chars = 'QWERTYUIOPQASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
    const date = Date.now().toString().split('');
    for (let i = 0; i < length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        str += `${date[i] ? date[i] : ''}${char}`;
    }
    return str;
};
exports.id = id;
const isAdminOrMod = (user, guild) => {
    const c = guild.members.cache.find((f) => f.id === __1.client.user.id);
    return (user.permissions.has('Administrator') ||
        user.permissions.has('ManageGuild') ||
        user.roles.highest.position > c.roles.highest.position);
};
exports.isAdminOrMod = isAdminOrMod;
//# sourceMappingURL=utils.js.map