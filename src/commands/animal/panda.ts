import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class PandaCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "panda",
      description: "Shows a picture of a panda",
      category: "animal",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const data = await fetch("https://some-random-api.ml/img/panda").then((res) => res.json());

    const embed = bot.utils
      .baseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.link})`)
      .setImage(data.link);

    message.channel.send(embed);
  }
}
