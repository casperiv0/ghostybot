import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";
import { Track } from "discord-player";

export default class LyricsCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "lyrics",
      aliases: ["ly"],
      description: "Get lyrics for the song",
      category: "music",
      typing: true,
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const playing = this.bot.player.isPlaying(message);
      const queue = this.bot.player.getQueue(message);
      const np = playing || queue ? this.bot.player.nowPlaying(message) : false;
      const title = args.join(" ") || (np as Track)?.title;

      const lyrics = await this.bot.lyricsClient.search(title);

      if (!lyrics) {
        return message.channel.send(lang.MUSIC.NO_LIRYCS.replace("{songTitle}", title));
      }

      const songTitle = lyrics.title || (np && np.title);
      const songAuthor = (lyrics.artist?.name ?? "Unknown") || (np && np.author);
      const songThumbnail = lyrics.thumbnail || (np as Track).thumbnail;
      const songLyrics = lyrics.lyrics as string;

      const lyricsEmbed = this.bot.utils
        .baseEmbed(message)
        .setAuthor(songAuthor)
        .setTitle(songTitle)
        .setDescription(songLyrics)
        .setThumbnail(songThumbnail);

      if (lyricsEmbed.description!.length >= 2048) {
        lyricsEmbed.setDescription(`${songLyrics.substr(0, 2045)}...`);
      }

      return message.channel.send(lyricsEmbed).catch((e) => this.bot.logger.error("Lyrics", e));
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
