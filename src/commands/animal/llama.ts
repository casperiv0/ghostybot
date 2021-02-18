import fetch from "node-fetch";
import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class LlamaCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "llama",
      description: "Shows a picture of a llama",
      category: "animal",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const res = await fetch("https://apis.duncte123.me/animal/llama").then((res) => res.json());

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
