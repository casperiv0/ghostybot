import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class LmgtfyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "lmgtfy",
      description: "Let me google that for you",
      category: "games",
      usage: "<search query>",
      requiredArgs: [{ name: "query" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const query = encodeURIComponent(args.join(" "));
      const url = `https://lmgtfy.com/?q=${query}&s=g`;

      message.channel.send(url);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
