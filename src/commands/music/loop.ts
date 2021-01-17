import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class LoopCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "loop",
      description: "Loop a song that is playing",
      category: "music",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      if (!message.member?.voice.channel) {
        return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
      }

      if (!bot.player.isPlaying(message)) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }

      if (bot.player.getQueue(message).tracks.length > 1) {
        const modeloop = !bot.player.getQueue(message).loopMode;
        bot.player.setLoopMode(message, modeloop);
      } else {
        const moderepeat = !bot.player.getQueue(message).repeatMode;
        bot.player.setRepeatMode(message, moderepeat);
      }

      message.react("🔁");
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
