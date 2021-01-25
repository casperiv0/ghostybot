import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class UnBanCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "unban",
      description: "unban a user by their id",
      category: "admin",
      botPermissions: ["BAN_MEMBERS"],
      memberPermissions: ["BAN_MEMBERS"],
      requiredArgs: [{ name: "member_id" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const [userId] = args;

      if (!userId) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_USERID);
      }

      const bannedUser = await message.guild?.members.unban(userId);

      message.channel.send(
        lang.ADMIN.SUC_UNBAN.replace("{bannedUsername}", `${bannedUser?.username}`)
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
