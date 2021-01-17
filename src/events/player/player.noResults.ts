import { Message } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class PlayerNoResultsEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "noResults");
  }

  async execute(bot: Bot, message: Message) {
    try {
      if (!message.guild?.available) return;
      const lang = await bot.utils.getGuildLang(message.guild?.id);
  
      return message.channel.send(lang.MUSIC.NO_RESULTS);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
