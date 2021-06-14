import { Message, Permissions } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class RemoveUserWarnsCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "removeuserwarns",
      description: "Remove all warns from a user",
      category: "admin",
      memberPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      requiredArgs: [{ name: "member" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const member = await this.bot.utils.findMember(message, args);

      const guildId = message.guild?.id;

      if (!member) {
        return message.channel.send({
          content: lang.ADMIN.PROVIDE_VALID_USER,
        });
      }

      if (member.user.bot) {
        return message.channel.send({
          content: lang.MEMBER.BOT_DATA,
        });
      }

      const warnings = await this.bot.utils.getUserWarnings(member.user.id, guildId);

      if (!warnings[0]) {
        return message.channel.send({
          content: lang.ADMIN.NO_WARNINGS,
        });
      }

      await this.bot.utils.removeUserWarnings(member.user.id, guildId);

      return message.channel.send({
        content: lang.ADMIN.REMOVED_ALL_WARNINGS,
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
