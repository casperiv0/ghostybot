import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class WarnCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "warn",
      description: "Warns a user",
      category: "admin",
      usage: "<user>",
      memberPermissions: ["MANAGE_GUILD"],
      requiredArgs: [{ name: "user" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await bot.utils.findMember(message, args);
      const reason = args[0] || lang.GLOBAL.NOT_SPECIFIED;

      if (!member) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      if (member.user.bot) {
        return message.channel.send(lang.MEMBER.BOT_DATA);
      }

      if (member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send(lang.ADMIN.USER_NOT_WARN);
      }

      await bot.utils.addWarning(member.user.id, message.guild?.id, reason);

      const warnings = await bot.utils.getUserWarnings(member.user.id, message.guild?.id);

      return message.channel.send(
        lang.ADMIN.USER_WARNED.replace("{memberTag}", member.user.tag)
          .replace("{reason}", reason)
          .replace("{warningsTotal}", warnings ? `${warnings.length}` : "0")
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
