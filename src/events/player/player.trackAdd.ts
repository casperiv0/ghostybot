import { Message } from "discord.js";
import { Queue, Track } from "discord-player";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class PlayerTrackAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "trackAdd");
  }

  async execute(bot: Bot, message: Message, queue: Queue, track: Track) {
    try {
      if (!message.guild?.available) return;
      const lang = await bot.utils.getGuildLang(message.guild?.id);
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${lang.MUSIC.ADDED_TO_QUEUE.replace("{song}", track.title)}`)
        .setAuthor(`${lang.MUSIC.REQUESTED_BY} ${track.requestedBy.username}`)
        .setImage(track.thumbnail);
  
      return message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
