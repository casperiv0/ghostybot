import Command from "structures/Command";
import Bot from "structures/Bot";
import { Message, Permissions } from "discord.js";

export default class XpCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "givexp",
      description: "Give someone Xp",
      category: "levels",
      usage: "<user> <amount>",
      memberPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      requiredArgs: [{ name: "member" }, { name: "amount", type: "number" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const [, amount] = args;
      const member = await this.bot.utils.findMember(message, args);

      if (!member) {
        return message.channel.send({
          content: lang.EASY_GAMES.PROVIDE_MEMBER,
        });
      }

      if (member.user.bot) {
        return message.channel.send({ content: lang.MEMBER.BOT_DATA });
      }

      const user = await this.bot.utils.getUserById(member.id, message.guild?.id);
      if (!user) return;

      await this.bot.utils.updateUserById(member.id, message.guild?.id, {
        xp: user?.xp + Number(amount),
      });

      message.channel.send({
        content: lang.LEVELS.GIVE_XP_SUCCESS.replace("{member}", member.user.tag).replace(
          "{amount}",
          amount,
        ),
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
