import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class MemeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "meme",
      description: "Returns a meme",
      category: "games",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const data = await fetch("https://meme-api.herokuapp.com/gimme").then((res) => res.json());

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(data.title)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
        .setImage(data.url);

      message.channel.send(embed);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
