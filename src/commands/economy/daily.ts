import { Message } from "discord.js";
import moment from "moment";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class DailyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "daily",
      description: "daily",
      category: "economy",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const user = await bot.utils.getUserById(message.author.id, message.guild?.id);
      if (!user) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }
  
      const timeout = 60 * 60 * 24 * 1000; /* 24h timeout */
      const amount = 500;
      const currentMoney = user?.money;
      const daily = user?.daily;
  
      if (daily !== null && timeout - (Date.now() - daily) > 0) {
        const time = moment(timeout - (Date.now() - daily)).format("h [hrs], m [mins], s [secs]");
        message.channel.send(`${lang.ECONOMY.DAILY_ERROR} ${time} remaining`);
      } else {
        bot.utils.updateUserById(message.author.id, message.guild?.id, {
          daily: Date.now(),
          money: currentMoney + amount,
        });
  
        message.channel.send(lang.ECONOMY.DAILY_SUCCESS.replace("{amount}", `${amount}`));
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
