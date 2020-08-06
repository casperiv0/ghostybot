const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "unlockchannel",
  description: "Unlock A channel",
  category: "admin",
  usage: "unlockchannel <channel mention | current channel>",
  execute(bot, message) {
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        errorEmbed("manage channels! (Manage Channels)", message)
      );

    const user = message.member;
    const channel = message.mentions.channels.first() || message.channel;

    if (!user.hasPermission(["MANAGE_CHANNELS"]))
      return message.channel.send("You don't have to correct permissions!");

    channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true,
    });
    message.channel.send(`${channel} was successfully unlocked`);
  },
};
