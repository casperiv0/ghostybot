import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ClydeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "clyde",
      description: "Let clyde say something",
      category: "image",
      requiredArgs: ["text"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const text = args.join(" ");

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`
    ).then((res) => res.json());

    const embed = bot.utils
      .baseEmbed(message)
      .setTitle(lang.IMAGE.CLYDE)
      .setImage(data.message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`);

    message.channel.send(embed);
  }
}
