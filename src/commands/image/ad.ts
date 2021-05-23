import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class AmazingEarthCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ad",
      aliases: ["advertisement"],
      description: "Shows an amazing advertisement",
      category: "image",
      typing: true,
    });
  }

  async execute(message: Message): Promise<Message> {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const image = message.author.displayAvatarURL({ format: "png" });
      const url = `https://bot.andoi.tk/api/ad?image=${image}`;

      const embed = this.bot.utils.baseEmbed(message).setImage(url);

      return message.channel.send(embed);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
