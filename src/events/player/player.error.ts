import { Message } from "discord.js";
import { Constants } from "discord-player";
import Bot from "structures/Bot";
import Event from "structures/Event";
import { PlayerErrorEventCodes } from "discord-player/lib/utils/Constants";

export default class PlayerErrorEvent extends Event {
  constructor(bot: Bot) {
    super(bot, Constants.PlayerEvents.ERROR);
  }

  async execute(bot: Bot, error: PlayerErrorEventCodes, message: Message) {
    if (!message.guild?.available) return;
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    switch (error) {
      case PlayerErrorEventCodes.UNABLE_TO_JOIN: {
        return message.channel.send(lang.MUSIC.JOIN_ERROR);
      }
      case PlayerErrorEventCodes.NOT_CONNECTED: {
        return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
      }
      case PlayerErrorEventCodes.NOT_PLAYING: {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }
      case PlayerErrorEventCodes.LIVE_VIDEO: {
        return message.channel.send(lang.MUSIC.LIVE_NOT_SUPPORTED);
      }
      case PlayerErrorEventCodes.PARSE_ERROR: {
        return message.channel.send(lang.MUSIC.PARSE_ERROR);
      }
      case PlayerErrorEventCodes.VIDEO_UNAVAILABLE: {
        return message.channel.send(lang.MUSIC.VIDEO_UNAVAILABLE);
      }
      case PlayerErrorEventCodes.MUSIC_STARTING: {
        return message.channel.send(lang.MUSIC.MUSIC_STARTING);
      }
      default: {
        bot.utils.sendErrorLog({ stack: error, name: "discord-player" }, "error");
        return message.channel.send(lang.GLOBAL.ERROR);
      }
    }
  }
}
