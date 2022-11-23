import { SlashCommandArguments } from "../types";

export const warn = ({ args, client, ctx }: SlashCommandArguments) => {
  const userMention = args.getUser("user")
  const reason = args.getString("reason") || "No reason provided"
  if(!userMention) return;
  
}