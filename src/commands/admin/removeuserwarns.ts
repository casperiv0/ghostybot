import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class RemoveUserWarnsCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "removeuserwarns",
      description: "Remove all warns from a user",
      category: "admin",
      memberPermissions: ["MANAGE_GUILD"],
      requiredArgs: [{ name: "member" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const member = await bot.utils.findMember(message, args);

      const guildId = message.guild?.id;

      if (!member) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_USER);
      }

      if (member.user.bot) {
        return message.channel.send(lang.MEMBER.BOT_DATA);
      }

      const warnings = await bot.utils.getUserWarnings(member.user.id, guildId);

      if (!warnings[0]) {
        return message.channel.send(lang.ADMIN.NO_WARNINGS);
      }

      await bot.utils.removeUserWarnings(member.user.id, guildId);

      return message.channel.send(lang.ADMIN.REMOVED_ALL_WARNINGS);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
