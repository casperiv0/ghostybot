import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class TweetCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "tweet",
      description: "Returns an image with your tweet",
      category: "image",
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const text = args.join(" ");
      const { username } = message.author;

      const sendMsg = await message.channel.send(lang.UTIL.PROCESSING_IMAGE);

      const data = await fetch(
        `https://nekothis.bot.xyz/api/imagegen?type=tweet&text=${encodeURIComponent(
          text,
        )}&username=${encodeURIComponent(username)}`,
      )
        .then((res) => res.json())
        .catch(() => {
          message.channel.send(lang.GLOBAL.ERROR);
        });

      sendMsg.deletable && sendMsg.delete();
      const embed = this.bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`)
        .setImage(data.message);

      return message.channel.send(embed);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
