import { ApplicationCommandOptionType, PermissionFlagsBits} from "discord.js";
import { warn } from "../../handlers/infractions";
import SlashCommand from "../../structures/SlashCommand";

export default new SlashCommand({
  name: "warn",
  options: [
    { name: "member", type: ApplicationCommandOptionType.User, description: "The member", required: true },
    { name: "reason", type: ApplicationCommandOptionType.String, description: "The reasoning behind the warn"},
    { name: "notify", type: ApplicationCommandOptionType.Boolean, description: "Try to notify the user or not"}
  ],
  defaultMemberPermissions: [PermissionFlagsBits.ManageMessages],
  description: 'Warn a member',
  main: async (props) => {
    return warn(props)
  }
})