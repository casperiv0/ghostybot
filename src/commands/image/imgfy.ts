import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ImgfyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "imgfy",
      aliases: ["texttoimage"],
      description: "text to image converter xD",
      category: "image",
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const text = args.join(" ");

      const image = `https://flamingtext.com/net-fu/proxy_form.cgi?script=3d-logo&text=${encodeURIComponent(
        text
      )}&_loc=generate&imageoutput=true`;

      const embed = bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${image})`)
        .setImage(image);

      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
