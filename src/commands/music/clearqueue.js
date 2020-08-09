module.exports = {
  name: "clearqueue",
  description: "Clear the music playlist",
  aliases: ["cq"],
  category: "music",
  execute(bot, message, args, serverQueue) {
    if (!message.member.voice.channel) {
      return message.channel.send("You need to be in a voice channel!");
    }

    if (!serverQueue) {
      return message.channel.send("There are no songs currently playing");
    }

    serverQueue.songs = [];
    serverQueue.connection.dispatcher?.destroy();
    message.channel.send("The queue was cleared");
  },
};