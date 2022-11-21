import { TextChannel } from "discord.js";
import { CONFIG } from "../../constants";
import Event from "../../structures/Event";

export default new Event("guildMemberAdd", (member) => {
  const guild = member.guild;
  if(!guild) return
  const channel = guild.channels.cache.find(f => f.id === CONFIG.channels.welcome) as TextChannel
  if(!channel) return;
  channel.send({
    content: `Welcome <@${member.id}>! `
  })
})