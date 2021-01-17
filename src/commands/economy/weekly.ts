import { Message } from "discord.js";
import moment from "moment";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class WeeklyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "weekly",
      description: "Collect your weekly price",
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
  
      const timeout = 60 * 60 * 1000 * 24 * 7; /* 1 week timeout */
      const amount = 1000;
      const weekly = user.weekly;
  
      if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
        const time = moment(timeout - (Date.now() - weekly)).format(
          "D [days], H [hrs], m [mins], s [secs]"
        );
        message.channel.send(`${lang.ECONOMY.WEEKLY_ERROR} ${time} remaining`);
      } else {
        await bot.utils.updateUserById(message.author.id, message.guild?.id, {
          money: user.money + amount,
          weekly: Date.now(),
        });
  
        message.channel.send(lang.ECONOMY.WEEKLY_SUCCESS.replace("{amount}", `${amount}`));
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
