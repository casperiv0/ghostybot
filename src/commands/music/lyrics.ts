import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class LyricsCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "lyrics",
      aliases: ["ly"],
      description: "Get lyrics for the song",
      category: "music",
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const playing = bot.player.isPlaying(message);
      const queue = bot.player.getQueue(message);
      const np = playing || queue ? bot.player.nowPlaying(message) : false;
      const title = (np && np.title) || args.join(" ");

      const song = await (
        await fetch(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(title)}`)
      ).json();

      if (song.error) {
        return message.channel.send(lang.MUSIC.NO_LIRYCS.replace("{songTitle}", title));
      }

      const songTitle = (np && np.title) || song.title;
      const songAuthor = (np && np.author) || song.author;
      const songThumbnail = (np && np.thumbnail) || song.thumbnail.genius;
      const songLyrics = song.lyrics;

      const lyricsEmbed = bot.utils
        .baseEmbed(message)
        .setAuthor(songAuthor)
        .setTitle(songTitle)
        .setDescription(songLyrics)
        .setThumbnail(songThumbnail);

      if (lyricsEmbed.description!.length >= 2048) {
        lyricsEmbed.description = `${lyricsEmbed.description!.substr(0, 2045)}...`;
      }
      return message.channel.send(lyricsEmbed).catch((e) => bot.logger.error("Lyrics", e));
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
