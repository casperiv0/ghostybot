import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

const API_URL = "https://some-random-api.ml/img/pikachu";

export default class KangarooCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "pikachu",
      description: "An image of a pikachu",
      category: "image",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const data = await fetch(API_URL).then((res) => res.json());

      const embed = bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.link})`)
        .setImage(data.link);

      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
