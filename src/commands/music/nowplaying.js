const moment = require("moment");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "nowplaying",
  description: "Shows info about the current playing song",
  category: "music",
  aliases: ["np", "currentsong"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    const playing = bot.player.isPlaying(message);

    if (!playing) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }

    const song = bot.player.nowPlaying(message);

    const time = moment
      .duration(song.durationMS, "milliseconds")
      .format("d [Days] h [Hours] m [Minutes] s [Seconds]");

    const embed = BaseEmbed(message)
      .setTitle(song.title)
      .setURL(song.url)
      .setAuthor(`🎵 Now ${playing ? lang.MUSIC.PLAYING : lang.MUSIC.PAUSED}`)
      .setImage(song.thumbnail)
      .setDescription(
        `
      **${lang.MUSIC.DURATION}:** ${time}
      **${lang.MUSIC.VIEWS}:** ${song?.views ? song.views : "N/A"}
`
      );

    message.channel.send(embed);
  },
};
