import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class CtgsCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ctgs",
      description: "Create a shortened URL",
      category: "util",
      requiredArgs: [{ name: "slug" }, { name: "url" }],
    });
  }

  async execute(message: Message, args: string[]) {
    try {
      const [slug, url] = args;
      const data = await this.bot.ctgs.new(slug, url);

      return message.channel.send({ content: data });
    } catch (err) {
      return message.channel.send({ content: err?.message || "an error occurred" });
    }
  }
}
