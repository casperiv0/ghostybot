import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import { Message } from "discord.js";

export default class XpCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "givexp",
      description: "Give someone Xp",
      category: "levels",
      usage: "<user> <amount>",
      memberPermissions: ["MANAGE_GUILD"],
      requiredArgs: [{ name: "member" }, { name: "amount", type: "number" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const [amount] = args;
      const member = await bot.utils.findMember(message, args);

      if (!member) {
        return message.channel.send(lang.EASY_GAMES.PROVIDE_MEMBER);
      }

      if (member.user.bot) {
        return message.channel.send(lang.MEMBER.BOT_DATA);
      }

      if (isNaN(Number(amount))) {
        return message.channel.send(lang.LEVELS.PROVIDE_VALID_NR);
      }
      const user = await bot.utils.getUserById(member.id, message.guild?.id);
      if (!user) return;

      await bot.utils.updateUserById(member.id, message.guild?.id, {
        xp: user?.xp + Number(amount),
      });

      message.channel.send(
        lang.LEVELS.GIVE_XP_SUCCESS.replace("{member}", member.user.tag).replace("{amount}", amount)
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
