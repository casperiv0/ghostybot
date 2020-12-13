module.exports = {
  name: "nuke",
  description: "Nuke the current channel, delete all messages of the channel",
  usage: "nuke",
  aliases: ["channelnuke"],
  category: "admin",
  botPermissions: ["MANAGE_CHANNELS"],
  memberPermissions: ["MANAGE_CHANNELS"],
  async execute(bot, message) {
    let channel = message.channel;

    if (!channel) {
      return message.channel.send("An error occurred");
    }

    const position = channel.position;
    const topic = channel.topic;

    const filter = (m) => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, {
      time: 15000,
    });

    message.channel.send("Are you sure? y/n");

    collector.on("collect", async (m) => {
      if (m.content?.toLowerCase() === "y") {
        const channel2 = await channel.clone();

        channel2.setPosition(position);
        channel2.setTopic(topic);
        channel.delete();
        channel2.send("Channel has been nuked!");
      } else {
        return message.channel.send("nuke command was canceled");
      }
    });
  },
};
