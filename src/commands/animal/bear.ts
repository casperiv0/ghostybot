import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class BearCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "bear",
      description: "Shows a random picture of bear and fact",
      category: "animal",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const data = await fetch("https://no-api-key.com/api/v1/animals/bear").then((res) =>
      res.json()
    );

    const embed = bot.utils
      .baseEmbed(message)
      .setTitle(data.fact)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.image})`)
      .setImage(data.image);

    message.channel.send(embed);
  }
}
