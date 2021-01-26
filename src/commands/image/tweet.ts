import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class TweetCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "tweet",
      description: "Returns an image with your tweet",
      category: "image",
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const text = args.join(" ");
      const { username } = message.author;

      const sendMsg = await message.channel.send(lang.UTIL.PROCESSING_IMAGE);

      const data = await fetch(
        `https://nekobot.xyz/api/imagegen?type=tweet&text=${encodeURIComponent(
          text
        )}&username=${username}`
      )
        .then((res) => res.json())
        .catch(() => {
          message.channel.send(lang.GLOBAL.ERROR);
        });

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
