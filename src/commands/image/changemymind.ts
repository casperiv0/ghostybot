import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ChangeMyMindCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "changemymind",
      description: "Change my mind",
      category: "image",
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const text = args.join(" ");

      const sendMsg = await message.channel.send(lang.UTIL.PROCESSING_IMAGE);

      const data = await fetch(
        `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`
      ).then((res) => res.json());

      sendMsg.deletable && sendMsg.delete();
      const embed = bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`)
        .setImage(data.message);

      message.channel.send({ embed });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
