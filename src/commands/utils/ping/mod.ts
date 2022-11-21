import { promisify } from "util";
import { client } from "../../..";
import Command from "../../../structures/Command";
import PhilEmbed from "../../../structures/Embed";
import ms from "../../../utils/ms";
import { async } from "../../../utils/utils";

export default new Command({
  name: "ping",
  main: async ({ ctx, args, client }) => {
    let then = Date.now();
    return ctx.reply({
     content: `Pong! \`${client.ws.ping}\`ms`
    });
  },
});
