import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class SmugCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "smug",
      description: "Smug",
      category: "image",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const data = await fetch("https://nekos.life/api/v2/img/smug").then((res) => res.json());

      const embed = this.bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
        .setImage(`${data.url}`);

      return message.channel.send({ embed });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
