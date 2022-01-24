import { TextChannel } from "discord.js";
import { DisTubeError } from "distube";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class PlayerErrorEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "error");
  }

  async execute(bot: Bot, channel: TextChannel, error: DisTubeError<string>) {
    if (!channel.guild?.available) return;
    if (!bot.utils.hasSendPermissions(channel)) return;
    const lang = await bot.utils.getGuildLang(channel.guild?.id);

    if (lang.MUSIC.ERRORS[error.code]) {
      return channel.send({ content: lang.MUSIC.ERRORS[error.code] });
    }

    bot.utils.sendErrorLog(error, "error");
    return channel.send({ content: lang.GLOBAL.ERROR });
  }
}
