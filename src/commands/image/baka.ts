import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class BakaCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "baka",
      description: "None",
      category: "image",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const data = await bot.neko.sfw.baka();

    const embed = bot.utils
      .baseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  }
}
