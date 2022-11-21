import Event from "../../structures/Event";
import { handleInteraction } from "../../utils/rr";

export default new Event("interactionCreate", (int) => {
  handleInteraction(int);
});
