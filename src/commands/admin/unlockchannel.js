module.exports = {
  name: "unlockchannel",
  description: "Unlock A channel",
  category: "admin",
  usage: "unlockchannel <channel mention | current channel>",
  botPermissions: ["MANAGE_CHANNELS"],
  memberPermissions: ["MANAGE_CHANNELS"],
  execute(bot, message) {
    const channel = message.mentions.channels.first() || message.channel;

    if (
      channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === true
    ) {
      return message.channel.send("That channel is not locked!");
    }

    channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true,
    });
    message.channel.send(`${channel} was successfully unlocked`);
  },
};
