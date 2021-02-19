import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class AmazingEarthCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ad",
      aliases: ["advertisement"],
      description: "Shows an amazing advertisement",
      category: "image",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const image = message.author.displayAvatarURL({ format: "png" });
      const url = `https://bot.andoi.tk/api/ad?image=${image}`;

      const embed = bot.utils.baseEmbed(message).setImage(url);

      message.channel.send({ embed });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
