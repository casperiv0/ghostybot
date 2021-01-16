import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class NekoCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "neko",
      description: "None",
      category: "hentainsfw",
      nsfwOnly: true,
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    const data = await fetch("https://nekobot.xyz/api/image?type=neko").then((res) => res.json());

    const embed = bot.utils
      .baseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`)
      .setImage(`${data.message}`);

    message.channel.send(embed);
  }
}
