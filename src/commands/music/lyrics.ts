import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";
import { Song } from "distube";

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
      const queue = this.bot.player.getQueue(message);
      const playing = queue?.playing;
      const np = playing || queue ? queue?.songs[0] : false;
      const title = args.join(" ") || (np as Song)?.name;

      const lyrics = await this.bot.lyricsClient.search(title as string);

      if (!lyrics) {
        return message.channel.send({
          content: lang.MUSIC.NO_LIRYCS.replace("{songTitle}", title as string),
        });
      }

      const songTitle = (lyrics.title || (np && np.name)) ?? "Unknown";
      const songAuthor = (lyrics.artist?.name || (np && np.uploader.name)) ?? "Unknown";
      const songThumbnail = lyrics.thumbnail || (np as Song).thumbnail;
      const songLyrics = lyrics.lyrics as string;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setAuthor(songAuthor.toString())
        .setTitle(songTitle.toString())
        .setDescription(songLyrics);

      if (songThumbnail) {
        embed.setThumbnail(songThumbnail);
      }

      if (embed.description!.length >= 2048) {
        embed.setDescription(`${songLyrics.substr(0, 2045)}...`);
      }

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
