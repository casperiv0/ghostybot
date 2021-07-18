import { Message } from "discord.js";
import { time } from "@discordjs/builders";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class DailyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "daily",
      description: "daily",
      category: "economy",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const user = await this.bot.utils.getUserById(message.author.id, message.guild?.id);
      if (!user) {
        return message.channel.send({ content: lang.GLOBAL.ERROR });
      }

      const timeout = 60 * 60 * 24 * 1000; /* 24h timeout */
      const amount = 500;
      const currentMoney = user?.money;
      const daily = user?.daily;

      if (daily !== null && timeout - (Date.now() - daily) > 0) {
        const dateTime = new Date(Date.now() + timeout - (Date.now() - daily));

        message.channel.send({
          content: `${lang.ECONOMY.DAILY_ERROR} Check back ${time(dateTime, "R")}`,
        });
      } else {
        this.bot.utils.updateUserById(message.author.id, message.guild?.id, {
          daily: Date.now(),
          money: currentMoney + amount,
        });

        message.channel.send({
          content: lang.ECONOMY.DAILY_SUCCESS.replace("{amount}", `${amount}`),
        });
      }
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
