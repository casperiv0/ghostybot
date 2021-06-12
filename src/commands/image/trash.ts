import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

const API_URL = "https://api.no-api-key.com/api/v2/delete?image=";

export default class TrashCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "trash",
      description: "Put someone in the trash bin someone",
      category: "image",
      aliases: ["delete"],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const member = await this.bot.utils.findMember(message, args, { allowAuthor: true });

      if (!member) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      const image = `${API_URL}${member.user.displayAvatarURL({ format: "png" })}`;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${image})`)
        .setImage(image);

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
