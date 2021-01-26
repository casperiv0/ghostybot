import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class DepositCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "deposit",
      description: "deposit money to your bank",
      category: "economy",
      usage: "<all | amount>",
      aliases: ["dep"],
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

      const money = user.money;
      const amount: number | string = args[0];

      if (amount === "all") {
        await bot.utils.updateUserById(member.id, message.guild?.id, {
          bank: user.bank + money,
          money: user.money - money,
        });
        return message.channel.send(lang.ECONOMY.DEPOSITED_ALL);
      }

      if (!Number(args[0])) {
        return message.channel.send(lang.MESSAGE.MUST_BE_NUMBER);
      }

        if (+amount <= 0) {
        return message.channel.send(lang.ECONOMY.MIN_AMOUNT);
      }

      if (money < +amount) {
        return message.channel.send(lang.ECONOMY.NOT_ENOUGH_MONEY);
      }

      await bot.utils.updateUserById(member.id, message.guild?.id, {
        bank: user.bank + Number(amount),
        money: user.money - Number(amount),
      });

      message.channel.send(lang.ECONOMY.DEPOSITED_AMOUNT.replace("{amount}", `${amount}`));
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
