const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");
const Logger = require("../../modules/Logger");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Get lyrics for the song",
  category: "music",
  requiredArgs: ["song title"],
  async execute(bot, message, args) {
    const title = encodeURIComponent(args.join(" "));
    const song = await (
      await fetch("https://some-random-api.ml/lyrics?title=" + title)
    ).json();
    if (song.error) return message.channel.send(`No lyrics found for ${title}.`)
    const songTitle = song.title;
    const songAuthor = song.author;
    const songThumbnail = song.thumbnail.genius;
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
