import { ApplicationCommandOptionType, PermissionFlagsBits} from "discord.js";
import { unmuted } from "../../handlers/infractions";
import SlashCommand from "../../structures/SlashCommand";

export default new SlashCommand({
  name: "unmute",
  options: [
    { name: "member", type: ApplicationCommandOptionType.User, description: "The member", required: true },
    { name: "reason", type: ApplicationCommandOptionType.String, description: "The reasoning behind the warn"},
    { name: "notify", type: ApplicationCommandOptionType.Boolean, description: "Try to notify the user or not"}
  ],
  defaultMemberPermissions: [PermissionFlagsBits.ManageRoles],
  description: 'Unmutes a muted member',
  main: async (props) => {
    return unmuted(props)
  }
})