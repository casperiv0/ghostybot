import { Message } from "discord.js";
import { Track } from "discord-player";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class PlayerTrackStarEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "trackStart");
  }

  async execute(bot: Bot, message: Message, track: Track) {
    try {
      if (!message.guild?.available) return;
      const lang = await bot.utils.getGuildLang(message.guild?.id);
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${lang.MUSIC.NOW_PLAYING} ${track.title}`)
        .setAuthor(`${lang.MUSIC.REQUESTED_BY} ${track.requestedBy.username}`)
        .setImage(track.thumbnail);
  
      return message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
