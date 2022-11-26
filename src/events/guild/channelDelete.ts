import Event from "../../structures/Event";
import logger from "../../utils/logger";
import { supabase } from "../../utils/providers";

export default new Event("channelDelete", async(channel) => {
  const { data, error } = await supabase.from("tickets").select("*").eq("channel_id", channel.id)
  if(error) return logger("Failed to locate tickets").send_error("src/events/guild/channelDelete.ts (7)")
  const content = data ? data[0] : null
  if(!content) return logger("Failed to locate tickets").send_error("src/events/guild/channelDelete.ts (9)")
  const {error: e } = await supabase.from("tickets").delete().eq("channel_id", channel.id)
  if(e) {
    return logger("Failed to delete saved ticket").send_error("src/events/guild/channelDelete.ts (12)")
  }
})