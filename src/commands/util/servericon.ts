import { Message } from "discord.js";
import { Command } from "structures/Command";
import { Bot } from "structures/Bot";

export default class ServerIconCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "servericon",
      description: "Shows the server icon",
      category: "util",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const icon = message.guild?.iconURL({ dynamic: true, size: 2048 });

      if (!icon) {
        message.channel.send({ content: lang.UTIL.NO_GUILD_ICON });
      } else {
        const embed = this.bot.utils.baseEmbed(message).setImage(icon);

        message.channel.send({ embeds: [embed] });
      }
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
