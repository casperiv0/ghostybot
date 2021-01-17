import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ServerIconCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "servericon",
      description: "Shows the server icon",
      category: "util",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const icon = message.guild?.iconURL({ dynamic: true, size: 2048 });
  
      if (!icon) {
        message.channel.send(lang.UTIL.NO_GUILD_ICON);
      } else {
        const embed = bot.utils.baseEmbed(message).setImage(icon);
  
        message.channel.send(embed);
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
