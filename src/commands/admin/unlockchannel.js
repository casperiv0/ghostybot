module.exports = {
  name: "unlockchannel",
  description: "Unlock A channel",
  category: "admin",
  execute(bot, message) {
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.reply(
        "I don't have the correct permissions to manage channels! (Manage Channels)"
      );

    const user = message.member;

    if (!user.hasPermission(["MANAGE_CHANNELS"]))
      return message.channel.send("You don't have to correct permissions!");

    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true,
    });
    message.channel.send("Channel was successfully unlocked");
  },
};
