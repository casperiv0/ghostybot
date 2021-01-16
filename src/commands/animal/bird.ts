import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class BirdCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "bird",
      description: "Returns an image of a bird",
      category: "animal",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const data = await (await fetch("https://some-random-api.ml/img/birb")).json();

    const embed = bot.utils
      .baseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.link})`)
      .setImage(data.link);

    message.channel.send(embed);
  }
}
