import { Message, Permissions } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class AddMoneyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "addmoney",
      description: "Add money to a user",
      category: "economy",
      memberPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      requiredArgs: [{ name: "member" }, { name: "amount", type: "number" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await this.bot.utils.findMember(message, args);
      const [, amount] = args;

      if (!member) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      if (member.user.bot) {
        return message.channel.send(lang.MEMBER.BOT_DATA);
      }

      if (!amount) {
        return message.channel.send(lang.LEVELS.PROVIDE_AMOUNT);
      }

      if (+amount < 1) {
        return message.channel.send(lang.ECONOMY.MIN_AMOUNT);
      }

      const user = await this.bot.utils.getUserById(member.user.id, message.guild?.id);
      if (!user) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      await this.bot.utils.updateUserById(member.user.id, message.guild?.id, {
        bank: user.bank + Number(amount),
      });

      return message.channel.send(lang.ECONOMY.ADDED_MONEY.replace("{amount}", amount));
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
