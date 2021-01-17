import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class RolesCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "roles",
      description: "Shows all roles from the guild",
      category: "util",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const roles =
        message.guild?.roles.cache
          .filter((r) => r.id !== message.guild?.id)
          .map((r) => r)
          .join(",\n") || lang.GLOBAL.NONE;
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${message.guild?.name} ${lang.UTIL.ROLES}`)
        .setDescription(`${roles.length > 2048 ? roles.substr(0, 2045) + "..." : roles}`);
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
