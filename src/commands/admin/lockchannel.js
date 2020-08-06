const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "lockchannel",
  description: "Lock A channel",
  category: "admin",
  execute(bot, message, args) {
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        errorEmbed("manage channels! (Manage Channels)", message)
      );

    const user = message.member;
    let lockReason = args.join(" ");
    let channel = message.mentions.channels.first();

    if (channel) {
      lockReason = args.join(" ").slice(22);
    } else {
      channel = message.channel;
    }

    if (!lockReason)
      return message.reply("Please provide a reason to lock this channel");

    if (!user.hasPermission(["MANAGE_CHANNELS"]))
      return message.channel.send("You don't have to correct permissions!");

    channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false,
    });
    message.channel.send(
      `successfully locked ${channel}, Reason: **${lockReason}**`
    );
  },
};
