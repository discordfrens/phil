import { ApplicationCommandOptionType, PermissionFlagsBits} from "discord.js";
import { mute } from "../../handlers/infractions";
import SlashCommand from "../../structures/SlashCommand";

export default new SlashCommand({
  name: "mute",
  options: [
    { name: "member", type: ApplicationCommandOptionType.User, description: "The member", required: true },
    { name: "length", type: ApplicationCommandOptionType.String, description: "The mute length, leave null for perm"},
    { name: "reason", type: ApplicationCommandOptionType.String, description: "The reasoning behind the warn"},
    { name: "notify", type: ApplicationCommandOptionType.Boolean, description: "Try to notify the user or not"}
  ],
  defaultMemberPermissions: [PermissionFlagsBits.ManageRoles],
  description: 'Mute a member',
  main: async (props) => {
    return mute(props)
  }
})