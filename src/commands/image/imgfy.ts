import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

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

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const text = args.join(" ");

      const image = `https://flamingtext.com/net-fu/proxy_form.cgi?script=3d-logo&text=${encodeURIComponent(
        text,
      )}&_loc=generate&imageoutput=true`;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${image})`)
        .setImage(image);

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
