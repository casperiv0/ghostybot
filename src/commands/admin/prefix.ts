import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class PrefixCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "prefix",
      description: "Set a prefix for your server",
      category: "exempt",
      memberPermissions: ["MANAGE_GUILD"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const [prefix] = args;
    try {
      const guild = await bot.utils.getGuildById(message.guild?.id);

      if (!prefix)
        return message.channel.send(
          lang.ADMIN.CURRENT_PREFIX
          .replace("{guildPrefix}", `${guild?.prefix}`)
          .replace("{guildPrefix}", `${guild?.prefix}`)
        );

      await bot.utils.updateGuildById(message.guild?.id, { prefix });

      message.channel.send(lang.ADMIN.UPDATE_PREFIX.replace("{prefix}", prefix));
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
