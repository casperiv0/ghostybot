const moment = require("moment");
require("moment-duration-format");
const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "nowplaying",
  description: "Shows info about the current playing song",
  category: "music",
  aliases: ["np", "currentsong"],
  execute(bot, message, args, serverQueue) {
    if (!message.member.voice.channel) {
      return message.channel.send("You need to be in a voice channel!");
    }

    if (!serverQueue) {
      return message.channel.send("There are no song currently playing");
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

    const embed = new MessageEmbed()
      .setTitle(song.title)
      .setURL(song.url)
      .setAuthor(`🎵 Now ${serverQueue.playing ? "Playing" : "Paused"}`)
      .setImage(`https://i.ytimg.com/vi/${song.videoId}/hqdefault.jpg`)
      .setColor("BLUE")
      .setDescription(
        `
      **Duration:** ${time}
      **Uploaded by:** ${song.uploadedBy}
      **Uploaded at:** ${song.uploadedAt}
      **Views :** ${song.views}
      **Likes:** ${song.likes}
      **Dislikes:** ${song.dislikes}`
      )
      .addField(
        new Date(seek * 1000).toISOString().substr(11, 8) +
          " / " +
          new Date(left * 1000).toISOString().substr(11, 8),
        createBar(song.duration === 0 ? seek : song.duration, seek, 20)[0],
        false
      )
      .setFooter(`Requested by ${song.requestedBy.tag}`);
    message.channel.send(embed);
  },
};
