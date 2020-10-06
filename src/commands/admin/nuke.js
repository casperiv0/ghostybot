const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "nuke",
  description: "Nuke the current channel, delete all messages of the channel",
  usage: "nuke",
  aliases: ["channelnuke"],
  category: "admin",
  async execute(bot, message) {
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        errorEmbed("manage channels! (Manage Channels)", message)
      );

    const user = message.member;
    if (!user.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        "You don't have the correct permissions for that!"
      );

    let channel = bot.channels.cache.get(message.channel.id);
    const position = channel.position;

    const channel2 = await channel.clone();

    channel2.setPosition(position);
    channel.delete();
    channel2.send("Channel has been nuked!");
  },
};
