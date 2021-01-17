import { Message } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

type ErrorType = "UnableToJoin" | "NotConnected" | "NotPlaying" | "LiveVideo";

export default class PlayerErrorEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "error");
  }

  async execute(bot: Bot, error: ErrorType, message: Message) {
    if (!message.guild?.available) return;
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    switch (error) {
      case "UnableToJoin": {
        return message.channel.send(lang.MUSIC.JOIN_ERROR);
      }
      case "NotConnected": {
        return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
      }
      case "NotPlaying": {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }
      case "LiveVideo": {
        return message.channel.send(lang.MUSIC.LIVE_NOT_SUPPORTED);
      }
      default: {
        bot.utils.sendErrorLog({ stack: error, name: "discord-player" }, "error");
        return message.channel.send(lang.GLOBAL.ERROR);
      }
    }
  }
}
