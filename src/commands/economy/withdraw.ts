import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class WithdrawCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "withdraw",
      description: "Withdraw money to your bank",
      category: "economy",
      usage: "<all | amount>",
      aliases: ["with"],
      requiredArgs: [{ name: "amount" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = message.author;
      const user = await bot.utils.getUserById(member.id, message.guild?.id);

      if (!user) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }
      const bank = user.bank;
      let amount: string | number = args[0];

      if (!amount) return message.reply(lang.ECONOMY.PROVIDE_AMOUNT);

      if (amount === "all") {
        bot.utils.updateUserById(member.id, message.guild?.id, {
          money: user.money + bank,
          bank: user.bank - bank,
        });
        return message.channel.send(lang.ECONOMY.WITHDRAW_ALL);
      }

      if (!Number(args[0])) {
        return message.channel.send(lang.MESSAGE.MUST_BE_NUMBER);
      }

      amount = Number(args[0]);

      if (amount < 0) {
        return message.channel.send(lang.ECONOMY.MIN_AMOUNT);
      }

      if (bank < amount) {
        return message.channel.send(lang.ECONOMY.NO_MONEY);
      }

      await bot.utils.updateUserById(member.id, message.guild?.id, {
        money: user.money + Number(amount),
        bank: user.bank - Number(amount),
      });
      message.channel.send(lang.ECONOMY.WITHDRAW_AMOUNT.replace("{amount}", `${amount}`));
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
