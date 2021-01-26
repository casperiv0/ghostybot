import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class PayCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "pay",
      description: "Give money to a user",
      usage: "<member>, <amount>",
      category: "economy",
      requiredArgs: [{ name: "member" }, { type: "number", name: "amount" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await bot.utils.findMember(message, args);
      const amount = Number(args[1]);

      if (!member) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_USER);
      }

      if (member.user.bot) {
        return message.channel.send(lang.MEMBER.BOT_DATA);
      }

      const receiver = await bot.utils.getUserById(member.id, message.guild?.id);
      const sender = await bot.utils.getUserById(message.author.id, message.guild?.id);

      if (!receiver || !sender) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }

      if (amount < 0) {
        return message.channel.send(lang.ECONOMY.MIN_AMOUNT);
      }

      if (amount > sender.money) {
        return message.channel.send(lang.ECONOMY.NOT_ENOUGH_MONEY);
      }

      if (receiver.user_id === sender.user_id) {
        return message.channel.send(lang.ECONOMY.CANNOT_PAY_SELF);
      }

      await bot.utils.updateUserById(member.id, message.guild?.id, {
        money: receiver.money + amount,
      });
      await bot.utils.updateUserById(message.author.id, message.guild?.id, {
        money: sender.money - amount,
      });

      return message.channel.send(
        lang.ECONOMY.PAY_SUCCESS.replace("{member}", member.user.tag).replace(
          "{amount}",
          `${amount}`
        )
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
