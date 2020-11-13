const moment = require("moment");
const createBar = require("string-progressbar");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "nowplaying",
  description: "Shows info about the current playing song",
  category: "music",
  aliases: ["np", "currentsong"],
  async execute(bot, message, args, serverQueue) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    if (!serverQueue) {
      return message.channel.send(lang.MUSIC.NO_QUEUE);
    }

    const song = serverQueue.nowPlaying;
    const time = moment
      .duration(song.duration, "seconds")
      .format("d [Days] h [Hours] m [Minutes] s [Seconds]");
    const seek =
      (serverQueue.connection.dispatcher.streamTime -
        serverQueue.connection.dispatcher.pausedTime) /
      1000;
    const left = song.duration - seek;

    const embed = BaseEmbed(message)
      .setTitle(song.title)
      .setURL(song.url)
      .setAuthor(
        `🎵 Now ${
          serverQueue.playing
            ? lang.MUSIC.PLAYING
            : lang.MUSIC.PAUSED
        }`
      )
      .setImage(`https://i.ytimg.com/vi/${song.videoId}/hqdefault.jpg`)
      .setDescription(
        `
      **${lang.MUSIC.DURATION}:** ${time}
      **${lang.MUSIC.UPLOADED_BY}:** ${song.uploadedBy}
      **${lang.MUSIC.UPLOADED_AT}:** ${song.uploadedAt}
      **${lang.MUSIC.VIEWS}:** ${song.views}
      **${lang.MUSIC.LIKES}:** ${song.likes || "N/A"}
      **${lang.MUSIC.DISLIKES}:** ${song.dislikes || "N/A"}`
      )
      .addField(
        new Date(seek * 1000).toISOString().substr(11, 8) +
          " / " +
          new Date(left * 1000).toISOString().substr(11, 8),
        createBar(song.duration === 0 ? seek : song.duration, seek, 20)[0],
        false
      );

    message.channel.send(embed);
  },
};
