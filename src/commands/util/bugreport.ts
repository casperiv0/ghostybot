import { Message, TextChannel } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class BugReportCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "bugreport",
      description: "Report a bug to your staff",
      category: "util",
      cooldown: 300,
      requiredArgs: [{ name: "report" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const bug = args.join(" ");

      if (!bot.config.reportsChannelId) {
        return message.channel.send(
          lang.CONFIG.OPTION_CMD_WORK.replace("{option}", "reportsChannelId")
        );
      }

      if (!bug) {
        return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
      }

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.UTIL.BUG_REPORT.replace("{member}", message.author.tag))
        .setDescription(bug);

      (bot.channels.cache.get(bot.config.reportsChannelId) as TextChannel)?.send(embed);

      return message.channel.send(lang.UTIL.BUG_REPORTED);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
