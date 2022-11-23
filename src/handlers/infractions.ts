import { EMOJIS } from "../constants";
import PhilEmbed from "../structures/Embed";
import { SlashCommandArguments, SupabaseUserTable } from "../types";
import { supabase } from "../utils/providers";
import { id } from "../utils/utils";

export const warn = async ({ args, client, ctx }: SlashCommandArguments) => {
  const userMention = args.getUser("member")
  const reason = args.getString("reason") || "No reason provided"
  const notify = args.getBoolean("notify")
  if(!userMention) return;
  const { error } = await supabase.from("infractions").insert({
      type: "warn",
      inf_id: id(),
      reason: reason,
      timestamp: Date.now(),
      moderatorId: ctx.member.id,
      user_id: ctx.member.id
  })
  if(error) return ctx.reply({
    ephemeral: true,
    embeds: [new PhilEmbed({
      description: `${EMOJIS.badge_failed} Failed to insert this users warning.`
    })]
  })
  if(notify) {
    userMention.send({
      embeds: [new PhilEmbed({
        description: `${EMOJIS.badge_message} You have been warned in **${ctx.guild.name}**.`
      })]
    }).catch(() => null)
  }
  return ctx.reply({
    ephemeral: true,
    embeds: [new PhilEmbed({
      description: `${EMOJIS.badge_success} Successfully warning **${userMention.tag}** (\`${userMention.id}\`).`
    })]
  })
}