module.exports = {
  name: "volume",
  description: "Set the volume between 1 to 100",
  category: "music",
  async execute(bot, message, args, serverQueue) {
    if (!message.member.voice.channel) {
      return message.channel.send("You need to be in a voice channel!");
    }

    if (!serverQueue) {
      return message.channel.send("There are no songs currently playing");
    }

    if (Number(args[0]) > 100) {
      return message.channel.send("Volume must be between 0 and 100");
    }

    if (!args[0]) {
      return message.channel.send("Please provide a number");
    }

    const volume = args[0] / 100;
    serverQueue.volume = volume;
    await serverQueue.connection.dispatcher.setVolume(volume);
    await message.channel.send(`Successfully set volume to ${args[0]}%`);
  },
};
