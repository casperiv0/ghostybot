module.exports = {
  name: "lockchannel",
  description: "Lock A channel",
  category: "admin",
  botPermissions: ["MANAGE_CHANNELS"],
  memberPermissions: ["MANAGE_CHANNELS"],
  execute(bot, message, args) {
    let lockReason = args.join(" ");
    let channel = message.mentions.channels.first();

    if (channel) {
      lockReason = args.join(" ").slice(22);
    } else {
      channel = message.channel;
    }

    if (
      channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === false
    ) {
      return message.channel.send("That channel is already locked!");
    }

    if (!lockReason)
      return message.reply("Please provide a reason to lock this channel");

    channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false,
    });
    message.channel.send(
      `successfully locked ${channel}, Reason: **${lockReason}**`
    );
  },
};
