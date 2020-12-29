const lyricsFinder = require("lyrics-finder");
const BaseEmbed = require("../../modules/BaseEmbed");
const Logger = require("../../modules/Logger");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Get lyrics for the currently playing song",
  category: "music",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const queue = await bot.player.getQueue(message);
    const song = bot.player.nowPlaying(message);
    
    if (!queue) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(song.title, "");
      if (!lyrics) lyrics = `No lyrics found for ${song.title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${song.title}.`;
    }

    let lyricsEmbed = BaseEmbed(message)
      .setTitle(`${song.title}`)
      .setDescription(lyrics);

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(e => Logger.error("Lyrics", e));
  }
};
