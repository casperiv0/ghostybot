import { Message, Permissions, Snowflake } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class UnBanCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "unban",
      description: "unban a user by their id",
      category: "admin",
      botPermissions: [Permissions.FLAGS.BAN_MEMBERS],
      memberPermissions: [Permissions.FLAGS.BAN_MEMBERS],
      requiredArgs: [{ name: "member_id" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const [userId] = args;

      if (!userId) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_USERID);
      }

      const bannedUser = await message.guild?.members.unban(userId as Snowflake);

      message.channel.send(
        lang.ADMIN.SUC_UNBAN.replace("{bannedUsername}", `${bannedUser?.username}`),
      );
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
