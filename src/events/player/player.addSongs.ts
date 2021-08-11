import { Queue, Song } from "distube";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class PlayerAddSongEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "addSongs");
  }

  async execute(bot: Bot, queue: Queue, song: Song) {
    try {
      const channel = queue.textChannel;

      if (!channel?.guild?.available) return;
      if (!bot.utils.hasSendPermissions(channel)) return;
      const lang = await bot.utils.getGuildLang(channel?.guild?.id);

      const embed = bot.utils
        .baseEmbed({ author: song.user ?? null })
        .setTitle(lang.MUSIC.ADDED_TO_QUEUE.replace("{song}", song.name as string))
        .setAuthor(`${lang.MUSIC.REQUESTED_BY.replace("{user}", song.user?.username as string)}`);

      if (song.thumbnail) {
        embed.setImage(song.thumbnail);
      }

      return channel?.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
