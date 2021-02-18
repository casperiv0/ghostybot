import fetch from "node-fetch";
import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class CamelCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "camel",
      description: "Shows a picture of a camel",
      category: "animal",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const res = await fetch("https://apis.duncte123.me/animal/camel").then((res) => res.json());

      const embed = bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${res?.data?.file})`)
        .setImage(res?.data?.file);

      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
