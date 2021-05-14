import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import ms from "ms";

export default class SeekCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "seek",
      description: "Seek thru a song",
      category: "music",
      requiredArgs: [{ type: "time", name: "seconds/minutes" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const time = ms(args[0]);

      if (!message.member?.voice.channel) {
        return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
      }

      const queue = this.bot.player.getQueue(message);
      if (!this.bot.player.isPlaying(message)) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }

      if (!queue) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }

      const song = this.bot.player.nowPlaying(message);

      if (!song) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }

      if (time > song.durationMS) {
        return message.channel.send("Time cannot be longer than song duration");
      }

      this.bot.player.seek(message, time);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
