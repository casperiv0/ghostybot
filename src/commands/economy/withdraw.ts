import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

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

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = message.author;
      const user = await this.bot.utils.getUserById(member.id, message.guild?.id);

      if (!user) {
        return message.channel.send({ content: lang.GLOBAL.ERROR });
      }
      const bank = user.bank;
      let [amount] = args as (string | number)[];

      if (!amount) return message.reply(lang.ECONOMY.PROVIDE_AMOUNT);

      if (amount === "all") {
        this.bot.utils.updateUserById(member.id, message.guild?.id, {
          money: user.money + bank,
          bank: user.bank - bank,
        });
        return message.channel.send({
          content: lang.ECONOMY.WITHDRAW_ALL,
        });
      }

      if (!Number(args[0])) {
        return message.channel.send({
          content: lang.MESSAGE.MUST_BE_NUMBER,
        });
      }

      amount = Number(args[0]);

      if (amount < 0) {
        return message.channel.send({
          content: lang.ECONOMY.MIN_AMOUNT,
        });
      }

      if (bank < amount) {
        return message.channel.send({
          content: lang.ECONOMY.NO_MONEY,
        });
      }

      await this.bot.utils.updateUserById(member.id, message.guild?.id, {
        money: user.money + Number(amount),
        bank: user.bank - Number(amount),
      });
      message.channel.send({
        content: lang.ECONOMY.WITHDRAW_AMOUNT.replace("{amount}", `${amount}`),
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
