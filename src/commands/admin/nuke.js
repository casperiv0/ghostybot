module.exports = {
  name: "nuke",
  description: "Nuke the current channel, delete all messages of the channel",
  usage: "nuke",
  aliases: ["channelnuke"],
  category: "admin",
  botPermissions: ["MANAGE_CHANNELS"],
  memberPermissions: ["MANAGE_CHANNELS"],
  async execute(bot, message) {
    let channel = bot.channels.cache.get(message.channel.id);
    const position = channel.position;
    const topic = channel.topic;

    const channel2 = await channel.clone();

    channel2.setPosition(position);
    channel2.setTopic(topic);
    channel.delete();
    channel2.send("Channel has been nuked!");
  },
};
