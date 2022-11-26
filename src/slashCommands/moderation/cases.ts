import { ApplicationCommandOptionType } from "discord.js";
import { cases } from "../../handlers/infractions";
import SlashCommand from "../../structures/SlashCommand";

export default new SlashCommand({
  name: "cases",
  description: "View a members infractions",
  defaultMemberPermissions: ["ManageMessages"],
  options: [{
    type: ApplicationCommandOptionType.User,
    name: "member",
    required: true,
    description: "A mentioned member"
  }],
  main: async (props) => {
    return cases(props)
  }
})