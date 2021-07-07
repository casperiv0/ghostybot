import { TextChannel } from "discord.js";
import Bot from "structures/Bot";
import Event from "structures/Event";

export default class PlayerErrorEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "error");
  }

  async execute(bot: Bot, channel: TextChannel, error: Error) {
    if (!channel.guild?.available) return;
    const lang = await bot.utils.getGuildLang(channel.guild?.id);

    bot.utils.sendErrorLog(error, "error");
    return channel.send({ content: lang.GLOBAL.ERROR });
  }
}
