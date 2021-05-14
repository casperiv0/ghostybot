import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class DocsCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "docs",
      description: "Returns the request query from discord.js docs",
      category: "util",
      requiredArgs: [{ name: "query" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const query = args.join(" ");
      const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`;

      const data = await fetch(url).then((res) => res.json());

      if (!data) {
        return message.channel.send(lang.UTIL.DOC_NOT_FOUND);
      }

      const embed = {
        ...data,
        author: {},
        color: "#5865f2",
        footer: {
          text: message.author.username,
          icon_url: message.author.displayAvatarURL({ dynamic: true }),
        },
      };

      return message.channel.send({ embed });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
