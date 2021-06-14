import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

const API_URL = "https://some-random-api.ml/animal/kangaroo";

export default class KangarooCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "kangaroo",
      description: "An image of a kangaroo",
      category: "animal",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const data = await fetch(API_URL).then((res) => res.json());

      const embed = this.bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.image})`)
        .setImage(data.image);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
