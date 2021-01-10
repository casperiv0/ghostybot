const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");
const Logger = require("../../modules/Logger");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Get lyrics for the song",
  category: "music",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const playing = bot.player.isPlaying(message);
    const queue = await bot.player.getQueue(message);
    const np = (playing || queue) ? bot.player.nowPlaying(message) : false;
    const title = np.title || encodeURIComponent(args.join(" "));
    const song = await (
      await fetch("https://some-random-api.ml/lyrics?title=" + title)
    ).json();
    if (song.error) return message.channel.send(lang.MUSIC.NO_LIRYCS.replace("{songTitle}", title))
    const songTitle = np.title || song.title;
    const songAuthor = np.author || song.author;
    const songThumbnail = np.thumbnail || song.thumbnail.genius;
    const songLyrics = song.lyrics;

    let lyricsEmbed = BaseEmbed(message)
      .setAuthor(songAuthor)
      .setTitle(songTitle)
      .setDescription(songLyrics)
      .setThumbnail(songThumbnail);

    if (lyricsEmbed.description.length >= 2048) lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(e => Logger.error("Lyrics", e));
  },
};
