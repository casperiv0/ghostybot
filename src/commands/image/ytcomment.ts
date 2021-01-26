import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class YtCommentCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ytcomment",
      description: "Returns an image with your YouTube comment",
      category: "image",
      usage: "<my amazing youtube comment>",
      requiredArgs: [{ name: "comment" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const comment = args.join(" ");
      const username = message.author.username;
      const avatar = message.author.displayAvatarURL({
        dynamic: false,
        format: "png",
      });

      const sendMsg = await message.channel.send(lang.UTIL.PROCESSING_IMAGE);

      sendMsg.deletable && sendMsg.delete();
      const url = `https://some-random-api.ml/canvas/youtube-comment?username=${encodeURIComponent(
        username
      )}&comment=${encodeURIComponent(comment)}&avatar=${encodeURIComponent(avatar)}`;

      const embed = bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${url})`)
        .setImage(url);

      message.channel.send({ embed });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
