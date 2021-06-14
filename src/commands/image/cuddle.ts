import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class CuddleCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "cuddle",
      description: "Cuddle with somebody",
      category: "image",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const data = await this.bot.neko.sfw.cuddle();

      const user = message.mentions.users.first() || message.author;
      const cuddled = message.author.id === user.id ? "themselves" : user.username;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${message.author.username} ${lang.IMAGE.CUDDLES} ${cuddled}`)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
        .setImage(`${data.url}`);

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
