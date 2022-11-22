import { removeDeletedMessage } from "../../handlers/scrapbook";
import Event from "../../structures/Event";

export default new Event("messageDelete", (message) => {
  if(!message.guild || !message.author || message.author.bot) return;
  removeDeletedMessage(message)
})