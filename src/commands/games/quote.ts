import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class QuoteCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "quote",
      description: "desc",
      category: "games",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const data = await fetch("https://api.tovade.xyz/v1/fun/quote").then((r) => r.json());

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(lang.GAMES.QUOTE)
        .setDescription(data.content)
        .addField(lang.UTIL.AUTHOR, `${data.author} (${data.id})`)
        .addField(lang.GAMES.TAGS, data.tags.join(", "));

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
