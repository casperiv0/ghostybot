import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class KissCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "kiss",
      description: "Shows a picture of people kissing",
      category: "image",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const data = await fetch("https://nekos.life/api/kiss").then((res) => res.json());
      const user = message.mentions.users.first() || message.author;
      const kissed = message.author.id === user.id ? "themselves" : user.username;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${message.author.username} ${lang.IMAGE.KISSED} ${kissed}`)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
        .setImage(`${data.url}`);

      message.channel.send(embed);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
