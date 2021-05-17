import { Message } from "discord.js";
import { Queue, Constants, Track } from "discord-player";
import Bot from "structures/Bot";
import Event from "structures/Event";

interface Playlist {
  tracks: Track[];
  title: string;
}

export default class PlayerPlaylistAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, Constants.PlayerEvents.PLAYLIST_ADD);
  }

  async execute(bot: Bot, message: Message, _: Queue, playlist: Playlist) {
    try {
      if (!message.guild?.available) return;
      const lang = await bot.utils.getGuildLang(message.guild?.id);
      if (!playlist) return;

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(
          `${lang.MUSIC.ADDED_PL_TO_QUEUE.replace("{length}", `${playlist.tracks.length}`).replace(
            "{name}",
            `${playlist.title}`,
          )}`,
        );

      return message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
