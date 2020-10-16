const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "nowplaying",
  description: "Shows info about the current playing song",
  category: "music",
  aliases: ["np", "now"],
  execute(bot, message, args, serverQueue) {
    if (!message.member.voice.channel) {
      return message.channel.send("You need to be in a voice channel!");
    }

    if (!serverQueue) {
      return message.channel.send("There are no song currently playing");
    }

    const song = serverQueue.nowPlaying;

    const embed = new MessageEmbed()
      .setTitle(song.title)
      .setURL(song.url)
      .setAuthor("🎵 Now playing:")
      .setImage(song.thumbnail)
      .setColor("BLUE")
      .setDescription(
        `
      **Duration:** ${song.duration}s
      **Uploaded by:** ${song.uploadedBy}
      **Uploaded at:** ${song.uploadedAt}
      **Likes:** ${song.likes}`
      )
      .setFooter(`Requested by ${song.requestedBy.username}`);
    message.channel.send(embed);
  },
};
